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
