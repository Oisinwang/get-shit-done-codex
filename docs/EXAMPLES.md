# Examples

Use these playbooks when you know the situation but do not want to learn every command first. Each path starts with the smallest command that gives Codex durable project state.

## Real-World Scenarios

Use these when you recognize the problem but are not sure which workflow to start with.

### Ship A Small Bugfix Without Losing Review Evidence

**Starting problem:** A user reports a focused bug, you can reproduce it, and you want the fix to stay small instead of turning into a broad refactor.

**GSD flow:** Start with `$gsd-fast "fix the failing install check and verify with the focused test"` when the scope is narrow. Use `$gsd-quick --validate` instead when you need a short plan before editing.

**Artifact or verification:** Expect a regression test, focused verification command, and commit-sized review trail that can be pasted into the issue or PR.

### Evaluate GSD On An Existing Repository

**Starting problem:** You have a real repo with source code, tests, and a README, but you do not yet know whether GSD's planning state belongs in that repo.

**GSD flow:** Create a temporary evaluation branch, install locally, run `$gsd-map-codebase`, then run `$gsd-new-project --auto` and `$gsd-discuss-phase 1`.

**Artifact or verification:** Expect a codebase map, project state, and a first phase discussion before deciding whether `.codex/`, `AGENTS.md`, and `.planning/` should be committed.

### Recover A Long-Running Session After Context Reset

**Starting problem:** A long Codex session was paused, compacted, or interrupted, and the next maintainer needs to know what happened without reading the whole chat.

**GSD flow:** Run `$gsd-resume-work` first, then `$gsd-progress --forensic`; if the session is still active, create a fresh handoff with `$gsd-pause-work`.

**Artifact or verification:** Expect a handoff file, progress audit, and resumed next action that identifies completed work, blockers, modified files, and the next safe command.

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

## Troubleshoot Stale Or Failing Npm Install

Use this when a source fix has landed but `npx @latest` still fails, installs old behavior, or does not match the README. Start from a clean temporary directory so existing `.codex/`, `AGENTS.md`, or `.planning/` files do not hide the package behavior.

```bash
mkdir gsd-install-check
cd gsd-install-check
npm view @oisinwang/get-shit-done-codex version
npx @oisinwang/get-shit-done-codex@latest --codex
```

Paste the command output into the issue with the source fix commit or issue link. Keep the `pending release` label when the source branch is fixed but npm still publishes an older package. In the issue comment, tell users whether to wait for npm publishing or use the source branch until the published package catches up.

## Review Generated Planning Artifacts

Use this after a trial run when you need to decide whether the generated planning state belongs in the repository.

```bash
git status --short
git diff -- .codex AGENTS.md PROJECT.md ROADMAP.md STATE.md .planning
$gsd-progress --forensic
```

Keep `AGENTS.md`, `.codex/`, and `.planning/` when the generated state helps later Codex sessions resume the same project context. Ignore or discard the trial branch when the artifacts are only private evaluation notes or do not match how your team reviews project state.

## Repair Planning Directory Drift

Use this when `.planning/` integrity checks look wrong after interrupted setup, branch switches, or manual file edits. This workflow stays read-only until the explicit `--repair` step.

```bash
$gsd-progress --forensic
$gsd-health
# Review repairable findings before changing files.
$gsd-health --repair
$gsd-progress --forensic
```

Run `$gsd-progress --forensic` first so verification debt and state drift are visible before repair. `$gsd-health` reports `Status: HEALTHY | DEGRADED | BROKEN`, issue counts, and `repairable_count`; review those findings before changing files. Only run `$gsd-health --repair` when the health output identifies auto-fixable items. Repair output includes `repairs_performed`; common repairs include creating `config.json`, resetting invalid `config.json`, regenerating missing `STATE.md`, and adding `workflow.nyquist_validation`. Re-run forensic progress after repair so any remaining manual work is visible.

## Personalize Codex For Long Projects

Use this before a long-running project when you want Codex to learn stable coding, review, and communication preferences. Use the questionnaire for first-time setup when there is not enough session history yet, then refresh after several sessions.

```bash
$gsd-profile-user --questionnaire
$gsd-profile-user --refresh
git diff -- AGENTS.md
```

