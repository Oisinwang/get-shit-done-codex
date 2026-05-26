# Prompt Recipes

Paste these into Codex after installing GSD Codex. They are prompts, not shell scripts: each one tells Codex which GSD path to use, what state to inspect, and what evidence to leave behind.

Replace bracketed placeholders before running a prompt.

## Start A New Project

Use this when you have an idea but no durable project state yet.

```text
I want to build [goal]. Use GSD Codex to turn this into durable project state.

Run `$gsd-new-project --auto`, review the generated `.planning/PROJECT.md`, `.planning/ROADMAP.md`, and `.planning/STATE.md`, then continue with `$gsd-next`.

Keep the first phase small. Do not skip verification. Before saying work is complete, show the verification evidence and the files changed.
```

## Existing Repository

Use this when code, tests, and a README already exist.

```text
Before planning new work in this existing repository, use GSD Codex to understand the codebase first.

Run `$gsd-map-codebase`, then `$gsd-new-project --auto`, then `$gsd-discuss-phase 1`. Use the discovered conventions before suggesting implementation work.

Preserve existing user changes. Keep `.planning/` state readable, and show verification evidence before any commit.
```

## Small Fix

Use this when the task should stay narrow but still needs traceable verification.

```text
Use GSD Codex for a narrow fix: [specific bug or small improvement].

Run `$gsd-fast "[specific bug or small improvement]"`. Keep the change focused, add or update the smallest useful test, and do not skip verification.

After the fix, summarize the behavior change, the test evidence, and any remaining risk.
```

## Resume Work

Use this after a break, context compaction, or a handoff from another session.

```text
Resume the current project with GSD Codex.

Run `$gsd-resume-work`, then `$gsd-progress --forensic`. Read `.planning/STATE.md` and the active phase artifacts before proposing the next action.

Do not reconstruct the plan from chat memory. Continue from stored project state, and call out any blocker that needs my input.
```

## Audit And Fix

Use this when you want Codex to find and repair maintainability or release-readiness issues without a preselected task.

```text
Use GSD Codex to audit this repository for practical issues that hurt install, documentation, tests, release safety, or first-user experience.

Run `$gsd-audit-fix`. Classify issues by impact, fix only the high-confidence items, and leave riskier ideas as notes or issues instead of forcing changes.

For every fix, keep the patch small, preserve `.planning/` evidence, do not skip verification, and show the commands that proved the result.
```

## Choosing A Recipe

| Situation | Start with |
|-----------|------------|
| New idea or product goal | Start A New Project |
| Existing codebase needs context first | Existing Repository |
| One focused bug or docs fix | Small Fix |
| Prior GSD work exists | Resume Work |
| No task chosen yet | Audit And Fix |
