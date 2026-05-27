'use strict';

const { describe, test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');

function readRepoFile(relativePath) {
  return fs.readFileSync(path.join(REPO_ROOT, relativePath), 'utf8');
}

describe('codex-first canonical wording', () => {
  test('new-project generates AGENTS.md with canonical command names', () => {
    const content = readRepoFile('get-shit-done/workflows/new-project.md');
    assert.ok(content.includes('INSTRUCTION_FILE="AGENTS.md"'));
    assert.ok(content.includes('gsd-sdk query generate-agents-md --output "$INSTRUCTION_FILE"'));
    assert.ok(!content.includes('generate-claude-md --output "$INSTRUCTION_FILE"'));
  });

  test('profile-user uses AGENTS.md profile artifacts and codex paths', () => {
    const content = readRepoFile('get-shit-done/workflows/profile-user.md');
    assert.ok(content.includes('AGENTS.md profile section'));
    assert.ok(content.includes('Global AGENTS.md'));
    assert.ok(content.includes('generate-agents-profile'));
    assert.ok(content.includes('$HOME/.codex/commands/gsd/dev-preferences.md'));
    assert.ok(content.includes('$HOME/.codex/AGENTS.md'));
    assert.doesNotMatch(content, /Claude starts every conversation generic/);
    assert.doesNotMatch(content, /Your recent Claude Code sessions/);
    assert.doesNotMatch(content, /What makes you correct Claude/);
    assert.ok(!content.includes('generate-claude-profile --analysis "$ANALYSIS_PATH"'));
  });

  test('profile-user command advertises Codex and AGENTS.md artifacts', () => {
    const content = readRepoFile('commands/gsd/profile-user.md');

    assert.match(content, /Codex-discoverable artifacts/);
    assert.match(content, /AGENTS\.md section/);
    assert.match(content, /@~\/\.codex\/get-shit-done\/workflows\/profile-user\.md/);
    assert.doesNotMatch(content, /Claude-discoverable/);
    assert.doesNotMatch(content, /CLAUDE\.md section/);
    assert.doesNotMatch(content, /@~\/\.claude\/get-shit-done\/workflows\/profile-user\.md/);
  });

  test('discussion and planning probe .codex skills before legacy .claude fallback', () => {
    const discuss = readRepoFile('get-shit-done/workflows/discuss-phase.md');
    const plan = readRepoFile('get-shit-done/workflows/plan-phase.md');

    assert.ok(discuss.includes('./.codex/skills/spike-findings-*/SKILL.md'));
    assert.ok(discuss.includes('./.claude/skills/spike-findings-*/SKILL.md'));
    assert.ok(plan.includes('./.codex/skills/sketch-findings-*/SKILL.md'));
    assert.ok(plan.includes('./.claude/skills/sketch-findings-*/SKILL.md'));
  });

  test('runtime agent references use codex install paths on canonical workflow surfaces', () => {
    const aiIntegration = readRepoFile('get-shit-done/workflows/ai-integration-phase.md');
    const evalReview = readRepoFile('get-shit-done/workflows/eval-review.md');
    const securePhase = readRepoFile('get-shit-done/workflows/secure-phase.md');

    assert.ok(aiIntegration.includes('~/.codex/get-shit-done/agents/gsd-framework-selector.md'));
    assert.ok(evalReview.includes('~/.codex/get-shit-done/agents/gsd-eval-auditor.md'));
    assert.ok(securePhase.includes('~/.codex/get-shit-done/agents/gsd-security-auditor.md'));
  });

  test('wrap-up workflows write skills to .codex and update AGENTS.md', () => {
    const spike = readRepoFile('get-shit-done/workflows/spike-wrap-up.md');
    const sketch = readRepoFile('get-shit-done/workflows/sketch-wrap-up.md');

    assert.ok(spike.includes('./.codex/skills/spike-findings-[project]/'));
    assert.ok(spike.includes('## Update Project AGENTS.md'));
    assert.ok(sketch.includes('./.codex/skills/sketch-findings-[project]/'));
    assert.ok(sketch.includes('## Update Project AGENTS.md'));
  });

  test('wrap-up command and docs advertise codex skill output paths', () => {
    const files = [
      'commands/gsd/spike-wrap-up.md',
      'commands/gsd/sketch-wrap-up.md',
      'docs/USER-GUIDE.md',
      'docs/FEATURES.md',
    ];

    for (const relativePath of files) {
      const content = readRepoFile(relativePath);
      assert.match(content, /\.codex\/skills\/(?:spike|sketch)-findings-\[project\]/, relativePath);
      assert.doesNotMatch(content, /\.claude\/skills\/(?:spike|sketch)-findings-\[project\]/, relativePath);
    }
  });

  test('README context engineering and closing tagline are Codex-first', () => {
    const readme = readRepoFile('README.md');

    assert.match(readme, /Codex is powerful when it has durable project context/i);
    assert.match(readme, /Codex is powerful\. GSD makes long-running work verifiable\./);
    assert.doesNotMatch(readme, /Claude Code is incredibly powerful/i);
    assert.doesNotMatch(readme, /Claude Code is powerful\. GSD makes it reliable\./);
  });

  test('README workflow examples use Codex command syntax by default', () => {
    const readme = readRepoFile('README.md');
    const mainUsage = readme.slice(readme.indexOf('## How It Works'), readme.indexOf('## Configuration'));

    assert.match(mainUsage, /\$gsd-new-project/);
    assert.match(mainUsage, /\$gsd-quick/);
    assert.doesNotMatch(mainUsage, /\/gsd-/);
    assert.doesNotMatch(readme, /Every plan is structured XML optimized for Claude/);
    assert.doesNotMatch(readme, /Control which Claude model each agent uses/);
  });

  test('release-facing docs present scoped npm install as the verified path', () => {
    const readme = readRepoFile('README.md');
    const forkNotes = readRepoFile('docs/CODEX-FORK.md');

    assert.match(readme, /npx @oisinwang\/get-shit-done-codex@latest/);
    assert.doesNotMatch(readme, /npx get-shit-done-codex/);
    assert.doesNotMatch(readme, /Registry package is behind this fork's public branch/);
    assert.match(readme, /Codex is the primary runtime in this fork/);
    assert.match(forkNotes, /Allowed Legacy-Reference Zones/);
    assert.match(forkNotes, /public-facing README, contributor instruction, or release note outside those zones should describe Codex-first semantics as the default/i);
  });
});
