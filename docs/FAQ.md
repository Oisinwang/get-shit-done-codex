# FAQ

## Is this just a prompt pack?

No. GSD includes prompts, but the important part is the workflow state around them: project files, phase plans, verification gates, recovery notes, and command routing. The point is to keep Codex work inspectable after the first chat message.

## Does it work on an existing repository?

Yes. Start with `$gsd-map-codebase` so GSD can inspect architecture, conventions, dependencies, and risk areas before planning new work. Then run `$gsd-new-project --auto` or `$gsd-discuss-phase` depending on whether you are starting a new milestone or refining an existing phase.

## Should I run $gsd-map-codebase or $gsd-new-project --auto first?

Use `$gsd-map-codebase` first when the repository already has source code, tests, a README, or established architecture. It captures architecture, conventions, dependencies, tests, and risk areas before GSD writes a project plan.

Use `$gsd-new-project --auto` first for a new repository, a blank milestone, or a rough idea where there is not much code to inspect yet. That path creates durable project state first, then uses later planning commands to refine phases.

Run `$gsd-new-project --auto` after `$gsd-map-codebase` when you want both: codebase intelligence plus a persistent `PROJECT.md`, `ROADMAP.md`, and `STATE.md` under `.planning/`.

## Does this require Claude Code?

No. This fork is Codex-first. The primary contract is `AGENTS.md`, `.codex/`, `$gsd-*` commands, and Codex session paths. Claude Code and other agent CLIs are supported as compatibility runtimes, but they are not the public default in this fork.

## What files does it create?

For a managed Codex install, GSD writes command and skill files under `.codex/` for local installs or `~/.codex/` for global installs. Inside a project, it creates planning artifacts such as `PROJECT.md`, `ROADMAP.md`, `STATE.md`, phase folders, verification notes, and handoff files under `.planning/`.

## Will it take over my repository?

No. GSD works through explicit commands. Planning artifacts are plain Markdown and JSON so you can review, commit, ignore, or remove them according to your repo policy. Small tasks can use `$gsd-fast` when a full project cycle would be too much.

## Will it edit code automatically?

Only when you run a workflow that performs implementation work, such as `$gsd-fast`, `$gsd-quick`, or `$gsd-execute-phase`. Discovery and planning commands focus on project state first. Use `git status` and the generated verification notes to review what changed before committing.

## When should I use $gsd-fast instead of $gsd-quick --validate?

Use `$gsd-fast` for trivial single-step edits when the change is obvious, the files are known, and obvious verification is available to run directly after the edit. Examples include fixing a typo, updating one link, or adjusting a small docs sentence.

Use `$gsd-quick --validate` for small work that still benefits from plan checking and verification gates: user-visible behavior, install docs, test changes, cross-file edits, or anything where the risk is not obvious from one file. It keeps the task lightweight while still asking GSD to check the plan and evidence before moving on.

Neither command replaces final review. Check `git diff`, run the relevant tests, and keep the change small enough to explain in one commit.

## Can I uninstall it?

Yes. For a local trial, remove `.codex/`, `AGENTS.md`, and `.planning/` if you do not want to keep them. For a global install, remove the GSD files from `~/.codex/` according to your normal Codex setup policy.

## Do I have to commit `.planning/`?

No. Treat `.planning/` as project memory that can be either private or team-visible, depending on your repository policy.

Keep `.planning/` private when you are evaluating GSD alone, recording exploratory notes, or working in a repository where planning state should not appear in pull requests. Set `planning.commit_docs` to `false`, add `.planning/` to `.gitignore`, and keep `planning.search_gitignored` enabled if you still want GSD to read the private state.

Commit selected planning artifacts when the team wants durable, reviewable project memory for long-running work. Run `git status --short .planning` and `git diff -- .planning` before opening a pull request, then keep only the files that explain goals, roadmap decisions, verification evidence, or handoff state without leaking secrets or local paths.

This repository does not accept runtime `.planning/` files in contributor pull requests. Use docs, examples, and tests for public contributions here.

