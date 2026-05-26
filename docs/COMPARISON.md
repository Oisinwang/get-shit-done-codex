# Comparison

Use this page when you are deciding whether GSD Codex is worth adding to a repository, or whether a lighter workflow is enough.

## Short Answer

GSD Codex is for work that needs durable project memory, staged planning, verification, and resume support across long-running AI coding sessions. It is not a replacement for Codex itself, a generic task tracker, or a CI system.

## Compare The Fit

| Option | Best when | Main gap GSD Codex covers |
|--------|-----------|---------------------------|
| Raw Codex chat | You have a small, clear edit and can verify it in one session | Preserving goals, decisions, plans, and verification after context resets |
| A prompt pack | You want reusable wording for common coding tasks | Turning prompts into a stateful workflow with project files, phase artifacts, and recovery notes |
| A task manager | Humans need backlog ownership, assignment, and scheduling | Giving the coding agent executable project context under `AGENTS.md`, `.codex/`, and `.planning/` |
| CI-only workflow | Tests already define the whole acceptance contract | Capturing requirements, risks, design decisions, and manual UAT before tests can cover everything |
| Full enterprise process | Large teams need formal approvals and program governance | Keeping solo and small-team AI work structured without heavyweight process overhead |

## Choose GSD Codex when

- A feature is too large or risky for one prompt.
- You need Codex to resume after context compaction or a new session.
- Requirements are likely to drift unless they are written down.
- Multiple files, commands, agents, or workstreams need coordination.
- Verification needs to include tests, manual checks, security notes, or UAT evidence.
- You want planning artifacts that can be reviewed in git.

## Do not use GSD Codex when

- The task is a one-line edit and you already know the exact patch.
- You do not want planning files such as `.planning/PROJECT.md`, `.planning/ROADMAP.md`, or `.planning/STATE.md`.
- You want an agent to make changes without reviewable decisions or verification.
- Your team already has a stronger project workflow and only needs a few reusable prompts.

## What You Actually Add

A Codex-first install adds commands and skills under `.codex/` for local installs or `~/.codex/` for global installs. In a project, GSD writes plain Markdown and JSON planning artifacts under `.planning/`. Those artifacts are meant to be inspectable, commit-friendly, and removable if your repository policy does not keep local planning state.

The core contract is:

- `AGENTS.md` for project instructions
- `.codex/` for Codex-native command and skill surfaces
- `.planning/` for durable project state
- `$gsd-*` commands for workflow entry points

## Practical Rule

Use raw Codex for quick edits. Use GSD Codex when the cost of losing context, skipping planning, or forgetting verification would be higher than the cost of writing down the workflow state.
