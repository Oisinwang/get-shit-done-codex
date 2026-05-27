'use strict';

const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
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
    assert.equal(packageJson.scripts['demo:safe-trial'], 'node scripts/safe-trial-demo.cjs');
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
    assert.match(readme, /\[Demo Media Checklist\]\(docs\/DEMO\.md#demo-media-checklist\)/);
    assert.match(docsReadme, /\[Demo\]\(DEMO\.md\)/);
    assert.match(docsReadme, /\[Demo Media Checklist\]\(DEMO\.md#demo-media-checklist\)/);
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
    assert.match(demo, /## Demo Media Checklist/);
    assert.match(demo, /Record these steps in order/);
    assert.match(demo, /1\. Open a disposable branch or throwaway repository/);
    assert.match(demo, /2\. Run `npx @oisinwang\/get-shit-done-codex@latest --codex --local`/);
    assert.match(demo, /3\. Run `\$gsd-new-project --auto` with a small visible goal/);
    assert.match(demo, /4\. Run `\$gsd-next`/);
    assert.match(demo, /5\. Show `PROJECT\.md`, `ROADMAP\.md`, `STATE\.md`, and `.planning\/phases\/`/);
    assert.match(demo, /6\. End on `git status --short`/);
    assert.match(demo, /Redact local paths, usernames, private repository names, tokens, email addresses, and machine hostnames/);
    assert.match(demo, /Do not require a specific recording tool/);
    assert.match(demo, /GIF, short MP4, or annotated screenshot sequence/);
    assert.match(demo, /`assets\/social-preview\.png` is not a substitute for workflow demo media/);
    assert.match(readme, /Finished demo link: place a published `60-second GSD Codex demo` link near this terminal preview/);
    assert.match(demo, /When the recording is ready, place the finished demo link under this section and mirror it near the README terminal preview/);
    assert.match(demo, /Use link text such as `60-second GSD Codex demo`/);
    assert.match(demo, /Caption it with the command flow, generated artifacts, and `git status --short` evidence/);
    assert.match(demo, /Link the finished demo from `README\.md` near the terminal preview/);
    assert.match(demo, /Link it from this page under `## 60-second workflow`/);
    assert.doesNotMatch(demo, /[^\x00-\x7F]/, 'docs/DEMO.md should stay ASCII-clean');
  });

  test('public evaluation checklist gives visitors a safe trial path', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const evaluatePath = path.join(ROOT, 'docs', 'EVALUATE.md');

    assert.equal(fs.existsSync(evaluatePath), true, 'docs/EVALUATE.md should exist');

    const evaluate = fs.readFileSync(evaluatePath, 'utf8');

    assert.match(readme, /\[Evaluate\]\(docs\/EVALUATE\.md\)/);
    assert.match(readme, /## Safe 10-Minute Trial/);
    assert.match(readme, /Use this path when you want to try GSD without changing global Codex config/);
    assert.match(readme, /git switch -c evaluate-gsd-codex/);
    assert.match(readme, /npx @oisinwang\/get-shit-done-codex@latest --codex --local/);
    assert.match(readme, /\$gsd-new-project --auto/);
    assert.match(readme, /\$gsd-next/);
    assert.match(readme, /git status --short/);
    assert.match(readme, /npm run demo:safe-trial/);
    assert.match(readme, /prints the same safe trial flow without installing or editing files/);
    assert.match(readme, /\.codex\/`, `AGENTS\.md`, and `\.planning\//);
    assert.match(readme, /Remove the throwaway directory or delete the trial branch/);
    assert.match(readme, /full checklist in \[Evaluate\]\(docs\/EVALUATE\.md\)/);
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
    assert.match(evaluate, /npm run demo:safe-trial/);
    assert.match(evaluate, /scripts\/safe-trial-demo\.cjs/);
    assert.match(evaluate, /prints commands only/);
    assert.doesNotMatch(evaluate, /[^\x00-\x7F]/, 'docs/EVALUATE.md should stay ASCII-clean');
  });

  test('public safe trial transcript mirrors the demo script output', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const demo = fs.readFileSync(path.join(ROOT, 'docs', 'DEMO.md'), 'utf8');
    const evaluate = fs.readFileSync(path.join(ROOT, 'docs', 'EVALUATE.md'), 'utf8');
    const transcriptPath = path.join(ROOT, 'docs', 'SAFE-TRIAL-TRANSCRIPT.md');

    assert.equal(fs.existsSync(transcriptPath), true, 'docs/SAFE-TRIAL-TRANSCRIPT.md should exist');

    const transcript = fs.readFileSync(transcriptPath, 'utf8');
    const demoOutput = execFileSync(process.execPath, [
      path.join(ROOT, 'scripts', 'safe-trial-demo.cjs'),
    ], {
      cwd: ROOT,
      encoding: 'utf8',
    }).trim();

    assert.match(readme, /\[Safe Trial Transcript\]\(docs\/SAFE-TRIAL-TRANSCRIPT\.md\)/);
    assert.match(docsReadme, /\[Safe Trial Transcript\]\(SAFE-TRIAL-TRANSCRIPT\.md\)/);
    assert.match(demo, /\[Safe Trial Transcript\]\(SAFE-TRIAL-TRANSCRIPT\.md\)/);
    assert.match(evaluate, /\[Safe Trial Transcript\]\(SAFE-TRIAL-TRANSCRIPT\.md\)/);
    assert.match(transcript, /# Safe Trial Demo Transcript/);
    assert.match(transcript, /Generated from `npm run demo:safe-trial`/);
    assert.match(transcript, /no-install, no-edit transcript/);

    for (const line of demoOutput.split(/\r?\n/).filter(Boolean)) {
      assert.ok(transcript.includes(line), `transcript should include demo line: ${line}`);
    }

    assert.doesNotMatch(transcript, /[^\x00-\x7F]/, 'safe trial transcript should stay ASCII-clean');
  });

  test('public safe trial outcome template helps users decide what to keep', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const evaluate = fs.readFileSync(path.join(ROOT, 'docs', 'EVALUATE.md'), 'utf8');
    const transcript = fs.readFileSync(path.join(ROOT, 'docs', 'SAFE-TRIAL-TRANSCRIPT.md'), 'utf8');
    const outcomePath = path.join(ROOT, 'docs', 'SAFE-TRIAL-OUTCOME.md');

    assert.equal(fs.existsSync(outcomePath), true, 'docs/SAFE-TRIAL-OUTCOME.md should exist');

    const outcome = fs.readFileSync(outcomePath, 'utf8');

    assert.match(readme, /\[Safe Trial Outcome Template\]\(docs\/SAFE-TRIAL-OUTCOME\.md\)/);
    assert.match(docsReadme, /\[Safe Trial Outcome Template\]\(SAFE-TRIAL-OUTCOME\.md\)/);
    assert.match(evaluate, /\[Safe Trial Outcome Template\]\(SAFE-TRIAL-OUTCOME\.md\)/);
    assert.match(transcript, /\[Safe Trial Outcome Template\]\(SAFE-TRIAL-OUTCOME\.md\)/);
    assert.match(outcome, /# Safe Trial Outcome Template/);
    assert.match(outcome, /## Trial Context/);
    assert.match(outcome, /## Commands Run/);
    assert.match(outcome, /## Changed Paths/);
    assert.match(outcome, /## Decision/);
    assert.match(outcome, /Keep/);
    assert.match(outcome, /Discard/);
    assert.match(outcome, /Pass signals/);
    assert.match(outcome, /Fail signals/);
    assert.match(outcome, /Feedback evidence/);
    assert.match(outcome, /GitHub Discussions/);
    assert.match(outcome, /Issue/);
    assert.match(outcome, /git status --short/);
    assert.match(outcome, /git diff --stat/);
    assert.match(outcome, /\.codex\//);
    assert.match(outcome, /AGENTS\.md/);
    assert.match(outcome, /\.planning\//);
    assert.doesNotMatch(outcome, /[^\x00-\x7F]/, 'safe trial outcome template should stay ASCII-clean');
  });

  test('public safe trial discussion starter gives evaluators a support-ready post', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const evaluate = fs.readFileSync(path.join(ROOT, 'docs', 'EVALUATE.md'), 'utf8');
    const outcome = fs.readFileSync(path.join(ROOT, 'docs', 'SAFE-TRIAL-OUTCOME.md'), 'utf8');
    const faq = fs.readFileSync(path.join(ROOT, 'docs', 'FAQ.md'), 'utf8');
    const support = fs.readFileSync(path.join(ROOT, 'SUPPORT.md'), 'utf8');
    const starterPath = path.join(ROOT, 'docs', 'SAFE-TRIAL-DISCUSSION.md');

    assert.equal(fs.existsSync(starterPath), true, 'docs/SAFE-TRIAL-DISCUSSION.md should exist');

    const starter = fs.readFileSync(starterPath, 'utf8');

    assert.match(readme, /\[Safe Trial Discussion Starter\]\(docs\/SAFE-TRIAL-DISCUSSION\.md\)/);
    assert.match(docsReadme, /\[Safe Trial Discussion Starter\]\(SAFE-TRIAL-DISCUSSION\.md\)/);
    assert.match(evaluate, /\[Safe Trial Discussion Starter\]\(SAFE-TRIAL-DISCUSSION\.md\)/);
    assert.match(outcome, /\[Safe Trial Discussion Starter\]\(SAFE-TRIAL-DISCUSSION\.md\)/);
    assert.match(faq, /\[Safe Trial Discussion Starter\]\(SAFE-TRIAL-DISCUSSION\.md\)/);
    assert.match(support, /\[Safe Trial Discussion Starter\]\(docs\/SAFE-TRIAL-DISCUSSION\.md\)/);
    assert.match(starter, /# Safe Trial Discussion Starter/);
    assert.match(starter, /GitHub Discussions/);
    assert.match(starter, /Discussion title/);
    assert.match(starter, /Discussion body/);
    assert.match(starter, /I tried the safe local trial/);
    assert.match(starter, /What I want advice on/);
    assert.match(starter, /Commands I ran/);
    assert.match(starter, /Changed paths/);
    assert.match(starter, /Decision so far/);
    assert.match(starter, /Privacy check/);
    assert.match(starter, /Do not paste tokens/);
    assert.match(starter, /git status --short/);
    assert.match(starter, /git switch -c evaluate-gsd-codex/);
    assert.match(starter, /git diff --stat/);
    assert.match(starter, /SAFE-TRIAL-OUTCOME\.md/);
    assert.doesNotMatch(starter, /[^\x00-\x7F]/, 'safe trial discussion starter should stay ASCII-clean');
  });

  test('public safe trial troubleshooting page gives evaluators quick fixes before filing', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const docsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'README.md'), 'utf8');
    const evaluate = fs.readFileSync(path.join(ROOT, 'docs', 'EVALUATE.md'), 'utf8');
    const outcome = fs.readFileSync(path.join(ROOT, 'docs', 'SAFE-TRIAL-OUTCOME.md'), 'utf8');
    const discussion = fs.readFileSync(path.join(ROOT, 'docs', 'SAFE-TRIAL-DISCUSSION.md'), 'utf8');
    const faq = fs.readFileSync(path.join(ROOT, 'docs', 'FAQ.md'), 'utf8');
    const troubleshootingPath = path.join(ROOT, 'docs', 'SAFE-TRIAL-TROUBLESHOOTING.md');

    assert.equal(fs.existsSync(troubleshootingPath), true, 'docs/SAFE-TRIAL-TROUBLESHOOTING.md should exist');

    const troubleshooting = fs.readFileSync(troubleshootingPath, 'utf8');

    assert.match(readme, /\[Safe Trial Troubleshooting\]\(docs\/SAFE-TRIAL-TROUBLESHOOTING\.md\)/);
    assert.match(docsReadme, /\[Safe Trial Troubleshooting\]\(SAFE-TRIAL-TROUBLESHOOTING\.md\)/);
    assert.match(evaluate, /\[Safe Trial Troubleshooting\]\(SAFE-TRIAL-TROUBLESHOOTING\.md\)/);
    assert.match(outcome, /\[Safe Trial Troubleshooting\]\(SAFE-TRIAL-TROUBLESHOOTING\.md\)/);
    assert.match(discussion, /\[Safe Trial Troubleshooting\]\(SAFE-TRIAL-TROUBLESHOOTING\.md\)/);
    assert.match(faq, /\[Safe Trial Troubleshooting\]\(SAFE-TRIAL-TROUBLESHOOTING\.md\)/);
    assert.match(troubleshooting, /# Safe Trial Troubleshooting/);
    assert.match(troubleshooting, /Quick checks/);
    assert.match(troubleshooting, /Commands are missing/);
    assert.match(troubleshooting, /Unexpected files changed/);
    assert.match(troubleshooting, /Local versus global install confusion/);
    assert.match(troubleshooting, /npm or Node.js failure/);
    assert.match(troubleshooting, /Stale npm cache/);
    assert.match(troubleshooting, /When to ask in Discussions/);
    assert.match(troubleshooting, /When to open an issue/);
    assert.match(troubleshooting, /git status --short/);
    assert.match(troubleshooting, /git diff --stat/);
    assert.match(troubleshooting, /\[Commands are not found after install\]\(TROUBLESHOOTING\.md#commands-are-not-found-after-install\)/);
    assert.match(troubleshooting, /\[Runtime restart or command discovery\]\(TROUBLESHOOTING\.md#runtime-restart-or-command-discovery\)/);
    assert.match(troubleshooting, /\[Windows PowerShell first-pass diagnostics\]\(TROUBLESHOOTING\.md#windows-powershell-first-pass-diagnostics\)/);
    assert.match(troubleshooting, /\[Stale npm cache or partial install\]\(TROUBLESHOOTING\.md#stale-npm-cache-or-partial-install\)/);
    assert.doesNotMatch(troubleshooting, /docs\/TROUBLESHOOTING\.md/);
    assert.match(troubleshooting, /Safe Trial Discussion Starter/);
    assert.doesNotMatch(troubleshooting, /[^\x00-\x7F]/, 'safe trial troubleshooting should stay ASCII-clean');
  });

  test('README shows a real-world before and after example', () => {
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const beforeAfterStart = readme.indexOf('## Before And After');
    const pickWorkflowStart = readme.indexOf('## Pick a Workflow');

    assert.ok(beforeAfterStart > -1, 'README should include a before/after example');
    assert.ok(
      beforeAfterStart < pickWorkflowStart,
      'before/after example should appear before the workflow chooser',
    );
    assert.match(readme, /Before: "Make onboarding less confusing\."/);
    assert.match(readme, /\$gsd-new-project --auto "Make onboarding less confusing"/);
    assert.match(readme, /After GSD Codex:/);
    assert.match(readme, /PROJECT\.md/);
    assert.match(readme, /ROADMAP\.md/);
    assert.match(readme, /STATE\.md/);
    assert.match(readme, /\.planning\/phases\//);
    assert.match(readme, /verification evidence/);
    assert.match(readme, /reviewable next action/);
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
    assert.match(readme, /Trial GSD on a migration branch/);
    assert.match(readme, /`git switch -c evaluate-gsd-codex`/);
    assert.match(readme, /Review generated planning artifacts/);
    assert.match(readme, /`\$gsd-progress --forensic`/);
    assert.match(readme, /Repair planning directory drift/);
    assert.match(readme, /`\$gsd-health --repair`/);
    assert.match(readme, /Personalize Codex for long projects/);
    assert.match(readme, /`\$gsd-profile-user --questionnaire`/);
    assert.match(readme, /Tune model cost and autonomy/);
    assert.match(readme, /`\$gsd-settings`/);
    assert.match(readme, /Prepare a public PR without planning noise/);
    assert.match(readme, /`\$gsd-pr-branch codex\/bootstrap`/);
    assert.match(readme, /Check release readiness before a branch/);
    assert.match(readme, /`\$gsd-audit-uat`/);
    assert.match(readme, /Check security-sensitive changes/);
    assert.match(readme, /`\$gsd-secure-phase 1`/);
    assert.match(readme, /Update docs after a feature ships/);
    assert.match(readme, /`\$gsd-docs-update --verify-only`/);
    assert.match(readme, /Fix review findings safely/);
    assert.match(readme, /`\$gsd-code-review-fix 1`/);
    assert.match(readme, /Choose the next backlog item/);
    assert.match(readme, /`\$gsd-review-backlog`/);
    assert.match(readme, /Audit thin validation evidence/);
    assert.match(readme, /`\$gsd-validate-phase 1`/);
    assert.match(readme, /Review AI eval coverage/);
    assert.match(readme, /`\$gsd-eval-review 3`/);
    assert.match(readme, /Preserve long-running context/);
    assert.match(readme, /`\$gsd-thread "Investigate flaky release"`/);
    assert.match(readme, /Pause before a context reset/);
    assert.match(readme, /`\$gsd-pause-work`/);
    assert.match(readme, /Summarize a session for handoff/);
    assert.match(readme, /`\$gsd-session-report`/);
    assert.match(readme, /Capture a project health snapshot/);
    assert.match(readme, /`\$gsd-stats`/);
    assert.match(readme, /Archive completed milestone phases/);
    assert.match(readme, /`\$gsd-cleanup`/);
    assert.match(readme, /Fix confirmed audit findings/);
    assert.match(readme, /`\$gsd-audit-fix --dry-run`/);
    assert.match(readme, /Coordinate parallel workstreams/);
    assert.match(readme, /`\$gsd-workstreams create backend-api`/);
    assert.match(readme, /Diagnose a failed workflow run/);
    assert.match(readme, /`\$gsd-forensics "Phase 3 execution stalled"`/);
    assert.match(docsReadme, /\[Examples\]\(EXAMPLES\.md\)/);
    assert.match(examples, /# Examples/);
    assert.match(examples, /## Existing Repo Safe Trial/);
    assert.match(examples, /## Existing Repo Migration Branch/);
    assert.match(examples, /## Troubleshoot Stale Or Failing Npm Install/);
    assert.match(examples, /## Review Generated Planning Artifacts/);
    assert.match(examples, /## Repair Planning Directory Drift/);
    assert.match(examples, /## Personalize Codex For Long Projects/);
    assert.match(examples, /## Tune Model Cost And Autonomy/);
    assert.match(examples, /## Prepare A Public Pull Request/);
    assert.match(examples, /## Audit Verification Debt Before Release/);
    assert.match(examples, /## Verify Security-Sensitive Changes/);
    assert.match(examples, /## Update Docs After A Feature Ships/);
    assert.match(examples, /## Fix Review Findings/);
    assert.match(examples, /## Choose Next Backlog Item/);
    assert.match(examples, /## Audit Thin Validation Evidence/);
    assert.match(examples, /## Review AI Eval Coverage/);
    assert.match(examples, /## Preserve Long-Running Context/);
    assert.match(examples, /## Pause Before A Context Reset/);
    assert.match(examples, /## Summarize A Session For Handoff/);
    assert.match(examples, /## Capture A Project Health Snapshot/);
    assert.match(examples, /## Archive Completed Milestone Phases/);
    assert.match(examples, /## Fix Confirmed Audit Findings/);
    assert.match(examples, /## Coordinate Parallel Workstreams/);
    assert.match(examples, /## Diagnose A Failed Workflow Run/);
    assert.match(examples, /\$gsd-map-codebase/);
    assert.match(examples, /\$gsd-new-project --auto/);
    assert.match(examples, /\$gsd-discuss-phase 1/);
    assert.match(examples, /\$gsd-health/);
    assert.match(examples, /\$gsd-health --repair/);
    assert.match(examples, /\$gsd-profile-user --questionnaire/);
    assert.match(examples, /\$gsd-profile-user --refresh/);
    assert.match(examples, /\$gsd-settings/);
    assert.match(examples, /\$gsd-set-profile budget/);
    assert.match(examples, /\$gsd-set-profile quality/);
    assert.match(examples, /\$gsd-pr-branch codex\/bootstrap/);
    assert.match(examples, /\$gsd-audit-uat/);
    assert.match(examples, /\$gsd-secure-phase 1/);
    assert.match(examples, /\$gsd-docs-update --verify-only/);
    assert.match(examples, /\$gsd-code-review-fix 1/);
    assert.match(examples, /\$gsd-review-backlog/);
    assert.match(examples, /\$gsd-validate-phase 1/);
    assert.match(examples, /\$gsd-eval-review 3/);
    assert.match(examples, /\$gsd-thread "Investigate flaky release"/);
    assert.match(examples, /\$gsd-pause-work/);
    assert.match(examples, /\$gsd-session-report/);
    assert.match(examples, /\$gsd-stats/);
    assert.match(examples, /\$gsd-cleanup/);
    assert.match(examples, /\$gsd-audit-fix --dry-run/);
    assert.match(examples, /\$gsd-audit-fix --severity high --max 3/);
    assert.match(examples, /\$gsd-workstreams create backend-api/);
    assert.match(examples, /\$gsd-workstreams create frontend-polish/);
    assert.match(examples, /\$gsd-workstreams switch backend-api/);
    assert.match(examples, /\$gsd-new-milestone --ws backend-api/);
    assert.match(examples, /\$gsd-workstreams progress/);
    assert.match(examples, /\$gsd-forensics "Phase 3 execution stalled"/);
    assert.match(examples, /git switch -c evaluate-gsd-codex/);
    assert.match(examples, /npx @oisinwang\/get-shit-done-codex@latest --codex --local/);
    assert.match(examples, /clean temporary directory/);
    assert.match(examples, /npm view @oisinwang\/get-shit-done-codex version/);
    assert.match(examples, /npx @oisinwang\/get-shit-done-codex@latest --codex/);
    assert.match(examples, /source fix commit or issue link/);
    assert.match(examples, /Keep the `pending release` label/);
    assert.match(examples, /tell users whether to wait for npm publishing or use the source branch/);
    assert.match(examples, /commit the branch only after reviewing the generated plan/i);
    assert.match(examples, /git diff -- \.codex AGENTS\.md PROJECT\.md ROADMAP\.md STATE\.md \.planning/);
    assert.match(examples, /Keep `AGENTS\.md`, `.codex\/`, and `.planning\/` when the generated state helps later Codex sessions resume/);
    assert.match(examples, /Ignore or discard the trial branch when the artifacts are only private evaluation notes/);
    assert.match(examples, /after interrupted setup, branch switches, or manual file edits/);
    assert.match(examples, /read-only until the explicit `--repair` step/);
    assert.match(examples, /Status: HEALTHY \| DEGRADED \| BROKEN/);
    assert.match(examples, /repairable_count/);
    assert.match(examples, /repairs_performed/);
    assert.match(examples, /config\.json/);
    assert.match(examples, /STATE\.md/);
    assert.match(examples, /Review repairable findings before changing files/);
    assert.match(examples, /stable coding, review, and communication preferences/);
    assert.match(examples, /\$HOME\/\.codex\/get-shit-done\/USER-PROFILE\.md/);
    assert.match(examples, /\$HOME\/\.codex\/commands\/gsd\/dev-preferences\.md/);
    assert.match(examples, /AGENTS\.md profile section/);
    assert.match(examples, /Global AGENTS\.md/);
    assert.match(examples, /Commit the AGENTS\.md profile section only when the preference is stable project guidance/);
    assert.match(examples, /Keep `USER-PROFILE\.md` and global `AGENTS\.md` local when they describe one maintainer/);
    assert.match(examples, /PROJECT\.md and AGENTS\.md remain project requirements and operating instructions/);
    assert.match(examples, /before a long-running milestone when token cost, latency, or autonomy needs to be explicit/);
    assert.match(examples, /Use `budget` for cheap routine maintenance/);
    assert.match(examples, /Use `balanced` for normal feature work/);
    assert.match(examples, /Use `quality` for high-risk planning or review/);
    assert.match(examples, /Use `inherit` when the active Codex runtime should control model choice/);
    assert.match(examples, /workflow agents such as research, plan_check, verifier, and auto_advance/);
    assert.match(examples, /Profile tuning changes time and token spend; it does not replace phase verification, UAT, or review/);
    assert.match(examples, /filter transient `.planning\/` commits before public review/);
    assert.match(examples, /The command creates a `\*-pr` branch from the target branch/);
    assert.match(examples, /Run the printed `git push` and `gh pr create` commands only after reviewing that generated branch/);
    assert.match(examples, /before creating a release branch or completing a milestone/);
    assert.match(examples, /pending, skipped, blocked, and human_needed/);
    assert.match(examples, /human test plan/);
    assert.match(examples, /before merging authentication, payments, permissions, secrets, or data-handling changes/);
    assert.match(examples, /threat-model-anchored verification/);
    assert.match(examples, /`\{phase\}-SECURITY\.md` with threat verification results/);
    assert.match(examples, /after a feature, CLI workflow, or install behavior changes/);
    assert.match(examples, /surface stale claims without writing files/);
    assert.match(examples, /structure-aware documentation verified against the live codebase/);
    assert.match(examples, /doc-writer and doc-verifier agents/);
    assert.match(examples, /after code review writes a `REVIEW\.md` with actionable findings/);
    assert.match(examples, /Critical and Warning findings/);
    assert.match(examples, /commits each fix atomically/);
    assert.match(examples, /writes `REVIEW-FIX\.md`/);
    assert.match(examples, /leave risky or ambiguous findings unresolved/);
    assert.match(examples, /when the current milestone has more ideas than capacity/);
    assert.match(examples, /parking lot with 999\.x numbering/);
    assert.match(examples, /Promote, Keep, or Remove each backlog item/);
    assert.match(examples, /Promoted items move into the active milestone sequence/);
    assert.match(examples, /completed phase has implementation summaries but validation evidence is thin/);
    assert.match(examples, /Nyquist validation gaps/);
    assert.match(examples, /classifies each requirement as COVERED, PARTIAL, or MISSING/);
    assert.match(examples, /writes or updates `\{phase\}-VALIDATION\.md`/);
    assert.match(examples, /generated test files/);
    assert.match(examples, /`nyquist_compliant: true`/);
    assert.match(examples, /after an AI-heavy phase has implementation output and an `AI-SPEC\.md` evaluation plan/);
    assert.match(examples, /implemented AI phase against the planned evaluation strategy/);
    assert.match(examples, /scores each eval dimension as COVERED, PARTIAL, or MISSING/);
    assert.match(examples, /audits eval tooling, reference dataset, CI\/CD integration, online guardrails, and tracing/);
    assert.match(examples, /writes `\{phase\}-EVAL-REVIEW\.md`/);
    assert.match(examples, /Overall Score, Verdict, critical gaps, and remediation plan/);
    assert.match(examples, /long-running context across sessions/);
    assert.match(examples, /not tied to one phase/);
    assert.match(examples, /writes `.planning\/threads\/\{slug\}\.md`/);
    assert.match(examples, /status, created, and updated frontmatter/);
    assert.match(examples, /Goal, Context, References, and Next Steps/);
    assert.match(examples, /resume with `\$gsd-thread investigate-flaky-release`/);
    assert.match(examples, /close with `\$gsd-thread close investigate-flaky-release`/);
    assert.match(examples, /before stopping, compacting, or handing off a Codex session/);
    assert.match(examples, /writes `.planning\/HANDOFF\.json`/);
    assert.match(examples, /writes `.continue-here\.md`/);
    assert.match(examples, /machine-readable state for `\$gsd-resume-work`/);
    assert.match(examples, /human-readable context for the next maintainer/);
    assert.match(examples, /before a maintainer handoff or weekly progress summary/);
    assert.match(examples, /writes `.planning\/reports\/SESSION_REPORT\.md`/);
    assert.match(examples, /Session Summary/);
    assert.match(examples, /Work Performed/);
    assert.match(examples, /Outcomes/);
    assert.match(examples, /Resource Usage Estimate/);
    assert.match(examples, /Next Steps/);
    assert.match(examples, /stakeholder sharing/);
    assert.match(examples, /before a weekly update, milestone review, or contributor handoff/);
    assert.match(examples, /milestone version and milestone name/);
    assert.match(examples, /phase progress/);
    assert.match(examples, /plan completion/);
    assert.match(examples, /requirements complete/);
    assert.match(examples, /git commits/);
    assert.match(examples, /started date/);
    assert.match(examples, /last activity/);
    assert.match(examples, /project age/);
    assert.match(examples, /after completing or archiving milestones/);
    assert.match(examples, /reads `.planning\/MILESTONES\.md`/);
    assert.match(examples, /archived ROADMAP snapshots/);
    assert.match(examples, /dry-run summary/);
    assert.match(examples, /moves `.planning\/phases\/\{dir\}` into `.planning\/milestones\/v\{version\}-phases\/`/);
    assert.match(examples, /commits the moved planning state/);
    assert.match(examples, /after UAT or verification has produced concrete findings/);
    assert.match(examples, /preview classification before changing files/);
    assert.match(examples, /classifies each finding as auto-fixable, manual-only, or skip/);
    assert.match(examples, /dry-run stops after the classification table/);
    assert.match(examples, /fix run processes high-severity auto-fixable findings up to `--max`/);
    assert.match(examples, /runs tests after each fix/);
    assert.match(examples, /commits atomically with finding IDs/);
    assert.match(examples, /stops and reverts on the first test failure/);
    assert.match(examples, /when one repository has two independent milestone areas moving at the same time/);
    assert.match(examples, /keeps `.planning\/workstreams\/\{name\}` isolated per effort/);
    assert.match(examples, /session-scoped active workstream/);
    assert.match(examples, /so concurrent Codex sessions do not overwrite each other/);
    assert.match(examples, /Use `--ws` on milestone and phase commands when you want explicit routing/);
    assert.match(examples, /archive finished work with `\$gsd-workstreams complete backend-api`/);
    assert.match(examples, /failed or stuck GSD workflow/);
    assert.match(examples, /read-only investigation/);
    assert.match(examples, /gathers recent git history, uncommitted work, `.planning\/STATE\.md`, roadmap state, phase artifacts, session reports, and worktrees/);
    assert.match(examples, /checks stuck loops, missing artifacts, abandoned work, crash or interruption signals, scope drift, and test regression clues/);
    assert.match(examples, /writes `.planning\/forensics\/report-\{timestamp\}\.md`/);
    assert.match(examples, /redacts absolute paths and credentials/);
    assert.match(examples, /offers GitHub issue creation when actionable findings exist/);
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

    const migrationBranchStart = examples.indexOf('## Existing Repo Migration Branch');
    const migrationBranchEnd = examples.indexOf('## Small Fix With Guardrails');
    const migrationBranchSection = examples.slice(migrationBranchStart, migrationBranchEnd);
    const migrationBranchCommands = migrationBranchSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(migrationBranchCommands, 'migration branch example should include a bash block');
    assert.deepEqual(migrationBranchCommands, [
      'git switch -c evaluate-gsd-codex',
      'npx @oisinwang/get-shit-done-codex@latest --codex --local',
      '$gsd-map-codebase',
      '$gsd-new-project --auto',
      '$gsd-next',
    ]);

    const reviewArtifactsStart = examples.indexOf('## Review Generated Planning Artifacts');
    const reviewArtifactsEnd = examples.indexOf('## Small Fix With Guardrails');
    const reviewArtifactsSection = examples.slice(reviewArtifactsStart, reviewArtifactsEnd);
    const reviewArtifactsCommands = reviewArtifactsSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(reviewArtifactsCommands, 'planning artifact review example should include a bash block');
    assert.deepEqual(reviewArtifactsCommands, [
      'git status --short',
      'git diff -- .codex AGENTS.md PROJECT.md ROADMAP.md STATE.md .planning',
      '$gsd-progress --forensic',
    ]);

    const healthStart = examples.indexOf('## Repair Planning Directory Drift');
    const healthEnd = examples.indexOf('## Prepare A Public Pull Request');
    const healthSection = examples.slice(healthStart, healthEnd);
    const healthCommands = healthSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(healthCommands, 'health repair example should include a bash block');
    assert.deepEqual(healthCommands, [
      '$gsd-progress --forensic',
      '$gsd-health',
      '# Review repairable findings before changing files.',
      '$gsd-health --repair',
      '$gsd-progress --forensic',
    ]);

    const profileStart = examples.indexOf('## Personalize Codex For Long Projects');
    const profileEnd = examples.indexOf('## Prepare A Public Pull Request');
    const profileSection = examples.slice(profileStart, profileEnd);
    const profileCommands = profileSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(profileCommands, 'profile-user example should include a bash block');
    assert.deepEqual(profileCommands, [
      '$gsd-profile-user --questionnaire',
      '$gsd-profile-user --refresh',
      'git diff -- AGENTS.md',
    ]);

    const settingsStart = examples.indexOf('## Tune Model Cost And Autonomy');
    const settingsEnd = examples.indexOf('## Prepare A Public Pull Request');
    const settingsSection = examples.slice(settingsStart, settingsEnd);
    const settingsCommands = settingsSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(settingsCommands, 'settings example should include a bash block');
    assert.deepEqual(settingsCommands, [
      '$gsd-settings',
      '$gsd-set-profile budget',
      '$gsd-set-profile quality',
      '$gsd-progress --forensic',
    ]);

    const publicPrStart = examples.indexOf('## Prepare A Public Pull Request');
    const publicPrEnd = examples.indexOf('## Small Fix With Guardrails');
    const publicPrSection = examples.slice(publicPrStart, publicPrEnd);
    const publicPrCommands = publicPrSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(publicPrCommands, 'public PR example should include a bash block');
    assert.deepEqual(publicPrCommands, [
      '$gsd-progress --forensic',
      '$gsd-pr-branch codex/bootstrap',
    ]);

    const releaseAuditStart = examples.indexOf('## Audit Verification Debt Before Release');
    const releaseAuditEnd = examples.indexOf('## Small Fix With Guardrails');
    const releaseAuditSection = examples.slice(releaseAuditStart, releaseAuditEnd);
    const releaseAuditCommands = releaseAuditSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(releaseAuditCommands, 'release audit example should include a bash block');
    assert.deepEqual(releaseAuditCommands, [
      '$gsd-progress --forensic',
      '$gsd-audit-uat',
    ]);

    const securePhaseStart = examples.indexOf('## Verify Security-Sensitive Changes');
    const securePhaseEnd = examples.indexOf('## Small Fix With Guardrails');
    const securePhaseSection = examples.slice(securePhaseStart, securePhaseEnd);
    const securePhaseCommands = securePhaseSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(securePhaseCommands, 'secure phase example should include a bash block');
    assert.deepEqual(securePhaseCommands, [
      '$gsd-progress --forensic',
      '$gsd-secure-phase 1',
    ]);

    const docsUpdateStart = examples.indexOf('## Update Docs After A Feature Ships');
    const docsUpdateEnd = examples.indexOf('## Small Fix With Guardrails');
    const docsUpdateSection = examples.slice(docsUpdateStart, docsUpdateEnd);
    const docsUpdateCommands = docsUpdateSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(docsUpdateCommands, 'docs-update example should include a bash block');
    assert.deepEqual(docsUpdateCommands, [
      '$gsd-progress --forensic',
      '$gsd-docs-update --verify-only',
      '$gsd-docs-update',
    ]);

    const reviewFixStart = examples.indexOf('## Fix Review Findings');
    const reviewFixEnd = examples.indexOf('## Small Fix With Guardrails');
    const reviewFixSection = examples.slice(reviewFixStart, reviewFixEnd);
    const reviewFixCommands = reviewFixSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(reviewFixCommands, 'review-fix example should include a bash block');
    assert.deepEqual(reviewFixCommands, [
      '$gsd-code-review 1',
      '$gsd-code-review-fix 1',
      '$gsd-code-review 1 --depth=deep',
    ]);

    const reviewBacklogStart = examples.indexOf('## Choose Next Backlog Item');
    const reviewBacklogEnd = examples.indexOf('## Small Fix With Guardrails');
    const reviewBacklogSection = examples.slice(reviewBacklogStart, reviewBacklogEnd);
    const reviewBacklogCommands = reviewBacklogSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(reviewBacklogCommands, 'review-backlog example should include a bash block');
    assert.deepEqual(reviewBacklogCommands, [
      '$gsd-add-backlog "Improve onboarding screenshots"',
      '$gsd-add-backlog "Add provider comparison table"',
      '$gsd-review-backlog',
    ]);

    const validatePhaseStart = examples.indexOf('## Audit Thin Validation Evidence');
    const validatePhaseEnd = examples.indexOf('## Small Fix With Guardrails');
    const validatePhaseSection = examples.slice(validatePhaseStart, validatePhaseEnd);
    const validatePhaseCommands = validatePhaseSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(validatePhaseCommands, 'validate-phase example should include a bash block');
    assert.deepEqual(validatePhaseCommands, [
      '$gsd-progress --forensic',
      '$gsd-validate-phase 1',
      '$gsd-verify-work 1',
    ]);

    const evalReviewStart = examples.indexOf('## Review AI Eval Coverage');
    const evalReviewEnd = examples.indexOf('## Small Fix With Guardrails');
    const evalReviewSection = examples.slice(evalReviewStart, evalReviewEnd);
    const evalReviewCommands = evalReviewSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(evalReviewCommands, 'eval-review example should include a bash block');
    assert.deepEqual(evalReviewCommands, [
      '$gsd-ai-integration-phase 3',
      '$gsd-execute-phase 3',
      '$gsd-eval-review 3',
    ]);

    const threadStart = examples.indexOf('## Preserve Long-Running Context');
    const threadEnd = examples.indexOf('## Small Fix With Guardrails');
    const threadSection = examples.slice(threadStart, threadEnd);
    const threadCommands = threadSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(threadCommands, 'thread example should include a bash block');
    assert.deepEqual(threadCommands, [
      '$gsd-thread "Investigate flaky release"',
      '$gsd-thread',
      '$gsd-thread status investigate-flaky-release',
      '$gsd-thread close investigate-flaky-release',
    ]);

    const pauseWorkStart = examples.indexOf('## Pause Before A Context Reset');
    const pauseWorkEnd = examples.indexOf('## Small Fix With Guardrails');
    const pauseWorkSection = examples.slice(pauseWorkStart, pauseWorkEnd);
    const pauseWorkCommands = pauseWorkSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(pauseWorkCommands, 'pause-work example should include a bash block');
    assert.deepEqual(pauseWorkCommands, [
      '$gsd-progress --forensic',
      '$gsd-pause-work',
      '$gsd-resume-work',
    ]);

    const sessionReportStart = examples.indexOf('## Summarize A Session For Handoff');
    const sessionReportEnd = examples.indexOf('## Small Fix With Guardrails');
    const sessionReportSection = examples.slice(sessionReportStart, sessionReportEnd);
    const sessionReportCommands = sessionReportSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(sessionReportCommands, 'session-report example should include a bash block');
    assert.deepEqual(sessionReportCommands, [
      '$gsd-progress --forensic',
      '$gsd-session-report',
      'git diff -- .planning/reports',
    ]);

    const statsStart = examples.indexOf('## Capture A Project Health Snapshot');
    const statsEnd = examples.indexOf('## Archive Completed Milestone Phases');
    const statsSection = examples.slice(statsStart, statsEnd);
    const statsCommands = statsSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(statsCommands, 'stats example should include a bash block');
    assert.deepEqual(statsCommands, [
      '$gsd-progress --forensic',
      '$gsd-stats',
      '$gsd-session-report',
    ]);

    const cleanupStart = examples.indexOf('## Archive Completed Milestone Phases');
    const cleanupEnd = examples.indexOf('## Fix Confirmed Audit Findings');
    const cleanupSection = examples.slice(cleanupStart, cleanupEnd);
    const cleanupCommands = cleanupSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(cleanupCommands, 'cleanup example should include a bash block');
    assert.deepEqual(cleanupCommands, [
      '$gsd-progress --forensic',
      '$gsd-cleanup',
      'git status --short',
    ]);

    const auditFixStart = examples.indexOf('## Fix Confirmed Audit Findings');
    const auditFixEnd = examples.indexOf('## Small Fix With Guardrails');
    const auditFixSection = examples.slice(auditFixStart, auditFixEnd);
    const auditFixCommands = auditFixSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(auditFixCommands, 'audit-fix example should include a bash block');
    assert.deepEqual(auditFixCommands, [
      '$gsd-audit-uat',
      '$gsd-audit-fix --dry-run',
      '$gsd-audit-fix --severity high --max 3',
    ]);

    const workstreamsStart = examples.indexOf('## Coordinate Parallel Workstreams');
    const workstreamsEnd = examples.indexOf('## Small Fix With Guardrails');
    const workstreamsSection = examples.slice(workstreamsStart, workstreamsEnd);
    const workstreamsCommands = workstreamsSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(workstreamsCommands, 'workstreams example should include a bash block');
    assert.deepEqual(workstreamsCommands, [
      '$gsd-workstreams create backend-api',
      '$gsd-workstreams create frontend-polish',
      '$gsd-workstreams switch backend-api',
      '$gsd-new-milestone --ws backend-api',
      '$gsd-workstreams progress',
    ]);

    const forensicsStart = examples.indexOf('## Diagnose A Failed Workflow Run');
    const forensicsEnd = examples.indexOf('## Small Fix With Guardrails');
    const forensicsSection = examples.slice(forensicsStart, forensicsEnd);
    const forensicsCommands = forensicsSection
      .match(/```bash\r?\n([\s\S]*?)\r?\n```/)?.[1]
      .split(/\r?\n/)
      .filter(Boolean);

    assert.ok(forensicsCommands, 'forensics example should include a bash block');
    assert.deepEqual(forensicsCommands, [
      'git status --short',
      '$gsd-forensics "Phase 3 execution stalled"',
      '$gsd-resume-work',
    ]);

    for (const marker of [
      '$gsd-new-project --auto',
      '$gsd-map-codebase',
      '$gsd-pr-branch',
      '$gsd-audit-uat',
      '$gsd-secure-phase',
      '$gsd-docs-update',
      '$gsd-code-review-fix',
      '$gsd-review-backlog',
      '$gsd-validate-phase',
      '$gsd-eval-review',
      '$gsd-thread',
      '$gsd-audit-fix',
      '$gsd-workstreams',
      '$gsd-forensics',
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
    assert.match(faq, /Can I try it in a repository with strict branch protection/);
    assert.match(faq, /Can I try it without touching global Codex config/);
    assert.match(faq, /When should I not use it/);
    assert.match(faq, /When should I use \$gsd-fast instead of \$gsd-quick --validate/);
    assert.match(faq, /How do I report stale npm metadata after a source fix has landed/);
    assert.match(faq, /How do I choose between local and global Codex installs/);
    assert.match(faq, /What should change after a local Codex trial/);
    assert.match(faq, /Should I run \$gsd-map-codebase or \$gsd-new-project --auto first/);
    assert.match(faq, /What should I include in a first GSD evaluation pull request/);
    assert.match(faq, /Should I ask in GitHub Discussions or open an issue/);
    assert.match(faq, /How do I build a minimal install reproduction/);
    assert.match(faq, /How do I record a safe 60-second demo/);
    assert.match(faq, /Where should I place a finished demo link/);
    assert.match(faq, /How should I verify a docs-only contribution before opening a pull request/);
    assert.match(faq, /How should I check localized docs before publishing translations/);
    assert.match(faq, /How should I check README badges and links before publishing docs changes/);
    assert.match(faq, /How should I hand off a pending-release issue after a source fix lands/);
    assert.match(faq, /How should I capture release checklist dry-run evidence before publishing/);
    assert.match(faq, /How should I close an issue after npm publishing succeeds/);
    assert.match(faq, /How should I capture npm dist-tag rollback evidence/);
    assert.match(faq, /How should I capture npm provenance and package integrity evidence/);
    assert.match(faq, /How should I capture npm deprecation evidence/);
    assert.match(faq, /AGENTS\.md/);
    assert.match(faq, /\.codex\//);
    assert.match(faq, /planning context and execution evidence/);
    assert.match(faq, /team-facing coordination layer/);
    assert.match(faq, /Keep `.planning\/` private when/);
    assert.match(faq, /Commit selected planning artifacts when/);
    assert.match(faq, /Set `planning\.commit_docs` to `false`/);
    assert.match(faq, /Run `git status --short \.planning` and `git diff -- \.planning`/);
    assert.match(faq, /This repository does not accept runtime `.planning\/` files in contributor pull requests/);
    assert.match(faq, /Use a trial branch and the local install path/);
    assert.match(faq, /Open a pull request like any other repository change/);
    assert.match(faq, /GSD does not need to bypass protected branch rules/);
    assert.match(faq, /merge only the files your team wants to keep/);
    assert.match(faq, /\[Examples\]\(EXAMPLES\.md\)/);
    assert.match(faq, /--local/);
    assert.match(faq, /\$gsd-map-codebase/);
    assert.match(faq, /\$gsd-fast/);
    assert.match(faq, /\$gsd-quick --validate/);
    assert.match(faq, /trivial single-step edits/);
    assert.match(faq, /obvious verification/);
    assert.match(faq, /small work that still benefits from plan checking and verification gates/);
    assert.match(faq, /npm page or `npx @latest` still shows old behavior/);
    assert.match(faq, /source checkout on `codex\/bootstrap`/);
    assert.match(faq, /npm view @oisinwang\/get-shit-done-codex version/);
    assert.match(faq, /docs\/RELEASE\.md/);
    assert.match(faq, /exact install command and npm version/);
    assert.match(faq, /Link the source fix commit/);
    assert.match(faq, /Link the successful GitHub Actions run/);
    assert.match(faq, /Record `npm view @oisinwang\/get-shit-done-codex version`/);
    assert.match(faq, /Keep the `pending release` label/);
    assert.match(faq, /Do not close the issue until the published package proves the fix is live/);
    assert.match(faq, /gh workflow run hotfix\.yml --repo Oisinwang\/get-shit-done-codex --ref codex\/bootstrap -f action=finalize -f version=<next-patch> -f dry_run=true/);
    assert.match(faq, /Confirm the `npm-publish` environment exists/);
    assert.match(faq, /Confirm `NPM_TOKEN` is configured/);
    assert.match(faq, /Record the workflow URL or run ID/);
    assert.match(faq, /Do not switch to `dry_run=false` until package contents have been reviewed/);
    assert.match(faq, /Record the published npm version/);
    assert.match(faq, /Record the publish timestamp/);
    assert.match(faq, /Link the successful workflow run URL/);
    assert.match(faq, /Run a clean install check with `npx @oisinwang\/get-shit-done-codex@latest --codex/);
    assert.match(faq, /Remove the `pending release` label only after the clean install check passes/);
    assert.match(faq, /Run `npm dist-tag ls @oisinwang\/get-shit-done-codex`/);
    assert.match(faq, /Record the `latest` and `next` tag targets/);
    assert.match(faq, /Record the affected version/);
    assert.match(faq, /Link the workflow run or npm command/);
    assert.match(faq, /Run `npm view @oisinwang\/get-shit-done-codex@<version> version gitHead dist\.integrity dist\.tarball`/);
    assert.match(faq, /Run `npm pack @oisinwang\/get-shit-done-codex@<version> --dry-run`/);
    assert.match(faq, /Record the package integrity/);
    assert.match(faq, /Compare the npm version with the git tag/);
    assert.match(faq, /Run `npm deprecate @oisinwang\/get-shit-done-codex@<version> "<message>"`/);
    assert.match(faq, /Record the deprecation message/);
    assert.match(faq, /Run `npm view @oisinwang\/get-shit-done-codex@<version> deprecated`/);
    assert.match(faq, /Tell users which version or install command to use instead/);
    assert.match(faq, /npx @oisinwang\/get-shit-done-codex@latest --codex --local/);
    assert.match(faq, /npx @oisinwang\/get-shit-done-codex@latest --codex --global/);
    assert.match(faq, /Use `--local` for repository trials/);
    assert.match(faq, /Use `--global` for user-level Codex setup/);
    assert.match(faq, /team-visible repository config/);
    assert.match(faq, /user-level config under `~\/\.codex\/`/);
    assert.match(faq, /Local Codex trials should create or update `\.\/\.codex\/`/);
    assert.match(faq, /`AGENTS\.md` for repository instructions/);
    assert.match(faq, /`\.planning\/` for project state/);
    assert.match(faq, /Run `git status --short` before committing/);
    assert.match(faq, /Commit only the artifacts your team wants to keep/);
    assert.match(faq, /Use `\$gsd-map-codebase` first when the repository already has source code/);
    assert.match(faq, /architecture, conventions, dependencies, tests, and risk areas/);
    assert.match(faq, /Use `\$gsd-new-project --auto` first for a new repository/);
    assert.match(faq, /blank milestone/);
    assert.match(faq, /Run `\$gsd-new-project --auto` after `\$gsd-map-codebase`/);
    assert.match(faq, /include only reviewable setup and planning artifacts/);
    assert.match(faq, /Include `\.codex\/` when reviewers need to inspect the local command surface/);
    assert.match(faq, /Include `AGENTS\.md` when repository instructions changed/);
    assert.match(faq, /Include selected `\.planning\/` docs such as `PROJECT\.md`, `ROADMAP\.md`, or `STATE\.md`/);
    assert.match(faq, /Leave private notes, secrets, local paths, and unrelated product code out/);
    assert.match(faq, /List the commands you ran and verification evidence/);
    assert.match(faq, /Use GitHub Discussions for setup questions, workflow advice, troubleshooting help, and examples/);
    assert.match(faq, /choosing a local versus global install/);
    assert.match(faq, /\$gsd-help is missing/);
    assert.match(faq, /Open an issue for reproducible bugs, stale documentation, or concrete feature proposals/);
    assert.match(faq, /exact command, exact error text, operating system and shell, Node\.js version, and GSD package version/);
    assert.match(faq, /Do not report security vulnerabilities in public issues/);
    assert.match(faq, /Start from a clean temporary directory or a fresh trial branch/);
    assert.match(faq, /Do not reuse a directory that already has `\.codex\/`, `AGENTS\.md`, or `\.planning\/` artifacts/);
    assert.match(faq, /node --version/);
    assert.match(faq, /npm --version/);
    assert.match(faq, /npx --version/);
    assert.match(faq, /npm view @oisinwang\/get-shit-done-codex version/);
    assert.match(faq, /Copy the exact install command and full output/);
    assert.match(faq, /For local installs, include `git status --short`/);
    assert.match(faq, /Use a disposable branch or throwaway repository/);
    assert.match(faq, /Show the command flow and generated artifacts/);
    assert.match(faq, /PROJECT\.md`, `ROADMAP\.md`, `STATE\.md`, and `\.planning\/phases\/`/);
    assert.match(faq, /End on `git status --short`/);
    assert.match(faq, /Redact local paths, usernames, private repository names, tokens, email addresses, and machine hostnames/);
    assert.match(faq, /Avoid client, employer, school, or private product details/);
    assert.match(faq, /Put the public recording in two places/);
    assert.match(faq, /near the README terminal preview/);
    assert.match(faq, /under `## 60-second workflow` in `docs\/DEMO\.md`/);
    assert.match(faq, /Use link text such as `60-second GSD Codex demo`/);
    assert.match(faq, /Caption it with the command flow, generated artifacts, and `git status --short` evidence/);
    assert.match(faq, /Run `git diff --check`/);
    assert.match(faq, /Run `node --test tests\/public-release-metadata\.test\.cjs`/);
    assert.match(faq, /Use the focused metadata test for FAQ, README, docs index, changelog, roadmap, and link-surface changes/);
    assert.match(faq, /Run `npm\.cmd test` before marking broad docs sweeps or cross-file release metadata changes ready/);
    assert.match(faq, /In the pull request description, list the changed docs, focused test result, full test result if run, and any skipped checks/);
    assert.match(faq, /Compare the translated page with the English source first/);
    assert.match(faq, /root `README\.md`, `docs\/README\.md`, `docs\/COMPARISON\.md`, `docs\/PROMPTS\.md`, and `docs\/USER-GUIDE\.md`/);
    assert.match(faq, /Check the localized docs index and root localized README links together/);
    assert.match(faq, /Keep Codex-first wording, `@oisinwang\/get-shit-done-codex` package names, GitHub Discussions links, and `Oisinwang\/get-shit-done-codex` repository URLs current/);
    assert.match(faq, /Run `node --test tests\/public-release-metadata\.test\.cjs` after localized README or docs index edits/);
    assert.match(faq, /Check the npm version and downloads badges against `@oisinwang\/get-shit-done-codex`/);
    assert.match(faq, /Confirm both badge links point to the published npm package page/);
    assert.match(faq, /Keep the GitHub Actions badge on `codex\/bootstrap`/);
    assert.match(faq, /Confirm star-history links use `Oisinwang\/get-shit-done-codex`/);
    assert.match(faq, /Review local docs links near the README nav after moving or adding public docs/);
    assert.match(faq, /Run `git diff --check`/);
    assert.match(faq, /Run `node --test tests\/public-release-metadata\.test\.cjs`/);
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
    assert.match(roadmap, /localized docs index prompt recipes links/);
    assert.doesNotMatch(roadmap, /Translate `docs\/COMPARISON\.md` into one localized docs folder/);
    assert.doesNotMatch(roadmap, /README safe 10-minute trial block/);
    assert.doesNotMatch(roadmap, /safe local trial path in localized README files/);
    assert.doesNotMatch(roadmap, /before\/after README example/);
    assert.doesNotMatch(roadmap, /safe trial demo script/);
    assert.doesNotMatch(roadmap, /safe trial demo transcript/);
    assert.doesNotMatch(roadmap, /safe trial outcome template/);
    assert.doesNotMatch(roadmap, /localized safe trial transcript links/);
    assert.doesNotMatch(roadmap, /safe trial discussion starter/);
    assert.doesNotMatch(roadmap, /localized safe trial discussion links/);
    assert.doesNotMatch(roadmap, /safe trial troubleshooting quick fixes/);
    assert.doesNotMatch(roadmap, /safe trial issue chooser hints/);
    assert.doesNotMatch(roadmap, /localized safe trial troubleshooting links/);
    assert.doesNotMatch(roadmap, /localized safe trial troubleshooting docs index links/);
    assert.doesNotMatch(roadmap, /localized safe trial outcome docs index links/);
    assert.doesNotMatch(roadmap, /localized safe trial discussion docs index links/);
    assert.doesNotMatch(roadmap, /localized safe trial transcript docs index links/);
    assert.doesNotMatch(roadmap, /localized safe trial quick links grouping/);
    assert.doesNotMatch(roadmap, /localized docs index support route links/);
    assert.doesNotMatch(roadmap, /localized docs index contribution links/);
    assert.doesNotMatch(roadmap, /localized docs index maintainer checklist links/);
    assert.doesNotMatch(roadmap, /localized docs index promotion links/);
    assert.doesNotMatch(roadmap, /localized docs index demo links/);
    assert.doesNotMatch(roadmap, /localized docs index FAQ links/);
    assert.doesNotMatch(roadmap, /localized docs index troubleshooting links/);
    assert.doesNotMatch(roadmap, /localized docs index examples links/);
    assert.doesNotMatch(roadmap, /\$gsd-settings/);
    assert.doesNotMatch(roadmap, /\$gsd-cleanup/);
    assert.doesNotMatch(roadmap, /\$gsd-pause-work/);
    assert.doesNotMatch(roadmap, /\$gsd-session-report/);
    assert.doesNotMatch(roadmap, /closing resolved good-first-issue tasks/);
    assert.doesNotMatch(roadmap, /\$gsd-fast` versus `\$gsd-quick --validate/);
    assert.doesNotMatch(roadmap, /interrupted `\$gsd-pr-branch` exports/);
    assert.doesNotMatch(roadmap, /setup questions belong in GitHub Discussions/);
    assert.doesNotMatch(roadmap, /stale npm metadata after a source fix has landed/);
    assert.doesNotMatch(roadmap, /local and global Codex installs/);
    assert.doesNotMatch(roadmap, /git status` and `git diff --stat` evidence/);
    assert.doesNotMatch(roadmap, /changed files to expect after a `--local` Codex trial/);
    assert.doesNotMatch(roadmap, /source docs with published npm package docs/);
    assert.doesNotMatch(roadmap, /start with `\$gsd-map-codebase` versus `\$gsd-new-project --auto`/);
    assert.doesNotMatch(roadmap, /what to include in a first GSD evaluation pull request/);
    assert.doesNotMatch(roadmap, /GitHub Discussions instead of opening an issue/);
    assert.doesNotMatch(roadmap, /minimal install reproduction/);
    assert.doesNotMatch(roadmap, /safe 60-second demo/);
    assert.doesNotMatch(roadmap, /finished demo link/);
    assert.doesNotMatch(roadmap, /docs-only contribution verification/);
    assert.doesNotMatch(roadmap, /localized docs sync checks/);
    assert.doesNotMatch(roadmap, /README badge and link refresh checks/);
    assert.doesNotMatch(roadmap, /release issue handoff evidence/);
    assert.doesNotMatch(roadmap, /release checklist dry-run evidence/);
    assert.doesNotMatch(roadmap, /npm publish verification issue closure evidence/);
    assert.doesNotMatch(roadmap, /npm dist-tag rollback evidence/);
    assert.doesNotMatch(roadmap, /npm provenance and package integrity evidence/);
    assert.doesNotMatch(roadmap, /npm deprecation evidence/);
    assert.doesNotMatch(roadmap, /real-world install troubleshooting example/);
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
    const maintainerChecklistPath = path.join(ROOT, 'docs', 'MAINTAINER-CHECKLIST.md');
    const goodFirstIssuesUrl =
      'https://github.com/Oisinwang/get-shit-done-codex/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22';
    const discussionsUrl = 'https://github.com/Oisinwang/get-shit-done-codex/discussions';

    assert.equal(
      fs.existsSync(maintainerChecklistPath),
      true,
      'docs/MAINTAINER-CHECKLIST.md should exist',
    );

    const maintainerChecklist = fs.readFileSync(maintainerChecklistPath, 'utf8');

    assert.match(readme, /\[Contributing\]\(CONTRIBUTING\.md\)/);
    assert.match(docsReadme, /\[Maintainer Checklist\]\(MAINTAINER-CHECKLIST\.md\)/);
    assert.match(readme, new RegExp(goodFirstIssuesUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(readme, new RegExp(discussionsUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(docsReadme, new RegExp(goodFirstIssuesUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(docsReadme, new RegExp(discussionsUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(maintainerChecklist, /# Maintainer Checklist/);
    assert.match(maintainerChecklist, /Closing Good-First Issues/);
    assert.match(maintainerChecklist, /Verification evidence/);
    assert.match(maintainerChecklist, /CI run URL/);
    assert.match(maintainerChecklist, /issue comment/);
    assert.match(maintainerChecklist, /label cleanup/);
    assert.match(maintainerChecklist, /roadmap or backlog update/);
    assert.match(maintainerChecklist, /CHANGELOG\.md/);
    assert.match(maintainerChecklist, /docs\/ROADMAP\.md/);
    assert.match(maintainerChecklist, /pending release/);
    assert.match(maintainerChecklist, /Good First Issues/);
    assert.doesNotMatch(
      maintainerChecklist,
      /[^\x00-\x7F]/,
      'docs/MAINTAINER-CHECKLIST.md should stay ASCII-clean',
    );
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
    assert.match(troubleshooting, /npm\.ps1 cannot be loaded/);
    assert.match(troubleshooting, /running scripts is disabled/);
    assert.match(troubleshooting, /npm\.cmd --version/);
    assert.match(troubleshooting, /npx\.cmd --version/);
    assert.match(troubleshooting, /npx\.cmd @oisinwang\/get-shit-done-codex@latest --codex --local/);
    assert.match(troubleshooting, /WSL and Windows shell path mismatch/);
    assert.match(troubleshooting, /Windows PowerShell and WSL use different home directories/);
    assert.match(troubleshooting, /where\.exe node/);
    assert.match(troubleshooting, /echo "\$HOME"/);
    assert.match(troubleshooting, /ls -la "\$HOME\/\.codex"/);
    assert.match(troubleshooting, /Run the installer from the same shell that starts Codex/);
    assert.match(troubleshooting, /Node or npx is not on PATH/);
    assert.match(troubleshooting, /Get-Command node,npm,npx -ErrorAction SilentlyContinue/);
    assert.match(troubleshooting, /where\.exe npx\.cmd/);
    assert.match(troubleshooting, /command -v node npm npx/);
    assert.match(troubleshooting, /Close and reopen the terminal after installing Node\.js/);
    assert.match(troubleshooting, /Do not copy npm shims between directories/);
    assert.match(troubleshooting, /Corporate proxy or certificate failures/);
    assert.match(troubleshooting, /SELF_SIGNED_CERT_IN_CHAIN/);
    assert.match(troubleshooting, /UNABLE_TO_GET_ISSUER_CERT_LOCALLY/);
    assert.match(troubleshooting, /npm config get proxy/);
    assert.match(troubleshooting, /npm config get https-proxy/);
    assert.match(troubleshooting, /npm config get cafile/);
    assert.match(troubleshooting, /npm ping --registry=https:\/\/registry\.npmjs\.org\//);
    assert.match(troubleshooting, /Do not use `npm config set strict-ssl false` as the first fix/);
    assert.match(troubleshooting, /Stale npm cache or partial install/);
    assert.match(troubleshooting, /npm cache verify/);
    assert.match(troubleshooting, /npm exec --yes --package @oisinwang\/get-shit-done-codex@latest get-shit-done-codex -- --codex --local/);
    assert.match(troubleshooting, /npm cache clean --force/);
    assert.match(troubleshooting, /Use cache clean only after cache verify or a fresh exec still fails/);
    assert.match(troubleshooting, /Interrupted \$gsd-pr-branch export/);
    assert.match(troubleshooting, /\$gsd-pr-branch/);
    assert.match(troubleshooting, /before opening a public pull request/);
    assert.match(troubleshooting, /git branch --show-current/);
    assert.match(troubleshooting, /git status --short/);
    assert.match(troubleshooting, /git log --oneline -5/);
    assert.match(troubleshooting, /\$gsd-progress --forensic/);
    assert.match(troubleshooting, /Do not delete `.planning\/` blindly/);
    assert.match(troubleshooting, /Documentation issue evidence before filing/);
    assert.match(troubleshooting, /Collect clean repository-state evidence before opening a documentation issue/);
    assert.match(troubleshooting, /git status --short/);
    assert.match(troubleshooting, /git diff --stat/);
    assert.match(troubleshooting, /Attach this output when a docs report says behavior differs from the docs/);
    assert.match(troubleshooting, /do not attach it for typo-only reports/);
    assert.match(troubleshooting, /Source docs versus published package docs/);
    assert.match(troubleshooting, /source docs on `codex\/bootstrap`/);
    assert.match(troubleshooting, /published package docs from npm/);
    assert.match(troubleshooting, /Report stale documentation when the published package version is behind the source docs/);
    assert.match(troubleshooting, /Include the source docs link, published package version, and stale published doc path/);
    assert.match(troubleshooting, /Runtime restart or command discovery/);
    assert.match(troubleshooting, /Codex may keep an in-memory command and skill index/);
    assert.match(troubleshooting, /Get-ChildItem "\$env:USERPROFILE\\\.codex\\skills" -Recurse -Filter SKILL\.md/);
    assert.match(troubleshooting, /Get-ChildItem "\.\\\.codex\\skills" -Recurse -Filter SKILL\.md/);
    assert.match(troubleshooting, /Close every Codex window or terminal session that was open before the install/);
    assert.match(troubleshooting, /\$gsd-help/);
    assert.match(troubleshooting, /If the files exist but commands still do not appear after a full restart/);
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
      /Social preview caption: Get Shit Done Codex, a Codex-first workflow system for planned, resumable, verified AI coding\./,
    );
    assert.match(
      promotion,
      /Terminal preview caption: verified `npx` install plus `\$gsd-help` discovery for Codex users\./,
    );
    assert.match(
      promotion,
      /docs\.github\.com\/en\/repositories\/managing-your-repositorys-settings-and-features\/customizing-your-repository\/customizing-your-repositorys-social-media-preview/,
    );
  });

  test('README embeds the social preview before workflow details', () => {
    const previewPath = path.join(ROOT, 'assets', 'social-preview.png');
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    const previewEmbed =
      '![Social preview showing the Get Shit Done Codex name and Codex-first workflow positioning](assets/social-preview.png)';
    const terminalEmbed =
      '![Terminal preview of installing GSD Codex with npx and opening $gsd-help](assets/terminal.svg)';
    const embedIndex = readme.indexOf(previewEmbed);
    const workflowIndex = readme.indexOf('## 60-Second Workflow');

    assert.equal(fs.existsSync(previewPath), true, 'assets/social-preview.png should exist');
    assert.ok(embedIndex > -1, 'README should embed the social preview asset');
    assert.ok(
      embedIndex < workflowIndex,
      'README social preview should appear before workflow details',
    );
    assert.match(
      readme,
      /Social preview: Get Shit Done Codex, a Codex-first workflow system for planned, resumable, verified AI coding\./,
    );
    assert.ok(readme.includes(terminalEmbed), 'README should embed terminal preview with descriptive alt text');
    assert.match(
      readme,
      /Terminal preview: verified `npx` install plus `\$gsd-help` discovery for Codex users\./,
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
    assert.match(unreleasedSection, /Demo media checklist/);
    assert.match(unreleasedSection, /Demo Media Checklist/);
    assert.match(unreleasedSection, /Fast versus quick FAQ/);
    assert.match(unreleasedSection, /\$gsd-fast/);
    assert.match(unreleasedSection, /\$gsd-quick --validate/);
    assert.match(unreleasedSection, /PR branch recovery troubleshooting/);
    assert.match(unreleasedSection, /docs\/TROUBLESHOOTING\.md/);
    assert.match(unreleasedSection, /\$gsd-pr-branch/);
    assert.match(unreleasedSection, /Setup question routing note/);
    assert.match(unreleasedSection, /SUPPORT\.md/);
    assert.match(unreleasedSection, /GitHub Discussions/);
    assert.match(unreleasedSection, /Stale npm metadata FAQ/);
    assert.match(unreleasedSection, /npm view @oisinwang\/get-shit-done-codex version/);
    assert.match(unreleasedSection, /Local versus global install FAQ/);
    assert.match(unreleasedSection, /--local/);
    assert.match(unreleasedSection, /--global/);
    assert.match(unreleasedSection, /Documentation issue evidence troubleshooting/);
    assert.match(unreleasedSection, /git status --short/);
    assert.match(unreleasedSection, /git diff --stat/);
    assert.match(unreleasedSection, /Expected local trial files FAQ/);
    assert.match(unreleasedSection, /\.codex/);
    assert.match(unreleasedSection, /AGENTS\.md/);
    assert.match(unreleasedSection, /\.planning/);
    assert.match(unreleasedSection, /Source docs versus published package docs troubleshooting/);
    assert.match(unreleasedSection, /codex\/bootstrap/);
    assert.match(unreleasedSection, /published npm package docs/);
    assert.match(unreleasedSection, /Map-codebase versus new-project FAQ/);
    assert.match(unreleasedSection, /\$gsd-map-codebase/);
    assert.match(unreleasedSection, /\$gsd-new-project --auto/);
    assert.match(unreleasedSection, /Evaluation pull request FAQ/);
    assert.match(unreleasedSection, /first GSD evaluation pull request/);
    assert.match(unreleasedSection, /reviewable setup and planning artifacts/);
    assert.match(unreleasedSection, /Discussions versus issues FAQ/);
    assert.match(unreleasedSection, /setup questions, workflow advice/);
    assert.match(unreleasedSection, /reproducible bugs and stale documentation/);
    assert.match(unreleasedSection, /Minimal install reproduction FAQ/);
    assert.match(unreleasedSection, /clean temporary directory or fresh trial branch/);
    assert.match(unreleasedSection, /git status --short/);
    assert.match(unreleasedSection, /Safe demo recording FAQ/);
    assert.match(unreleasedSection, /60-second demo/);
    assert.match(unreleasedSection, /generated artifacts and redaction guidance/);
    assert.match(unreleasedSection, /Finished demo link placement FAQ/);
    assert.match(unreleasedSection, /README terminal preview/);
    assert.match(unreleasedSection, /docs\/DEMO\.md 60-second workflow/);
    assert.match(unreleasedSection, /Docs-only contribution verification FAQ/);
    assert.match(unreleasedSection, /git diff --check/);
    assert.match(unreleasedSection, /public-release-metadata/);
    assert.match(unreleasedSection, /Localized docs sync FAQ/);
    assert.match(unreleasedSection, /English source docs/);
    assert.match(unreleasedSection, /Codex-first package and repository naming/);
    assert.match(unreleasedSection, /Localized docs index FAQ links/);
    assert.match(unreleasedSection, /docs\/FAQ\.md/);
    assert.match(unreleasedSection, /Localized docs index troubleshooting links/);
    assert.match(unreleasedSection, /docs\/TROUBLESHOOTING\.md/);
    assert.match(unreleasedSection, /Localized docs index examples links/);
    assert.match(unreleasedSection, /docs\/EXAMPLES\.md/);
    assert.match(unreleasedSection, /README badge and link refresh FAQ/);
    assert.match(unreleasedSection, /npm badges/);
    assert.match(unreleasedSection, /GitHub Actions and star-history links/);
    assert.match(unreleasedSection, /Release issue handoff FAQ/);
    assert.match(unreleasedSection, /source fix commit/);
    assert.match(unreleasedSection, /pending release label/);
    assert.match(unreleasedSection, /Release dry-run evidence FAQ/);
    assert.match(unreleasedSection, /dry_run=true/);
    assert.match(unreleasedSection, /workflow URL or run ID/);
    assert.match(unreleasedSection, /Npm publish closure evidence FAQ/);
    assert.match(unreleasedSection, /publish timestamp/);
    assert.match(unreleasedSection, /clean install check/);
    assert.match(unreleasedSection, /Npm dist-tag rollback evidence FAQ/);
    assert.match(unreleasedSection, /npm dist-tag ls/);
    assert.match(unreleasedSection, /affected version/);
    assert.match(unreleasedSection, /Npm provenance and package integrity FAQ/);
    assert.match(unreleasedSection, /dist\.integrity/);
    assert.match(unreleasedSection, /git tag/);
    assert.match(unreleasedSection, /Npm deprecation evidence FAQ/);
    assert.match(unreleasedSection, /npm deprecate/);
    assert.match(unreleasedSection, /deprecation message/);
    assert.match(unreleasedSection, /Real-world install troubleshooting example/);
    assert.match(unreleasedSection, /npx @latest install check/);
    assert.match(unreleasedSection, /pending release label guidance/);
    assert.match(unreleasedSection, /README safe 10-minute trial block/);
    assert.match(unreleasedSection, /disposable branch/);
    assert.match(unreleasedSection, /Localized README safe trial path/);
    assert.match(unreleasedSection, /docs\/EVALUATE\.md/);
    assert.match(unreleasedSection, /README before and after example/);
    assert.match(unreleasedSection, /Make onboarding less confusing/);
    assert.match(unreleasedSection, /Safe trial demo script/);
    assert.match(unreleasedSection, /scripts\/safe-trial-demo\.cjs/);
    assert.match(unreleasedSection, /Safe trial demo transcript/);
    assert.match(unreleasedSection, /SAFE-TRIAL-TRANSCRIPT\.md/);
    assert.match(unreleasedSection, /Safe trial outcome template/);
    assert.match(unreleasedSection, /SAFE-TRIAL-OUTCOME\.md/);
    assert.match(unreleasedSection, /Localized safe trial support links/);
    assert.match(unreleasedSection, /localized README files/);
    assert.match(unreleasedSection, /Safe trial discussion starter/);
    assert.match(unreleasedSection, /SAFE-TRIAL-DISCUSSION\.md/);
    assert.match(unreleasedSection, /Localized safe trial discussion links/);
    assert.match(unreleasedSection, /Safe trial troubleshooting quick fixes/);
    assert.match(unreleasedSection, /SAFE-TRIAL-TROUBLESHOOTING\.md/);
    assert.match(unreleasedSection, /Safe trial issue chooser hints/);
    assert.match(unreleasedSection, /Localized safe trial troubleshooting links/);
    assert.match(unreleasedSection, /Localized safe trial troubleshooting docs index links/);
    assert.match(unreleasedSection, /Localized safe trial outcome docs index links/);
    assert.match(unreleasedSection, /Localized safe trial discussion docs index links/);
    assert.match(unreleasedSection, /Localized safe trial transcript docs index links/);
    assert.match(unreleasedSection, /Localized safe trial quick links grouping/);
    assert.match(unreleasedSection, /Localized docs index support route links/);
    assert.match(unreleasedSection, /Localized docs index contribution links/);
    assert.match(unreleasedSection, /Localized docs index maintainer checklist links/);
    assert.match(unreleasedSection, /Localized docs index promotion links/);
    assert.match(unreleasedSection, /Localized docs index demo links/);
    assert.match(unreleasedSection, /Evaluation checklist/);
    assert.match(unreleasedSection, /docs\/EVALUATE\.md/);
    assert.match(unreleasedSection, /README value hook/);
    assert.match(unreleasedSection, /Security policy exposure/);
    assert.match(unreleasedSection, /SECURITY\.md/);
    assert.match(unreleasedSection, /Existing repo safe trial/);
    assert.match(unreleasedSection, /docs\/EXAMPLES\.md/);
    assert.match(unreleasedSection, /Simplified Chinese comparison guide/);
    assert.match(unreleasedSection, /docs\/zh-CN\/COMPARISON\.md/);
    assert.match(unreleasedSection, /Japanese comparison guide/);
    assert.match(unreleasedSection, /docs\/ja-JP\/COMPARISON\.md/);
    assert.match(unreleasedSection, /Korean comparison guide/);
    assert.match(unreleasedSection, /docs\/ko-KR\/COMPARISON\.md/);
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
    assert.match(unreleasedSection, /Korean prompt recipes/);
    assert.match(unreleasedSection, /docs\/ko-KR\/PROMPTS\.md/);
    assert.match(unreleasedSection, /Release checklist/);
    assert.match(unreleasedSection, /docs\/RELEASE\.md/);
    assert.match(unreleasedSection, /Review findings fix example/);
    assert.match(unreleasedSection, /\$gsd-code-review-fix 1/);
    assert.match(unreleasedSection, /PATH diagnostics troubleshooting/);
    assert.match(unreleasedSection, /docs\/TROUBLESHOOTING\.md/);
    assert.match(unreleasedSection, /Backlog review example/);
    assert.match(unreleasedSection, /\$gsd-review-backlog/);
    assert.match(unreleasedSection, /Validation evidence example/);
    assert.match(unreleasedSection, /\$gsd-validate-phase 1/);
    assert.match(unreleasedSection, /AI eval review example/);
    assert.match(unreleasedSection, /\$gsd-eval-review 3/);
    assert.match(unreleasedSection, /Thread context example/);
    assert.match(unreleasedSection, /\$gsd-thread "Investigate flaky release"/);
    assert.match(unreleasedSection, /Pause-work example/);
    assert.match(unreleasedSection, /\$gsd-pause-work/);
    assert.match(unreleasedSection, /Session-report example/);
    assert.match(unreleasedSection, /\$gsd-session-report/);
    assert.match(unreleasedSection, /Cleanup example/);
    assert.match(unreleasedSection, /\$gsd-cleanup/);
    assert.match(unreleasedSection, /Maintainer checklist/);
    assert.match(unreleasedSection, /docs\/MAINTAINER-CHECKLIST\.md/);
    assert.match(unreleasedSection, /Stats example/);
    assert.match(unreleasedSection, /\$gsd-stats/);
    assert.match(unreleasedSection, /Health repair example/);
    assert.match(unreleasedSection, /\$gsd-health --repair/);
    assert.match(unreleasedSection, /Profile-user example/);
    assert.match(unreleasedSection, /\$gsd-profile-user --questionnaire/);
    assert.match(unreleasedSection, /Settings example/);
    assert.match(unreleasedSection, /\$gsd-settings/);
    assert.match(unreleasedSection, /Audit-fix example/);
    assert.match(unreleasedSection, /\$gsd-audit-fix --dry-run/);
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

  test('localized READMEs mirror the safe local trial path', () => {
    const localizedReadmes = [
      'README.pt-BR.md',
      'README.zh-CN.md',
      'README.ja-JP.md',
      'README.ko-KR.md',
    ];

    for (const relativePath of localizedReadmes) {
      const readme = fs.readFileSync(path.join(ROOT, relativePath), 'utf8');

      assert.match(readme, /10/, relativePath);
      assert.match(readme, /git switch -c evaluate-gsd-codex/, relativePath);
      assert.match(
        readme,
        /npx @oisinwang\/get-shit-done-codex@latest --codex --local/,
        relativePath,
      );
      assert.match(readme, /\$gsd-new-project --auto/, relativePath);
      assert.match(readme, /\$gsd-next/, relativePath);
      assert.match(readme, /git status --short/, relativePath);
      assert.match(readme, /`\.codex\/`/, relativePath);
      assert.match(readme, /`AGENTS\.md`/, relativePath);
      assert.match(readme, /`\.planning\/`/, relativePath);
      assert.match(readme, /docs\/EVALUATE\.md/, relativePath);
      assert.match(readme, /docs\/SAFE-TRIAL-TRANSCRIPT\.md/, relativePath);
      assert.match(readme, /docs\/SAFE-TRIAL-OUTCOME\.md/, relativePath);
      assert.match(readme, /docs\/SAFE-TRIAL-DISCUSSION\.md/, relativePath);
      assert.match(readme, /docs\/SAFE-TRIAL-TROUBLESHOOTING\.md/, relativePath);
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
      assert.match(readme, /- \*\*Get help:\*\* \[Support\]\(\.\.\/\.\.\/SUPPORT\.md\)/, relativePath);
      assert.match(
        readme,
        /- \*\*Ask or discuss:\*\* \[GitHub Discussions\]\(https:\/\/github\.com\/Oisinwang\/get-shit-done-codex\/discussions\)/,
        relativePath,
      );
      assert.match(readme, /- \*\*Contribute:\*\* \[Contributing Guide\]\(\.\.\/\.\.\/CONTRIBUTING\.md\)/, relativePath);
      assert.match(
        readme,
        /- \*\*Find starter tasks:\*\* \[Good First Issues\]\(https:\/\/github\.com\/Oisinwang\/get-shit-done-codex\/issues\?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22\)/,
        relativePath,
      );
      assert.match(
        readme,
        /## Contribution quick links\r?\n\r?\n- \*\*Contribute:\*\* \[Contributing Guide\]\(\.\.\/\.\.\/CONTRIBUTING\.md\)\r?\n- \*\*Find starter tasks:\*\* \[Good First Issues\]\(https:\/\/github\.com\/Oisinwang\/get-shit-done-codex\/issues\?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22\)/,
        relativePath,
      );
      assert.match(readme, /- \*\*Publish a fix:\*\* \[Release Checklist\]\(\.\.\/RELEASE\.md\)/, relativePath);
      assert.match(
        readme,
        /- \*\*Close contributor tasks:\*\* \[Maintainer Checklist\]\(\.\.\/MAINTAINER-CHECKLIST\.md\)/,
        relativePath,
      );
      assert.match(
        readme,
        /## Maintainer quick links\r?\n\r?\n- \*\*Publish a fix:\*\* \[Release Checklist\]\(\.\.\/RELEASE\.md\)\r?\n- \*\*Close contributor tasks:\*\* \[Maintainer Checklist\]\(\.\.\/MAINTAINER-CHECKLIST\.md\)/,
        relativePath,
      );
      assert.match(
        readme,
        /- \*\*Share the project:\*\* \[Promotion Assets\]\(\.\.\/PROMOTION\.md\)/,
        relativePath,
      );
      assert.match(
        readme,
        /## Promotion quick links\r?\n\r?\n- \*\*Share the project:\*\* \[Promotion Assets\]\(\.\.\/PROMOTION\.md\)/,
        relativePath,
      );
      assert.match(readme, /- \*\*See the first run:\*\* \[Demo\]\(\.\.\/DEMO\.md\)/, relativePath);
      assert.match(
        readme,
        /- \*\*Record a short demo:\*\* \[Demo Media Checklist\]\(\.\.\/DEMO\.md#demo-media-checklist\)/,
        relativePath,
      );
      assert.match(
        readme,
        /## Demo quick links\r?\n\r?\n- \*\*See the first run:\*\* \[Demo\]\(\.\.\/DEMO\.md\)\r?\n- \*\*Record a short demo:\*\* \[Demo Media Checklist\]\(\.\.\/DEMO\.md#demo-media-checklist\)/,
        relativePath,
      );
      assert.match(readme, /- \*\*Answer common questions:\*\* \[FAQ\]\(\.\.\/FAQ\.md\)/, relativePath);
      assert.match(
        readme,
        /## FAQ quick links\r?\n\r?\n- \*\*Answer common questions:\*\* \[FAQ\]\(\.\.\/FAQ\.md\)/,
        relativePath,
      );
      assert.match(readme, /- \*\*Recover install issues:\*\* \[Troubleshooting\]\(\.\.\/TROUBLESHOOTING\.md\)/, relativePath);
      assert.match(
        readme,
        /## Troubleshooting quick links\r?\n\r?\n- \*\*Recover install issues:\*\* \[Troubleshooting\]\(\.\.\/TROUBLESHOOTING\.md\)/,
        relativePath,
      );
      assert.match(readme, /- \*\*Pick a workflow:\*\* \[Examples\]\(\.\.\/EXAMPLES\.md\)/, relativePath);
      assert.match(
        readme,
        /## Examples quick links\r?\n\r?\n- \*\*Pick a workflow:\*\* \[Examples\]\(\.\.\/EXAMPLES\.md\)/,
        relativePath,
      );
      assert.match(readme, /\]\(\.\.\/SAFE-TRIAL-TROUBLESHOOTING\.md\)/, relativePath);
      assert.match(readme, /\]\(\.\.\/SAFE-TRIAL-OUTCOME\.md\)/, relativePath);
      assert.match(readme, /\]\(\.\.\/SAFE-TRIAL-DISCUSSION\.md\)/, relativePath);
      assert.match(readme, /\]\(\.\.\/SAFE-TRIAL-TRANSCRIPT\.md\)/, relativePath);
      assert.match(
        readme,
        /## Safe trial quick links\r?\n\r?\n- \[Safe Trial Troubleshooting\]\(\.\.\/SAFE-TRIAL-TROUBLESHOOTING\.md\)\r?\n- \[Safe Trial Outcome Template\]\(\.\.\/SAFE-TRIAL-OUTCOME\.md\)\r?\n- \[Safe Trial Discussion Starter\]\(\.\.\/SAFE-TRIAL-DISCUSSION\.md\)\r?\n- \[Safe Trial Transcript\]\(\.\.\/SAFE-TRIAL-TRANSCRIPT\.md\)/,
        relativePath,
      );

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

  test('Japanese comparison guide mirrors public comparison tradeoffs', () => {
    const jaRootReadme = fs.readFileSync(path.join(ROOT, 'README.ja-JP.md'), 'utf8');
    const jaDocsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'ja-JP', 'README.md'), 'utf8');
    const jaComparisonPath = path.join(ROOT, 'docs', 'ja-JP', 'COMPARISON.md');

    assert.equal(fs.existsSync(jaComparisonPath), true, 'docs/ja-JP/COMPARISON.md should exist');

    const jaComparison = fs.readFileSync(jaComparisonPath, 'utf8');

    assert.match(jaRootReadme, /\[比較\]\(docs\/ja-JP\/COMPARISON\.md\)/);
    assert.match(jaDocsReadme, /\[比較ガイド\]\(COMPARISON\.md\)/);
    assert.match(jaComparison, /# 比較ガイド/);
    assert.match(jaComparison, /生の Codex chat/);
    assert.match(jaComparison, /prompt pack/);
    assert.match(jaComparison, /task manager/);
    assert.match(jaComparison, /CI-only workflow/);
    assert.match(jaComparison, /完全なエンタープライズプロセス/);
    assert.match(jaComparison, /GSD Codex を選ぶ/);
    assert.match(jaComparison, /GSD Codex を使わない/);
    assert.match(jaComparison, /Codex そのものの代替ではありません/);
    assert.match(jaComparison, /AGENTS\.md/);
    assert.match(jaComparison, /\.codex\//);
    assert.match(jaComparison, /\.planning\//);
    assert.match(jaComparison, /\$gsd-\*/);
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

  test('Korean comparison guide mirrors public comparison tradeoffs', () => {
    const koRootReadme = fs.readFileSync(path.join(ROOT, 'README.ko-KR.md'), 'utf8');
    const koDocsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'ko-KR', 'README.md'), 'utf8');
    const koComparisonPath = path.join(ROOT, 'docs', 'ko-KR', 'COMPARISON.md');

    assert.equal(fs.existsSync(koComparisonPath), true, 'docs/ko-KR/COMPARISON.md should exist');

    const koComparison = fs.readFileSync(koComparisonPath, 'utf8');

    assert.match(koRootReadme, /\[비교\]\(docs\/ko-KR\/COMPARISON\.md\)/);
    assert.match(koDocsReadme, /\[비교 가이드\]\(COMPARISON\.md\)/);
    assert.match(koComparison, /# 비교 가이드/);
    assert.match(koComparison, /원시 Codex chat/);
    assert.match(koComparison, /prompt pack/);
    assert.match(koComparison, /task manager/);
    assert.match(koComparison, /CI-only workflow/);
    assert.match(koComparison, /완전한 엔터프라이즈 프로세스/);
    assert.match(koComparison, /GSD Codex를 선택/);
    assert.match(koComparison, /GSD Codex를 사용하지/);
    assert.match(koComparison, /Codex 자체의 대체품이 아닙니다/);
    assert.match(koComparison, /AGENTS\.md/);
    assert.match(koComparison, /\.codex\//);
    assert.match(koComparison, /\.planning\//);
    assert.match(koComparison, /\$gsd-\*/);
  });

  test('Korean prompt recipes mirror public starter prompts', () => {
    const koDocsReadme = fs.readFileSync(path.join(ROOT, 'docs', 'ko-KR', 'README.md'), 'utf8');
    const koPromptsPath = path.join(ROOT, 'docs', 'ko-KR', 'PROMPTS.md');

    assert.equal(fs.existsSync(koPromptsPath), true, 'docs/ko-KR/PROMPTS.md should exist');

    const koPrompts = fs.readFileSync(koPromptsPath, 'utf8');

    assert.match(koDocsReadme, /\[프롬프트 레시피\]\(PROMPTS\.md\)/);
    assert.match(koPrompts, /# 프롬프트 레시피/);
    assert.match(koPrompts, /Codex에 붙여넣으세요/);
    assert.match(koPrompts, /## 새 프로젝트 시작/);
    assert.match(koPrompts, /## 기존 저장소/);
    assert.match(koPrompts, /## 작은 수정/);
    assert.match(koPrompts, /## 작업 재개/);
    assert.match(koPrompts, /## 감사 및 수정/);
    assert.match(koPrompts, /\$gsd-new-project --auto/);
    assert.match(koPrompts, /\$gsd-map-codebase/);
    assert.match(koPrompts, /\$gsd-fast/);
    assert.match(koPrompts, /\$gsd-resume-work/);
    assert.match(koPrompts, /\$gsd-progress --forensic/);
    assert.match(koPrompts, /\$gsd-audit-fix/);
    assert.match(koPrompts, /\.planning\//);
    assert.match(koPrompts, /검증을 건너뛰지 마세요/);
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
    assert.match(support, /Setup questions belong in GitHub Discussions/);
    assert.match(support, /local versus global install/);
    assert.match(support, /\$gsd-help is missing/);
    assert.match(support, /which workflow should I run/);
    assert.match(support, /Bug reports need reproducible evidence/);
    assert.match(support, /exact command/);
    assert.match(support, /exact error text/);
    assert.match(support, /operating system and shell/);
    assert.match(support, /Node\.js version/);
    assert.match(support, /GSD package version/);
    assert.match(support, /install scope/);
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
    const issueChooserConfig = fs.readFileSync(path.join(ROOT, '.github', 'ISSUE_TEMPLATE', 'config.yml'), 'utf8');
    assert.match(bugTemplate, /npm list -g @oisinwang\/get-shit-done-codex/);
    assert.match(bugTemplate, /options:\r?\n        - Codex\r?\n        - Claude Code/);
    assert.match(bugTemplate, /Select runtime: Codex/);
    assert.match(bugTemplate, /Codex: `cat ~\/\.codex\/config\.toml`/);
    assert.match(bugTemplate, /Safe Trial Troubleshooting/);
    assert.match(bugTemplate, /docs\/SAFE-TRIAL-TROUBLESHOOTING\.md/);
    assert.match(bugTemplate, /Safe Trial Discussion Starter/);
    assert.match(bugTemplate, /git status --short/);
    assert.match(bugTemplate, /git diff --stat/);
    assert.match(bugTemplate, /npx @oisinwang\/get-shit-done-codex@latest --codex --local/);
    assert.match(bugTemplate, /\$gsd-new-project --auto/);
    assert.match(bugTemplate, /\$gsd-next/);
    assert.doesNotMatch(bugTemplate, /\/gsd-init/);
    assert.doesNotMatch(bugTemplate, /\/gsd-plan/);
    assert.match(issueChooserConfig, /Safe trial troubleshooting/);
    assert.match(issueChooserConfig, /docs\/SAFE-TRIAL-TROUBLESHOOTING\.md/);
    assert.match(issueChooserConfig, /First-run local trial/);

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
