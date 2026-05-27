# Evaluate

Use this checklist when you want a safe trial before adding GSD Codex to a real repository. The goal is to decide whether durable planning state helps your workflow, not to run a full project.

## 10-minute check

Create a throwaway directory or a disposable branch, install locally from a shell, then run the GSD commands in Codex.

```bash
npx @oisinwang/get-shit-done-codex@latest --codex --local
```

```text
$gsd-new-project --auto
$gsd-next
```

Use `--local` for the first evaluation. It keeps Codex-facing files inside the trial directory instead of changing your global Codex setup.

From a source checkout, `npm run demo:safe-trial` runs `scripts/safe-trial-demo.cjs`, which prints commands only. It does not install packages, change Codex config, or edit repository files. You can inspect the same flow in the [Safe Trial Transcript](SAFE-TRIAL-TRANSCRIPT.md).

## Safe trial setup

For a brand-new sandbox:

```bash
mkdir gsd-codex-trial
cd gsd-codex-trial
git init
npx @oisinwang/get-shit-done-codex@latest --codex --local
```

For an existing repository:

```bash
git status
git switch -c try-gsd-codex
npx @oisinwang/get-shit-done-codex@latest --codex --local
```

Start on a clean working tree so any files GSD creates are easy to inspect or remove.

## What to inspect

After the first run, inspect:

```bash
git status
$gsd-progress --forensic
```

Look for these files:

- `.codex/` command and skill surfaces for local Codex use
- `AGENTS.md` project instructions
- `.planning/PROJECT.md`
- `.planning/ROADMAP.md`
- `.planning/STATE.md`
- phase artifacts with plan and verification evidence

The files are plain text. You should be able to read them in git before committing anything.

## Expected changed paths

A first local trial should usually touch only:

```text
.codex/
AGENTS.md
.planning/
```

If you run a workflow that edits application code, those code changes should also appear in `git status`. Review that list before committing. The safe trial path is useful because it keeps setup files, planning files, and product code changes visible as separate decisions.

## Pass signals

GSD Codex is a good fit when:

- The generated project summary matches your goal closely enough to refine.
- The roadmap breaks the work into phases you could review.
- The next action is clearer than it was in a raw chat.
- You can see where verification evidence will live before code changes happen.
- Resume commands can explain current state without relying on your memory.

## Fail signals

Use a lighter workflow when:

- The task is a one-line edit.
- You do not want planning files in or near the repository.
- Your acceptance criteria are already fully captured by existing tests.
- The generated plan creates more process than the work deserves.
- You want unattended agent changes without reviewable decisions.

## Cleanup

For a sandbox directory, remove the directory when done.

For a trial branch in an existing repository, inspect first:

```bash
git status
git diff
```

Then either commit the planning files you want to keep, or switch away from the trial branch and delete it according to your normal Git workflow.

The expected cleanup set for a local trial is `.codex/`, `AGENTS.md`, and `.planning/`, plus any code files you deliberately changed during the trial.

Do not run cleanup commands blindly in a repository with unrelated work. Review the file list first.

## Decide

If the trial makes the next step clearer and gives you useful recovery state, keep using GSD for long-running work. If it feels heavier than the task, use raw Codex for that task and keep GSD for larger or riskier changes.

Use the [Safe Trial Outcome Template](SAFE-TRIAL-OUTCOME.md) when you want to record the decision, ask in GitHub Discussions, or open an Issue with enough evidence to act on.