## Can I use it with GitHub Projects, Linear, or Jira?

Yes. GSD complements an existing tracker instead of replacing it. Use the tracker as the team-facing coordination layer for ownership, priority, and status. Use GSD inside the repository for planning context and execution evidence: project state, phase plans, verification notes, and handoff files that Codex can resume from. See [Examples](EXAMPLES.md) for practical starting paths.

## Should I ask in GitHub Discussions or open an issue?

Use GitHub Discussions for setup questions, workflow advice, troubleshooting help, and examples. Good Discussion topics include choosing a local versus global install, deciding which workflow to run first, comparing Windows PowerShell and WSL setup paths, or asking why `$gsd-help is missing` after install. If you just ran a safe local trial, use the [Safe Trial Discussion Starter](SAFE-TRIAL-DISCUSSION.md) to include the right evidence without turning the question into a bug report.

Open an issue for reproducible bugs, stale documentation, or concrete feature proposals. Include the exact command, exact error text, operating system and shell, Node.js version, and GSD package version so maintainers can reproduce the report.

Do not report security vulnerabilities in public issues. Use the private vulnerability reporting path in `SECURITY.md`.

## How do I build a minimal install reproduction?

Start from a clean temporary directory or a fresh trial branch. Do not reuse a directory that already has `.codex/`, `AGENTS.md`, or `.planning/` artifacts unless the bug is specifically about upgrading those files.

Capture the tool and package versions first:

```bash
node --version
npm --version
npx --version
npm view @oisinwang/get-shit-done-codex version
```

Copy the exact install command and full output into the issue. For local installs, include `git status --short` after the install so maintainers can see which repository files changed.

## How do I record a safe 60-second demo?

Use a disposable branch or throwaway repository. Show the command flow and generated artifacts: run the local install, `$gsd-new-project --auto`, and `$gsd-next`, then show `PROJECT.md`, `ROADMAP.md`, `STATE.md`, and `.planning/phases/`.

End on `git status --short` so viewers can see the expected repository changes. Redact local paths, usernames, private repository names, tokens, email addresses, and machine hostnames before publishing.

Avoid client, employer, school, or private product details in the goal text. Use a synthetic project name, and keep the demo focused on the workflow rather than private source code.

## Where should I place a finished demo link?

Put the public recording in two places: near the README terminal preview and under `## 60-second workflow` in `docs/DEMO.md`.

Use link text such as `60-second GSD Codex demo`. Caption it with the command flow, generated artifacts, and `git status --short` evidence so visitors know what the recording proves before they install.

Keep the link near the demo guidance instead of only mentioning it in a release note. That makes it visible to evaluators who scan the README first and to maintainers who update `docs/DEMO.md`.

## Can I try it in a repository with strict branch protection?

Yes. Use a trial branch and the local install path so the first pass is reviewable before it touches the protected branch:

```bash
git switch -c evaluate-gsd-codex
npx @oisinwang/get-shit-done-codex@latest --codex --local
```

Open a pull request like any other repository change if you decide the generated `AGENTS.md`, `.codex/`, or `.planning/` artifacts belong in the repo. GSD does not need to bypass protected branch rules; merge only the files your team wants to keep.

## What should I include in a first GSD evaluation pull request?

Start with a trial branch and include only reviewable setup and planning artifacts. Include `.codex/` when reviewers need to inspect the local command surface, hooks, or skill files created by the local install.

Include `AGENTS.md` when repository instructions changed. Include selected `.planning/` docs such as `PROJECT.md`, `ROADMAP.md`, or `STATE.md` when they explain goals, roadmap decisions, current state, or verification evidence that the team wants to keep.

Leave private notes, secrets, local paths, and unrelated product code out unless the evaluation deliberately changed that code. List the commands you ran and verification evidence in the pull request description, such as `git status --short`, `$gsd-progress --forensic`, and any tests you ran.

## How should I verify a docs-only contribution before opening a pull request?

Run `git diff --check` first so whitespace errors or conflict markers do not reach review. Run `node --test tests/public-release-metadata.test.cjs` next for public docs metadata.

