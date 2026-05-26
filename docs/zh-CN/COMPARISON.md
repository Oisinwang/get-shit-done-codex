# 对比指南

当你需要判断是否值得把 GSD Codex 加到一个仓库里，或者一个更轻量的流程已经足够时，可以先读这一页。

## 简短结论

GSD Codex 适合那些需要持久项目记忆、分阶段规划、验证和跨长期 AI 编程会话恢复支持的工作。它不是 Codex 本身的替代品，也不是通用 task manager 或 CI 系统的替代品。

## 适配度对比

| 选项 | 最适合的情况 | GSD Codex 覆盖的主要缺口 |
|------|--------------|--------------------------|
| 原始 Codex chat | 你有一个很小、很明确的改动，并且能在一次会话里验证完 | 在上下文重置后继续保留目标、决策、计划和验证 |
| prompt pack | 你想为常见编程任务复用措辞 | 把 prompt 变成有项目文件、阶段产物和恢复记录的有状态工作流 |
| task manager | 人类需要 backlog 归属、分配和排期 | 在 `AGENTS.md`、`.codex/` 和 `.planning/` 下给编码 agent 可执行的项目上下文 |
| CI-only workflow | 测试已经定义了完整验收契约 | 在测试覆盖所有内容之前，捕获需求、风险、设计决策和手动 UAT |
| 完整企业流程 | 大团队需要正式审批和项目治理 | 让个人和小团队的 AI 工作保持结构化，而不引入沉重流程开销 |

## 选择 GSD Codex 的情况

- 一个功能太大或风险太高，不适合用一个 prompt 完成。
- 你需要 Codex 在上下文压缩或新会话之后继续工作。
- 需求很可能漂移，除非被明确写下来。
- 多个文件、命令、agents 或 workstreams 需要协调。
- 验证需要包含测试、手动检查、安全说明或 UAT 证据。
- 你想要可以在 git 里 review 的规划产物。

## 不要使用 GSD Codex 的情况

- 任务只是单行改动，而且你已经知道确切 patch。
- 你不想要 `.planning/PROJECT.md`、`.planning/ROADMAP.md` 或 `.planning/STATE.md` 这类规划文件。
- 你希望 agent 在没有可 review 的决策或验证记录时直接改代码。
- 你的团队已经有更强的项目工作流，只需要少量可复用 prompt。

## 实际增加了什么

一个 Codex-first 安装会为本地安装在 `.codex/` 下添加命令和 skills，或为全局安装在 `~/.codex/` 下添加命令和 skills。在项目中，GSD 会把普通 Markdown 和 JSON 规划产物写入 `.planning/`。这些产物应该易于检查、适合提交到 git，并且在你的仓库策略不保留本地规划状态时可以移除。

核心契约是：

- `AGENTS.md` 保存项目指令
- `.codex/` 提供 Codex-native command 和 skill surface
- `.planning/` 保存持久项目状态
- `$gsd-*` 命令作为工作流入口

## 实用规则

快速改动用原始 Codex。只要丢失上下文、跳过规划或忘记验证的成本高于写下工作流状态的成本，就使用 GSD Codex。
