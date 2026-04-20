'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const REPO_ROOT = path.join(__dirname, '..');
const BUILD_SCRIPT = path.join(REPO_ROOT, 'scripts', 'build-hooks.js');
const DIST_HOOK = path.join(REPO_ROOT, 'hooks', 'dist', 'gsd-read-injection-scanner.js');

test('build-hooks publishes the read injection scanner to hooks/dist', () => {
  execFileSync(process.execPath, [BUILD_SCRIPT], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    stdio: 'pipe',
  });

  assert.ok(
    fs.existsSync(DIST_HOOK),
    'hooks/dist/gsd-read-injection-scanner.js must exist after running scripts/build-hooks.js'
  );
});