Use the focused metadata test for FAQ, README, docs index, changelog, roadmap, and link-surface changes. Run `npm.cmd test` before marking broad docs sweeps or cross-file release metadata changes ready, and whenever you changed tests or package metadata.

In the pull request description, list the changed docs, focused test result, full test result if run, and any skipped checks. Include the linked issue and keep runtime `.planning/` output out of docs-only PRs unless the approved issue asks for it.

## How should I check localized docs before publishing translations?

Compare the translated page with the English source first: root `README.md`, `docs/README.md`, `docs/COMPARISON.md`, `docs/PROMPTS.md`, and `docs/USER-GUIDE.md` are the source files most localized docs mirror.

Check the localized docs index and root localized README links together. A translation update is incomplete if the page exists but the matching `docs/{locale}/README.md` or root `README.{locale}.md` discovery link still points somewhere stale.

Keep Codex-first wording, `@oisinwang/get-shit-done-codex` package names, GitHub Discussions links, and `Oisinwang/get-shit-done-codex` repository URLs current. Run `node --test tests/public-release-metadata.test.cjs` after localized README or docs index edits so the public metadata guard checks package names, repository links, and localized discovery surfaces.

## How should I check README badges and links before publishing docs changes?

Check the npm version and downloads badges against `@oisinwang/get-shit-done-codex`. Confirm both badge links point to the published npm package page.

Keep the GitHub Actions badge on `codex/bootstrap`. Confirm star-history links use `Oisinwang/get-shit-done-codex`. These badges are high-signal maintenance cues for visitors scanning the repository before they install.

Review local docs links near the README nav after moving or adding public docs. Run `git diff --check` and `node --test tests/public-release-metadata.test.cjs` before opening the pull request so badge URLs, README nav links, docs links, and public metadata stay aligned.

## Can I try it without touching global Codex config?

Yes. Use `--local` for the first trial:

```bash
npx @oisinwang/get-shit-done-codex@latest --codex --local
```

That keeps Codex-facing setup files inside the current directory.

## What should change after a local Codex trial?

Local Codex trials should create or update `./.codex/` for Codex-facing skills and hooks, `AGENTS.md` for repository instructions, and `.planning/` for project state such as `PROJECT.md`, `ROADMAP.md`, and phase notes. They should not update user-level config under `~/.codex/`.

Run `git status --short` before committing:

```bash
git status --short
```

Expect those paths to appear if you asked for a local install. Commit only the artifacts your team wants to keep. For a private solo evaluation, it is reasonable to leave `.planning/` uncommitted or ignored and keep only the docs or config files your repository policy allows.

## How do I choose between local and global Codex installs?

Use `--local` for repository trials, team-visible repository config, protected-branch evaluations, or any setup you want reviewers to inspect before it becomes your default Codex environment:

```bash
npx @oisinwang/get-shit-done-codex@latest --codex --local
```

Local installs write Codex-facing files into the current repository, such as `./.codex/`, so the trial stays scoped to that workspace.

Use `--global` for user-level Codex setup when you want the same GSD commands available across your normal Codex sessions and repositories:

```bash
npx @oisinwang/get-shit-done-codex@latest --codex --global
```

Global installs write user-level config under `~/.codex/`. Use this only when that is the Codex home directory used by the runtime you actually start.

## How do I report stale npm metadata after a source fix has landed?

If the npm page or `npx @latest` still shows old behavior after a source fix has landed, first compare the source checkout on `codex/bootstrap` with the published package:

```bash
npm view @oisinwang/get-shit-done-codex version
```

The source branch can be ahead of npm while the release workflow is waiting for maintainer setup. Check `docs/RELEASE.md` for the current publish path before opening a new install bug.

When you report stale metadata, include the exact install command and npm version, the source fix commit or issue link, what `npm view @oisinwang/get-shit-done-codex version` returned, and the behavior you still see from `npx @latest`. That keeps release lag separate from a new runtime bug.

## How should I hand off a pending-release issue after a source fix lands?

