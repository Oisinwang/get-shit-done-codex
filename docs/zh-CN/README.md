# GSD Codex 文档

这里是 GSD Codex fork 的中文文档入口。本 fork 是 Codex-first：`AGENTS.md`、`.codex/`、`$gsd-*`、`agents_md_path`、`generate-agents-md` 和 Codex 会话路径是主要公开契约。

使用已发布的 npm 包安装：

```bash
npx @oisinwang/get-shit-done-codex@latest
```

## 安全试用快速链接

- [安全试用故障排查](../SAFE-TRIAL-TROUBLESHOOTING.md)
- [安全试用结果模板](../SAFE-TRIAL-OUTCOME.md)
- [安全试用讨论开场白](../SAFE-TRIAL-DISCUSSION.md)
- [安全试用记录](../SAFE-TRIAL-TRANSCRIPT.md)

## 评估快速链接

- **安全试用：** [Evaluate](../EVALUATE.md)

## 支持快速链接

- **获取帮助：** [Support](../../SUPPORT.md)
- **提问或讨论：** [GitHub Discussions](https://github.com/Oisinwang/get-shit-done-codex/discussions)

## 贡献快速链接

- **参与贡献：** [Contributing Guide](../../CONTRIBUTING.md)
- **查找入门任务：** [Good First Issues](https://github.com/Oisinwang/get-shit-done-codex/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22)

## 维护者快速链接

- **发布修复：** [Release Checklist](../RELEASE.md)
- **关闭贡献者任务：** [Maintainer Checklist](../MAINTAINER-CHECKLIST.md)

## 推广快速链接

- **分享项目：** [Promotion Assets](../PROMOTION.md)

## 演示快速链接

- **查看首次运行：** [Demo](../DEMO.md)
- **录制短演示：** [Demo Media Checklist](../DEMO.md#demo-media-checklist)

## FAQ 快速链接

- **回答常见问题：** [FAQ](../FAQ.md)

## 故障排查快速链接

- **恢复安装问题：** [Troubleshooting](../TROUBLESHOOTING.md)

## 示例快速链接

- **选择工作流：** [Examples](../EXAMPLES.md)

## Prompt 配方快速链接

- **粘贴 Codex prompt：** [Prompt Recipes](PROMPTS.md)

## 对比快速链接

- **比较选项：** [Comparison](COMPARISON.md)

## 路线图快速链接

- **查看方向：** [Roadmap](../ROADMAP.md)

Claude 时代的旧名称只作为迁移兼容层保留。fork 的边界、命名规则和迁移说明见 [CODEX-FORK.md](../CODEX-FORK.md)。

## 文档索引

| 文档 | 读者 | 内容 |
|------|------|------|
| [Roadmap](../ROADMAP.md) | 评估者、贡献者 | 公开方向、近期优先级、维护者手动动作和 good first issue 候选 |
| [Evaluate](../EVALUATE.md) | 新用户、评估者 | 安全 10 分钟试用清单，包含通过和失败信号 |
| [FAQ](../FAQ.md) | 新用户、评估者 | 回答关于范围、文件、运行时以及何时不该使用 GSD 的常见采用问题 |
| [Examples](../EXAMPLES.md) | 新用户 | 可复制的工作流，覆盖新项目、现有仓库、快速修复、恢复、spike 和 sketch |
| [Demo](../DEMO.md) | 新用户、维护者 | 60 秒工作流预览、首次运行输出、演示媒体清单、生成的工件和 git status 证据 |
| [Safe Trial Troubleshooting](../SAFE-TRIAL-TROUBLESHOOTING.md) | 新用户、评估者 | 处理缺失命令、文件变更、本地/全局安装、npm 失败、过期缓存和支持路由的首次运行快速修复 |
| [Safe Trial Outcome Template](../SAFE-TRIAL-OUTCOME.md) | 新用户、评估者 | 记录命令、变更路径、通过/失败信号、保留/丢弃决策和反馈证据 |
| [Safe Trial Discussion Starter](../SAFE-TRIAL-DISCUSSION.md) | 新用户、评估者 | 可复制的 GitHub Discussions 帖子，包含命令证据、变更路径、隐私检查和工作流建议 |
| [Safe Trial Transcript](../SAFE-TRIAL-TRANSCRIPT.md) | 新用户、评估者 | 由 npm run demo:safe-trial 生成的免安装、免编辑记录，用于预览首次运行流程 |
| [Support](../../SUPPORT.md) | 用户、评估者 | 设置问题、工作流建议、故障排查帮助、本地与全局安装选择以及 bug report 路由 |
| [GitHub Discussions](https://github.com/Oisinwang/get-shit-done-codex/discussions) | 用户、评估者 | 面向问题、示例和安全试用反馈的社区支持 |
| [Contributing Guide](../../CONTRIBUTING.md) | 贡献者、评估者 | 贡献类型、开发设置、测试要求、review 期望和 pull request 流程 |
| [Good First Issues](https://github.com/Oisinwang/get-shit-done-codex/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22) | 贡献者、新用户 | 与当前路线图缺口、文档更新和公开发布打磨相关的入门任务 |
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
