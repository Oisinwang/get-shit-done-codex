# Codex Compatibility Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove Claude-first wording from canonical surfaces so the fork reads as Codex-first by default while keeping only the minimum compatibility shims that still matter.

**Architecture:** Split the work into three rings: canonical vocabulary, runtime prompts/workflows, and enforcement. Canonical surfaces should speak in terms of `AGENTS.md`, `.codex`, `agents_md_path`, and `generate-agents-*`; legacy `CLAUDE.md`, `.claude`, and `generate-claude-*` should survive only in explicit compatibility or migration contexts.

**Tech Stack:** Markdown prompt assets, CJS workflows, SDK TypeScript, Node test scans, git grep verification

---

### Task 1: Freeze the canonical naming contract

**Files:**
- Modify: `docs/CODEX-FORK.md`
- Modify: `docs/CONFIGURATION.md`
- Modify: `docs/AGENTS.md`

- [ ] **Step 1: Baseline the remaining compatibility vocabulary**

Run:

```powershell
git grep -n -e "\.claude" -e "CLAUDE\.md" -e "generate-claude-" -e "claude_md_path" -- docs README.md README.zh-CN.md README.ja-JP.md README.ko-KR.md agents get-shit-done/workflows sdk/src sdk/prompts
```

Expected: a hotspot list dominated by `agents/`, `get-shit-done/workflows/`, `sdk/src/`, and localized READMEs.

- [ ] **Step 2: Define the canonical-vs-legacy matrix in fork docs**

Add a compact matrix to `docs/CODEX-FORK.md` and mirror the config-related part in `docs/CONFIGURATION.md`:

```md
| Canonical | Legacy alias | Status |
|-----------|--------------|--------|
| `AGENTS.md` | `CLAUDE.md` | compatibility only |
| `agents_md_path` | `claude_md_path` | compatibility only |
| `generate-agents-md` | `generate-claude-md` | compatibility only |
| `generate-agents-profile` | `generate-claude-profile` | compatibility only |
| `./.codex/skills/` | `./.claude/skills/` | compatibility / migration |
```

- [ ] **Step 3: Define the allowed legacy-reference zones**

Document that legacy wording is still acceptable only in:

```md
- runtime-specific Claude install instructions
- migration notes
- compatibility registry code and alias tests
- historical changelog entries
- upstream-reference docs that explicitly say "upstream"
```

- [ ] **Step 4: Commit the contract-only doc changes**

Run:

```bash
git add docs/CODEX-FORK.md docs/CONFIGURATION.md docs/AGENTS.md
git commit -m "docs: define codex-first naming contract"
```

Expected: a docs-only commit that future cleanup tasks can reference.

### Task 2: Clean user-facing docs so Codex is the default story

**Files:**
- Modify: `README.md`
- Modify: `README.zh-CN.md`
- Modify: `README.ja-JP.md`
- Modify: `README.ko-KR.md`
- Modify: `docs/ARCHITECTURE.md`
- Modify: `docs/CLI-TOOLS.md`

- [ ] **Step 1: Rewrite canonical instruction-file wording**

Replace user-facing wording like this:

```md
Read `./CLAUDE.md` if it exists.
```

with wording like this:

```md
Read `./AGENTS.md` if it exists. Older projects may still expose `CLAUDE.md` during migration.
```

- [ ] **Step 2: Rewrite canonical skill-root wording**

Prefer this wording in non-Claude-specific docs:

```md
Check `.codex/skills/` or `.agents/skills/` if either exists. Legacy `.claude/skills/` may still appear in migrated projects.
```

- [ ] **Step 3: Keep true Claude-runtime instructions explicitly scoped**

Retain runtime-specific install lines like:

```md
npx get-shit-done-codex --claude --global   # Install to ~/.claude/
```

but ensure the surrounding section states that these are Claude compatibility/runtime instructions, not the fork's default contract.

- [ ] **Step 4: Re-scan the user-facing docs**

Run:

```powershell
git grep -n -e "\.claude" -e "CLAUDE\.md" -e "generate-claude-" -e "claude_md_path" -- README.md README.zh-CN.md README.ja-JP.md README.ko-KR.md docs
```

Expected: remaining hits should be clearly labeled compatibility/migration/runtime-specific, not default guidance.

- [ ] **Step 5: Commit the user-doc cleanup**

Run:

```bash
git add README.md README.zh-CN.md README.ja-JP.md README.ko-KR.md docs/ARCHITECTURE.md docs/CLI-TOOLS.md
git commit -m "docs: make codex-first guidance canonical"
```

### Task 3: Rewrite agent and workflow prompts to use Codex-first semantics

**Files:**
- Modify: `agents/gsd-executor.md`
- Modify: `agents/gsd-planner.md`
- Modify: `agents/gsd-phase-researcher.md`
- Modify: `agents/gsd-plan-checker.md`
- Modify: `agents/gsd-verifier.md`
- Modify: `agents/gsd-debugger.md`
- Modify: `agents/gsd-code-fixer.md`
- Modify: `agents/gsd-code-reviewer.md`
- Modify: `get-shit-done/workflows/new-project.md`
- Modify: `get-shit-done/workflows/plan-phase.md`
- Modify: `get-shit-done/workflows/quick.md`
- Modify: `get-shit-done/workflows/profile-user.md`
- Modify: `get-shit-done/workflows/spike-wrap-up.md`
- Modify: `get-shit-done/workflows/sketch-wrap-up.md`

- [ ] **Step 1: Replace project-instructions guidance**

