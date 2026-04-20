# Pre-Promotion Final Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tighten the public-facing quality of the Codex-first fork so promotion sends users to a stable, clearly positioned, easy-to-install repository.

**Architecture:** This pass is intentionally product-facing rather than feature-facing. Work is split into five small tracks: homepage and docs clarity, install verification, compatibility-boundary cleanup, community intake hygiene, and promotion assets. Each track should land independently and remain reviewable on its own.

**Tech Stack:** Markdown docs, npm/Node install flow, GitHub repository metadata, existing root tests, existing SDK tests

---

## File Map

**Public entrypoints**
- [ ] `D:\codex_GSD\get-shit-done-codex-split\README.md`
- [ ] `D:\codex_GSD\get-shit-done-codex-split\docs\CODEX-FORK.md`
- [ ] `D:\codex_GSD\get-shit-done-codex-split\docs\CONFIGURATION.md`
- [ ] `D:\codex_GSD\get-shit-done-codex-split\docs\COMMANDS.md`
- [ ] `D:\codex_GSD\get-shit-done-codex-split\CONTRIBUTING.md`

**Release-facing metadata**
- [ ] `D:\codex_GSD\get-shit-done-codex-split\package.json`
- [ ] `D:\codex_GSD\get-shit-done-codex-split\sdk\package.json`
- [ ] `D:\codex_GSD\get-shit-done-codex-split\docs\releases\v1.37.1-codex.1.md`

**Community intake**
- [ ] `D:\codex_GSD\get-shit-done-codex-split\.github\ISSUE_TEMPLATE\bug_report.yml`
- [ ] `D:\codex_GSD\get-shit-done-codex-split\.github\ISSUE_TEMPLATE\feature_request.yml`
- [ ] `D:\codex_GSD\get-shit-done-codex-split\.github\pull_request_template.md`

**Verification surfaces**
- [ ] `D:\codex_GSD\get-shit-done-codex-split\tests\codex-first-wording.test.cjs`
- [ ] `D:\codex_GSD\get-shit-done-codex-split\tests\claude-md.test.cjs`
- [ ] `D:\codex_GSD\get-shit-done-codex-split\tests\few-shot-calibration.test.cjs`
- [ ] `D:\codex_GSD\get-shit-done-codex-split\tests\prompt-injection-scan.test.cjs`
- [ ] `D:\codex_GSD\get-shit-done-codex-split\sdk\src\gsd-tools.test.ts`
- [ ] `D:\codex_GSD\get-shit-done-codex-split\sdk\src\query\init.test.ts`
- [ ] `D:\codex_GSD\get-shit-done-codex-split\sdk\src\query\skills.test.ts`

---

### Task 1: Lock The Public Story

**Files:**
- Modify: `D:\codex_GSD\get-shit-done-codex-split\README.md`
- Modify: `D:\codex_GSD\get-shit-done-codex-split\docs\CODEX-FORK.md`
- Modify: `D:\codex_GSD\get-shit-done-codex-split\docs\CONFIGURATION.md`
- Modify: `D:\codex_GSD\get-shit-done-codex-split\docs\COMMANDS.md`

- [ ] **Step 1: Audit the first-click story**

Review these questions in the files above:
- Does the repo explain in 10 seconds why this fork exists?
- Does it say Codex-first before it says compatibility?
- Does it explain why someone should choose this instead of upstream?
- Does it say what is stable now versus still transitional?

- [ ] **Step 2: Add a single crisp “Why this fork” block**

Target content to add or tighten:

```md
## Why This Fork Exists

This fork exists to make GSD feel native in Codex:

- `AGENTS.md` is the primary instruction contract
- `.codex/` is the primary local runtime surface
- `$gsd-*` is the primary command surface
- Claude-era names remain only for migration compatibility
```

- [ ] **Step 3: Make the compatibility story subordinate**

Required outcome:
- README and docs must describe compatibility as a migration layer, not as a co-equal identity.
- Avoid phrasing like “for Claude, Codex, and others” in the lead if the fork is meant to be Codex-first.

- [ ] **Step 4: Add one explicit status note**

Add a short block like this near the top-level docs:

```md
## Current Stability

- Public default branch: `codex/bootstrap`
- First public fork tag: `v1.37.1-codex.1`
- Codex-first semantics are the stable contract
- Legacy Claude aliases remain temporarily for migration
```

- [ ] **Step 5: Verify docs stay aligned**

