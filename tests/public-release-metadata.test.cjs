'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { describe, test } = require('node:test');

const ROOT = path.join(__dirname, '..');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'));
}

describe('public release metadata', () => {
  test('root npm package uses the public Codex fork scope', () => {
    const packageJson = readJson('package.json');
    const packageLock = readJson('package-lock.json');

    assert.equal(packageJson.name, '@oisinwang/get-shit-done-codex');
    assert.equal(packageLock.name, '@oisinwang/get-shit-done-codex');
    assert.equal(packageLock.packages[''].name, '@oisinwang/get-shit-done-codex');
    assert.equal(packageJson.bin['get-shit-done-codex'], 'bin/install.js');
    assert.equal(packageJson.publishConfig.access, 'public');
  });

  test('sdk package uses the same public npm scope', () => {
    const sdkPackageJson = readJson('sdk/package.json');
    const sdkPackageLock = readJson('sdk/package-lock.json');

    assert.equal(sdkPackageJson.name, '@oisinwang/get-shit-done-codex-sdk');
    assert.equal(sdkPackageLock.name, '@oisinwang/get-shit-done-codex-sdk');
    assert.equal(sdkPackageLock.packages[''].name, '@oisinwang/get-shit-done-codex-sdk');
    assert.equal(sdkPackageJson.bin['gsd-sdk'], 'dist/cli.js');
    assert.deepEqual(sdkPackageJson.files, ['dist', 'prompts']);
    assert.equal(sdkPackageJson.scripts.prepublishOnly, 'npm run build');
    assert.equal(sdkPackageJson.publishConfig.access, 'public');
  });

  test('README advertises the publishable package and has no mojibake markers', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');

    assert.match(readme, /npx @oisinwang\/get-shit-done-codex@latest/);

    const mojibakeMarkers = [
      '\u9225',
      '\u951a',
      '\u93c3',
      '\u9803',
      'T\u8117CHES',
      '**English** \u8def',
    ];

    for (const marker of mojibakeMarkers) {
      assert.equal(readme.includes(marker), false, `README contains mojibake marker: ${marker}`);
    }

    assert.doesNotMatch(readme, /[^\x00-\x7F]/, 'English README should stay ASCII to avoid mojibake regressions');
  });

  test('high-visibility English public files stay ASCII-clean', () => {
    const asciiFiles = [
      'README.md',
      'get-shit-done/workflows/quick.md',
      'sdk/src/index.ts',
    ];

    for (const relativePath of asciiFiles) {
      const content = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
      assert.doesNotMatch(content, /[^\x00-\x7F]/, `${relativePath} contains non-ASCII text`);
    }
  });

  test('public install hints use publishable scoped package names', () => {
    const installHintFiles = [
      'README.md',
      'README.pt-BR.md',
      'README.zh-CN.md',
      'README.ja-JP.md',
      'README.ko-KR.md',
      '.github/ISSUE_TEMPLATE/bug_report.yml',
      'bin/install.js',
    ];

    for (const relativePath of installHintFiles) {
      const content = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
      assert.equal(
        content.includes('npx get-shit-done-codex'),
        false,
        `${relativePath} still advertises the unavailable unscoped npx package`,
      );
    }

    const sdkHintFiles = [
      'bin/install.js',
      'get-shit-done/workflows/quick.md',
      'sdk/src/index.ts',
      'tests/bug-2334-quick-gsd-sdk-preflight.test.cjs',
      'tests/bugs-1656-1657.test.cjs',
    ];

    for (const relativePath of sdkHintFiles) {
      const content = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
      assert.equal(
        content.includes('@gsd-build/sdk'),
        false,
        `${relativePath} still references the upstream SDK package name`,
      );
    }
  });
});