Link the source fix commit in the issue comment. Link the successful GitHub Actions run that verified that commit, and summarize any local test evidence that matters for the fix.

Record `npm view @oisinwang/get-shit-done-codex version` so maintainers and users can see whether npm is still behind the source branch. Keep the `pending release` label when source is fixed but `npx @latest` still installs an older package.

Do not close the issue until the published package proves the fix is live. Use `docs/RELEASE.md` for the publish path, then close with the npm version, publish timestamp, workflow run URL, and install check.

## How should I capture release checklist dry-run evidence before publishing?

Run the Hotfix Release workflow in dry-run mode before publishing from a release branch:

```bash
gh workflow run hotfix.yml --repo Oisinwang/get-shit-done-codex --ref codex/bootstrap -f action=finalize -f version=<next-patch> -f dry_run=true
```

Confirm the `npm-publish` environment exists. Confirm `NPM_TOKEN` is configured before any real publish attempt, because dry runs validate packaging but do not update `latest`.

Record the workflow URL or run ID, the version argument, and the package contents or logs you reviewed. Do not switch to `dry_run=false` until package contents have been reviewed and the release issue has a clear owner for final publish verification.

## How should I close an issue after npm publishing succeeds?

Record the published npm version. Record the publish timestamp in the issue comment. Link the successful workflow run URL so future maintainers can trace the publish job that moved `latest`.

Run a clean install check with `npx @oisinwang/get-shit-done-codex@latest --codex` from a temporary directory or disposable repository, then paste the command and result into the issue.

Remove the `pending release` label only after the clean install check passes. Close the issue with the npm version, publish timestamp, workflow run URL, and install check in the final comment.

## How should I capture npm dist-tag rollback evidence?

Run `npm dist-tag ls @oisinwang/get-shit-done-codex` before changing tags, then paste the output in the issue. Record the `latest` and `next` tag targets so maintainers can see which published versions users would install.

Record the affected version and the reason for rollback or correction. Link the workflow run or npm command that changed the tag, and include the maintainer who approved the action.

After correction, run `npm dist-tag ls @oisinwang/get-shit-done-codex` again and paste the new output. Do not close the release issue until the comment shows before and after tag targets, the affected version, and install guidance for users who already fetched the wrong version.

## How should I capture npm provenance and package integrity evidence?

Run `npm view @oisinwang/get-shit-done-codex@<version> version gitHead dist.integrity dist.tarball` after publishing. Record the package integrity, tarball URL, npm version, and `gitHead` value in the release issue.

Run `npm pack @oisinwang/get-shit-done-codex@<version> --dry-run` and review the package contents against the release commit. Compare the npm version with the git tag so reviewers can see the package and source release are aligned.

Link the workflow run URL that published the package. Close the issue only after the issue comment includes the integrity output, package contents check, git tag comparison, workflow run URL, and any follow-up needed for users who already installed the release.

## How should I capture npm deprecation evidence?

Run `npm deprecate @oisinwang/get-shit-done-codex@<version> "<message>"` only after a maintainer has approved warning users away from that published version. Record the affected version, the reason, and the maintainer approval link before changing npm metadata.

Record the deprecation message exactly as sent to npm. It should name the safer version or explain the install path users should take instead.

Run `npm view @oisinwang/get-shit-done-codex@<version> deprecated` after the command and paste the result into the issue. Tell users which version or install command to use instead, then link any follow-up release, dist-tag, or rollback evidence.

## When should I not use it?

Do not use GSD for a one-line edit when you already know the exact change and do not need durable state. It is also the wrong tool if you want an agent to act without review, tests, or traceable decisions. Use it when the work benefits from preserved context, staged planning, verification, or resume support.

## How do I know what to run first?

Use [Examples](EXAMPLES.md) if you know the situation. The most common paths are:

```bash
$gsd-new-project --auto
$gsd-map-codebase
$gsd-fast "fix the failing install check"
$gsd-resume-work
```

If you are unsure, run `$gsd-help` after install or ask in GitHub Discussions.