Where prompts currently say:

```md
Read `./CLAUDE.md` if it exists.
```

rewrite to:

```md
Read `./AGENTS.md` if it exists. If the project still uses `CLAUDE.md`, treat it as a legacy alias during migration.
```

- [ ] **Step 2: Replace project-skill discovery guidance**

Where prompts currently say:

```md
Check `.claude/skills/` or `.agents/skills/`
```

rewrite to:

```md
Check `.codex/skills/` or `.agents/skills/`. Legacy `.claude/skills/` is migration-only.
```

- [ ] **Step 3: Replace hardcoded global reference paths**

Convert direct references like:

```md
@~/.claude/get-shit-done/references/mandatory-initial-read.md
```

to:

```md
@~/.codex/get-shit-done/references/mandatory-initial-read.md
```

and reserve `.claude` paths only for explicitly Claude-runtime workflows.

- [ ] **Step 4: Convert workflow command names to canonical aliases**

Change workflow examples from:

```bash
gsd-sdk query generate-claude-md --output "$INSTRUCTION_FILE"
gsd-sdk query generate-claude-profile --analysis "$ANALYSIS_PATH"
```

to:

```bash
gsd-sdk query generate-agents-md --output "$INSTRUCTION_FILE"
gsd-sdk query generate-agents-profile --analysis "$ANALYSIS_PATH"
```

Compatibility aliases should remain registered in code, but user-visible workflow examples should no longer prefer them.

- [ ] **Step 5: Commit the prompt-asset rewrite**

Run:

```bash
git add agents get-shit-done/workflows
git commit -m "docs: rewrite prompts for codex-first semantics"
```

### Task 4: Align SDK comments, fallback order, and type docs with the fork contract

**Files:**
- Modify: `sdk/src/gsd-tools.ts`
- Modify: `sdk/src/index.ts`
- Modify: `sdk/src/init-runner.ts`
- Modify: `sdk/src/phase-prompt.ts`
- Modify: `sdk/src/types.ts`
- Modify: `sdk/src/query/index.ts`

- [ ] **Step 1: Rewrite probe-order comments to Codex-first**

Prefer comment blocks like:

```ts
// Probe order: bundled repo copy -> project .codex install -> global .codex install -> legacy .claude fallback.
```

Do not remove the actual `.claude` fallback unless tests prove it is unused and safe to delete.

- [ ] **Step 2: Keep alias registration but mark it as legacy**

Near `generate-claude-md` / `generate-claude-profile` registration, add a short inline note:

```ts
// Legacy aliases retained for migration; canonical commands are generate-agents-*.
```

- [ ] **Step 3: Update type docs to describe Codex-first resolution**

Any SDK type comment that still says "falls back to .claude" should describe the full order and mark `.claude` as legacy fallback only.

- [ ] **Step 4: Run SDK-specific checks**

Run:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test -- src/query/registry.test.ts src/gsd-tools.test.ts src/query/skills.test.ts
```

Expected: the alias compatibility tests still pass while comments and behavior now describe Codex-first semantics.

- [ ] **Step 5: Commit the SDK compatibility cleanup**

Run:

```bash
git add sdk/src
git commit -m "docs: describe sdk fallback order as codex-first"
```

### Task 5: Add a regression scan so Claude-first wording does not quietly return

**Files:**
- Create: `tests/codex-first-wording.test.cjs`
- Modify: `scripts/run-tests.cjs` if explicit test registration is needed

- [ ] **Step 1: Add an allowlist-based wording scan**

Implement a scan that:

```js
const CANONICAL_SURFACES = [
  'README.md',
  'README.zh-CN.md',
  'README.ja-JP.md',
  'README.ko-KR.md',
  'agents/',
  'get-shit-done/workflows/',
  'sdk/src/',
  'sdk/prompts/',
];

const ALLOWLIST = [
  'docs/CODEX-FORK.md',
  'docs/CONFIGURATION.md',
  'CHANGELOG.md',
  'tests/',
];
```

and fails only when a non-allowlisted canonical surface still prefers `.claude`, `CLAUDE.md`, or `generate-claude-*` without a clear legacy marker.

- [ ] **Step 2: Make the scan string-based, not destructive**

The test should normalize path separators and look for patterns such as:

```js
/\bCLAUDE\.md\b/
/generate-claude-(md|profile)\b/
/\/\.claude\/|~\/\.claude\//
```

while skipping lines that also contain markers like `legacy`, `migration`, `compatibility`, or `Claude runtime`.

- [ ] **Step 3: Run full verification**

Run:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test
& 'C:\Program Files\nodejs\npm.cmd' test
```

The second command must be run in:

```text
sdk/
```

Expected: root and SDK suites stay green.

- [ ] **Step 4: Commit the guardrail**

Run:

```bash
git add tests/codex-first-wording.test.cjs scripts/run-tests.cjs
git commit -m "test: guard codex-first canonical wording"
```

## Self-Review

- Spec coverage: this plan covers canonical docs, runtime prompts, SDK comments, and future regression enforcement. The only intentional exclusions are `CHANGELOG.md`, explicit upstream references, and true Claude-runtime install instructions.
- Placeholder scan: no `TODO`, `TBD`, or "similar to above" placeholders remain.
- Type consistency: the plan consistently treats `AGENTS.md`, `.codex`, `agents_md_path`, and `generate-agents-*` as canonical, with `CLAUDE.md`, `.claude`, `claude_md_path`, and `generate-claude-*` as legacy shims.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-19-codex-compatibility-cleanup.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
