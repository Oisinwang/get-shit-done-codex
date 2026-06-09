# Demo

This page shows the first Codex-first GSD path without asking you to learn every command first. It is a transcript-style demo for evaluating what the tool adds beyond a single chat prompt.

## 60-second workflow

```bash
npx @oisinwang/get-shit-done-codex@latest --codex --local
$gsd-new-project
$gsd-next
```

Use `--local` when you want the install scoped to the current repository. Use `--global` when you want the commands available across projects.

Maintainers preparing short demo media should follow the [Demo Media Checklist](#demo-media-checklist) before publishing it.

If you want to inspect the safe trial command flow without running anything, read the [Safe Trial Transcript](SAFE-TRIAL-TRANSCRIPT.md).

Public transcript: [60-second GSD Codex demo](https://github.com/Oisinwang/get-shit-done-codex/blob/codex/bootstrap/docs/DEMO-60-SECOND.md).

The demo is a repo-hosted transcript that shows the command flow, generated artifacts, and `git status --short` evidence. Caption it with the command flow, generated artifacts, and `git status --short` evidence when you publish GIF, MP4, or annotated screenshot variants.

Run `npm run check:showcase` before closing showcase work. Keep the repo-hosted transcript linked from `README.md`, `docs/README.md`, and this page; add richer GIF, MP4, or screenshot media only after it follows the checklist below.

## What you should see

The first command installs Codex-facing commands, skills, and project instructions. The next two commands turn a rough goal into durable project state:

```text
.planning/
  PROJECT.md
  ROADMAP.md
  STATE.md
  phases/
    001-...
      DISCUSSION-LOG.md
      PLAN.md
      VERIFICATION.md
```

Exact phase names vary by project. The important point is that GSD leaves files Codex can read later, instead of relying on chat memory.

## Example output

A small first run might produce excerpts like these:

PROJECT.md excerpt:

```markdown
# Project: Codex install recovery

## Goal
Make Codex install recovery predictable when local hooks, config, or generated files drift.

## Constraints
- Keep existing source changes separate from installation changes.
- Record verification commands before marking work complete.
```

ROADMAP.md excerpt:

```markdown
# Roadmap

## Phase 1 - Diagnose current install state
- Check Codex config, hooks, and generated command files.
- Identify stale or missing files before editing.

## Phase 2 - Repair and verify
- Apply the smallest config or installer fix.
- Run focused recovery checks and full metadata tests.
```

## Why the artifacts matter

| Artifact | What it proves |
|----------|----------------|
| `PROJECT.md` | The original goal, constraints, and project shape were captured |
| `ROADMAP.md` | The goal was split into reviewable phases instead of one vague task |
| `STATE.md` | The current phase and next action can be resumed later |
| phase artifacts | Discussion, plan, implementation notes, and verification evidence stay attached to the work |

## Where this helps

Use this path when:

- The work will take more than one prompt or one session.
- You need Codex to resume after context compaction or a break.
- You want a plan before implementation starts.
- You want verification evidence before calling a change complete.
- You want small phases that are easier to review, commit, or roll back.

Use a plain Codex chat instead when the task is a one-line edit, a short explanation, or something you do not want recorded in project state.

## Existing repository variant

For a repository with code already in place, map the codebase before asking GSD to plan:

```bash
$gsd-map-codebase
$gsd-new-project --auto
$gsd-discuss-phase 1
$gsd-plan-phase 1
```

That path gives the planner codebase context first, so later phases can follow the repository's actual conventions.

## Resume after a break

When you come back later:

```bash
$gsd-resume-work
$gsd-progress --forensic
$gsd-next
```

This reloads the stored project state, checks for obvious drift, and points Codex at the next useful action.

## Demo Media Checklist

Use this checklist when publishing a short recording of the 60-second workflow. It keeps the demo inspectable without leaking local project details or implying that the static social image shows runtime behavior.

Record these steps in order:

1. Open a disposable branch or throwaway repository.
2. Run `npx @oisinwang/get-shit-done-codex@latest --codex --local`.
3. Run `$gsd-new-project --auto` with a small visible goal.
4. Run `$gsd-next`.
5. Show `PROJECT.md`, `ROADMAP.md`, `STATE.md`, and `.planning/phases/`.
6. End on `git status --short`.

Redact local paths, usernames, private repository names, tokens, email addresses, and machine hostnames. Use a synthetic project name when the original goal reveals client, employer, school, or private product information.

Do not require a specific recording tool. A GIF, short MP4, or annotated screenshot sequence is acceptable when it shows the command flow and the generated artifacts clearly.

`assets/social-preview.png` is not a substitute for workflow demo media. The social preview explains the project at a glance; demo media should show the actual install, planning commands, and resulting files.

When demo media exists, use both public entry points.

Link the finished demo from `README.md` near the terminal preview. Link it from this page under `## 60-second workflow`.
