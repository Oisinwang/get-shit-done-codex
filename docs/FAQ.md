# FAQ

## Is this just a prompt pack?

No. GSD includes prompts, but the important part is the workflow state around them: project files, phase plans, verification gates, recovery notes, and command routing. The point is to keep Codex work inspectable after the first chat message.

## Does it work on an existing repository?

Yes. Start with `$gsd-map-codebase` so GSD can inspect architecture, conventions, dependencies, and risk areas before planning new work. Then run `$gsd-new-project --auto` or `$gsd-discuss-phase` depending on whether you are starting a new milestone or refining an existing phase.

## Does this require Claude Code?

No. This fork is Codex-first. The primary contract is `AGENTS.md`, `.codex/`, `$gsd-*` commands, and Codex session paths. Claude Code and other agent CLIs are supported as compatibility runtimes, but they are not the public default in this fork.

## What files does it create?

For a managed Codex install, GSD writes command and skill files under `.codex/` for local installs or `~/.codex/` for global installs. Inside a project, it creates planning artifacts such as `PROJECT.md`, `ROADMAP.md`, `STATE.md`, phase folders, verification notes, and handoff files under `.planning/`.

## Will it take over my repository?

No. GSD works through explicit commands. Planning artifacts are plain Markdown and JSON so you can review, commit, ignore, or remove them according to your repo policy. Small tasks can use `$gsd-fast` when a full project cycle would be too much.

## Will it edit code automatically?

Only when you run a workflow that performs implementation work, such as `$gsd-fast`, `$gsd-quick`, or `$gsd-execute-phase`. Discovery and planning commands focus on project state first. Use `git status` and the generated verification notes to review what changed before committing.

## Can I uninstall it?

Yes. For a local trial, remove `.codex/`, `AGENTS.md`, and `.planning/` if you do not want to keep them. For a global install, remove the GSD files from `~/.codex/` according to your normal Codex setup policy.

## Do I have to commit `.planning/`?

No. Commit `.planning/` when you want durable team-visible project memory. Ignore it or keep it on a trial branch when you only want a private evaluation. The files are plain text so the decision is visible in review.

## Can I use it with GitHub Projects, Linear, or Jira?

Yes. GSD complements an existing tracker instead of replacing it. Use the tracker as the team-facing coordination layer for ownership, priority, and status. Use GSD inside the repository for planning context and execution evidence: project state, phase plans, verification notes, and handoff files that Codex can resume from. See [Examples](EXAMPLES.md) for practical starting paths.

## Can I try it in a repository with strict branch protection?

Yes. Use a trial branch and the local install path so the first pass is reviewable before it touches the protected branch:

```bash
git switch -c evaluate-gsd-codex
npx @oisinwang/get-shit-done-codex@latest --codex --local
```

Open a pull request like any other repository change if you decide the generated `AGENTS.md`, `.codex/`, or `.planning/` artifacts belong in the repo. GSD does not need to bypass protected branch rules; merge only the files your team wants to keep.

## Can I try it without touching global Codex config?

Yes. Use `--local` for the first trial:

```bash
npx @oisinwang/get-shit-done-codex@latest --codex --local
```

That keeps Codex-facing setup files inside the current directory.

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
