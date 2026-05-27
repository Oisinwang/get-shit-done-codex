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

## Verify Security-Sensitive Changes

Use this before merging authentication, payments, permissions, secrets, or data-handling changes after a phase has been executed. Replace `1` with the phase number you just completed.

```bash
$gsd-progress --forensic
$gsd-secure-phase 1
```

Use `$gsd-progress --forensic` first to confirm the phase state and surface any existing verification debt. `$gsd-secure-phase` then performs threat-model-anchored verification, works with or without an existing `SECURITY.md`, and produces `{phase}-SECURITY.md` with threat verification results before you continue toward UAT, review, or release.

## Update Docs After A Feature Ships

Use this after a feature, CLI workflow, or install behavior changes and before a release, public PR, or handoff. It is most useful when the README, command reference, setup docs, or architecture notes may now be stale.

```bash
$gsd-progress --forensic
$gsd-docs-update --verify-only
$gsd-docs-update
```

Use `$gsd-progress --forensic` first to see whether the phase has open verification debt. `$gsd-docs-update --verify-only` will surface stale claims without writing files. If it reports drift or missing coverage, run `$gsd-docs-update` to dispatch doc-writer and doc-verifier agents, review existing hand-written docs, and produce structure-aware documentation verified against the live codebase.

## Fix Review Findings

Use this after code review writes a `REVIEW.md` with actionable findings and you want GSD to apply the safe fixes without losing review traceability. Replace `1` with the phase number you just reviewed.

```bash
$gsd-code-review 1
$gsd-code-review-fix 1
$gsd-code-review 1 --depth=deep
```

Run `$gsd-code-review` first so the fixer has a scoped `REVIEW.md` to read. By default, `$gsd-code-review-fix` targets Critical and Warning findings, commits each fix atomically, and writes `REVIEW-FIX.md` with what changed and what remains. Use the deep follow-up review to check the result, and leave risky or ambiguous findings unresolved until a human can decide the right trade-off.

## Choose Next Backlog Item

Use this when the current milestone has more ideas than capacity and you need to decide what belongs in the active sequence. Backlog items are a parking lot with 999.x numbering, so they stay visible without interrupting the planned phase order.

```bash
$gsd-add-backlog "Improve onboarding screenshots"
$gsd-add-backlog "Add provider comparison table"
$gsd-review-backlog
```

`$gsd-review-backlog` asks you to Promote, Keep, or Remove each backlog item. Promoted items move into the active milestone sequence, kept items stay deferred for a later review, and removed items should be stale or no longer aligned with the project direction.

## Audit Thin Validation Evidence

Use this after a completed phase has implementation summaries but validation evidence is thin. `$gsd-validate-phase` audits Nyquist validation gaps, reconstructs coverage from phase plans and summaries, and identifies whether each requirement has automated proof.

```bash
$gsd-progress --forensic
$gsd-validate-phase 1
$gsd-verify-work 1
```

Run `$gsd-progress --forensic` first to confirm the phase is executed and to surface existing verification debt. `$gsd-validate-phase` classifies each requirement as COVERED, PARTIAL, or MISSING, fills safe gaps through generated test files, and writes or updates `{phase}-VALIDATION.md`. Continue to `$gsd-verify-work` once the validation record is current and `nyquist_compliant: true` is justified by the evidence.

## Review AI Eval Coverage

Use this after an AI-heavy phase has implementation output and an `AI-SPEC.md` evaluation plan. `$gsd-eval-review` audits the implemented AI phase against the planned evaluation strategy so deployability claims are backed by eval evidence instead of optimism.

```bash
$gsd-ai-integration-phase 3
$gsd-execute-phase 3
$gsd-eval-review 3
```

The first command creates the evaluation contract before implementation; skip it only when the phase already has an `AI-SPEC.md`. After execution, `$gsd-eval-review` scores each eval dimension as COVERED, PARTIAL, or MISSING, audits eval tooling, reference dataset, CI/CD integration, online guardrails, and tracing, then writes `{phase}-EVAL-REVIEW.md` with Overall Score, Verdict, critical gaps, and remediation plan.

## Preserve Long-Running Context

Use this when you need to keep long-running context across sessions, but the investigation is not tied to one phase. `$gsd-thread` keeps the notes lightweight until they are ready to become a phase, backlog item, or resolved decision.

```bash
$gsd-thread "Investigate flaky release"
$gsd-thread
$gsd-thread status investigate-flaky-release
$gsd-thread close investigate-flaky-release
```

The create command writes `.planning/threads/{slug}.md` with status, created, and updated frontmatter plus Goal, Context, References, and Next Steps sections. Later sessions can resume with `$gsd-thread investigate-flaky-release`; when the issue is handled, close with `$gsd-thread close investigate-flaky-release`.

## Fix Confirmed Audit Findings

Use this after UAT or verification has produced concrete findings and you want to preview classification before changing files. `$gsd-audit-fix` is useful when you need a conservative path from audit output to verified, traceable fixes.

```bash
$gsd-audit-uat
$gsd-audit-fix --dry-run
$gsd-audit-fix --severity high --max 3
```

The dry-run stops after the classification table once it classifies each finding as auto-fixable, manual-only, or skip. The fix run processes high-severity auto-fixable findings up to `--max`, runs tests after each fix, commits atomically with finding IDs, and stops and reverts on the first test failure so later fixes do not cascade from a bad state.

## Coordinate Parallel Workstreams

Use this when one repository has two independent milestone areas moving at the same time. It keeps `.planning/workstreams/{name}` isolated per effort while preserving normal GSD commands and reviewable state.

```bash
$gsd-workstreams create backend-api
$gsd-workstreams create frontend-polish
$gsd-workstreams switch backend-api
$gsd-new-milestone --ws backend-api
$gsd-workstreams progress
```

Switching sets a session-scoped active workstream so concurrent Codex sessions do not overwrite each other. Use `--ws` on milestone and phase commands when you want explicit routing, check `$gsd-workstreams progress` before coordinating across streams, and archive finished work with `$gsd-workstreams complete backend-api` once its milestone state is closed.

## Diagnose A Failed Workflow Run

Use this after a failed or stuck GSD workflow when you need evidence before deciding whether to resume, rerun, or open a bug. `$gsd-forensics` performs a read-only investigation and writes a portable report before you make recovery changes.

```bash
git status --short
$gsd-forensics "Phase 3 execution stalled"
$gsd-resume-work
```

The investigation gathers recent git history, uncommitted work, `.planning/STATE.md`, roadmap state, phase artifacts, session reports, and worktrees. It checks stuck loops, missing artifacts, abandoned work, crash or interruption signals, scope drift, and test regression clues, then writes `.planning/forensics/report-{timestamp}.md`. It redacts absolute paths and credentials, and the workflow offers GitHub issue creation when actionable findings exist.

## Pause Before Context Reset

Use this before stopping mid-phase, compacting context, switching machines, or handing a Codex session to another maintainer. `$gsd-pause-work` records the current phase, open blockers, modified files, and the next action so the next session can resume from durable state instead of chat memory.

```bash
git status --short
$gsd-progress --forensic
$gsd-pause-work
```

Expect the pause command to update `.planning/STATE.md` and write a handoff artifact such as `HANDOFF.json` with current goal, active phase, blockers, files changed, checks already run, and the recommended resume command. Start the next session with `$gsd-resume-work`, then re-run `$gsd-progress --forensic` before editing so stale handoff notes do not become accidental truth.

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