Run:

```powershell
Select-String -Path README.md,docs\CODEX-FORK.md,docs\CONFIGURATION.md,docs\COMMANDS.md -Pattern 'Codex-first|compatibility|AGENTS.md|generate-agents-md|claude_md_path'
```

Expected:
- The docs clearly describe Codex-first surfaces as canonical
- Claude legacy names appear only in migration/compatibility context

- [ ] **Step 6: Commit**

```bash
git add README.md docs/CODEX-FORK.md docs/CONFIGURATION.md docs/COMMANDS.md
git commit -m "docs: sharpen Codex-first public positioning"
```

---

### Task 2: Prove Install And Upgrade Paths

**Files:**
- Modify: `D:\codex_GSD\get-shit-done-codex-split\README.md`
- Modify: `D:\codex_GSD\get-shit-done-codex-split\docs\manual-update.md`
- Modify: `D:\codex_GSD\get-shit-done-codex-split\docs\releases\v1.37.1-codex.1.md`

- [ ] **Step 1: Define the three install paths you actually support**

Document these as the canonical support matrix:

```md
- Fresh Codex install from npm
- Fresh Codex install from source checkout
- Migration from a legacy Claude-based install
```

- [ ] **Step 2: Smoke-test each path and record exact outcomes**

Run these manually on a throwaway repo or temp directory:

```powershell
npx get-shit-done-codex@latest --codex --local
node bin/install.js --codex --local
npx get-shit-done-codex@latest --claude --local
```

Expected:
- Codex local install creates `./.codex/` and `AGENTS.md`
- Source-based Codex install succeeds after `npm run build:hooks`
- Claude install path still works only as compatibility behavior

- [ ] **Step 3: Publish the tested outcomes**

Add a table like this:

```md
| Path | Status | Notes |
|------|--------|-------|
| npm Codex local install | Verified | Generates `.codex/` + `AGENTS.md` |
| source Codex local install | Verified | Requires `npm run build:hooks` |
| legacy Claude local install | Verified compatibility | Migration path only |
```

- [ ] **Step 4: Remove any install wording you cannot stand behind**

Delete or rewrite statements that imply broader validation than you actually ran.

- [ ] **Step 5: Commit**

```bash
git add README.md docs/manual-update.md docs/releases/v1.37.1-codex.1.md
git commit -m "docs: document verified install and migration paths"
```

---

### Task 3: Finish The Compatibility Boundary Pass

**Files:**
- Modify: `D:\codex_GSD\get-shit-done-codex-split\README.md`
- Modify: `D:\codex_GSD\get-shit-done-codex-split\docs\CODEX-FORK.md`
- Modify: `D:\codex_GSD\get-shit-done-codex-split\.github\pull_request_template.md`
- Modify: `D:\codex_GSD\get-shit-done-codex-split\tests\codex-first-wording.test.cjs`

- [ ] **Step 1: Make the allowed legacy zones explicit**

Use this exact checklist:

```md
Legacy Claude references are allowed only in:
- migration notes
- compatibility registry code
- alias tests
- runtime-specific Claude install docs
- historical changelog or upstream-reference docs
```

- [ ] **Step 2: Reject ambiguous legacy wording in public surfaces**

Look for:
- top-level README defaults
- contributor-facing instructions
- PR template wording
- docs that imply Claude-first is still the recommended route

- [ ] **Step 3: Add a scan guard if needed**

If the current wording test is too loose, extend it with explicit assertions:

```js
assert.doesNotMatch(readme, /Claude-first .* default/i);
assert.match(readme, /Codex-first/i);
```

- [ ] **Step 4: Run the wording tests**

Run:

```powershell
& 'C:\Program Files\nodejs\node.exe' --test tests\codex-first-wording.test.cjs tests\claude-md.test.cjs tests\few-shot-calibration.test.cjs tests\prompt-injection-scan.test.cjs
```

Expected:
- All tests pass
- No new top-level wording regressions

- [ ] **Step 5: Commit**

```bash
git add README.md docs/CODEX-FORK.md .github/pull_request_template.md tests/codex-first-wording.test.cjs
git commit -m "test: tighten Codex-first compatibility boundaries"
```

---

### Task 4: Prepare To Receive New Users

