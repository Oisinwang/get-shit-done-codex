# Line Ending Normalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a repo-level line-ending policy so Windows checkouts stop producing `LF -> CRLF` churn and shell-sensitive files remain stable across platforms.

**Architecture:** Introduce a root `.gitattributes` file, renormalize the repository in one mechanical commit, and keep behavior tests resilient where exact line endings are not semantically meaningful. Treat line-ending normalization as a separate commit from semantic prompt/doc rewrites.

**Tech Stack:** Git attributes, Node/CJS tests, Markdown/text assets, Windows/Unix shell compatibility

---

### Task 1: Add an explicit repository line-ending policy

**Files:**
- Create: `.gitattributes`

- [ ] **Step 1: Add the root attributes file**

Create `.gitattributes` with this baseline:

```gitattributes
* text=auto eol=lf

*.bat text eol=crlf
*.cmd text eol=crlf
*.ps1 text eol=crlf

*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.pdf binary
*.zip binary
```

- [ ] **Step 2: Add stronger overrides for shell- and parser-sensitive text**

Append these rules:

```gitattributes
*.sh text eol=lf
*.md text eol=lf
*.txt text eol=lf
*.json text eol=lf
*.yml text eol=lf
*.yaml text eol=lf
*.toml text eol=lf
*.js text eol=lf
*.cjs text eol=lf
*.mjs text eol=lf
*.ts text eol=lf
*.tsx text eol=lf
*.css text eol=lf
*.html text eol=lf
*.svg text eol=lf
```

- [ ] **Step 3: Sanity-check the attributes file**

Run:

```bash
git check-attr --all -- .gitattributes hooks/gsd-phase-boundary.sh tests/few-shot-calibration.test.cjs README.md
```

Expected: `.sh`, `.md`, and test files report `eol: lf`.

- [ ] **Step 4: Commit the policy file**

Run:

```bash
git add .gitattributes
git commit -m "chore: add repository line-ending policy"
```

### Task 2: Renormalize the repository in one mechanical pass

**Files:**
- Modify: all text files touched by git renormalization

- [ ] **Step 1: Preview the renormalization**

Run:

```bash
git add --renormalize .
git status --short
```

Expected: a large set of text files is staged as line-ending-only changes.

- [ ] **Step 2: Inspect for accidental semantic diffs**

Run:

```bash
git diff --cached --stat
git diff --cached --check
```

Expected: no whitespace errors beyond the intended renormalization and no content-level surprises.

- [ ] **Step 3: Keep non-text files out of the renormalization commit**

If binary assets appear in the staged set, unstage them:

```bash
git restore --staged path/to/binary.file
```

Expected: the renormalization commit contains only text files.

- [ ] **Step 4: Commit renormalization separately**

Run:

```bash
git commit -m "chore: renormalize line endings"
```

Expected: a single mechanical commit that can be reviewed independently from semantic changes.

### Task 3: Keep only semantically meaningful line-ending assertions in tests

**Files:**
- Modify: `tests/few-shot-calibration.test.cjs`
- Modify: `tests/bug-2136-sh-hook-version.test.cjs`
- Modify: `tests/prompt-injection-scan.test.cjs`
- Modify: any other test that still uses `split('\n')`, `^---\n`, or exact shebang equality on raw file bytes

- [ ] **Step 1: Replace line-ending-sensitive parsing with normalized reads**

Prefer helpers like:

```js
function normalizeEol(input) {
  return input.replace(/\r\n/g, '\n');
}
```

and then assert against normalized content.

- [ ] **Step 2: Preserve true LF requirements for shell entrypoints**

For shell files, keep the repository policy as the enforcement mechanism and test semantic structure rather than raw checkout bytes:

```js
const lines = normalizeEol(fs.readFileSync(file, 'utf8')).split('\n');
assert.strictEqual(lines[0], '#!/bin/bash');
```

- [ ] **Step 3: Re-run only the known line-ending-sensitive tests**

Run:

```bash
node --test tests/few-shot-calibration.test.cjs tests/bug-2136-sh-hook-version.test.cjs tests/prompt-injection-scan.test.cjs
```

Expected: the line-ending regression tests pass on Windows with a normalized working tree.

- [ ] **Step 4: Commit the targeted test hardening**

Run:

```bash
git add tests/few-shot-calibration.test.cjs tests/bug-2136-sh-hook-version.test.cjs tests/prompt-injection-scan.test.cjs
git commit -m "test: normalize cross-platform line ending assertions"
```

### Task 4: Document the policy and verify on Windows

**Files:**
- Modify: `CONTRIBUTING.md`
- Modify: `README.md` if contributor setup guidance mentions Git-specific behavior

- [ ] **Step 1: Add a short contributor note**

Document this policy:

```md
This repository enforces line endings through `.gitattributes`. Contributors do not need project-specific `core.autocrlf` tweaks; Git will normalize tracked text files automatically.
```

- [ ] **Step 2: Explain why `.sh` files must stay LF**

Add one sentence such as:

```md
Shell scripts are pinned to LF because shebang parsing and cross-platform hook behavior are sensitive to CRLF conversion.
```

- [ ] **Step 3: Run full verification on Windows**

Run:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test
```

and then in `sdk/`:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' test
```

Expected: both suites stay green after `.gitattributes` and renormalization.

- [ ] **Step 4: Commit the contributor docs update**

Run:

```bash
git add CONTRIBUTING.md README.md
git commit -m "docs: describe repository line-ending policy"
```

## Self-Review

- Spec coverage: this plan covers policy, renormalization, targeted test resilience, and contributor docs.
- Placeholder scan: no `TODO`, `TBD`, or vague "fix later" steps remain.
- Type consistency: the plan consistently treats `.gitattributes` as the source of truth and keeps semantic test normalization limited to cases where raw EOL is not the behavior under test.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-19-line-ending-normalization.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
