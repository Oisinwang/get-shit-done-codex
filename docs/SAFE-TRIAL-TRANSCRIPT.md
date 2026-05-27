# Safe Trial Demo Transcript

This is a no-install, no-edit transcript for visitors who want to see the safe trial flow before cloning the repository or running an npm script.

Generated from `npm run demo:safe-trial` in a source checkout. The command prints the same flow as `scripts/safe-trial-demo.cjs`; it does not install packages or edit files.

```text
GSD Codex safe trial demo
=========================

This script prints commands only; it does not install or modify files.

Sandbox trial:
  mkdir gsd-codex-trial
  cd gsd-codex-trial
  git init
  npx @oisinwang/get-shit-done-codex@latest --codex --local
  $gsd-new-project --auto
  $gsd-next
  git status --short

Existing repository trial:
  git status --short
  git switch -c evaluate-gsd-codex
  npx @oisinwang/get-shit-done-codex@latest --codex --local
  $gsd-new-project --auto
  $gsd-next
  git status --short

Expected changed paths: .codex/, AGENTS.md, .planning/
Remove the throwaway directory or delete the trial branch when you are done evaluating.
```

Use this transcript when you want to inspect the command sequence before evaluating GSD Codex locally. For pass signals, fail signals, and cleanup guidance, continue with [Evaluate](EVALUATE.md).
