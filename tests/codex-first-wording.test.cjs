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
    assert.ok(!content.includes('generate-claude-profile --analysis "$ANALYSIS_PATH"'));
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
});
