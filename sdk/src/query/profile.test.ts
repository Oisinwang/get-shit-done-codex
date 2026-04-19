/**
 * Tests for profile / learnings query handlers (filesystem writes use temp dirs).
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, writeFile, mkdir, rm, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { writeProfile, learningsCopy, scanSessions, extractMessages } from './profile.js';

describe('writeProfile', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'gsd-profile-'));
    await mkdir(join(tmpDir, '.planning'), { recursive: true });
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  it('writes USER-PROFILE.md from --input JSON', async () => {
    const analysisPath = join(tmpDir, 'analysis.json');
    await writeFile(analysisPath, JSON.stringify({ communication_style: 'terse' }), 'utf-8');
    const result = await writeProfile(['--input', analysisPath], tmpDir);
    const data = result.data as Record<string, unknown>;
    expect(data.written).toBe(true);
    const md = await readFile(join(tmpDir, '.planning', 'USER-PROFILE.md'), 'utf-8');
    expect(md).toContain('User Developer Profile');
    expect(md).toMatch(/Communication Style/i);
  });
});

describe('learningsCopy', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'gsd-learn-'));
    await mkdir(join(tmpDir, '.planning'), { recursive: true });
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  it('returns copied:false when LEARNINGS.md is missing', async () => {
    const result = await learningsCopy([], tmpDir);
    const data = result.data as Record<string, unknown>;
    expect(data.copied).toBe(false);
    expect(data.reason).toContain('LEARNINGS');
  });
});

describe('Codex session queries', () => {
  let tmpDir: string;
  let previousHome: string | undefined;
  let previousUserProfile: string | undefined;

  beforeEach(async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'gsd-sdk-profile-'));
    previousHome = process.env.HOME;
    previousUserProfile = process.env.USERPROFILE;
    process.env.HOME = tmpDir;
    process.env.USERPROFILE = tmpDir;
  });

  afterEach(async () => {
    if (previousHome === undefined) delete process.env.HOME;
    else process.env.HOME = previousHome;
    if (previousUserProfile === undefined) delete process.env.USERPROFILE;
    else process.env.USERPROFILE = previousUserProfile;
    await rm(tmpDir, { recursive: true, force: true });
  });

  it('scanSessions reads nested ~/.codex/sessions JSONL files by default', async () => {
    const projectDir = join(tmpDir, 'workspace', 'demo-project');
    const sessionsDir = join(tmpDir, '.codex', 'sessions', '2026', '04', '18');
    await mkdir(projectDir, { recursive: true });
    await mkdir(sessionsDir, { recursive: true });
    await writeFile(
      join(sessionsDir, 'session-001.jsonl'),
      [
        JSON.stringify({ payload: { cwd: projectDir, timestamp: '2026-04-18T00:00:00.000Z' } }),
        JSON.stringify({ type: 'user', userType: 'external', cwd: projectDir, message: { content: 'hello codex sdk' } }),
      ].join('\n'),
      'utf-8'
    );

    const result = await scanSessions([], tmpDir);
    const data = result.data as Record<string, unknown>;
    const projects = data.projects as Array<Record<string, unknown>>;
    expect(data.project_count).toBe(1);
    expect(projects[0]?.name).toBe('demo-project');
    expect(projects[0]?.session_count).toBe(1);
  });

  it('extractMessages matches project names from ~/.codex/sessions by default', async () => {
    const projectDir = join(tmpDir, 'workspace', 'codex-project');
    const sessionsDir = join(tmpDir, '.codex', 'sessions', '2026', '04', '18');
    await mkdir(projectDir, { recursive: true });
    await mkdir(sessionsDir, { recursive: true });
    await writeFile(
      join(sessionsDir, 'session-001.jsonl'),
      [
        JSON.stringify({ payload: { cwd: projectDir, timestamp: '2026-04-18T00:00:00.000Z' } }),
        JSON.stringify({ type: 'user', userType: 'external', cwd: projectDir, message: { content: 'extract this message' } }),
      ].join('\n'),
      'utf-8'
    );

    const result = await extractMessages(['codex-project'], tmpDir);
    const data = result.data as Record<string, unknown>;
    const messages = data.messages as Array<Record<string, unknown>>;
    expect(data.error).toBeUndefined();
    expect(data.project).toBe('codex-project');
    expect(messages).toHaveLength(1);
    expect(messages[0]?.content).toContain('extract this message');
  });
});
