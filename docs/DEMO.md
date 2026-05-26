# Demo

This page shows the first Codex-first GSD path without asking you to learn every command first. It is a transcript-style demo for evaluating what the tool adds beyond a single chat prompt.

## 60-second workflow

```bash
npx @oisinwang/get-shit-done-codex@latest --codex --local
$gsd-new-project
$gsd-next
```

Use `--local` when you want the install scoped to the current repository. Use `--global` when you want the commands available across projects.

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