**Files:**
- Modify: `D:\codex_GSD\get-shit-done-codex-split\.github\ISSUE_TEMPLATE\bug_report.yml`
- Modify: `D:\codex_GSD\get-shit-done-codex-split\.github\ISSUE_TEMPLATE\feature_request.yml`
- Modify: `D:\codex_GSD\get-shit-done-codex-split\CONTRIBUTING.md`
- Modify: `D:\codex_GSD\get-shit-done-codex-split\README.md`

- [ ] **Step 1: Make bug reports fork-aware**

Add required prompts for:
- runtime used
- install mode (`npm`, source, upgrade, migration)
- whether the user is on Codex or a compatibility runtime
- whether the issue happens on `codex/bootstrap`

- [ ] **Step 2: Make feature requests fork-aware**

Prompt for:
- whether the request strengthens Codex-first semantics
- whether it requires keeping or removing a legacy compatibility shim

- [ ] **Step 3: Add a “before opening an issue” checklist**

Use this content:

```md
- I reproduced on `codex/bootstrap`
- I checked the README install instructions
- I noted whether I am using Codex or a compatibility runtime
- I included generated paths such as `.codex/` or `AGENTS.md` where relevant
```

- [ ] **Step 4: Commit**

```bash
git add .github/ISSUE_TEMPLATE/bug_report.yml .github/ISSUE_TEMPLATE/feature_request.yml CONTRIBUTING.md README.md
git commit -m "docs: prepare issue intake for public promotion"
```

---

### Task 5: Assemble Promotion Assets

**Files:**
- Modify: `D:\codex_GSD\get-shit-done-codex-split\README.md`
- Modify: `D:\codex_GSD\get-shit-done-codex-split\docs\releases\v1.37.1-codex.1.md`
- Create: `D:\codex_GSD\get-shit-done-codex-split\docs\PROMOTION.md`

- [ ] **Step 1: Write the one-line positioning**

Draft and keep one canonical line:

```md
An independent Codex-first fork of GSD that treats `AGENTS.md`, `.codex/`, and `$gsd-*` as the primary workflow contract.
```

- [ ] **Step 2: Write the short release pitch**

Keep it to three bullets:

```md
- Codex-first semantics are now the primary contract
- Legacy Claude naming remains only as a migration shim
- Default public branch and first fork release are live
```

- [ ] **Step 3: Write the “why not upstream?” answer**

Keep it factual:

```md
Upstream supports Codex, but this fork makes Codex the primary semantic contract instead of treating it as one runtime among many.
```

- [ ] **Step 4: Save reusable promo copy**

Create `docs/PROMOTION.md` with:
- one-line description
- 50-word summary
- launch post bullets
- “who this is for”
- “what compatibility is still kept”

- [ ] **Step 5: Commit**

```bash
git add README.md docs/releases/v1.37.1-codex.1.md docs/PROMOTION.md
git commit -m "docs: add promotion-ready messaging assets"
```

---

## Final Verification Checklist

- [ ] Run root targeted verification:

```powershell
& 'C:\Program Files\nodejs\node.exe' --test tests\claude-md.test.cjs tests\codex-first-wording.test.cjs tests\few-shot-calibration.test.cjs tests\agent-frontmatter.test.cjs tests\prompt-injection-scan.test.cjs tests\bug-2136-sh-hook-version.test.cjs
```

Expected:
- `201/201` passing or updated equivalent after any test additions

- [ ] Run SDK targeted verification:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test -- --run src/gsd-tools.test.ts src/plan-parser.test.ts src/prompt-sanitizer.test.ts src/query/skills.test.ts src/query/init.test.ts src/phase-prompt.test.ts
```

Expected:
- `133/133` passing or updated equivalent after any test additions

- [ ] Verify repo status is clean:

```bash
git status --short
```

Expected:
- no uncommitted changes before promotion

- [ ] Verify branch and tag surface:

```bash
git branch --show-current
git tag --list "v1.37.1-codex.1"
```

Expected:
- branch is the intended public branch
- first fork tag exists

---

## Self-Review

**Spec coverage:** This checklist covers the remaining work that blocks confident promotion: public story, install trust, compatibility boundaries, user intake, and promo assets.

**Placeholder scan:** No `TODO`, `TBD`, or “figure this out later” steps remain. Every task names files, commands, and expected outcomes.

**Type consistency:** Terminology is consistent across the checklist: `AGENTS.md`, `.codex/`, `$gsd-*`, `agents_md_path`, `generate-agents-md`, and compatibility shims are referenced with the same names throughout.