`$gsd-profile-user --questionnaire` writes `$HOME/.codex/get-shit-done/USER-PROFILE.md` and can generate `$HOME/.codex/commands/gsd/dev-preferences.md`, an AGENTS.md profile section, or a Global AGENTS.md entry. `$gsd-profile-user --refresh` backs up the previous profile, re-analyzes recent sessions, and shows changed dimensions before writing the new profile. Commit the AGENTS.md profile section only when the preference is stable project guidance that other maintainers should share. Keep `USER-PROFILE.md` and global `AGENTS.md` local when they describe one maintainer's personal style. PROJECT.md and AGENTS.md remain project requirements and operating instructions; the generated profile is personal interaction guidance, not a replacement for project scope or repo rules.

## Tune Model Cost And Autonomy

Use this before a long-running milestone when token cost, latency, or autonomy needs to be explicit. It is also useful before inviting contributors into a repo that should have predictable planning and verification defaults.

```bash
$gsd-settings
$gsd-set-profile budget
$gsd-set-profile quality
$gsd-progress --forensic
```

Use `budget` for cheap routine maintenance, documentation, or backlog triage. Use `balanced` for normal feature work. Use `quality` for high-risk planning or review where missing a requirement is more expensive than spending more tokens. Use `inherit` when the active Codex runtime should control model choice, such as when a local or provider-specific model is already selected outside GSD.

`$gsd-settings` also exposes workflow agents such as research, plan_check, verifier, and auto_advance. Keep research, plan_check, and verifier enabled when the work affects users, releases, migrations, security, or public docs. Consider disabling or downgrading only for low-risk chores where the command output itself is easy to inspect. Profile tuning changes time and token spend; it does not replace phase verification, UAT, or review.

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

## Pause Before A Context Reset

Use this before stopping, compacting, or handing off a Codex session when current work is tied to an active phase, spike, sketch, deliberation, or research trail.

```bash
$gsd-progress --forensic
$gsd-pause-work
$gsd-resume-work
```

Run `$gsd-progress --forensic` first to surface pending verification debt and stale state. `$gsd-pause-work` writes `.planning/HANDOFF.json` with machine-readable state for `$gsd-resume-work` and writes `.continue-here.md` with human-readable context for the next maintainer. The handoff should capture current position, completed work, remaining work, blockers, human actions pending, background processes, modified files, and the next concrete action.

## Summarize A Session For Handoff

Use this before a maintainer handoff or weekly progress summary when you need a shareable record of what changed, what was verified, and what remains.

```bash
$gsd-progress --forensic
$gsd-session-report
git diff -- .planning/reports
```

Run `$gsd-progress --forensic` first so the report starts from current state rather than memory. `$gsd-session-report` writes `.planning/reports/SESSION_REPORT.md` for stakeholder sharing with Session Summary, Work Performed, Outcomes, Resource Usage Estimate, and Next Steps sections. Review the report diff before handing it off so stale status, missing verification, or unclear next actions do not become part of the project record.

## Capture A Project Health Snapshot

Use this before a weekly update, milestone review, or contributor handoff when you need a fast view of project state without reading every planning artifact.

```bash
$gsd-progress --forensic
$gsd-stats
$gsd-session-report
```

Run `$gsd-progress --forensic` first so stale state and verification debt are visible before you summarize. `$gsd-stats` displays the milestone version and milestone name, phase progress, plan completion, requirements complete count, git commits, started date, last activity, and project age. Use `$gsd-session-report` after the stats snapshot when the update needs a shareable narrative with outcomes and next steps.

## Archive Completed Milestone Phases

Use this after completing or archiving milestones when old phase directories are still sitting in `.planning/phases/` and make current work harder to scan.

```bash
$gsd-progress --forensic
$gsd-cleanup
git status --short
```

Run `$gsd-progress --forensic` first so you know whether milestone state is actually closed. `$gsd-cleanup` reads `.planning/MILESTONES.md`, checks archived ROADMAP snapshots, and shows a dry-run summary before asking for confirmation. When confirmed, it moves `.planning/phases/{dir}` into `.planning/milestones/v{version}-phases/` and commits the moved planning state so the active phases directory only contains current work.

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
