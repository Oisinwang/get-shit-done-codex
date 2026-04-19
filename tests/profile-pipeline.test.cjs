/**
 * Profile Pipeline Tests
 *
 * Tests for session scanning, message extraction, and profile sampling.
 * Uses synthetic session data in temp directories via --path override.
 */

const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { runGsdTools, createTempDir, createTempProject, cleanup } = require('./helpers.cjs');

// ─── scan-sessions ────────────────────────────────────────────────────────────

describe('scan-sessions command', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = createTempDir('gsd-profile-test-');
  });

  afterEach(() => {
    cleanup(tmpDir);
  });

  test('returns empty array for empty sessions directory', () => {
    const sessionsDir = path.join(tmpDir, 'projects');
    fs.mkdirSync(sessionsDir, { recursive: true });
    const result = runGsdTools(`scan-sessions --path ${sessionsDir} --raw`, tmpDir);
    assert.ok(result.success, `Failed: ${result.error}`);
    const out = JSON.parse(result.output);
    assert.ok(Array.isArray(out), 'should return an array');
    assert.strictEqual(out.length, 0, 'should be empty');
  });

  test('scans synthetic project directory', () => {
    const sessionsDir = path.join(tmpDir, 'projects');
    const projectDir = path.join(sessionsDir, 'test-project-abc123');
    fs.mkdirSync(projectDir, { recursive: true });

    // Create a synthetic session file
    const sessionData = [
      JSON.stringify({ type: 'user', userType: 'external', message: { content: 'hello' }, timestamp: Date.now() }),
      JSON.stringify({ type: 'assistant', message: { content: 'hi' }, timestamp: Date.now() }),
    ].join('\n');
    fs.writeFileSync(path.join(projectDir, 'session-001.jsonl'), sessionData);

    const result = runGsdTools(`scan-sessions --path ${sessionsDir} --raw`, tmpDir);
    assert.ok(result.success, `Failed: ${result.error}`);
    const out = JSON.parse(result.output);
    assert.ok(Array.isArray(out), 'should return array');
    assert.strictEqual(out.length, 1, 'should find 1 project');
    assert.strictEqual(out[0].sessionCount, 1, 'should have 1 session');
  });

  test('reports multiple sessions and sizes', () => {
    const sessionsDir = path.join(tmpDir, 'projects');
    const projectDir = path.join(sessionsDir, 'multi-session-project');
    fs.mkdirSync(projectDir, { recursive: true });

    for (let i = 1; i <= 3; i++) {
      const data = JSON.stringify({ type: 'user', userType: 'external', message: { content: `msg ${i}` }, timestamp: Date.now() });
      fs.writeFileSync(path.join(projectDir, `session-${i}.jsonl`), data + '\n');
    }

    const result = runGsdTools(`scan-sessions --path ${sessionsDir} --raw`, tmpDir);
    assert.ok(result.success, `Failed: ${result.error}`);
    const out = JSON.parse(result.output);
    assert.strictEqual(out[0].sessionCount, 3);
    assert.ok(out[0].totalSize > 0, 'should have non-zero size');
  });

  test('defaults to ~/.codex/sessions when HOME contains Codex session files', () => {
    const homeDir = path.join(tmpDir, 'home');
    const projectDir = path.join(homeDir, 'workspace', 'demo-project');
    const sessionsDir = path.join(homeDir, '.codex', 'sessions', '2026', '04', '18');
    const sessionPath = path.join(sessionsDir, 'session-001.jsonl');
    fs.mkdirSync(projectDir, { recursive: true });
    fs.mkdirSync(sessionsDir, { recursive: true });

    const sessionData = [
      JSON.stringify({
        payload: {
          cwd: projectDir,
          timestamp: '2026-04-18T01:00:00.000Z',
        },
      }),
      JSON.stringify({
        type: 'user',
        userType: 'external',
        cwd: projectDir,
        timestamp: '2026-04-18T01:00:01.000Z',
        message: { content: 'codex default path works' },
      }),
    ].join('\n');
    fs.writeFileSync(sessionPath, sessionData);

    const result = runGsdTools('scan-sessions --raw', tmpDir, { HOME: homeDir, USERPROFILE: homeDir });
    assert.ok(result.success, `Failed: ${result.error}`);

    const out = JSON.parse(result.output);
    assert.ok(Array.isArray(out), 'should return array');
    assert.strictEqual(out.length, 1, 'should find 1 project via default Codex path');
    assert.strictEqual(out[0].name, 'demo-project');
    assert.strictEqual(out[0].sessionCount, 1);
  });
});

// ─── extract-messages ─────────────────────────────────────────────────────────

