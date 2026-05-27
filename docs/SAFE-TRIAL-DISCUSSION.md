# Safe Trial Discussion Starter

Use this after you tried the safe local trial and want advice in GitHub Discussions before you keep the setup, discard it, or turn the result into an issue. Start from a filled `SAFE-TRIAL-OUTCOME.md` so readers can see the evidence behind your decision.

## Discussion title

```text
I tried the safe local trial and want advice on what to keep
```

## Discussion body

Copy this into GitHub Discussions after replacing the placeholders.

````markdown
## What I want advice on

I tried the safe local trial and want help deciding whether GSD fits this repository.

I want advice on:
- Whether the generated planning files are useful enough to keep.
- Whether I should keep using the local install path or switch to a global install.
- Whether any changed files look unexpected.

## Commands I ran

```text
git status --short
git switch -c evaluate-gsd-codex
npx @oisinwang/get-shit-done-codex@latest --codex --local
$gsd-new-project --auto
$gsd-next
git status --short
git diff --stat
```

## Changed paths

Paste a sanitized `git status --short` result here.

```text
<paste output>
```

Paste a sanitized `git diff --stat` result here.

```text
<paste output>
```

## Decision so far

My current decision is:
- [ ] Keep the GSD setup for this repository.
- [ ] Keep only some generated files.
- [ ] Discard the trial changes.
- [ ] I am not sure yet.

## Outcome notes

I filled out `SAFE-TRIAL-OUTCOME.md` and the main pass/fail signal was:

```text
<short summary>
```

## Privacy check

- [ ] Do not paste tokens, API keys, private repo names, customer data, or proprietary source.
- [ ] I reviewed `git status --short` and `git diff --stat` before posting.
- [ ] I removed secrets and unrelated local paths from the pasted output.
````

## Before posting

Review the post as if it were public. Use GitHub Discussions for workflow advice and setup questions. Open an issue only when you have a reproducible bug, stale documentation, or a concrete feature proposal.
