#!/usr/bin/env node
'use strict';

const { spawnSync } = require('node:child_process');
const path = require('node:path');

let c8Bin;
try {
  c8Bin = require.resolve('c8/bin/c8.js');
} catch {
  console.error('c8 is not installed. Run npm ci before running coverage.');
  process.exit(1);
}

const root = path.join(__dirname, '..');
const runTests = path.join(__dirname, 'run-tests.cjs');
const args = [
  c8Bin,
  '--check-coverage',
  '--lines',
  '70',
  '--reporter',
  'text',
  '--include',
  'get-shit-done/bin/lib/*.cjs',
  '--exclude',
  'tests/**',
  '--all',
  process.execPath,
  runTests,
];

const result = spawnSync(process.execPath, args, {
  cwd: root,
  env: process.env,
  stdio: 'inherit',
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(typeof result.status === 'number' ? result.status : 1);
