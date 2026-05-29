# GSD Codex 文档

这里是 GSD Codex fork 的中文文档入口。本 fork 是 Codex-first：`AGENTS.md`、`.codex/`、`$gsd-*`、`agents_md_path`、`generate-agents-md` 和 Codex 会话路径是主要公开契约。

使用已发布的 npm 包安装：

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

- **Paste a Codex prompt:** [Prompt Recipes](PROMPTS.md)

## Comparison quick links

- **Compare options:** [Comparison](COMPARISON.md)

## Roadmap quick links

- **See direction:** [Roadmap](../ROADMAP.md)

Claude 时代的旧名称只作为迁移兼容层保留。fork 的边界、命名规则和迁移说明见 [CODEX-FORK.md](../CODEX-FORK.md)。

## 文档索引

| 文档 | 读者 | 内容 |
|------|------|------|
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
| [Release Checklist](../RELEASE.md) | Maintainers | npm publish setup, hotfix workflow steps, and verification for `npx @latest` recovery |
| [Maintainer Checklist](../MAINTAINER-CHECKLIST.md) | Maintainers | Close resolved good-first issues with verification, CI, labels, and public notes aligned |
| [Troubleshooting](../TROUBLESHOOTING.md) | Users | Fast recovery paths for Codex config, install, PATH, Windows PowerShell, and stale npm metadata issues |
| [Promotion Assets](../PROMOTION.md) | Maintainers | Launch copy, social preview setup, and public positioning snippets |
| [Codex fork 说明](../CODEX-FORK.md) | 所有用户 | Codex-first 范围、命名边界、迁移说明和发布状态 |
| [对比指南](COMPARISON.md) | 评估者 | 何时使用 GSD Codex，而不是原始 Codex chat、prompt pack、task manager 或 CI-only workflow |
| [提示词配方](PROMPTS.md) | 新用户 | 可直接粘贴到 Codex 的提示词，用于启动、恢复、审计和小修复 |
| [用户指南](USER-GUIDE.md) | 所有用户 | 工作流演练、故障排查和恢复 |
| [功能参考](../FEATURES.md) | 所有用户 | 功能、需求和行为说明 |
| [命令参考](../COMMANDS.md) | 所有用户 | 命令、参数、标志和示例 |
| [配置参考](../CONFIGURATION.md) | 所有用户 | 配置 schema、工作流开关、模型配置和 git 策略 |
| [架构说明](../ARCHITECTURE.md) | 贡献者 | 系统架构、agent 模型和数据流 |
| [CLI 工具](../CLI-TOOLS.md) | 贡献者 | `gsd-tools.cjs` 编程接口 |
| [Agent 参考](../AGENTS.md) | 贡献者 | 专用 agents、职责和编排模式 |
| [上下文监控](../context-monitor.md) | 所有用户 | 上下文窗口监控 hook 架构 |
| [Discuss Mode](../workflow-discuss-mode.md) | 所有用户 | 假设模式与访谈模式 |

## 快速链接

- **从这里开始：** [根 README](../../README.zh-CN.md) -> 安装 -> `$gsd-help`
- **理解 fork：** [Codex fork 说明](../CODEX-FORK.md)
- **粘贴提示词：** [提示词配方](PROMPTS.md)
- **运行工作流：** [用户指南](USER-GUIDE.md)
- **查找命令：** [命令参考](../COMMANDS.md)
- **配置行为：** [配置参考](../CONFIGURATION.md)
- **扩展系统：** [CLI 工具](../CLI-TOOLS.md) + [Agent 参考](../AGENTS.md)
