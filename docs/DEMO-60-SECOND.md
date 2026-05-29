# 60-Second GSD Codex Demo

This repo-hosted transcript is the public 60-second GSD Codex demo linked from `README.md` and `docs/DEMO.md`. It shows the first Codex-first path with redacted, reproducible text instead of local machine details.

No local usernames, hostnames, private repository names, tokens, emails, or absolute paths are included.

## Command Flow

```bash
npx @oisinwang/get-shit-done-codex@latest --codex --local
$gsd-new-project --auto
$gsd-next
git status --short
```

## Annotated Sequence

### 0-15 seconds: install local Codex commands

The installer scopes GSD to the current repository, writes Codex-facing commands, and leaves the project ready for `$gsd-*` workflows.

Expected visitor takeaway: this is a repo-local trial path, not a global machine change.

### 15-35 seconds: capture the project goal

`$gsd-new-project --auto` turns a rough goal into durable planning files:

```text
.planning/
  PROJECT.md
  ROADMAP.md
  STATE.md
  phases/
```

`PROJECT.md` stores the goal and constraints:

```markdown
# Project: Codex install recovery

## Goal
Make Codex install recovery predictable when local hooks, config, or generated files drift.

## Constraints
- Keep installation changes separate from product code changes.
- Record verification commands before marking work complete.
```

### 35-50 seconds: advance to the next useful action

`$gsd-next` reads the current state and points Codex at the next step. A small first run can create phase artifacts such as:

```text
.planning/phases/
  001-diagnose-install-state/
    DISCUSSION-LOG.md
    PLAN.md
    VERIFICATION.md
```

`ROADMAP.md` shows the work as reviewable phases:

```markdown
# Roadmap

## Phase 1 - Diagnose current install state
- Check Codex config, hooks, and generated command files.
- Identify stale or missing files before editing.

## Phase 2 - Repair and verify
- Apply the smallest config or installer fix.
- Run focused recovery checks and full metadata tests.
```

`STATE.md` keeps the resumable pointer:

```markdown
# State

Current phase: 1
Next action: verify the generated plan before editing source files.
```

### 50-60 seconds: inspect changed files

End on a clean review habit:

```bash
git status --short
```

Expected paths are planning and Codex setup files, for example:

```text
?? .codex/
?? AGENTS.md
?? .planning/
```

If product code changed during a real task, it should appear separately and be verified before commit.

## Why This Demo Matters

This path shows the difference between a single prompt and a durable Codex workflow:

| Signal | What the visitor can inspect |
|--------|-------------------------------|
| install scope | local Codex commands instead of a hidden global change |
| project memory | `PROJECT.md`, `ROADMAP.md`, and `STATE.md` |
| reviewability | `.planning/phases/` artifacts attached to the work |
| recovery | resumable state after a break or context reset |
| verification | `git status --short` evidence at the end |

For the no-install version of the same safe trial, see [Safe Trial Transcript](SAFE-TRIAL-TRANSCRIPT.md). For recording guidance, see [Demo Media Checklist](DEMO.md#demo-media-checklist).
