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

    assert.deepEqual(packageJson.keywords.slice(0, 5), [
      'codex',
      'openai-codex',
      'codex-cli',
      'ai-coding',
      'ai-agents',
    ]);

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

  test('README install flow leads with Codex before compatibility runtimes', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');

    assert.match(readme, /\*\*Runtime\*\* - Codex, Claude Code, OpenCode/);
    assert.match(
      readme,
      /# Codex[\s\S]*npx @oisinwang\/get-shit-done-codex --codex --global[\s\S]*# Claude Code compatibility\/runtime/,
    );
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

  test('installer banner and terminal preview present the Codex-first fork', () => {
    const terminalSvg = fs.readFileSync(path.join(ROOT, 'assets', 'terminal.svg'), 'utf8');
    const installer = fs.readFileSync(path.join(ROOT, 'bin', 'install.js'), 'utf8');

    assert.match(terminalSvg, /npx @oisinwang\/get-shit-done-codex@latest --codex --local/);
    assert.match(terminalSvg, /Get Shit Done Codex/);
    assert.match(terminalSvg, /Codex-first workflow system/);
    assert.match(terminalSvg, /\.codex\/skills/);
    assert.match(terminalSvg, /\$gsd-help/);

    assert.doesNotMatch(terminalSvg, /npx get-shit-done-cc/);
    assert.doesNotMatch(terminalSvg, /Claude Code by/);
    assert.doesNotMatch(terminalSvg, /T.CHES/);
    assert.doesNotMatch(installer, /T.CHES/);
  });

  test('public install hints use publishable scoped package names', () => {
    const installHintFiles = [
      'README.md',
      'README.pt-BR.md',
      'README.zh-CN.md',
      'README.ja-JP.md',
      'README.ko-KR.md',
      'docs/manual-update.md',
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

  test('active update and recovery surfaces use the scoped npm package', () => {
    const activeInstallSurfaceFiles = [
      'VERSIONING.md',
      'docs/context-monitor.md',
      'get-shit-done/bin/lib/verify.cjs',
      'get-shit-done/workflows/help.md',
      'get-shit-done/workflows/update.md',
    ];

    for (const relativePath of activeInstallSurfaceFiles) {
      const content = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');

      assert.match(content, /@oisinwang\/get-shit-done-codex/, relativePath);
      assert.doesNotMatch(content, /npx(?: -y)? get-shit-done-cc/i, relativePath);
      assert.doesNotMatch(content, /npm view get-shit-done-cc/i, relativePath);
      assert.doesNotMatch(content, /npm install get-shit-done-cc/i, relativePath);
      assert.doesNotMatch(content, /npm dist-tag ls get-shit-done-cc/i, relativePath);
    }
  });

  test('high-visibility docs use scoped Codex install commands', () => {
    const highVisibilityDocs = [
      'docs/USER-GUIDE.md',
      'docs/FEATURES.md',
      'docs/ja-JP/FEATURES.md',
      'docs/ja-JP/context-monitor.md',
      'docs/ko-KR/FEATURES.md',
      'docs/ko-KR/context-monitor.md',
    ];

    for (const relativePath of highVisibilityDocs) {
      const content = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
      assert.match(content, /@oisinwang\/get-shit-done-codex/, relativePath);
      assert.doesNotMatch(content, /npx get-shit-done-cc/i, relativePath);
      assert.doesNotMatch(content, /npx get-shit-done-codex/i, relativePath);
    }
  });

  test('User Guide is ASCII-clean and uses Codex command syntax by default', () => {
    const userGuide = fs.readFileSync(path.join(ROOT, 'docs', 'USER-GUIDE.md'), 'utf8');

    assert.doesNotMatch(userGuide, /[^\x00-\x7F]/, 'docs/USER-GUIDE.md should avoid mojibake-prone Unicode diagrams');
    assert.match(userGuide, /\$gsd-new-project/);
    assert.match(userGuide, /\$gsd-plan-phase/);
    assert.doesNotMatch(userGuide, /`\/gsd-/);
    assert.doesNotMatch(userGuide, /^\/gsd-/m);
    assert.match(userGuide, /node "\$HOME\/\.codex\/get-shit-done\/bin\/gsd-tools\.cjs"/);
    assert.doesNotMatch(userGuide, /bin\$gsd-tools\.cjs/);
    assert.doesNotMatch(userGuide, /~\$gsd-workspaces/);
    assert.doesNotMatch(userGuide, /~\/\.claude\/get-shit-done\/USER-PROFILE\.md/);
    assert.doesNotMatch(userGuide, /node "\$HOME\/\.claude\/get-shit-done\/bin\/gsd-tools\.cjs"/);
  });

  test('localized READMEs present the Codex-first public fork', () => {
    const localizedReadmes = [
      ['README.pt-BR.md', /Português/, /Publicado no npm como `@oisinwang\/get-shit-done-codex`/],
      ['README.zh-CN.md', /简体中文/, /发布在 npm 上的包名是 `@oisinwang\/get-shit-done-codex`/],
      ['README.ja-JP.md', /日本語/, /npm では `@oisinwang\/get-shit-done-codex` として公開されています/],
      ['README.ko-KR.md', /한국어/, /npm 패키지: `@oisinwang\/get-shit-done-codex`/],
    ];
    const mojibakeMarkers = /Portugu锚s|绠€|鍙戝|銇|鞐|韺|瓴|莽|谩|�/;

    for (const [relativePath, languageLabel, packageSentence] of localizedReadmes) {
      const readme = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');

      assert.match(readme, /# GET SHIT DONE CODEX/, relativePath);
      assert.match(readme, languageLabel, relativePath);
      assert.match(readme, /Codex-first/, relativePath);
      assert.match(readme, /npx @oisinwang\/get-shit-done-codex@latest/, relativePath);
      assert.match(readme, /img\.shields\.io\/npm\/v\/@oisinwang\/get-shit-done-codex/, relativePath);
      assert.match(readme, /img\.shields\.io\/npm\/dm\/@oisinwang\/get-shit-done-codex/, relativePath);
      assert.match(readme, /actions\/workflows\/test\.yml\/badge\.svg\?branch=codex\/bootstrap/, relativePath);
      assert.match(readme, /github\.com\/Oisinwang\/get-shit-done-codex/, relativePath);
      assert.match(readme, packageSentence, relativePath);
      assert.match(readme, /^\$gsd-new-project/m, relativePath);
      assert.match(readme, /\| `\$gsd-new-project/, relativePath);

      assert.doesNotMatch(readme, /img\.shields\.io\/npm\/v\/get-shit-done-codex/, relativePath);
      assert.doesNotMatch(readme, /github\.com\/get-shit-done-codex/, relativePath);
      assert.doesNotMatch(readme, /discord\.gg/, relativePath);
      assert.doesNotMatch(readme, /dexscreener/i, relativePath);
      assert.doesNotMatch(readme, /^\/gsd-/m, relativePath);
      assert.doesNotMatch(readme, /\| `\/gsd-/, relativePath);
      assert.doesNotMatch(readme, mojibakeMarkers, relativePath);
    }
  });

  test('localized documentation indexes present the current Codex fork without stale launch metadata', () => {
    const localizedDocIndexes = [
      'docs/pt-BR/README.md',
      'docs/zh-CN/README.md',
      'docs/ja-JP/README.md',
      'docs/ko-KR/README.md',
    ];

    const staleMarkers = [
      /npx get-shit-done-cc/i,
      /get-shit-done-cc\?style=for-the-badge/i,
      /discord\.gg/i,
      /dexscreener/i,
      /x\.com\/gsd_foundation/i,
      /v1\.32/i,
      /Claude Code by/i,
      /鈥|鉁|锚|绠|鏃|脗|莽|鞐|氍|銉|鞛/,
    ];

    for (const relativePath of localizedDocIndexes) {
      const readme = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');

      assert.match(readme, /GSD Codex/, relativePath);
      assert.match(readme, /Codex-first/, relativePath);
      assert.match(readme, /AGENTS\.md/, relativePath);
      assert.match(readme, /\.codex\//, relativePath);
      assert.match(readme, /\$gsd-\*/, relativePath);
      assert.match(readme, /npx @oisinwang\/get-shit-done-codex@latest/, relativePath);
      assert.match(readme, /CODEX-FORK\.md/, relativePath);

      for (const marker of staleMarkers) {
        assert.doesNotMatch(readme, marker, relativePath);
      }
    }
  });

  test('community health files point at this public fork', () => {
    const codeowners = fs.readFileSync(path.join(ROOT, '.github', 'CODEOWNERS'), 'utf8');
    const security = fs.readFileSync(path.join(ROOT, 'SECURITY.md'), 'utf8');
    const funding = fs.readFileSync(path.join(ROOT, '.github', 'FUNDING.yml'), 'utf8');
    const issueConfig = fs.readFileSync(path.join(ROOT, '.github', 'ISSUE_TEMPLATE', 'config.yml'), 'utf8');
    const installer = fs.readFileSync(path.join(ROOT, 'bin', 'install.js'), 'utf8');
    const legacyJoinCommand = fs.readFileSync(path.join(ROOT, 'commands', 'gsd', 'join-discord.md'), 'utf8');
    const helpWorkflow = fs.readFileSync(path.join(ROOT, 'get-shit-done', 'workflows', 'help.md'), 'utf8');

    assert.match(codeowners, /\*\s+@Oisinwang/);
    assert.doesNotMatch(codeowners, /glittercowboy/i);

    assert.match(security, /Oisinwang\/get-shit-done-codex\/security\/advisories\/new/);
    assert.match(security, /Codex-first fork/);
    assert.match(security, /Do not disclose vulnerability details in public issues/);
    assert.doesNotMatch(security, /security@gsd\.build/i);
    assert.doesNotMatch(security, /discord\.gg/i);
    assert.doesNotMatch(security, /glittercowboy/i);

    assert.match(funding, /github:\s*Oisinwang/);
    assert.doesNotMatch(funding, /glittercowboy/i);

    assert.match(issueConfig, /github\.com\/Oisinwang\/get-shit-done-codex\/discussions/);
    assert.match(issueConfig, /github\.com\/Oisinwang\/get-shit-done-codex\/security\/advisories\/new/);
    assert.doesNotMatch(issueConfig, /discord\.gg/i);

    assert.match(installer, /github\.com\/Oisinwang\/get-shit-done-codex\/discussions/);
    assert.doesNotMatch(installer, /discord\.gg/i);

    assert.match(legacyJoinCommand, /GitHub Discussions/);
    assert.match(legacyJoinCommand, /github\.com\/Oisinwang\/get-shit-done-codex\/discussions/);
    assert.doesNotMatch(legacyJoinCommand, /discord\.gg/i);

    assert.match(helpWorkflow, /GitHub Discussions/);
    assert.match(helpWorkflow, /github\.com\/Oisinwang\/get-shit-done-codex\/discussions/);
    assert.doesNotMatch(helpWorkflow, /discord\.gg/i);
  });

  test('GitHub contribution templates are Codex-first and ASCII-clean', () => {
    const templateFiles = [
      '.github/ISSUE_TEMPLATE/bug_report.yml',
      '.github/ISSUE_TEMPLATE/chore.yml',
      '.github/ISSUE_TEMPLATE/config.yml',
      '.github/ISSUE_TEMPLATE/docs_issue.yml',
      '.github/ISSUE_TEMPLATE/enhancement.yml',
      '.github/ISSUE_TEMPLATE/feature_request.yml',
      '.github/pull_request_template.md',
      '.github/PULL_REQUEST_TEMPLATE/fix.md',
      '.github/PULL_REQUEST_TEMPLATE/enhancement.md',
      '.github/PULL_REQUEST_TEMPLATE/feature.md',
    ];

    for (const relativePath of templateFiles) {
      const content = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
      assert.doesNotMatch(content, /[^\x00-\x7F]/, `${relativePath} contains non-ASCII text`);
    }

    const bugTemplate = fs.readFileSync(path.join(ROOT, '.github', 'ISSUE_TEMPLATE', 'bug_report.yml'), 'utf8');
    assert.match(bugTemplate, /npm list -g @oisinwang\/get-shit-done-codex/);
    assert.match(bugTemplate, /options:\r?\n        - Codex\r?\n        - Claude Code/);
    assert.match(bugTemplate, /Select runtime: Codex/);
    assert.match(bugTemplate, /Codex: `cat ~\/\.codex\/config\.toml`/);

    const featureTemplate = fs.readFileSync(path.join(ROOT, '.github', 'ISSUE_TEMPLATE', 'feature_request.yml'), 'utf8');
    assert.match(featureTemplate, /label: Codex\r?\n        - label: Claude Code/);

    const prTemplateFiles = [
      '.github/PULL_REQUEST_TEMPLATE/fix.md',
      '.github/PULL_REQUEST_TEMPLATE/enhancement.md',
      '.github/PULL_REQUEST_TEMPLATE/feature.md',
    ];

    for (const relativePath of prTemplateFiles) {
      const content = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
      assert.match(content, /### Runtimes tested[\s\S]*- \[ \] Codex[\s\S]*- \[ \] Claude Code/, relativePath);
    }
  });
});
