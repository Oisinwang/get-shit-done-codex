# Documentacao GSD Codex

Esta pasta contem a documentacao em portugues do fork GSD Codex. O fork e Codex-first: `AGENTS.md`, `.codex/`, `$gsd-*`, `agents_md_path`, `generate-agents-md` e caminhos de sessao do Codex sao o contrato publico principal.

Instale o pacote publicado com:

```bash
npx @oisinwang/get-shit-done-codex@latest
```

## Safe trial quick links

- [Safe Trial Troubleshooting](../SAFE-TRIAL-TROUBLESHOOTING.md)
- [Safe Trial Outcome Template](../SAFE-TRIAL-OUTCOME.md)
- [Safe Trial Discussion Starter](../SAFE-TRIAL-DISCUSSION.md)
- [Safe Trial Transcript](../SAFE-TRIAL-TRANSCRIPT.md)

## Evaluation quick links

- **Try safely:** [Evaluate](../EVALUATE.md)

## Support quick links

- **Get help:** [Support](../../SUPPORT.md)
- **Ask or discuss:** [GitHub Discussions](https://github.com/Oisinwang/get-shit-done-codex/discussions)

## Contribution quick links

- **Contribute:** [Contributing Guide](../../CONTRIBUTING.md)
- **Find starter tasks:** [Good First Issues](https://github.com/Oisinwang/get-shit-done-codex/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22)

## Maintainer quick links

- **Publish a fix:** [Release Checklist](../RELEASE.md)
- **Close contributor tasks:** [Maintainer Checklist](../MAINTAINER-CHECKLIST.md)

## Promotion quick links

- **Share the project:** [Promotion Assets](../PROMOTION.md)

## Demo quick links

- **See the first run:** [Demo](../DEMO.md)
- **Record a short demo:** [Demo Media Checklist](../DEMO.md#demo-media-checklist)

## FAQ quick links

- **Answer common questions:** [FAQ](../FAQ.md)

## Troubleshooting quick links

- **Recover install issues:** [Troubleshooting](../TROUBLESHOOTING.md)

## Examples quick links

- **Pick a workflow:** [Examples](../EXAMPLES.md)

## Prompt Recipes quick links

- **Paste a Codex prompt:** [Prompt Recipes](../PROMPTS.md)

## Comparison quick links

- **Compare options:** [Comparison](../COMPARISON.md)

## Roadmap quick links

- **See direction:** [Roadmap](../ROADMAP.md)

Nomes legados da era Claude continuam apenas como compatibilidade de migracao. As regras do fork estao em [CODEX-FORK.md](../CODEX-FORK.md).

## Indice da documentacao

| Documento | Publico | Descricao |
|----------|---------|-----------|
| [Roadmap](../ROADMAP.md) | Evaluators, contributors | Public direction, near-term priorities, manual maintainer actions, and good first issue candidates |
| [Evaluate](../EVALUATE.md) | New users, evaluators | Safe 10-minute trial checklist with pass and fail signals |
| [FAQ](../FAQ.md) | New users, evaluators | Answers common adoption questions about scope, files, runtimes, and when not to use GSD |
| [Examples](../EXAMPLES.md) | New users | Copy-pastable workflows for new projects, existing repos, quick fixes, resume, spikes, and sketches |
| [Demo](../DEMO.md) | New users, maintainers | 60-second workflow preview, first-run output, demo media checklist, generated artifacts, and git status evidence |
| [Safe Trial Troubleshooting](../SAFE-TRIAL-TROUBLESHOOTING.md) | New users, evaluators | First-run quick fixes for missing commands, changed files, local/global installs, npm failures, stale cache, and support routing |
| [Safe Trial Outcome Template](../SAFE-TRIAL-OUTCOME.md) | New users, evaluators | Record commands, changed paths, pass/fail signals, keep/discard decisions, and feedback evidence |
| [Safe Trial Discussion Starter](../SAFE-TRIAL-DISCUSSION.md) | New users, evaluators | Copy-pastable GitHub Discussions post with command evidence, changed paths, privacy checks, and workflow advice |
| [Safe Trial Transcript](../SAFE-TRIAL-TRANSCRIPT.md) | New users, evaluators | No-install, no-edit transcript generated from npm run demo:safe-trial for previewing the first-run flow |
| [Support](../../SUPPORT.md) | Users, evaluators | Setup questions, workflow advice, troubleshooting help, local versus global installs, and bug report routing |
| [GitHub Discussions](https://github.com/Oisinwang/get-shit-done-codex/discussions) | Users, evaluators | Community support for questions, examples, and safe trial feedback |
| [Contributing Guide](../../CONTRIBUTING.md) | Contributors, evaluators | Contribution types, development setup, test requirements, review expectations, and pull request flow |
| [Good First Issues](https://github.com/Oisinwang/get-shit-done-codex/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22) | Contributors, new users | Starter tasks aligned with current roadmap gaps, docs updates, and public launch polish |
| [Security Policy](../../SECURITY.md) | Users, contributors | Private vulnerability reporting, disclosure guidance, response timeline, scope, and security boundaries |
| [Private Vulnerability Report](https://github.com/Oisinwang/get-shit-done-codex/security/advisories/new) | Security reporters | GitHub private advisory intake for vulnerabilities that should not be posted in public issues |
| [Code of Conduct](../../CODE_OF_CONDUCT.md) | Users, contributors | Community standards, acceptable behavior, enforcement responsibilities, scope, and reporting guidance |
| [Private Conduct Report](https://github.com/Oisinwang/get-shit-done-codex/security/advisories/new) | Users, contributors | Sensitive conduct reports, reporter safety, names, screenshots, and other details that should not be posted in public issues |
| [License](../../LICENSE) | Users, contributors | MIT License terms for reuse, copy, modify, distribute, and sublicense rights |
| [MIT License Terms](../../LICENSE) | Users, contributors | Permission notice, copyright notice, no warranty statement, and liability limits |
| [Package Metadata](../../package.json) | Users, evaluators, maintainers | Published npm package name, description, keywords, CLI bin, shipped files, and public publish settings |
| [SDK Package Metadata](../../sdk/package.json) | SDK users, integrators | SDK npm package name, CLI bin, shipped dist and prompts files, prepublish build, and public publish settings |
| [Installer CLI](../../bin/install.js) | Users, evaluators, maintainers | Codex-first installer entrypoint, local and global targets, runtime flags, SDK install controls, uninstall mode, and WSL path guard |
| [Hook Build Script](../../scripts/build-hooks.js) | Contributors, maintainers | Builds installer hook payloads for prepublish builds, local source installs, and test runs |
| [Safe Trial Demo Script](../../scripts/safe-trial-demo.cjs) | New users, evaluators | No-install command preview for sandbox trial and existing-repository trial flows |
| [Test Runner Script](../../scripts/run-tests.cjs) | Contributors, maintainers | Node test orchestration for public release metadata, link checks, install regressions, and coverage |
| [Hotfix Validation Script](../../scripts/validate-hotfix.cjs) | Maintainers | Hotfix release guard for version input, dry-run state, package metadata, and publish workflow checks |
| [Runtime Support Matrix](../FEATURES.md#36-multi-runtime-support) | Users, evaluators | Supported runtime list, command formats, agent formats, hook events, config shapes, and installer requirements |
| [Runtime Abstraction](../ARCHITECTURE.md#runtime-abstraction) | Contributors, integrators | Runtime command format, agent system, config location, tool mapping, hook event names, frontmatter differences, and model inheritance |
| [Compatibility Runtime Guide](../USER-GUIDE.md#using-compatibility-runtimes-opencode-gemini-cli-kilo) | Users, evaluators | How compatibility runtimes inherit model selection, use resolve_model_ids omit, and set runtime-specific model overrides |
| [Non-Claude Runtime Configuration](../CONFIGURATION.md#non-claude-runtimes-codex-opencode-gemini-cli-kilo) | Users, maintainers | Configuration behavior for Codex, OpenCode, Gemini CLI, Kilo, inherit model profiles, and runtime-selected model IDs |
| [Manual Update Runtime Flags](../manual-update.md#runtime-flags) | Users, maintainers | Runtime flag table for Codex, Claude Code, Gemini CLI, OpenCode, Kilo, Copilot, Cursor, Windsurf, Augment, Antigravity, Trae, Qwen Code, CodeBuddy, Cline, and all runtimes |
| [Test Workflow](../../.github/workflows/test.yml) | Contributors, maintainers | GitHub Actions CI matrix, Node.js versions, install dependencies, tests with coverage, and branch validation |
| [Hotfix Release Workflow](../../.github/workflows/hotfix.yml) | Maintainers | manual hotfix dispatch, dry-run mode, version input, npm-publish environment, NPM_TOKEN, and publish verification |
| [Issue Chooser](../../.github/ISSUE_TEMPLATE/config.yml) | Users, contributors | Questions, safe trial troubleshooting, code of conduct, private security reporting, and issue routing |
| [Bug Report Template](../../.github/ISSUE_TEMPLATE/bug_report.yml) | Users, contributors | Package version, runtime, Node.js version, shell, reproduction steps, error text, safe trial evidence, and privacy check |
| [Documentation Issue Template](../../.github/ISSUE_TEMPLATE/docs_issue.yml) | Readers, contributors | Incorrect, missing, or unclear docs with affected path, current problem, and expected correction |
| [Feature Request Template](../../.github/ISSUE_TEMPLATE/feature_request.yml) | Users, contributors | New feature proposals with problem statement, scope, user stories, acceptance criteria, runtime compatibility, and maintenance cost |
| [Enhancement Proposal Template](../../.github/ISSUE_TEMPLATE/enhancement.yml) | Users, contributors | Existing-feature improvements with current behavior, desired behavior, affected files, compatibility impact, alternatives, and review context |
| [Chore Template](../../.github/ISSUE_TEMPLATE/chore.yml) | Maintainers, contributors | Maintenance work for refactoring, test quality, CI/CD, dependencies, tech debt, completion criteria, and related issues |
| [Pull Request Template Chooser](../../.github/pull_request_template.md) | Contributors, maintainers | Default typed template chooser for codex/bootstrap, Codex-first contract, approved issue requirement, and no-draft rule |
| [Fix PR Template](../../.github/PULL_REQUEST_TEMPLATE/fix.md) | Contributors, maintainers | Fix PR route with confirmed-bug issue link, broken behavior, root cause, regression test, platform checks, and runtime checks |
| [Enhancement PR Template](../../.github/PULL_REQUEST_TEMPLATE/enhancement.md) | Contributors, maintainers | Enhancement PR route with approved-enhancement issue, before/after, implementation notes, scope confirmation, tests, docs, and changelog |
| [Feature PR Template](../../.github/PULL_REQUEST_TEMPLATE/feature.md) | Contributors, maintainers | Feature PR route with approved-feature issue, feature summary, changed files, acceptance criteria, platform/runtime tests, scope confirmation, and screenshots or recordings |
| [Release Workflow](../../.github/workflows/release.yml) | Maintainers | create, rc, finalize actions, version input, dry-run mode, npm-publish environment, NPM_TOKEN, npm test coverage, and dist-tag publication |
| [PR Gate Workflow](../../.github/workflows/pr-gate.yml) | Contributors, maintainers | Pull request size labels for size/S, size/M, size/L, size/XL, large PR warning, and split guidance |
| [Require Issue Link Workflow](../../.github/workflows/require-issue-link.yml) | Contributors, maintainers | Blocks PRs without Closes, Fixes, or Resolves #NNN, comments with issue chooser link, and keeps issue-first review policy visible |
| [Branch Naming Workflow](../../.github/workflows/branch-naming.yml) | Contributors, maintainers | Validates feat/, fix/, hotfix/, docs/, chore/, dependabot/, and renovate/ branch prefixes with GSD branch compatibility |
| [Branch Cleanup Workflow](../../.github/workflows/branch-cleanup.yml) | Maintainers | Deletes merged PR branches, preserves protected branches including codex/bootstrap, and runs weekly orphan branch sweeps with workflow_dispatch |
| [Close Draft PRs Workflow](../../.github/workflows/close-draft-prs.yml) | Contributors, maintainers | Rejects draft PRs, comments with test expectations, correct template, linked approved issue, and ready-for-review policy |
| [Auto-label Issues Workflow](../../.github/workflows/auto-label-issues.yml) | Maintainers | Adds needs-triage to new issues with GitHub Script retries so the triage queue stays visible |
| [Auto-branch Workflow](../../.github/workflows/auto-branch.yml) | Maintainers, contributors | Creates branches from labeled issues as fix, feat, chore, and docs branches on codex/bootstrap and comments checkout commands |
| [Security Scan Workflow](../../.github/workflows/security-scan.yml) | Contributors, maintainers | Runs prompt injection, base64 obfuscation, secret scans, and .planning runtime-data check on PRs |
| [Stale Cleanup Workflow](../../.github/workflows/stale.yml) | Maintainers | Marks inactive issues and inactive PRs after 28 days, closes after 14 days, and preserves critical, pinned, and confirmed exemptions |
| [Dependabot Config](../../.github/dependabot.yml) | Maintainers | Weekly npm and GitHub Actions dependency updates with open pull request limits, dependencies labels, and chore commit prefixes |
| [Repository Labels Contract](../../.github/labels.json) | Maintainers, contributors | Public label names, descriptions, colors, needs-triage, approved-feature, approved-enhancement, pending release, and type: chore |
| [CODEOWNERS](../../.github/CODEOWNERS) | Maintainers, contributors | Requires public fork maintainer review on all changes |
| [Funding Metadata](../../.github/FUNDING.yml) | Users, sponsors | GitHub Sponsors metadata for Oisinwang |
| [Release Checklist](../RELEASE.md) | Maintainers | npm publish setup, hotfix workflow steps, and verification for `npx @latest` recovery |
| [Maintainer Checklist](../MAINTAINER-CHECKLIST.md) | Maintainers | Close resolved good-first issues with verification, CI, labels, and public notes aligned |
| [Troubleshooting](../TROUBLESHOOTING.md) | Users | Fast recovery paths for Codex config, install, PATH, Windows PowerShell, and stale npm metadata issues |
| [Promotion Assets](../PROMOTION.md) | Maintainers | Launch copy, social preview setup, and public positioning snippets |
| [Notas do fork Codex](../CODEX-FORK.md) | Todos os usuarios | Escopo Codex-first, limites de nomenclatura e notas de migracao |
| [Prompt Recipes](../PROMPTS.md) | Todos os usuarios | Prompts Codex copy-pastable para iniciar, retomar, auditar e corrigir com GSD |
| [Comparison](../COMPARISON.md) | Avaliadores | Guia de decisao para comparar GSD Codex com Codex cru, prompt packs, task managers e CI-only workflows |
| [Guia do usuario](USER-GUIDE.md) | Todos os usuarios | Fluxos de trabalho, troubleshooting e recuperacao |
| [Referencia de recursos](FEATURES.md) | Todos os usuarios | Recursos, requisitos e comportamento esperado |
| [Referencia de comandos](COMMANDS.md) | Todos os usuarios | Comandos, sintaxe, flags, opcoes e exemplos |
| [Configuracao](CONFIGURATION.md) | Todos os usuarios | Schema de configuracao, toggles, perfis de modelo e git |
| [Arquitetura](ARCHITECTURE.md) | Contribuidores | Arquitetura, modelo de agentes e fluxo de dados |
| [Ferramentas CLI](CLI-TOOLS.md) | Contribuidores | API programatica `gsd-tools.cjs` |
| [Agentes](AGENTS.md) | Contribuidores | Agentes especializados, papeis e padroes de orquestracao |
| [Monitor de contexto](context-monitor.md) | Todos os usuarios | Hook de monitoramento da janela de contexto |
| [Discuss Mode](workflow-discuss-mode.md) | Todos os usuarios | Modo de entrevista e captura de suposicoes |

## Links rapidos

- **Comece aqui:** [README principal](../../README.pt-BR.md) -> instalar -> `$gsd-help`
- **Entenda o fork:** [Notas do fork Codex](../CODEX-FORK.md)
- **Cole um prompt Codex:** [Prompt Recipes](../PROMPTS.md)
- **Compare opcoes:** [Comparison](../COMPARISON.md)
- **Execute o fluxo:** [Guia do usuario](USER-GUIDE.md)
- **Encontre um comando:** [Referencia de comandos](COMMANDS.md)
- **Configure o comportamento:** [Configuracao](CONFIGURATION.md)
- **Estenda o sistema:** [Ferramentas CLI](CLI-TOOLS.md) + [Agentes](AGENTS.md)
