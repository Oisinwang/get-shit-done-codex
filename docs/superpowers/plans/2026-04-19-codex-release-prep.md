# Codex-First Release Prep Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `get-shit-done-codex` publishable as an independent Codex-first fork without breaking the minimum Claude compatibility layer.

**Architecture:** Execute three disjoint content workstreams in parallel: repository identity, public docs, and canonical prompt cleanup. Keep compatibility converters and legacy regression tests intact, then run the targeted Codex-first verification sweep and produce a release checklist.

**Tech Stack:** Node.js, npm, CommonJS runtime scripts, Markdown command/agent prompts, Vitest, Node test runner

---

### Task 1: Repository Identity and Contributor Routing

**Files:**
- Modify: `D:\codex_GSD\get-shit-done-codex\package.json`
- Modify: `D:\codex_GSD\get-shit-done-codex\package-lock.json`
- Modify: `D:\codex_GSD\get-shit-done-codex\sdk\package.json`
- Modify: `D:\codex_GSD\get-shit-done-codex\CONTRIBUTING.md`
- Modify: `D:\codex_GSD\get-shit-done-codex\.github\ISSUE_TEMPLATE\config.yml`
- Modify: `D:\codex_GSD\get-shit-done-codex\.github\ISSUE_TEMPLATE\bug_report.yml`
- Modify: `D:\codex_GSD\get-shit-done-codex\.github\ISSUE_TEMPLATE\chore.yml`
- Modify: `D:\codex_GSD\get-shit-done-codex\.github\ISSUE_TEMPLATE\docs_issue.yml`
- Modify: `D:\codex_GSD\get-shit-done-codex\.github\ISSUE_TEMPLATE\enhancement.yml`
- Modify: `D:\codex_GSD\get-shit-done-codex\.github\ISSUE_TEMPLATE\feature_request.yml`

- [ ] **Step 1: Audit the exact identity fields and upstream URLs in the owned files**

Run:
```powershell
Select-String -Path `
  'D:\codex_GSD\get-shit-done-codex\package.json', `
  'D:\codex_GSD\get-shit-done-codex\sdk\package.json', `
  'D:\codex_GSD\get-shit-done-codex\CONTRIBUTING.md', `
  'D:\codex_GSD\get-shit-done-codex\.github\ISSUE_TEMPLATE\*.yml' `
  -Pattern 'gsd-build/get-shit-done|get-shit-done-cc|T脗CHES|CLAUDE_CONFIG_DIR|~/.claude/'
```
Expected: hits showing remaining upstream URLs, old package identity, or stale Claude-first examples.

- [ ] **Step 2: Patch root package identity**

Apply these concrete changes in `package.json` and `package-lock.json`:
```json
{
  "name": "get-shit-done-codex",
  "bin": {
    "get-shit-done-codex": "bin/install.js",
    "get-shit-done-cc": "bin/install.js"
  }
}
```
Also replace the garbled `author` value with a clean ASCII placeholder or fork-specific maintainer string that is safe to publish.

- [ ] **Step 3: Patch SDK package identity**

Update `sdk/package.json` so release-visible metadata no longer points to upstream by default:
```json
{
  "name": "@get-shit-done-codex/sdk",
  "repository": null,
  "homepage": null,
  "bugs": null
}
```
If the final remote URL is not known yet, replace upstream links with fork placeholders or remove them rather than leaving stale upstream destinations.

- [ ] **Step 4: Patch contributor entrypoints**

In `CONTRIBUTING.md` and the issue templates:
```md
- Remove instructions that send contributors to upstream issues/discussions by default
- Replace package/repo examples that reference `get-shit-done-cc` or `gsd-build/get-shit-done`
- Keep only examples that still matter for this fork's own workflow
```
Use plain placeholders like `<your-fork-url>` only when the final public remote is not yet known.

- [ ] **Step 5: Verify metadata and contributor routing**

Run:
```powershell
Select-String -Path `
  'D:\codex_GSD\get-shit-done-codex\package.json', `
  'D:\codex_GSD\get-shit-done-codex\package-lock.json', `
  'D:\codex_GSD\get-shit-done-codex\sdk\package.json', `
  'D:\codex_GSD\get-shit-done-codex\CONTRIBUTING.md', `
  'D:\codex_GSD\get-shit-done-codex\.github\ISSUE_TEMPLATE\*.yml' `
  -Pattern 'git\\+https://github.com/gsd-build/get-shit-done|https://github.com/gsd-build/get-shit-done|get-shit-done-cc'
