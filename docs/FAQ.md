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

Use GitHub Discussions for setup questions, workflow advice, troubleshooting help, and examples. Good Discussion topics include choosing a local versus global install, deciding which workflow to run first, comparing Windows PowerShell and WSL setup paths, or asking why `$gsd-help is missing` after install.

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
