'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { describe, test } = require('node:test');

const ROOT = path.join(__dirname, '..');
const SCRIPT = path.join(ROOT, 'scripts', 'check-showcase-readiness.cjs');

function makeFixture(readme, demo) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'gsd-showcase-'));
  const readmePath = path.join(dir, 'README.md');
  const demoPath = path.join(dir, 'DEMO.md');

  fs.writeFileSync(readmePath, readme, 'utf8');
  fs.writeFileSync(demoPath, demo, 'utf8');

  return { demoPath, readmePath };
}

function runCheck(readmePath, demoPath) {
  return spawnSync(process.execPath, [
    SCRIPT,
    '--readme',
    readmePath,
    '--demo',
    demoPath,
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

  test('passes when README and demo docs both contain the public demo link', () => {
    const { demoPath, readmePath } = makeFixture(
      'Watch the [60-second GSD Codex demo](https://example.com/gsd-codex-demo) near the terminal preview.',
      'Published demo: [60-second GSD Codex demo](https://example.com/gsd-codex-demo).',
    );

    const result = runCheck(readmePath, demoPath);

    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.match(result.stdout, /Showcase readiness check passed/);
  });

  test('fails while placeholder text is still present', () => {
    const { demoPath, readmePath } = makeFixture(
      'Finished demo link: place a published `60-second GSD Codex demo` link near this terminal preview once the recording is available.',
      'When the recording is ready, place the finished demo link under this section and mirror it near the README terminal preview.',
    );

    const result = runCheck(readmePath, demoPath);
    const output = `${result.stdout}\n${result.stderr}`;

    assert.notEqual(result.status, 0);
    assert.match(output, /README\.md still contains placeholder text/);
    assert.match(output, /docs\/DEMO\.md still contains placeholder text/);
  });

  test('fails when either document is missing the public demo link', () => {
    const { demoPath, readmePath } = makeFixture(
      'Watch the [60-second GSD Codex demo](https://example.com/gsd-codex-demo) near the terminal preview.',
      'The demo guide describes recording steps but has no published link yet.',
    );

    const result = runCheck(readmePath, demoPath);
    const output = `${result.stdout}\n${result.stderr}`;

    assert.notEqual(result.status, 0);
    assert.match(output, /docs\/DEMO\.md is missing a public 60-second GSD Codex demo link/);
  });
});