describe('extract-messages command', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = createTempDir('gsd-profile-test-');
  });

  afterEach(() => {
    cleanup(tmpDir);
  });

  test('extracts user messages from synthetic session', () => {
    const sessionsDir = path.join(tmpDir, 'projects');
    const projectDir = path.join(sessionsDir, 'my-project');
    fs.mkdirSync(projectDir, { recursive: true });

    const messages = [
      { type: 'user', userType: 'external', message: { content: 'fix the login bug' }, timestamp: Date.now() },
      { type: 'assistant', message: { content: 'I will fix it.' }, timestamp: Date.now() },
      { type: 'user', userType: 'external', message: { content: 'add dark mode' }, timestamp: Date.now() },
      { type: 'user', userType: 'internal', isMeta: true, message: { content: '<local-command' }, timestamp: Date.now() },
    ];
    fs.writeFileSync(
      path.join(projectDir, 'session-001.jsonl'),
      messages.map(m => JSON.stringify(m)).join('\n')
    );

    const result = runGsdTools(`extract-messages my-project --path ${sessionsDir} --raw`, tmpDir);
    assert.ok(result.success, `Failed: ${result.error}`);
    const out = JSON.parse(result.output);
    assert.strictEqual(out.messages_extracted, 2, 'should extract 2 genuine user messages');
    assert.strictEqual(out.project, 'my-project');
    assert.ok(out.output_file, 'should have output file path');
  });

  test('filters out meta and internal messages', () => {
    const sessionsDir = path.join(tmpDir, 'projects');
    const projectDir = path.join(sessionsDir, 'filter-test');
    fs.mkdirSync(projectDir, { recursive: true });

    const messages = [
      { type: 'user', userType: 'external', message: { content: 'real message' }, timestamp: Date.now() },
      { type: 'user', userType: 'internal', message: { content: 'internal msg' }, timestamp: Date.now() },
      { type: 'user', userType: 'external', isMeta: true, message: { content: 'meta msg' }, timestamp: Date.now() },
      { type: 'user', userType: 'external', message: { content: '<local-command test' }, timestamp: Date.now() },
      { type: 'user', userType: 'external', message: { content: '' }, timestamp: Date.now() },
      { type: 'user', userType: 'external', message: { content: 'second real' }, timestamp: Date.now() },
    ];
    fs.writeFileSync(
      path.join(projectDir, 'session-001.jsonl'),
      messages.map(m => JSON.stringify(m)).join('\n')
    );

    const result = runGsdTools(`extract-messages filter-test --path ${sessionsDir} --raw`, tmpDir);
    assert.ok(result.success, `Failed: ${result.error}`);
    const out = JSON.parse(result.output);
    assert.strictEqual(out.messages_extracted, 2, 'should only extract 2 genuine external messages');
  });

  test('defaults to ~/.codex/sessions for project matching without --path', () => {
    const homeDir = path.join(tmpDir, 'home');
    const projectDir = path.join(homeDir, 'workspace', 'codex-project');
    const sessionsDir = path.join(homeDir, '.codex', 'sessions', '2026', '04', '18');
    const sessionPath = path.join(sessionsDir, 'session-001.jsonl');
    fs.mkdirSync(projectDir, { recursive: true });
    fs.mkdirSync(sessionsDir, { recursive: true });

    const messages = [
      {
        payload: {
          cwd: projectDir,
          timestamp: '2026-04-18T02:00:00.000Z',
        },
      },
      {
        type: 'user',
        userType: 'external',
        cwd: projectDir,
        timestamp: '2026-04-18T02:00:01.000Z',
        message: { content: 'extract from codex sessions' },
      },
    ];
    fs.writeFileSync(sessionPath, messages.map(m => JSON.stringify(m)).join('\n'));

    const result = runGsdTools('extract-messages codex-project --raw', tmpDir, { HOME: homeDir, USERPROFILE: homeDir });
    assert.ok(result.success, `Failed: ${result.error}`);

    const out = JSON.parse(result.output);
    assert.strictEqual(out.project, 'codex-project');
    assert.strictEqual(out.messages_extracted, 1, 'should extract the external Codex user message');
    assert.ok(out.output_file, 'should have output file path');
  });
});

// ─── profile-questionnaire ────────────────────────────────────────────────────

describe('profile-questionnaire command', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = createTempProject();
  });

  afterEach(() => {
    cleanup(tmpDir);
  });

  test('returns questionnaire structure', () => {
    const result = runGsdTools('profile-questionnaire --raw', tmpDir);
    assert.ok(result.success, `Failed: ${result.error}`);
    const out = JSON.parse(result.output);
    assert.ok(out.questions, 'should have questions array');
    assert.ok(out.questions.length > 0, 'should have at least one question');
    assert.ok(out.questions[0].dimension, 'each question should have a dimension');
    assert.ok(out.questions[0].options, 'each question should have options');
  });
});
