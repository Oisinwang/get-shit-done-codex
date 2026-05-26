# Examples

Use these playbooks when you know the situation but do not want to learn every command first. Each path starts with the smallest command that gives Codex durable project state.

## New Project From A Rough Idea

Use this when you have a product idea, feature request, or homework-style build goal and want GSD to create the project plan.

```bash
npx @oisinwang/get-shit-done-codex@latest --codex --local
$gsd-new-project --auto
$gsd-next
```

You should see `PROJECT.md`, `ROADMAP.md`, `STATE.md`, and phase folders under `.planning/`. Continue with `$gsd-next` when you want GSD to pick the next safe action.

## Existing Repo Before Planning

Use this when the repository already has code and you want Codex to understand patterns before proposing work.

```bash
$gsd-map-codebase
$gsd-new-project --auto
$gsd-discuss-phase 1
$gsd-plan-phase 1
```

This gives later phases codebase intelligence instead of making the planner infer architecture from a few files in chat.

## Small Fix With Guardrails

Use this when the task is narrow enough that a full milestone is overhead, but you still want verification and state.

```bash
$gsd-fast "fix the failing install check and verify with the focused test"
```

Use `$gsd-quick --validate` when the change is still small but you want stronger plan and verification gates before the edit.

## Resume After A Break

Use this when a previous session stopped, context compacted, or you need to recover what was in progress.

```bash
$gsd-resume-work
$gsd-progress --forensic
$gsd-next
```

This reads stored state first, surfaces blockers, and avoids rebuilding the plan from memory.

## Validate A Risky Approach First

Use this before committing to an integration, library, model route, migration, or performance idea that may not work.

```bash
$gsd-spike "validate whether the new parser can replace the current parser"
$gsd-spike-wrap-up
```

The spike records hypotheses, experiment code, evidence, and a verdict so the later plan can use facts instead of guesses.

## Explore UI Direction First

Use this before building a frontend when layout, information density, or interaction model is uncertain.

```bash
$gsd-sketch "compare dashboard layouts for scanning many failed jobs"
$gsd-sketch-wrap-up
```

The sketch stores throwaway HTML variants and packages the selected design decisions into project-local guidance for later implementation.

## Ship Verified Work

Use this after a phase has been executed and UAT is ready.

```bash
$gsd-code-review 1
$gsd-verify-work 1
$gsd-ship 1
```

The review and verification steps are separate on purpose: review looks for code risks, while UAT checks whether the delivered behavior matches the original goal.
