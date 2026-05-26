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

## Existing Repo Safe Trial

Use this when the repository already has source code, tests, and a README, and you want Codex to understand the project before proposing work.

Run `$gsd-map-codebase` first to capture code patterns, `$gsd-new-project --auto` next to create durable project state, and `$gsd-discuss-phase 1` as the first planning command.

```bash
$gsd-map-codebase
$gsd-new-project --auto
$gsd-discuss-phase 1
$gsd-plan-phase 1
```

You should see `PROJECT.md`, `ROADMAP.md`, `STATE.md`, and codebase intelligence under `.planning/` so later phases do not infer architecture from a few files in chat.

## Existing Repo Migration Branch

Use this when you want to evaluate GSD inside a real repository without mixing trial artifacts into your main branch.

```bash
git switch -c evaluate-gsd-codex
npx @oisinwang/get-shit-done-codex@latest --codex --local
$gsd-map-codebase
$gsd-new-project --auto
$gsd-next
```

Review `git status`, `.codex/`, `AGENTS.md`, and `.planning/` before deciding what to keep. Commit the branch only after reviewing the generated plan and verification notes; if it is not useful, switch back to your original branch and discard the trial branch by your normal repo policy.

## Review Generated Planning Artifacts

Use this after a trial run when you need to decide whether the generated planning state belongs in the repository.

```bash
git status --short
git diff -- .codex AGENTS.md PROJECT.md ROADMAP.md STATE.md .planning
$gsd-progress --forensic
```

Keep `AGENTS.md`, `.codex/`, and `.planning/` when the generated state helps later Codex sessions resume the same project context. Ignore or discard the trial branch when the artifacts are only private evaluation notes or do not match how your team reviews project state.

## Prepare A Public Pull Request

Use this when you worked with GSD planning files locally but want reviewers to see code, docs, and structural planning changes without transient phase artifacts. In this repository, target `codex/bootstrap`; in another repository, replace that with the branch you normally merge into.

```bash
$gsd-progress --forensic
$gsd-pr-branch codex/bootstrap
```

Use `$gsd-progress --forensic` first to surface verification debt before exporting a clean branch. `$gsd-pr-branch` will filter transient `.planning/` commits before public review while preserving code changes and structural project state. The command creates a `*-pr` branch from the target branch and prints the next steps. Run the printed `git push` and `gh pr create` commands only after reviewing that generated branch.

## Audit Verification Debt Before Release

Use this before creating a release branch or completing a milestone. The goal is to find pending, skipped, blocked, and human_needed UAT or verification items before release review turns them into late surprises.

```bash
$gsd-progress --forensic
$gsd-audit-uat
```

Use `$gsd-progress --forensic` first for a quick state check, then run `$gsd-audit-uat` to scan all phase UAT and verification files. When there are gaps, GSD groups what is testable now, what needs prerequisites, and what may be stale, then produces a human test plan you can work through before branching or tagging.

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
