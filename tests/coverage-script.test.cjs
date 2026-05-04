'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { describe, test } = require('node:test');

const ROOT = path.join(__dirname, '..');

describe('coverage script portability', () => {
  test('package routes coverage through the Node wrapper', () => {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'),
    );

    assert.equal(packageJson.scripts['test:coverage'], 'node scripts/run-coverage.cjs');
  });

  test('coverage wrapper passes globs as argv entries instead of shell text', () => {
    const wrapper = fs.readFileSync(
      path.join(ROOT, 'scripts', 'run-coverage.cjs'),
      'utf8',
    );

    assert.match(wrapper, /spawnSync\(/);
    assert.ok(wrapper.includes("'--include',"));
    assert.ok(wrapper.includes("'get-shit-done/bin/lib/*.cjs'"));
    assert.ok(wrapper.includes("'--exclude',"));
    assert.ok(wrapper.includes("'tests/**'"));
    assert.equal(wrapper.includes("--include 'get-shit-done/bin/lib/*.cjs'"), false);
    assert.equal(wrapper.includes("--exclude 'tests/**'"), false);
  });
});
