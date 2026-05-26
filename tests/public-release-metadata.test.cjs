'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { describe, test } = require('node:test');

const ROOT = path.join(__dirname, '..');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'));
}

function readPngMetadata(relativePath) {
  const buffer = fs.readFileSync(path.join(ROOT, relativePath));

  assert.deepEqual(
    [...buffer.subarray(0, 8)],
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    `${relativePath} should be a PNG file`,
  );
  assert.equal(buffer.toString('ascii', 12, 16), 'IHDR');

  return {
    height: buffer.readUInt32BE(20),
    size: buffer.byteLength,
    width: buffer.readUInt32BE(16),
  };
}

describe('public release metadata', () => {
  test('root npm package uses the public Codex fork scope', () => {
    const packageJson = readJson('package.json');
    const packageLock = readJson('package-lock.json');

    assert.equal(packageJson.name, '@oisinwang/get-shit-done-codex');
    assert.equal(
      packageJson.description,
      'Codex-first GSD: spec-driven development, context engineering, and verified AI coding workflows for OpenAI Codex.',
    );
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
      'ai-development',
      'agent-sdk',
      'agent-workflows',
      'agentic-coding',
      'automation',
      'cli',
      'coding-agents',
      'codex',
      'codex-cli',
      'context-engineering',
      'developer-experience',
      'developer-tools',
      'gsd',
      'meta-prompting',
      'openai-codex',
      'prompt-engineering',
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

  test('README gives a quick value scan before install instructions', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const topValueStart = readme.indexOf('Use GSD Codex when you need to:');
    const quickStartStart = readme.indexOf('## 60-Second Workflow');
    const atAGlanceStart = readme.indexOf('## At a Glance');
    const gettingStartedStart = readme.indexOf('## Getting Started');

    assert.ok(topValueStart > -1, 'README should include a near-top value hook');
    assert.ok(
      topValueStart < quickStartStart,
      'near-top value hook should appear before the first workflow details',
    );

    const topValue = readme.slice(topValueStart, quickStartStart);

    assert.match(topValue, /fuzzy goal into a repo-local spec/);
    assert.match(topValue, /context resets/);
    assert.match(topValue, /verification notes/);

    assert.ok(atAGlanceStart > -1, 'README should include a quick value scan');
    assert.ok(
      atAGlanceStart < gettingStartedStart,
      'quick value scan should appear before install instructions',
    );

    const atAGlance = readme.slice(atAGlanceStart, gettingStartedStart);

    assert.match(atAGlance, /model loses the original goal/);
    assert.match(atAGlance, /Plans quietly drop requirements/);
    assert.match(atAGlance, /Parallel agents leave messy changes/);
    assert.match(atAGlance, /You need to stop and resume later/);
    assert.match(atAGlance, /PROJECT\.md/);
    assert.match(atAGlance, /\$gsd-pause-work/);
  });

  test('README shows a near-top copy-pastable first workflow', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const quickStartStart = readme.indexOf('## 60-Second Workflow');
    const whyStart = readme.indexOf('## Why This Fork Exists');

    assert.ok(quickStartStart > -1, 'README should include a quick first workflow');
    assert.ok(quickStartStart < whyStart, 'quick first workflow should appear before deeper explanation');

    const quickStart = readme.slice(quickStartStart, whyStart);

    assert.match(quickStart, /npx @oisinwang\/get-shit-done-codex@latest/);
    assert.match(quickStart, /\$gsd-new-project/);
    assert.match(quickStart, /\$gsd-next/);
    assert.match(quickStart, /PROJECT\.md/);
    assert.match(quickStart, /ROADMAP\.md/);
    assert.match(quickStart, /STATE\.md/);
    assert.match(quickStart, /phase artifacts/);
  });

  test('public demo guide shows what the first workflow produces', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const demoPath = path.join(ROOT, 'docs', 'DEMO.md');

    assert.equal(fs.existsSync(demoPath), true, 'docs/DEMO.md should exist');

    const demo = fs.readFileSync(demoPath, 'utf8');

    assert.match(readme, /\[Demo\]\(docs\/DEMO\.md\)/);
    assert.match(docsReadme, /\[Demo\]\(DEMO\.md\)/);
    assert.match(demo, /# Demo/);
    assert.match(demo, /60-second workflow/);
    assert.match(demo, /npx @oisinwang\/get-shit-done-codex@latest/);
    assert.match(demo, /\$gsd-new-project/);
    assert.match(demo, /\$gsd-next/);
    assert.match(demo, /PROJECT\.md/);
    assert.match(demo, /ROADMAP\.md/);
    assert.match(demo, /STATE\.md/);
    assert.match(demo, /Example output/);
    assert.match(demo, /PROJECT\.md excerpt/);
    assert.match(demo, /ROADMAP\.md excerpt/);
    assert.match(demo, /Goal/);
    assert.match(demo, /Phase 1/);
    assert.match(demo, /phase artifacts/);
    assert.match(demo, /resume/);
    assert.match(demo, /verification evidence/);
    assert.doesNotMatch(demo, /[^\x00-\x7F]/, 'docs/DEMO.md should stay ASCII-clean');
  });

  test('public evaluation checklist gives visitors a safe trial path', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const evaluatePath = path.join(ROOT, 'docs', 'EVALUATE.md');

    assert.equal(fs.existsSync(evaluatePath), true, 'docs/EVALUATE.md should exist');

    const evaluate = fs.readFileSync(evaluatePath, 'utf8');

    assert.match(readme, /\[Evaluate\]\(docs\/EVALUATE\.md\)/);
    assert.match(docsReadme, /\[Evaluate\]\(EVALUATE\.md\)/);
    assert.match(evaluate, /# Evaluate/);
    assert.match(evaluate, /10-minute check/);
    assert.match(evaluate, /safe trial/);
    assert.match(evaluate, /npx @oisinwang\/get-shit-done-codex@latest --codex --local/);
    assert.match(evaluate, /\$gsd-new-project --auto/);
    assert.match(evaluate, /\$gsd-next/);
    assert.match(evaluate, /Expected changed paths/);
    assert.match(evaluate, /\.planning\//);
    assert.match(evaluate, /Pass signals/);
    assert.match(evaluate, /Fail signals/);
    assert.match(evaluate, /cleanup/);
    assert.match(evaluate, /git status/);
    assert.doesNotMatch(evaluate, /[^\x00-\x7F]/, 'docs/EVALUATE.md should stay ASCII-clean');
  });

  test('public examples help first-time users choose a workflow', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const examplesPath = path.join(ROOT, 'docs', 'EXAMPLES.md');

    assert.equal(fs.existsSync(examplesPath), true, 'docs/EXAMPLES.md should exist');

    const examples = fs.readFileSync(examplesPath, 'utf8');
    const pickWorkflowStart = readme.indexOf('## Pick a Workflow');
    const gettingStartedStart = readme.indexOf('## Getting Started');

    assert.ok(pickWorkflowStart > -1, 'README should include a workflow chooser');
    assert.ok(
      pickWorkflowStart < gettingStartedStart,
      'workflow chooser should appear before install details',
    );

    assert.match(readme, /\[Examples\]\(docs\/EXAMPLES\.md\)/);
    assert.match(docsReadme, /\[Examples\]\(EXAMPLES\.md\)/);
    assert.match(examples, /# Examples/);
    assert.match(examples, /## Existing Repo Safe Trial/);
    assert.match(examples, /\$gsd-map-codebase/);
    assert.match(examples, /\$gsd-new-project --auto/);
    assert.match(examples, /\$gsd-discuss-phase 1/);
    assert.match(examples, /source code, tests, and a README/);
    assert.match(examples, /`PROJECT\.md`, `ROADMAP\.md`, `STATE\.md`, and codebase intelligence/);

    const existingRepoStart = examples.indexOf('## Existing Repo Safe Trial');
    const existingRepoEnd = examples.indexOf('## Small Fix With Guardrails');
    const existingRepoSection = examples.slice(existingRepoStart, existingRepoEnd);
    const existingRepoCommands = existingRepoSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(existingRepoCommands, 'existing repo example should include a bash command block');
    assert.ok(
      existingRepoCommands.length >= 3 && existingRepoCommands.length <= 5,
      'existing repo example should stay within 3-5 commands',
    );

    for (const marker of [
      '$gsd-new-project --auto',
      '$gsd-map-codebase',
      '$gsd-fast',
      '$gsd-resume-work',
      '$gsd-spike',
      '$gsd-sketch',
    ]) {
      assert.match(readme, new RegExp(marker.replace('$', '\\$')));
      assert.match(examples, new RegExp(marker.replace('$', '\\$')));
    }

    assert.doesNotMatch(examples, /[^\x00-\x7F]/, 'docs/EXAMPLES.md should stay ASCII-clean');
  });

  test('public prompt recipes give Codex users copy-pastable starter prompts', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const promptsPath = path.join(ROOT, 'docs', 'PROMPTS.md');

    assert.equal(fs.existsSync(promptsPath), true, 'docs/PROMPTS.md should exist');

    const prompts = fs.readFileSync(promptsPath, 'utf8');

    assert.match(readme, /\[Prompt Recipes\]\(docs\/PROMPTS\.md\)/);
    assert.match(docsReadme, /\[Prompt Recipes\]\(PROMPTS\.md\)/);
    assert.match(prompts, /# Prompt Recipes/);
    assert.match(prompts, /Paste these into Codex after installing GSD Codex/);
    assert.match(prompts, /## Start A New Project/);
    assert.match(prompts, /## Existing Repository/);
    assert.match(prompts, /## Small Fix/);
    assert.match(prompts, /## Resume Work/);
    assert.match(prompts, /## Audit And Fix/);
    assert.match(prompts, /\$gsd-new-project --auto/);
    assert.match(prompts, /\$gsd-map-codebase/);
    assert.match(prompts, /\$gsd-fast/);
    assert.match(prompts, /\$gsd-resume-work/);
    assert.match(prompts, /\$gsd-progress --forensic/);
    assert.match(prompts, /\$gsd-audit-fix/);
    assert.match(prompts, /\.planning\//);
    assert.match(prompts, /verification evidence/);
    assert.match(prompts, /Do not skip verification/);
    assert.doesNotMatch(prompts, /[^\x00-\x7F]/, 'docs/PROMPTS.md should stay ASCII-clean');
  });

  test('public FAQ answers common adoption objections', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const faqPath = path.join(ROOT, 'docs', 'FAQ.md');

    assert.equal(fs.existsSync(faqPath), true, 'docs/FAQ.md should exist');

    const faq = fs.readFileSync(faqPath, 'utf8');

    assert.match(readme, /\[FAQ\]\(docs\/FAQ\.md\)/);
    assert.match(docsReadme, /\[FAQ\]\(FAQ\.md\)/);
    assert.match(faq, /# FAQ/);
    assert.match(faq, /Is this just a prompt pack/);
    assert.match(faq, /Does it work on an existing repository/);
    assert.match(faq, /Does this require Claude Code/);
    assert.match(faq, /What files does it create/);
    assert.match(faq, /Will it edit code automatically/);
    assert.match(faq, /Can I uninstall it/);
    assert.match(faq, /Do I have to commit `.planning\/`/);
    assert.match(faq, /Can I use it with GitHub Projects, Linear, or Jira/);
    assert.match(faq, /Can I try it without touching global Codex config/);
    assert.match(faq, /When should I not use it/);
    assert.match(faq, /AGENTS\.md/);
    assert.match(faq, /\.codex\//);
    assert.match(faq, /planning context and execution evidence/);
    assert.match(faq, /team-facing coordination layer/);
    assert.match(faq, /\[Examples\]\(EXAMPLES\.md\)/);
    assert.match(faq, /--local/);
    assert.match(faq, /\$gsd-map-codebase/);
    assert.match(faq, /\$gsd-fast/);
    assert.doesNotMatch(faq, /[^\x00-\x7F]/, 'docs/FAQ.md should stay ASCII-clean');
  });

  test('comparison guide helps evaluators decide when to use the project', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const comparisonPath = path.join(ROOT, 'docs', 'COMPARISON.md');

    assert.equal(fs.existsSync(comparisonPath), true, 'docs/COMPARISON.md should exist');

    const comparison = fs.readFileSync(comparisonPath, 'utf8');

    assert.match(readme, /\[Comparison\]\(docs\/COMPARISON\.md\)/);
    assert.match(docsReadme, /\[Comparison\]\(COMPARISON\.md\)/);
    assert.match(comparison, /# Comparison/);
    assert.match(comparison, /Raw Codex chat/);
    assert.match(comparison, /prompt pack/);
    assert.match(comparison, /task manager/);
    assert.match(comparison, /CI-only workflow/);
    assert.match(comparison, /Choose GSD Codex when/);
    assert.match(comparison, /Do not use GSD Codex when/);
    assert.match(comparison, /AGENTS\.md/);
    assert.match(comparison, /\.planning\//);
    assert.doesNotMatch(comparison, /[^\x00-\x7F]/, 'docs/COMPARISON.md should stay ASCII-clean');
  });

  test('public roadmap shows active direction and contributor-sized work', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const roadmapPath = path.join(ROOT, 'docs', 'ROADMAP.md');

    assert.equal(fs.existsSync(roadmapPath), true, 'docs/ROADMAP.md should exist');

    const roadmap = fs.readFileSync(roadmapPath, 'utf8');

    assert.match(readme, /\[Roadmap\]\(docs\/ROADMAP\.md\)/);
    assert.match(docsReadme, /\[Roadmap\]\(ROADMAP\.md\)/);
    assert.match(roadmap, /# Roadmap/);
    assert.match(roadmap, /Current focus/);
    assert.match(roadmap, /Near-term priorities/);
    assert.match(roadmap, /Contributor-sized work/);
    assert.match(roadmap, /Manual maintainer actions/);
    assert.match(roadmap, /social-preview\.png/);
    assert.match(roadmap, /NPM_TOKEN/);
    assert.match(roadmap, /good first issue/);
    assert.match(roadmap, /Codex-first/);
    assert.doesNotMatch(roadmap, /[^\x00-\x7F]/, 'docs/ROADMAP.md should stay ASCII-clean');
  });

  test('release checklist documents npm publish recovery', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const roadmap = fs.readFileSync(path.join(ROOT, 'docs', 'ROADMAP.md'), 'utf8');
    const releasePath = path.join(ROOT, 'docs', 'RELEASE.md');

    assert.equal(fs.existsSync(releasePath), true, 'docs/RELEASE.md should exist');

    const release = fs.readFileSync(releasePath, 'utf8');

    assert.match(readme, /\[Release Checklist\]\(docs\/RELEASE\.md\)/);
    assert.match(docsReadme, /\[Release Checklist\]\(RELEASE\.md\)/);
    assert.match(roadmap, /\[Release Checklist\]\(RELEASE\.md\)/);
    assert.match(release, /# Release Checklist/);
    assert.match(release, /NPM_TOKEN/);
    assert.match(release, /npm-publish/);
    assert.match(release, /Hotfix Release/);
    assert.match(release, /gh workflow run hotfix\.yml/);
    assert.match(release, /dry_run=false/);
    assert.match(release, /npm\.cmd view @oisinwang\/get-shit-done-codex version/);
    assert.match(release, /npx @oisinwang\/get-shit-done-codex@latest --codex/);
    assert.match(release, /Issue #1/);
    assert.doesNotMatch(release, /[^\x00-\x7F]/, 'docs/RELEASE.md should stay ASCII-clean');
  });

  test('public docs expose community and contribution entry points', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const goodFirstIssuesUrl =
      'https://github.com/Oisinwang/get-shit-done-codex/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22';
    const discussionsUrl = 'https://github.com/Oisinwang/get-shit-done-codex/discussions';

    assert.match(readme, /\[Contributing\]\(CONTRIBUTING\.md\)/);
    assert.match(readme, new RegExp(goodFirstIssuesUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(readme, new RegExp(discussionsUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(docsReadme, new RegExp(goodFirstIssuesUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(docsReadme, new RegExp(discussionsUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  });

  test('public troubleshooting guide covers Codex install recovery', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const troubleshootingPath = path.join(ROOT, 'docs', 'TROUBLESHOOTING.md');

    assert.equal(
      fs.existsSync(troubleshootingPath),
      true,
      'docs/TROUBLESHOOTING.md should exist',
    );

    const troubleshooting = fs.readFileSync(troubleshootingPath, 'utf8');

    assert.match(readme, /\[Troubleshooting\]\(docs\/TROUBLESHOOTING\.md\)/);
    assert.match(docsReadme, /\[Troubleshooting\]\(TROUBLESHOOTING\.md\)/);
    assert.match(troubleshooting, /# Troubleshooting/);
    assert.match(troubleshooting, /config\.toml/);
    assert.match(troubleshooting, /\[\[hooks\]\]/);
    assert.match(troubleshooting, /\[\[hooks\.SessionStart\]\]/);
    assert.match(troubleshooting, /\[features\]\.hooks = true/);
    assert.match(troubleshooting, /npx @oisinwang\/get-shit-done-codex@latest --codex/);
    assert.match(troubleshooting, /PowerShell/);
    assert.match(troubleshooting, /Windows PowerShell first-pass diagnostics/);
    assert.match(troubleshooting, /node --version/);
    assert.match(troubleshooting, /npm --version/);
    assert.match(troubleshooting, /npx --version/);
    assert.match(troubleshooting, /npm view @oisinwang\/get-shit-done-codex version/);
    assert.match(troubleshooting, /Get-ChildItem "\$env:USERPROFILE\\\.codex" -Force/);
    assert.match(troubleshooting, /Test-Path "\.\\\.codex"/);
    assert.match(troubleshooting, /Do not delete or rewrite files before reading this output/);
    assert.doesNotMatch(
      troubleshooting,
      /[^\x00-\x7F]/,
      'docs/TROUBLESHOOTING.md should stay ASCII-clean',
    );
  });

  test('promotion assets include a GitHub social preview setup', () => {
    const previewPath = path.join(ROOT, 'assets', 'social-preview.png');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const promotion = fs.readFileSync(path.join(ROOT, 'docs', 'PROMOTION.md'), 'utf8');

    assert.equal(fs.existsSync(previewPath), true, 'assets/social-preview.png should exist');

    const preview = readPngMetadata('assets/social-preview.png');

    assert.equal(preview.width, 1280);
    assert.equal(preview.height, 640);
    assert.ok(preview.size < 1_000_000, 'social preview image should stay under 1 MB');

    assert.match(promotion, /assets\/social-preview\.png/);
    assert.match(docsReadme, /\[Promotion Assets\]\(PROMOTION\.md\)/);
    assert.match(promotion, /Settings > General > Social preview/);
    assert.match(promotion, /Upload an image/);
    assert.match(
      promotion,
      /docs\.github\.com\/en\/repositories\/managing-your-repositorys-settings-and-features\/customizing-your-repository\/customizing-your-repositorys-social-media-preview/,
    );
  });

  test('README embeds the social preview before workflow details', () => {
    const previewPath = path.join(ROOT, 'assets', 'social-preview.png');
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const previewEmbed = '![GSD Codex preview](assets/social-preview.png)';
    const embedIndex = readme.indexOf(previewEmbed);
    const workflowIndex = readme.indexOf('## 60-Second Workflow');

    assert.equal(fs.existsSync(previewPath), true, 'assets/social-preview.png should exist');
    assert.ok(embedIndex > -1, 'README should embed the social preview asset');
    assert.ok(
      embedIndex < workflowIndex,
      'README social preview should appear before workflow details',
    );
  });

  test('root npm package ships README visual assets', () => {
    const packageJson = readJson('package.json');
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const readmeAssetPaths = [...readme.matchAll(/!\[[^\]]*\]\((assets\/[^)]+)\)/g)].map(
      (match) => match[1],
    );

    assert.deepEqual(readmeAssetPaths, ['assets/social-preview.png', 'assets/terminal.svg']);

    for (const assetPath of readmeAssetPaths) {
      assert.ok(
        packageJson.files.includes(assetPath),
        `package.json files should include ${assetPath}`,
      );
    }
  });

  test('root npm package ships public docs linked from README', () => {
    const packageJson = readJson('package.json');
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const readmeDocPaths = [
      ...new Set(
        [...readme.matchAll(/\]\((docs\/[^)#]+\.md)(?:#[^)]+)?\)/g)].map(
          (match) => match[1],
        ),
      ),
    ];

    assert.ok(readmeDocPaths.length > 0, 'README should link to public docs');
    assert.ok(packageJson.files.includes('docs'), 'npm package should include linked public docs');

    for (const docPath of readmeDocPaths) {
      assert.equal(fs.existsSync(path.join(ROOT, docPath)), true, `${docPath} should exist`);
    }
  });

  test('sdk package uses the same public npm scope', () => {
    const sdkPackageJson = readJson('sdk/package.json');
    const sdkPackageLock = readJson('sdk/package-lock.json');

    assert.equal(sdkPackageJson.name, '@oisinwang/get-shit-done-codex-sdk');
    assert.equal(
      sdkPackageJson.description,
      'GSD Codex SDK for running spec-driven plans and verified AI coding workflows from agent applications.',
    );
    assert.equal(sdkPackageLock.name, '@oisinwang/get-shit-done-codex-sdk');
    assert.equal(sdkPackageLock.packages[''].name, '@oisinwang/get-shit-done-codex-sdk');
    assert.equal(sdkPackageJson.bin['gsd-sdk'], 'dist/cli.js');
    assert.deepEqual(sdkPackageJson.files, ['dist', 'prompts']);
    assert.equal(sdkPackageJson.scripts.prepublishOnly, 'npm run build');
    assert.equal(sdkPackageJson.publishConfig.access, 'public');

    const requiredSdkKeywords = [
      'codex',
      'openai-codex',
      'ai-agents',
      'agentic-coding',
      'agent-sdk',
      'automation',
      'context-engineering',
      'developer-experience',
      'developer-tools',
      'gsd',
      'prompt-engineering',
      'sdk',
      'spec-driven-development',
      'workflow-automation',
    ];

    for (const keyword of requiredSdkKeywords) {
      assert.ok(sdkPackageJson.keywords.includes(keyword), `sdk/package.json keywords missing ${keyword}`);
    }
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

  test('CHANGELOG current compare link points at the public Codex fork', () => {
    const packageJson = readJson('package.json');
    const changelog = fs.readFileSync(path.join(ROOT, 'CHANGELOG.md'), 'utf8');
    const unreleasedLink = changelog.match(/^\[Unreleased\]: .+$/m);
    const unreleasedSection = changelog.slice(
      changelog.indexOf('## [Unreleased]'),
      changelog.indexOf('## [1.37.1]'),
    );

    assert.ok(unreleasedLink, 'CHANGELOG should define an [Unreleased] compare link');
    assert.equal(
      unreleasedLink[0],
      `[Unreleased]: https://github.com/Oisinwang/get-shit-done-codex/compare/v${packageJson.version}...HEAD`,
    );
    assert.match(unreleasedSection, /Public demo guide/);
    assert.match(unreleasedSection, /docs\/DEMO\.md/);
    assert.match(unreleasedSection, /Evaluation checklist/);
    assert.match(unreleasedSection, /docs\/EVALUATE\.md/);
    assert.match(unreleasedSection, /README value hook/);
    assert.match(unreleasedSection, /Security policy exposure/);
    assert.match(unreleasedSection, /SECURITY\.md/);
    assert.match(unreleasedSection, /Existing repo safe trial/);
    assert.match(unreleasedSection, /docs\/EXAMPLES\.md/);
    assert.match(unreleasedSection, /Simplified Chinese comparison guide/);
    assert.match(unreleasedSection, /docs\/zh-CN\/COMPARISON\.md/);
    assert.match(unreleasedSection, /NPM package docs surface/);
    assert.match(unreleasedSection, /published README docs links/);
    assert.match(unreleasedSection, /Prompt recipe guide/);
    assert.match(unreleasedSection, /docs\/PROMPTS\.md/);
    assert.match(unreleasedSection, /Windows PowerShell diagnostics/);
    assert.match(unreleasedSection, /docs\/TROUBLESHOOTING\.md/);
    assert.match(unreleasedSection, /Simplified Chinese prompt recipes/);
    assert.match(unreleasedSection, /docs\/zh-CN\/PROMPTS\.md/);
    assert.match(unreleasedSection, /Japanese prompt recipes/);
    assert.match(unreleasedSection, /docs\/ja-JP\/PROMPTS\.md/);
    assert.match(unreleasedSection, /Release checklist/);
    assert.match(unreleasedSection, /docs\/RELEASE\.md/);
  });

  test('README star history embeds use the public owner and repository name', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');

    assert.match(readme, /star-history\.com\/#Oisinwang\/get-shit-done-codex&Date/);
    assert.match(readme, /repos=Oisinwang\/get-shit-done-codex&type=Date/);
    assert.doesNotMatch(readme, /repos=get-shit-done-codex&type=Date/);
  });

  test('localized README star history embeds use the public owner and repository name', () => {
    const localizedReadmes = [
      'README.pt-BR.md',
      'README.zh-CN.md',
      'README.ja-JP.md',
      'README.ko-KR.md',
    ];

    for (const relativePath of localizedReadmes) {
      const readme = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');

      assert.match(readme, /star-history\.com\/#Oisinwang\/get-shit-done-codex&Date/, relativePath);
      assert.match(readme, /repos=Oisinwang\/get-shit-done-codex&type=Date/, relativePath);
      assert.doesNotMatch(readme, /repos=get-shit-done-codex&type=Date/, relativePath);
    }
  });

  test('high-visibility English public files stay ASCII-clean', () => {
    const asciiFiles = [
      'CODE_OF_CONDUCT.md',
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

  test('localized README community and lineage wording stays current', () => {
    const localizedReadmes = [
      'README.pt-BR.md',
      'README.zh-CN.md',
      'README.ja-JP.md',
      'README.ko-KR.md',
    ];

    for (const relativePath of localizedReadmes) {
      const readme = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');

      assert.match(readme, /GitHub Discussions/, relativePath);
      assert.doesNotMatch(readme, /GSD Discord/, relativePath);
      assert.doesNotMatch(readme, /Community Ports/, relativePath);
      assert.doesNotMatch(
        readme,
        /OpenCode[\s\S]{0,120}Codex[\s\S]{0,120}@oisinwang\/get-shit-done-codex/,
        relativePath,
      );
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

  test('Simplified Chinese comparison guide mirrors public comparison tradeoffs', () => {
    const zhDocsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'zh-CN', 'README.md'), 'utf8');
    const zhComparisonPath = path.join(ROOT, 'docs', 'zh-CN', 'COMPARISON.md');

    assert.equal(fs.existsSync(zhComparisonPath), true, 'docs/zh-CN/COMPARISON.md should exist');

    const zhComparison = fs.readFileSync(zhComparisonPath, 'utf8');

    assert.match(zhDocsReadme, /\[对比指南\]\(COMPARISON\.md\)/);
    assert.match(zhComparison, /# 对比指南/);
    assert.match(zhComparison, /原始 Codex chat/);
    assert.match(zhComparison, /prompt pack/);
    assert.match(zhComparison, /task manager/);
    assert.match(zhComparison, /CI-only workflow/);
    assert.match(zhComparison, /完整企业流程/);
    assert.match(zhComparison, /选择 GSD Codex/);
    assert.match(zhComparison, /不要使用 GSD Codex/);
    assert.match(zhComparison, /不是 Codex 本身的替代品/);
    assert.match(zhComparison, /AGENTS\.md/);
    assert.match(zhComparison, /\.codex\//);
    assert.match(zhComparison, /\.planning\//);
    assert.match(zhComparison, /\$gsd-\*/);
  });

  test('Simplified Chinese prompt recipes mirror public starter prompts', () => {
    const zhDocsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'zh-CN', 'README.md'), 'utf8');
    const zhPromptsPath = path.join(ROOT, 'docs', 'zh-CN', 'PROMPTS.md');

    assert.equal(fs.existsSync(zhPromptsPath), true, 'docs/zh-CN/PROMPTS.md should exist');

    const zhPrompts = fs.readFileSync(zhPromptsPath, 'utf8');

    assert.match(zhDocsReadme, /\[提示词配方\]\(PROMPTS\.md\)/);
    assert.match(zhPrompts, /# 提示词配方/);
    assert.match(zhPrompts, /粘贴到 Codex/);
    assert.match(zhPrompts, /## 启动新项目/);
    assert.match(zhPrompts, /## 现有仓库/);
    assert.match(zhPrompts, /## 小修复/);
    assert.match(zhPrompts, /## 恢复工作/);
    assert.match(zhPrompts, /## 审计并修复/);
    assert.match(zhPrompts, /\$gsd-new-project --auto/);
    assert.match(zhPrompts, /\$gsd-map-codebase/);
    assert.match(zhPrompts, /\$gsd-fast/);
    assert.match(zhPrompts, /\$gsd-resume-work/);
    assert.match(zhPrompts, /\$gsd-progress --forensic/);
    assert.match(zhPrompts, /\$gsd-audit-fix/);
    assert.match(zhPrompts, /\.planning\//);
    assert.match(zhPrompts, /不要跳过验证/);
  });

  test('Japanese prompt recipes mirror public starter prompts', () => {
    const jaDocsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'ja-JP', 'README.md'), 'utf8');
    const jaPromptsPath = path.join(ROOT, 'docs', 'ja-JP', 'PROMPTS.md');

    assert.equal(fs.existsSync(jaPromptsPath), true, 'docs/ja-JP/PROMPTS.md should exist');

    const jaPrompts = fs.readFileSync(jaPromptsPath, 'utf8');

    assert.match(jaDocsReadme, /\[プロンプトレシピ\]\(PROMPTS\.md\)/);
    assert.match(jaPrompts, /# プロンプトレシピ/);
    assert.match(jaPrompts, /Codex に貼り付け/);
    assert.match(jaPrompts, /## 新しいプロジェクトを開始する/);
    assert.match(jaPrompts, /## 既存リポジトリ/);
    assert.match(jaPrompts, /## 小さな修正/);
    assert.match(jaPrompts, /## 作業を再開する/);
    assert.match(jaPrompts, /## 監査して修正する/);
    assert.match(jaPrompts, /\$gsd-new-project --auto/);
    assert.match(jaPrompts, /\$gsd-map-codebase/);
    assert.match(jaPrompts, /\$gsd-fast/);
    assert.match(jaPrompts, /\$gsd-resume-work/);
    assert.match(jaPrompts, /\$gsd-progress --forensic/);
    assert.match(jaPrompts, /\$gsd-audit-fix/);
    assert.match(jaPrompts, /\.planning\//);
    assert.match(jaPrompts, /検証を省略しない/);
  });

  test('community health files point at this public fork', () => {
    const packageJson = readJson('package.json');
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const contributing = fs.readFileSync(path.join(ROOT, 'CONTRIBUTING.md'), 'utf8');
    const codeowners = fs.readFileSync(path.join(ROOT, '.github', 'CODEOWNERS'), 'utf8');
    const codeOfConduct = fs.readFileSync(path.join(ROOT, 'CODE_OF_CONDUCT.md'), 'utf8');
    const security = fs.readFileSync(path.join(ROOT, 'SECURITY.md'), 'utf8');
    const funding = fs.readFileSync(path.join(ROOT, '.github', 'FUNDING.yml'), 'utf8');
    const issueConfig = fs.readFileSync(path.join(ROOT, '.github', 'ISSUE_TEMPLATE', 'config.yml'), 'utf8');
    const installer = fs.readFileSync(path.join(ROOT, 'bin', 'install.js'), 'utf8');
    const legacyJoinCommand = fs.readFileSync(path.join(ROOT, 'commands', 'gsd', 'join-discord.md'), 'utf8');
    const helpWorkflow = fs.readFileSync(path.join(ROOT, 'get-shit-done', 'workflows', 'help.md'), 'utf8');

    assert.match(readme, /CODE_OF_CONDUCT\.md/);
    assert.match(readme, /\[Security\]\(SECURITY\.md\)/);
    assert.match(contributing, /CODE_OF_CONDUCT\.md/);
    assert.ok(packageJson.files.includes('SECURITY.md'), 'npm package should include SECURITY.md');

    assert.match(codeowners, /\*\s+@Oisinwang/);
    assert.doesNotMatch(codeowners, /glittercowboy/i);

    assert.match(codeOfConduct, /Contributor Covenant Code of Conduct/);
    assert.match(codeOfConduct, /Codex-first fork/);
    assert.match(codeOfConduct, /I need to report a conduct issue privately/);
    assert.doesNotMatch(codeOfConduct, /INSERT CONTACT METHOD/);
    assert.doesNotMatch(codeOfConduct, /discord\.gg/i);

    assert.match(security, /Oisinwang\/get-shit-done-codex\/security\/advisories\/new/);
    assert.match(security, /Codex-first fork/);
    assert.match(security, /Do not disclose vulnerability details in public issues/);
    assert.doesNotMatch(security, /security@gsd\.build/i);
    assert.doesNotMatch(security, /discord\.gg/i);
    assert.doesNotMatch(security, /glittercowboy/i);

    assert.match(funding, /github:\s*Oisinwang/);
    assert.doesNotMatch(funding, /glittercowboy/i);

    assert.match(issueConfig, /github\.com\/Oisinwang\/get-shit-done-codex\/discussions/);
    assert.match(issueConfig, /CODE_OF_CONDUCT\.md/);
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

  test('public support resources route users to the right channel', () => {
    const packageJson = readJson('package.json');
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const supportPath = path.join(ROOT, 'SUPPORT.md');

    assert.equal(fs.existsSync(supportPath), true, 'repository should have a root SUPPORT.md');
    assert.ok(packageJson.files.includes('SUPPORT.md'), 'npm package should include SUPPORT.md');

    const support = fs.readFileSync(supportPath, 'utf8');

    assert.match(readme, /\[Support\]\(SUPPORT\.md\)/);
    assert.match(docsReadme, /\[Support\]\(\.\.\/SUPPORT\.md\)/);

    assert.match(support, /# Support/);
    assert.match(support, /GitHub Discussions/);
    assert.match(support, /https:\/\/github\.com\/Oisinwang\/get-shit-done-codex\/discussions/);
    assert.match(support, /Bug reports/);
    assert.match(support, /https:\/\/github\.com\/Oisinwang\/get-shit-done-codex\/issues\/new\/choose/);
    assert.match(support, /Security vulnerabilities/);
    assert.match(support, /https:\/\/github\.com\/Oisinwang\/get-shit-done-codex\/security\/advisories\/new/);
    assert.doesNotMatch(support, /discord\.gg/i);
    assert.doesNotMatch(support, /security@gsd\.build/i);
    assert.doesNotMatch(support, /[^\x00-\x7F]/, 'SUPPORT.md should stay ASCII-clean');
  });

  test('public community wording points users at GitHub Discussions', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const userGuide = fs.readFileSync(path.join(ROOT, 'docs', 'USER-GUIDE.md'), 'utf8');

    assert.match(readme, /\| `\$gsd-join-discord` \| Open GitHub Discussions community \|/);
    assert.match(userGuide, /\| `\$gsd-join-discord` \| Open GitHub Discussions community \|/);
    assert.doesNotMatch(readme, /Join the GSD Discord community/);
    assert.doesNotMatch(userGuide, /Open Discord community invite/);
  });

  test('README keeps Codex primary instead of presenting it as a community port', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const lineageStart = readme.indexOf('## Multi-Runtime Lineage');

    assert.ok(lineageStart > -1, 'README should include multi-runtime lineage section');
    const communitySection = readme.slice(lineageStart);
    assert.match(communitySection, /Codex is the primary runtime/);
    assert.match(communitySection, /Compatibility installs are available/);
    assert.doesNotMatch(communitySection, /and Codex are now natively supported/);
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

    const docsTemplate = fs.readFileSync(path.join(ROOT, '.github', 'ISSUE_TEMPLATE', 'docs_issue.yml'), 'utf8');
    assert.match(docsTemplate, /label: Affected docs area/);
    assert.match(docsTemplate, /Codex-first fork contract/);
    assert.match(docsTemplate, /Install or npm release docs/);
    assert.match(docsTemplate, /Localized docs/);
    assert.match(docsTemplate, /Checked docs\/README\.md/);
    assert.match(docsTemplate, /Searched existing issues/);
    assert.match(docsTemplate, /npx @oisinwang\/get-shit-done-codex@latest/);

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
