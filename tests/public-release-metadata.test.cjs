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

  test('root npm package keywords cover public discovery terms', () => {
    const packageJson = readJson('package.json');

    const requiredKeywords = [
      'ai',
      'ai-agents',
      'ai-coding',
      'codex',
      'codex-cli',
      'context-engineering',
      'developer-tools',
      'gsd',
      'meta-prompting',
      'openai-codex',
      'spec-driven-development',
      'workflow-automation',
    ];

    for (const keyword of requiredKeywords) {
      assert.ok(packageJson.keywords.includes(keyword), `package.json keywords missing ${keyword}`);
    }
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

  test('public launch surface presents a verified, stable install path', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const promotion = fs.readFileSync(path.join(ROOT, 'docs', 'PROMOTION.md'), 'utf8');

    assert.match(readme, /img\.shields\.io\/npm\/v\/@oisinwang\/get-shit-done-codex/);
    assert.match(readme, /img\.shields\.io\/npm\/dm\/@oisinwang\/get-shit-done-codex/);
    assert.match(readme, /actions\/workflows\/test\.yml\/badge\.svg\?branch=codex\/bootstrap/);
    assert.match(readme, /Published on npm as `@oisinwang\/get-shit-done-codex`/);
    assert.match(readme, /Tested release branch: `codex\/bootstrap`/);
    assert.match(readme, /Independent Codex-first fork of GSD/);
    assert.match(readme, /Security and release hygiene/);

    for (const content of [readme, promotion]) {
      assert.doesNotMatch(content, /release candidate/i);
      assert.doesNotMatch(content, /package names, CI, and docs are being stabilized/i);
      assert.doesNotMatch(content, /Not yet release-aligned/i);
    }

    assert.match(promotion, /Verified install path/);
    assert.match(promotion, /npx @oisinwang\/get-shit-done-codex@latest/);
  });

  test('README star history embeds use the public owner and repository name', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');

    assert.match(readme, /star-history\.com\/#Oisinwang\/get-shit-done-codex&Date/);
    assert.match(readme, /repos=Oisinwang\/get-shit-done-codex&type=Date/);
    assert.doesNotMatch(readme, /repos=get-shit-done-codex&type=Date/);
  });

  test('high-visibility English public files stay ASCII-clean', () => {
    const asciiFiles = [
      'README.md',
      'docs/README.md',
      'get-shit-done/workflows/quick.md',
      'sdk/src/index.ts',
    ];

    for (const relativePath of asciiFiles) {
      const content = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
      assert.doesNotMatch(content, /[^\x00-\x7F]/, `${relativePath} contains non-ASCII text`);
    }
  });

  test('documentation index presents the current Codex-first fork', () => {
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');

    assert.match(docsReadme, /# GSD Codex Documentation/);
    assert.match(docsReadme, /Codex-first workflow system/);
    assert.match(docsReadme, /AGENTS\.md/);
    assert.match(docsReadme, /\.codex\//);
    assert.match(docsReadme, /\$gsd-\*/);
    assert.match(docsReadme, /CODEX-FORK\.md/);
    assert.match(docsReadme, /npx @oisinwang\/get-shit-done-codex@latest/);

    assert.doesNotMatch(docsReadme, /v1\.32/);
    assert.doesNotMatch(docsReadme, /What's new in/);
    assert.doesNotMatch(docsReadme, /Claude-first/);
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

  test('localized READMEs present the Codex-first public fork', () => {
    const localizedReadmes = [
      ['README.pt-BR.md', /Pacote publicado no npm como `@oisinwang\/get-shit-done-codex`/],
      ['README.zh-CN.md', /发布在 npm 上的包名是 `@oisinwang\/get-shit-done-codex`/],
      ['README.ja-JP.md', /npm では `@oisinwang\/get-shit-done-codex` として公開/],
      ['README.ko-KR.md', /npm에는 `@oisinwang\/get-shit-done-codex` 패키지로 게시/],
    ];

    for (const [relativePath, packageSentence] of localizedReadmes) {
      const readme = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');

      assert.match(readme, /# GET SHIT DONE CODEX/, relativePath);
      assert.match(readme, /Codex-first/, relativePath);
      assert.match(readme, /npx @oisinwang\/get-shit-done-codex@latest/, relativePath);
      assert.match(readme, /img\.shields\.io\/npm\/v\/@oisinwang\/get-shit-done-codex/, relativePath);
      assert.match(readme, /img\.shields\.io\/npm\/dm\/@oisinwang\/get-shit-done-codex/, relativePath);
      assert.match(readme, /actions\/workflows\/test\.yml\/badge\.svg\?branch=codex\/bootstrap/, relativePath);
      assert.match(readme, /github\.com\/Oisinwang\/get-shit-done-codex/, relativePath);
      assert.match(readme, packageSentence, relativePath);

      assert.doesNotMatch(readme, /img\.shields\.io\/npm\/v\/get-shit-done-codex/, relativePath);
      assert.doesNotMatch(readme, /github\.com\/get-shit-done-codex/, relativePath);
      assert.doesNotMatch(readme, /discord\.gg/, relativePath);
      assert.doesNotMatch(readme, /dexscreener/i, relativePath);
    }
  });
});