```
Expected: no release-facing upstream identity remains in the owned files unless explicitly marked as compatibility context.

### Task 2: Public Documentation and Migration Surface

**Files:**
- Modify: `D:\codex_GSD\get-shit-done-codex\README.md`
- Modify: `D:\codex_GSD\get-shit-done-codex\README.zh-CN.md`
- Modify: `D:\codex_GSD\get-shit-done-codex\README.ja-JP.md`
- Modify: `D:\codex_GSD\get-shit-done-codex\README.ko-KR.md`
- Modify: `D:\codex_GSD\get-shit-done-codex\README.pt-BR.md`
- Modify: `D:\codex_GSD\get-shit-done-codex\docs\CODEX-FORK.md`
- Modify: `D:\codex_GSD\get-shit-done-codex\docs\CONFIGURATION.md`
- Modify: `D:\codex_GSD\get-shit-done-codex\docs\COMMANDS.md`

- [ ] **Step 1: Audit the release-facing doc residues**

Run:
```powershell
Select-String -Path `
  'D:\codex_GSD\get-shit-done-codex\README*.md', `
  'D:\codex_GSD\get-shit-done-codex\docs\CODEX-FORK.md', `
  'D:\codex_GSD\get-shit-done-codex\docs\CONFIGURATION.md', `
  'D:\codex_GSD\get-shit-done-codex\docs\COMMANDS.md' `
  -Pattern 'get-shit-done-cc|gsd-build/get-shit-done|CLAUDE_CONFIG_DIR|~/.claude/|CLAUDE.md|generate-claude|claude_md_path'
```
Expected: a bounded set of README and doc references to normalize.

- [ ] **Step 2: Normalize the primary README**

Ensure `README.md` clearly states:
```md
- This repository is an independent Codex-first fork
- Primary semantics: `AGENTS.md`, `.codex`, `$gsd-*`, `agents_md_path`, `generate-agents-*`, `~/.codex/sessions`
- Legacy Claude names are compatibility shims, not the main contract
```
Replace stale update/install snippets that still point to the old npm package or `CLAUDE_CONFIG_DIR` examples.

- [ ] **Step 3: Normalize the localized root READMEs**

For `README.zh-CN.md`, `README.ja-JP.md`, `README.ko-KR.md`, and `README.pt-BR.md`:
```md
- Update the quick-start package name to `get-shit-done-codex`
- Remove default clone/install instructions that point to the upstream repo
- Replace Claude-first troubleshooting examples where they are presented as the default path
```
Do not attempt full retranslation; keep edits narrowly scoped to release identity and install flow.

- [ ] **Step 4: Align supporting docs**

Update `docs/CODEX-FORK.md`, `docs/CONFIGURATION.md`, and `docs/COMMANDS.md` so they agree on:
```md
- `agents_md_path` is primary
- `claude_md_path` is legacy compatibility
- `AGENTS.md` is the default generated contract
```

- [ ] **Step 5: Verify doc cleanup**

Run:
```powershell
Select-String -Path `
  'D:\codex_GSD\get-shit-done-codex\README*.md', `
  'D:\codex_GSD\get-shit-done-codex\docs\CODEX-FORK.md', `
  'D:\codex_GSD\get-shit-done-codex\docs\CONFIGURATION.md', `
  'D:\codex_GSD\get-shit-done-codex\docs\COMMANDS.md' `
  -Pattern 'get-shit-done-cc@latest|git clone https://github.com/gsd-build/get-shit-done|CLAUDE_CONFIG_DIR=/home/youruser/.claude'
```
Expected: no stale release instructions remain in the owned docs.

### Task 3: Canonical Codex-First Prompt Cleanup

**Files:**
- Modify: `D:\codex_GSD\get-shit-done-codex\bin\install.js`
- Modify: `D:\codex_GSD\get-shit-done-codex\commands\gsd\list-phase-assumptions.md`
- Modify: `D:\codex_GSD\get-shit-done-codex\commands\gsd\ultraplan-phase.md`
- Modify: `D:\codex_GSD\get-shit-done-codex\commands\gsd\verify-work.md`
- Modify: `D:\codex_GSD\get-shit-done-codex\agents\gsd-planner.md`
- Modify: `D:\codex_GSD\get-shit-done-codex\agents\gsd-roadmapper.md`

- [ ] **Step 1: Confirm the canonical Claude-first wording in the owned prompts**

Run:
```powershell
Select-String -Path `
  'D:\codex_GSD\get-shit-done-codex\bin\install.js', `
  'D:\codex_GSD\get-shit-done-codex\commands\gsd\list-phase-assumptions.md', `
  'D:\codex_GSD\get-shit-done-codex\commands\gsd\ultraplan-phase.md', `
  'D:\codex_GSD\get-shit-done-codex\commands\gsd\verify-work.md', `
  'D:\codex_GSD\get-shit-done-codex\agents\gsd-planner.md', `
  'D:\codex_GSD\get-shit-done-codex\agents\gsd-roadmapper.md' `
  -Pattern 'Claude Code only|Claude''s assumptions|what Claude built|Claude Code does|Claude everything|default.*claude'
```
Expected: explicit canonical wording that still presents Claude as the primary runtime or builder persona.

