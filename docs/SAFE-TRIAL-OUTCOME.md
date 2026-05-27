# Safe Trial Outcome Template

Copy this template after a safe local trial. It helps you decide what to keep, what to discard, and what evidence to include if you ask for help.

## Trial Context

- Repository or sandbox:
- Trial goal:
- Runtime:
- Package command:
- Branch name:

## Commands Run

```text
git status --short
npx @oisinwang/get-shit-done-codex@latest --codex --local
$gsd-new-project --auto
$gsd-next
git status --short
```

## Changed Paths

Paste the inspected output:

```text
git status --short
git diff --stat
```

Expected setup paths:

- `.codex/`
- `AGENTS.md`
- `.planning/`

List any product files changed during the trial separately from setup files.

## Decision

- [ ] Keep: the generated planning state made the next action clearer.
- [ ] Keep partially: keep selected files and discard the rest.
- [ ] Discard: the trial created more process than this task needs.
- [ ] Ask for help before deciding.

## Pass signals

- The project summary matches the intended goal.
- The roadmap is small enough to review.
- `STATE.md` makes the next action clear.
- Verification evidence has an obvious home before code changes happen.
- Resume commands can explain current state without relying on chat memory.

## Fail signals

- The task is a one-line edit.
- The plan is heavier than the risk.
- Important constraints are missing from `PROJECT.md`.
- The changed paths are mixed with unrelated work.
- You want unattended changes without reviewable decisions.

## Feedback evidence

Use GitHub Discussions for setup questions, fit questions, and workflow advice. The [Safe Trial Discussion Starter](SAFE-TRIAL-DISCUSSION.md) turns this evidence into a copy-pastable post. Include:

- This filled template.
- The commands you ran.
- Sanitized `git status --short` and `git diff --stat`.
- Which files you would keep or discard.

Open an Issue for reproducible bugs or stale documentation. Include:

- The expected behavior.
- The actual behavior.
- Package version or `npm view @oisinwang/get-shit-done-codex version`.
- A small reproduction from a sandbox or disposable branch.
