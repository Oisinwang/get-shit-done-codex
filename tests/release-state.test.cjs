'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { describe, test } = require('node:test');

const ROOT = path.join(__dirname, '..');
const SCRIPT = path.join(ROOT, 'scripts', 'check-release-state.cjs');
const { buildNpmViewInvocation } = require(SCRIPT);

function writeFixture({ changelog, metadata, packageJson }) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'gsd-release-state-'));
  const changelogPath = path.join(dir, 'CHANGELOG.md');
  const metadataPath = path.join(dir, 'npm-metadata.json');
  const packageJsonPath = path.join(dir, 'package.json');

  fs.writeFileSync(changelogPath, changelog, 'utf8');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

  return { changelogPath, metadataPath, packageJsonPath };
}

function runCheck(fixture) {
  return spawnSync(process.execPath, [
    SCRIPT,
    '--package-json',
    fixture.packageJsonPath,
    '--changelog',
    fixture.changelogPath,
    '--npm-metadata',
    fixture.metadataPath,
  ], {
    cwd: ROOT,
    encoding: 'utf8',
  });
}

const packageBase = {
  name: '@oisinwang/get-shit-done-codex',
  version: '1.37.2',
};

const published1372 = {
  version: '1.37.2',
  'dist-tags': { latest: '1.37.2' },
  time: {
    created: '2026-05-04T10:22:52.412Z',
    modified: '2026-05-04T11:10:45.894Z',
    '1.37.1': '2026-05-04T10:22:52.718Z',
    '1.37.2': '2026-05-04T11:10:45.799Z',
  },
};

describe('release state check', () => {
  test('wraps npm view through cmd.exe on Windows', () => {
    assert.deepEqual(buildNpmViewInvocation('@oisinwang/get-shit-done-codex', 'win32'), {
      args: [
        '/d',
        '/s',
        '/c',
        'npm.cmd',
        'view',
        '@oisinwang/get-shit-done-codex',
        'version',
        'dist-tags',
        'time',
        '--json',
      ],
      command: 'cmd.exe',
    });
  });

  test('uses npm directly on non-Windows platforms', () => {
    assert.deepEqual(buildNpmViewInvocation('@oisinwang/get-shit-done-codex', 'linux'), {
      args: [
        'view',
        '@oisinwang/get-shit-done-codex',
        'version',
        'dist-tags',
        'time',
        '--json',
      ],
      command: 'npm',
    });
  });

  test('package script exposes a non-default release state check', () => {
    const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));

    assert.equal(packageJson.scripts['check:release-state'], 'node scripts/check-release-state.cjs');
    assert.doesNotMatch(packageJson.scripts.test, /check:release-state/);
  });

  test('fails when current version is already published but changelog has unreleased entries', () => {
    const fixture = writeFixture({
      packageJson: packageBase,
      metadata: published1372,
      changelog: [
        '# Changelog',
        '',
        '## [Unreleased]',
        '',
        '### Added',
        '- Public showcase docs are ready for the next package.',
        '',
        '## [1.37.2] - 2026-05-04',
      ].join('\n'),
    });

    const result = runCheck(fixture);
    const output = `${result.stdout}\n${result.stderr}`;

    assert.notEqual(result.status, 0);
    assert.match(output, /Release state check failed/);
    assert.match(output, /1\.37\.2 is already published/);
    assert.match(output, /\[Unreleased\] has package-facing entries/);
    assert.match(output, /next patch version is 1\.37\.3/);
  });

  test('passes when local package version is newer than npm latest', () => {
    const fixture = writeFixture({
      packageJson: { ...packageBase, version: '1.37.3' },
      metadata: published1372,
      changelog: [
        '# Changelog',
        '',
        '## [Unreleased]',
        '',
        '### Fixed',
        '- Release blocker fix.',
        '',
        '## [1.37.2] - 2026-05-04',
      ].join('\n'),
    });

    const result = runCheck(fixture);
    const output = `${result.stdout}\n${result.stderr}`;

    assert.equal(result.status, 0, output);
    assert.match(output, /Release state check passed/);
    assert.match(output, /Local package: @oisinwang\/get-shit-done-codex@1\.37\.3/);
  });

  test('passes when current version is published and changelog has no unreleased entries', () => {
    const fixture = writeFixture({
      packageJson: packageBase,
      metadata: published1372,
      changelog: [
        '# Changelog',
        '',
        '## [Unreleased]',
        '',
        '## [1.37.2] - 2026-05-04',
      ].join('\n'),
    });

    const result = runCheck(fixture);
    const output = `${result.stdout}\n${result.stderr}`;

    assert.equal(result.status, 0, output);
    assert.match(output, /Release state check passed/);
    assert.match(output, /No package-facing \[Unreleased\] entries detected/);
  });

  test('fails when the local package version is behind npm latest', () => {
    const fixture = writeFixture({
      packageJson: { ...packageBase, version: '1.37.1' },
      metadata: published1372,
      changelog: [
        '# Changelog',
        '',
        '## [Unreleased]',
        '',
        '## [1.37.1] - 2026-05-04',
      ].join('\n'),
    });

    const result = runCheck(fixture);
    const output = `${result.stdout}\n${result.stderr}`;

    assert.notEqual(result.status, 0);
    assert.match(output, /Release state check failed/);
    assert.match(output, /Local package version 1\.37\.1 is behind npm latest 1\.37\.2/);
  });
});
