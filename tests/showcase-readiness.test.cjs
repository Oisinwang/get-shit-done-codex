'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { describe, test } = require('node:test');

const ROOT = path.join(__dirname, '..');
const SCRIPT = path.join(ROOT, 'scripts', 'check-showcase-readiness.cjs');
const DEMO_LINK = '[60-second GSD Codex demo](https://github.com/Oisinwang/get-shit-done-codex/blob/codex/bootstrap/docs/DEMO-60-SECOND.md)';
const LOCAL_DOCS_LINK = '[Demo Transcript](DEMO-60-SECOND.md)';

function makeFixture(readme, demo, docsReadme = LOCAL_DOCS_LINK) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'gsd-showcase-'));
  const docsReadmePath = path.join(dir, 'docs-README.md');
  const readmePath = path.join(dir, 'README.md');
  const demoPath = path.join(dir, 'DEMO.md');

  fs.writeFileSync(docsReadmePath, docsReadme, 'utf8');
  fs.writeFileSync(readmePath, readme, 'utf8');
  fs.writeFileSync(demoPath, demo, 'utf8');

  return { demoPath, docsReadmePath, readmePath };
}

function runCheck(readmePath, demoPath, docsReadmePath) {
  return spawnSync(process.execPath, [
    SCRIPT,
    '--readme',
    readmePath,
    '--demo',
    demoPath,
    '--docs-readme',
    docsReadmePath,
  ], {
    cwd: ROOT,
    encoding: 'utf8',
  });
}

describe('showcase readiness check', () => {
  test('package script exposes a non-default showcase readiness check', () => {
    const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));

    assert.equal(packageJson.scripts['check:showcase'], 'node scripts/check-showcase-readiness.cjs');
    assert.doesNotMatch(packageJson.scripts.test, /check:showcase/);
  });

  test('passes when README, docs index, and demo docs contain the repo-hosted demo transcript link', () => {
    const { demoPath, docsReadmePath, readmePath } = makeFixture(
      `Read the repo-hosted ${DEMO_LINK} near the terminal preview.`,
      `Published demo transcript: ${DEMO_LINK}.`,
      `Docs index link: ${LOCAL_DOCS_LINK}.`,
    );

    const result = runCheck(readmePath, demoPath, docsReadmePath);

    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.match(result.stdout, /Showcase readiness check passed/);
  });

  test('fails while placeholder text is still present', () => {
    const { demoPath, docsReadmePath, readmePath } = makeFixture(
      'Finished demo link: place a published `60-second GSD Codex demo` link near this terminal preview once the recording is available.',
      'When the recording is ready, place the finished demo link under this section and mirror it near the README terminal preview.',
    );

    const result = runCheck(readmePath, demoPath, docsReadmePath);
    const output = `${result.stdout}\n${result.stderr}`;

    assert.notEqual(result.status, 0);
    assert.match(output, /README\.md still contains placeholder text/);
    assert.match(output, /docs\/DEMO\.md still contains placeholder text/);
  });

  test('fails when either document is missing the public demo link', () => {
    const { demoPath, docsReadmePath, readmePath } = makeFixture(
      `Read the repo-hosted ${DEMO_LINK} near the terminal preview.`,
      'The demo guide describes recording steps but has no published link yet.',
    );

    const result = runCheck(readmePath, demoPath, docsReadmePath);
    const output = `${result.stdout}\n${result.stderr}`;

    assert.notEqual(result.status, 0);
    assert.match(output, /docs\/DEMO\.md is missing the repo-hosted 60-second GSD Codex demo transcript link/);
  });

  test('fails when the demo link points outside the public repository transcript', () => {
    const externalLink = '[60-second GSD Codex demo](https://example.com/gsd-codex-demo)';
    const { demoPath, docsReadmePath, readmePath } = makeFixture(
      `External demo: ${externalLink}.`,
      `External demo: ${externalLink}.`,
      `External demo: ${externalLink}.`,
    );

    const result = runCheck(readmePath, demoPath, docsReadmePath);
    const output = `${result.stdout}\n${result.stderr}`;

    assert.notEqual(result.status, 0);
    assert.match(output, /README\.md is missing the repo-hosted 60-second GSD Codex demo transcript link/);
    assert.match(output, /docs\/README\.md is missing the repo-hosted 60-second GSD Codex demo transcript link/);
    assert.match(output, /docs\/DEMO\.md is missing the repo-hosted 60-second GSD Codex demo transcript link/);
  });
});
