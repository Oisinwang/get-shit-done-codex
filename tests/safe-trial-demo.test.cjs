'use strict';

const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { describe, test } = require('node:test');

const ROOT = path.join(__dirname, '..');
const SCRIPT = path.join(ROOT, 'scripts', 'safe-trial-demo.cjs');

function runDemo(args = []) {
  return execFileSync(process.execPath, [SCRIPT, ...args], {
    cwd: ROOT,
    encoding: 'utf8',
  });
}

describe('safe trial demo script', () => {
  test('prints copy-pastable safe trial commands without running them', () => {
    assert.equal(fs.existsSync(SCRIPT), true, 'scripts/safe-trial-demo.cjs should exist');

    const output = runDemo();

    assert.match(output, /GSD Codex safe trial demo/);
    assert.match(output, /Sandbox trial/);
    assert.match(output, /Existing repository trial/);
    assert.match(output, /mkdir gsd-codex-trial/);
    assert.match(output, /git switch -c evaluate-gsd-codex/);
    assert.match(output, /npx @oisinwang\/get-shit-done-codex@latest --codex --local/);
    assert.match(output, /\$gsd-new-project --auto/);
    assert.match(output, /\$gsd-next/);
    assert.match(output, /git status --short/);
    assert.match(output, /\.codex\//);
    assert.match(output, /AGENTS\.md/);
    assert.match(output, /\.planning\//);
    assert.match(output, /Remove the throwaway directory or delete the trial branch/);
    assert.match(output, /prints commands only; it does not install or modify files/);
  });

  test('emits machine-readable demo steps for docs and recording checks', () => {
    assert.equal(fs.existsSync(SCRIPT), true, 'scripts/safe-trial-demo.cjs should exist');

    const payload = JSON.parse(runDemo(['--json']));

    assert.equal(payload.name, 'safe-trial-demo');
    assert.equal(payload.package, '@oisinwang/get-shit-done-codex');
    assert.deepEqual(payload.expectedChangedPaths, ['.codex/', 'AGENTS.md', '.planning/']);
    assert.match(payload.notes.join('\n'), /does not install or modify files/);
    assert.deepEqual(payload.flows.sandbox.commands, [
      'mkdir gsd-codex-trial',
      'cd gsd-codex-trial',
      'git init',
      'npx @oisinwang/get-shit-done-codex@latest --codex --local',
      '$gsd-new-project --auto',
      '$gsd-next',
      'git status --short',
    ]);
    assert.deepEqual(payload.flows.existingRepository.commands, [
      'git status --short',
      'git switch -c evaluate-gsd-codex',
      'npx @oisinwang/get-shit-done-codex@latest --codex --local',
      '$gsd-new-project --auto',
      '$gsd-next',
      'git status --short',
    ]);
  });
});