- [ ] **Step 2: Patch installer defaults and top-level runtime wording**

In `bin/install.js`, keep multi-runtime support but make Codex the default-first presentation for this fork:
```text
- Codex-first ordering in release-facing prompts
- No Claude-first fallback wording in generic fork messaging
- Preserve compatibility conversion logic and runtime adapters
```

- [ ] **Step 3: Patch high-signal command wording**

Update the three command prompt files so they no longer imply Claude is the default runtime:
```md
- `list-phase-assumptions.md`: refer to agent assumptions, not "Claude's assumptions"
- `verify-work.md`: refer to verifying what the system built, not "what Claude built"
- `ultraplan-phase.md`: mark Claude-only gating as a runtime-specific beta exception, not a fork-wide default
```

- [ ] **Step 4: Patch high-signal agent wording**

Update `agents/gsd-planner.md` and `agents/gsd-roadmapper.md` so the fork's canonical builder persona is tool/runtime-agnostic or Codex-first where appropriate, without removing explicit compatibility instructions that are still required.

- [ ] **Step 5: Verify prompt cleanup without breaking compatibility hooks**

Run:
```powershell
Select-String -Path `
  'D:\codex_GSD\get-shit-done-codex\bin\install.js', `
  'D:\codex_GSD\get-shit-done-codex\commands\gsd\list-phase-assumptions.md', `
  'D:\codex_GSD\get-shit-done-codex\commands\gsd\ultraplan-phase.md', `
  'D:\codex_GSD\get-shit-done-codex\commands\gsd\verify-work.md', `
  'D:\codex_GSD\get-shit-done-codex\agents\gsd-planner.md', `
  'D:\codex_GSD\get-shit-done-codex\agents\gsd-roadmapper.md' `
  -Pattern 'Claude Code only|Claude''s assumptions|what Claude built'
```
Expected: only intentionally runtime-specific compatibility references remain.

### Task 4: Verification and Release Checklist

**Files:**
- Modify: `D:\codex_GSD\get-shit-done-codex\docs\CODEX-FORK.md`

- [ ] **Step 1: Re-run the targeted root test suites**

Run:
```powershell
& 'C:\Program Files\nodejs\node.exe' --test `
  'D:\codex_GSD\get-shit-done-codex\tests\profile-pipeline.test.cjs' `
  'D:\codex_GSD\get-shit-done-codex\tests\claude-md-path.test.cjs' `
  'D:\codex_GSD\get-shit-done-codex\tests\profile-output.test.cjs' `
  'D:\codex_GSD\get-shit-done-codex\tests\skill-manifest.test.cjs'
```
Expected: all tests pass.

- [ ] **Step 2: Re-run the targeted SDK test suites**

Run:
```powershell
& 'C:\Program Files\nodejs\npm.cmd' --prefix 'D:\codex_GSD\get-shit-done-codex\sdk' test -- --run `
  src/query/profile.test.ts `
  src/query/registry.test.ts
```
Expected: all tests pass.

- [ ] **Step 3: Capture the final diff summary**

Run:
```powershell
git -C 'D:\codex_GSD\get-shit-done-codex' diff --stat
git -C 'D:\codex_GSD\get-shit-done-codex' status --short
```
Expected: only the intended release-prep files are modified.

- [ ] **Step 4: Update the fork notes with a release checklist**

Append or revise `docs/CODEX-FORK.md` to include:
```md
- ready now
- deferred intentionally
- compatibility kept on purpose
- remaining publish-time inputs still needed from the maintainer
```

- [ ] **Step 5: Summarize readiness**

Produce a concise release summary covering:
```md
- what changed
- what was verified
- what remains blocked on maintainer decisions (for example final repo URL / SDK namespace)
- which compatibility layers are intentionally still present
```
