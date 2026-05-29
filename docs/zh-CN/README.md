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
| [Security Policy](../../SECURITY.md) | 用户、贡献者 | 私有漏洞报告、披露指南、响应时间线、范围和安全边界 |
| [Private Vulnerability Report](https://github.com/Oisinwang/get-shit-done-codex/security/advisories/new) | 安全报告者 | GitHub 私有 advisory 入口，用于不应发布到公开 issue 的漏洞 |
| [Code of Conduct](../../CODE_OF_CONDUCT.md) | 用户、贡献者 | 社区标准、可接受行为、执行责任、适用范围和举报指南 |
| [Private Conduct Report](https://github.com/Oisinwang/get-shit-done-codex/security/advisories/new) | 用户、贡献者 | 敏感行为报告、报告者安全、姓名、截图以及不应发布到公开 issue 的其他细节 |
| [License](../../LICENSE) | 用户、贡献者 | MIT License 条款，涵盖复用、复制、修改、分发和再授权权利 |
| [MIT License Terms](../../LICENSE) | 用户、贡献者 | 授权声明、版权声明、无担保声明和责任限制 |
| [Package Metadata](../../package.json) | 用户、评估者、维护者 | 已发布 npm 包名、描述、keywords、CLI bin、随包文件和公开发布设置 |
| [SDK Package Metadata](../../sdk/package.json) | SDK 用户、集成者 | SDK npm 包名、CLI bin、随包 dist 和 prompts 文件、prepublish build 以及公开发布设置 |
| [Installer CLI](../../bin/install.js) | 用户、评估者、维护者 | Codex-first 安装器入口、本地和全局目标、runtime flags、SDK 安装控制、uninstall 模式和 WSL 路径保护 |
| [Hook Build Script](../../scripts/build-hooks.js) | 贡献者、维护者 | 为 prepublish build、本地源码安装和测试运行生成安装器 hook payload |
| [Safe Trial Demo Script](../../scripts/safe-trial-demo.cjs) | 新用户、评估者 | 无安装命令预览，用于 sandbox trial 和现有仓库 trial 流程 |
| [Test Runner Script](../../scripts/run-tests.cjs) | 贡献者、维护者 | Node 测试编排，覆盖公开 release metadata、链接检查、安装回归和 coverage |
| [Hotfix Validation Script](../../scripts/validate-hotfix.cjs) | 维护者 | hotfix release 保护，检查版本输入、dry-run 状态、package metadata 和发布 workflow |
| [Runtime Support Matrix](../FEATURES.md#36-multi-runtime-support) | 用户、评估者 | 支持的 runtime 列表、命令格式、agent 格式、hook 事件、config 形态和安装器要求 |
| [Runtime Abstraction](../ARCHITECTURE.md#runtime-abstraction) | 贡献者、集成者 | runtime 命令格式、agent 系统、config 位置、工具映射、hook 事件名、frontmatter 差异和模型继承 |
| [Compatibility Runtime Guide](../USER-GUIDE.md#using-compatibility-runtimes-opencode-gemini-cli-kilo) | 用户、评估者 | 兼容 runtime 如何继承模型选择、使用 resolve_model_ids omit，并设置 runtime 专属模型覆盖 |
| [Non-Claude Runtime Configuration](../CONFIGURATION.md#non-claude-runtimes-codex-opencode-gemini-cli-kilo) | 用户、维护者 | Codex、OpenCode、Gemini CLI、Kilo 的配置行为、继承模型 profile 和 runtime 选择的模型 ID |
| [Manual Update Runtime Flags](../manual-update.md#runtime-flags) | 用户、维护者 | Codex、Claude Code、Gemini CLI、OpenCode、Kilo、Copilot、Cursor、Windsurf、Augment、Antigravity、Trae、Qwen Code、CodeBuddy、Cline 和 all runtimes 的 runtime flag 表 |
| [Test Workflow](../../.github/workflows/test.yml) | 贡献者、维护者 | GitHub Actions CI 矩阵、Node.js 版本、依赖安装、coverage 测试和分支校验 |
| [Hotfix Release Workflow](../../.github/workflows/hotfix.yml) | 维护者 | 手动 hotfix dispatch、dry-run 模式、版本、npm-publish environment、NPM_TOKEN 和发布验证 |
| [Issue Chooser](../../.github/ISSUE_TEMPLATE/config.yml) | 用户、贡献者 | 问题入口、安全 trial troubleshooting、行为准则、私有安全报告和 issue 路由 |
| [Bug Report Template](../../.github/ISSUE_TEMPLATE/bug_report.yml) | 用户、贡献者 | 包版本、runtime、Node.js 版本、shell、复现步骤、错误文本、安全 trial 证据和隐私检查 |
| [Documentation Issue Template](../../.github/ISSUE_TEMPLATE/docs_issue.yml) | 读者、贡献者 | 文档错误、缺失或不清楚时记录受影响路径、当前问题和预期修正 |
| [Feature Request Template](../../.github/ISSUE_TEMPLATE/feature_request.yml) | 用户、贡献者 | 新 feature 提案，包含问题陈述、范围、用户故事、验收标准、runtime 兼容性和维护成本 |
| [Enhancement Proposal Template](../../.github/ISSUE_TEMPLATE/enhancement.yml) | 用户、贡献者 | 现有 feature 改进，包含当前行为、期望行为、受影响文件、兼容性影响、替代方案和 review 背景 |
| [Chore Template](../../.github/ISSUE_TEMPLATE/chore.yml) | 维护者、贡献者 | 维护工作入口，覆盖重构、测试质量、CI/CD、依赖、技术债、完成标准和相关 issue |
| [Pull Request Template Chooser](../../.github/pull_request_template.md) | 贡献者、维护者 | codex/bootstrap 的默认类型化 template 选择器、Codex-first 合约、已批准 issue 要求和禁止 draft 规则 |
| [Fix PR Template](../../.github/PULL_REQUEST_TEMPLATE/fix.md) | 贡献者、维护者 | fix PR 路径，包含确认 bug issue 链接、坏行为、根因、回归测试、平台检查和 runtime 检查 |
| [Enhancement PR Template](../../.github/PULL_REQUEST_TEMPLATE/enhancement.md) | 贡献者、维护者 | enhancement PR 路径，包含已批准 enhancement issue、before/after、实现说明、范围确认、测试、docs 和 changelog |
| [Feature PR Template](../../.github/PULL_REQUEST_TEMPLATE/feature.md) | 贡献者、维护者 | feature PR 路径，包含已批准 feature issue、功能摘要、变更文件、验收标准、平台/runtime 测试、范围确认和截图或录屏 |
| [Release Workflow](../../.github/workflows/release.yml) | 维护者 | create、rc、finalize 动作、版本输入、dry-run 模式、npm-publish environment、NPM_TOKEN、npm test 覆盖和 dist-tag 发布 |
| [PR Gate Workflow](../../.github/workflows/pr-gate.yml) | 贡献者、维护者 | pull request 大小 label，包括 size/S、size/M、size/L、size/XL、大 PR 警告和拆分建议 |
| [Require Issue Link Workflow](../../.github/workflows/require-issue-link.yml) | 贡献者、维护者 | 阻止没有 Closes、Fixes 或 Resolves #NNN 的 PR，评论 issue chooser 链接，并保持 issue-first review 政策可见 |
| [Branch Naming Workflow](../../.github/workflows/branch-naming.yml) | 贡献者、维护者 | 校验 feat/、fix/、hotfix/、docs/、chore/、dependabot/ 和 renovate/ 分支前缀，并兼容 GSD 分支 |
| [Branch Cleanup Workflow](../../.github/workflows/branch-cleanup.yml) | 维护者 | 删除已 merge 的 PR 分支，保留包括 codex/bootstrap 在内的 protected branches，并通过 workflow_dispatch 每周清理孤立分支 |
| [Close Draft PRs Workflow](../../.github/workflows/close-draft-prs.yml) | 贡献者、维护者 | 拒绝 draft PR，评论测试期望、正确 template、已链接批准 issue 和 ready-for-review 政策 |
| [Auto-label Issues Workflow](../../.github/workflows/auto-label-issues.yml) | 维护者 | 用 GitHub Script retries 给新 issue 添加 needs-triage，让 triage 队列保持可见 |
| [Auto-branch Workflow](../../.github/workflows/auto-branch.yml) | 维护者、贡献者 | 从带 label 的 issue 创建 fix、feat、chore 和 docs 分支到 codex/bootstrap，并评论 checkout 命令 |
| [Security Scan Workflow](../../.github/workflows/security-scan.yml) | 贡献者、维护者 | 在 PR 上运行 prompt injection、base64 obfuscation、secret scan 和 .planning runtime-data 检查 |
| [Stale Cleanup Workflow](../../.github/workflows/stale.yml) | 维护者 | 28 天后标记 inactive issue 和 PR，14 天后关闭，并保留 critical、pinned 和 confirmed 豁免 |
| [Dependabot Config](../../.github/dependabot.yml) | 维护者 | 每周 npm 和 GitHub Actions 依赖更新，包含 open PR 限制、dependencies labels 和 chore commit 前缀 |
| [Repository Labels Contract](../../.github/labels.json) | 维护者、贡献者 | 公开 label 名称、描述、颜色、needs-triage、approved-feature、approved-enhancement、pending release 和 type: chore |
| [CODEOWNERS](../../.github/CODEOWNERS) | 维护者、贡献者 | 要求公共 fork 的维护者 review 所有变更 |
| [Funding Metadata](../../.github/FUNDING.yml) | 用户、赞助者 | Oisinwang 的 GitHub Sponsors 元数据 |
| [Release Checklist](../RELEASE.md) | 维护者 | npm publish 设置、hotfix workflow 步骤，以及 `npx @latest` 恢复验证 |
| [Maintainer Checklist](../MAINTAINER-CHECKLIST.md) | 维护者 | 用验证、CI、label 和公开说明关闭已解决的 good-first issue |
| [Troubleshooting](../TROUBLESHOOTING.md) | 用户 | Codex config、安装、PATH、Windows PowerShell 和旧 npm metadata 的快速恢复路径 |
| [Promotion Assets](../PROMOTION.md) | 维护者 | 发布文案、social preview 设置和公开定位片段 |
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
