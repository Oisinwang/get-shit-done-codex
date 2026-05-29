# GSD Codex ドキュメント

このフォルダは GSD Codex fork の日本語ドキュメント入口です。この fork は Codex-first です。公開契約の中心は `AGENTS.md`、`.codex/`、`$gsd-*`、`agents_md_path`、`generate-agents-md`、Codex のセッションパスです。

公開済みパッケージは次のコマンドでインストールします。

```bash
npx @oisinwang/get-shit-done-codex@latest
```

## セーフトライアルのクイックリンク

- [セーフトライアルのトラブルシューティング](../SAFE-TRIAL-TROUBLESHOOTING.md)
- [セーフトライアル結果テンプレート](../SAFE-TRIAL-OUTCOME.md)
- [セーフトライアル相談テンプレート](../SAFE-TRIAL-DISCUSSION.md)
- [セーフトライアル記録](../SAFE-TRIAL-TRANSCRIPT.md)

## 評価のクイックリンク

- **安全に試す:** [Evaluate](../EVALUATE.md)

## サポートのクイックリンク

- **助けを得る:** [Support](../../SUPPORT.md)
- **質問や相談をする:** [GitHub Discussions](https://github.com/Oisinwang/get-shit-done-codex/discussions)

## コントリビューションのクイックリンク

- **貢献する:** [Contributing Guide](../../CONTRIBUTING.md)
- **最初のタスクを探す:** [Good First Issues](https://github.com/Oisinwang/get-shit-done-codex/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22)

## メンテナーのクイックリンク

- **修正を公開する:** [Release Checklist](../RELEASE.md)
- **貢献者タスクを閉じる:** [Maintainer Checklist](../MAINTAINER-CHECKLIST.md)

## プロモーションのクイックリンク

- **プロジェクトを共有する:** [Promotion Assets](../PROMOTION.md)

## デモのクイックリンク

- **初回実行を見る:** [Demo](../DEMO.md)
- **短いデモを録画する:** [Demo Media Checklist](../DEMO.md#demo-media-checklist)

## FAQ のクイックリンク

- **よくある質問に答える:** [FAQ](../FAQ.md)

## トラブルシューティングのクイックリンク

- **インストール問題から復旧する:** [Troubleshooting](../TROUBLESHOOTING.md)

## 例のクイックリンク

- **ワークフローを選ぶ:** [Examples](../EXAMPLES.md)

## プロンプトレシピのクイックリンク

- **Codex プロンプトを貼り付ける:** [Prompt Recipes](PROMPTS.md)

## 比較のクイックリンク

- **選択肢を比較する:** [Comparison](COMPARISON.md)

## ロードマップのクイックリンク

- **方向性を見る:** [Roadmap](../ROADMAP.md)

Claude 時代の名前は移行互換のためだけに残しています。fork の境界、命名規則、移行メモは [CODEX-FORK.md](../CODEX-FORK.md) を参照してください。

## ドキュメント索引

| ドキュメント | 読者 | 内容 |
|--------------|------|------|
| [Roadmap](../ROADMAP.md) | 評価者、コントリビューター | 公開ロードマップ、直近の優先事項、メンテナーの手動作業、good first issue 候補 |
| [Evaluate](../EVALUATE.md) | 新規ユーザー、評価者 | 安全な10分トライアルのチェックリストと、成功・失敗の判断材料 |
| [FAQ](../FAQ.md) | 新規ユーザー、評価者 | スコープ、ファイル、ランタイム、GSD を使わない場面に関するよくある採用前の質問 |
| [Examples](../EXAMPLES.md) | 新規ユーザー | コピー可能なワークフロー。新規プロジェクト、既存リポジトリ、短い修正、再開、spike、sketch を扱います |
| [Demo](../DEMO.md) | 新規ユーザー、メンテナー | 60秒ワークフローのプレビュー、初回実行出力、デモ媒体チェックリスト、生成物、git status 証拠 |
| [Safe Trial Troubleshooting](../SAFE-TRIAL-TROUBLESHOOTING.md) | 新規ユーザー、評価者 | コマンド不足、変更ファイル、ローカル/グローバルインストール、npm 失敗、古いキャッシュ、サポート導線の初回復旧 |
| [Safe Trial Outcome Template](../SAFE-TRIAL-OUTCOME.md) | 新規ユーザー、評価者 | コマンド、変更パス、成功/失敗シグナル、保持/破棄の判断、フィードバック証拠を記録します |
| [Safe Trial Discussion Starter](../SAFE-TRIAL-DISCUSSION.md) | 新規ユーザー、評価者 | コマンド証拠、変更パス、プライバシーチェック、ワークフロー相談を含む GitHub Discussions 投稿テンプレート |
| [Safe Trial Transcript](../SAFE-TRIAL-TRANSCRIPT.md) | 新規ユーザー、評価者 | npm run demo:safe-trial で生成される、初回実行を確認するためのインストール不要・編集不要の記録 |
| [Support](../../SUPPORT.md) | ユーザー、評価者 | セットアップ質問、ワークフロー相談、トラブルシューティング、ローカルとグローバルインストール、bug report 導線 |
| [GitHub Discussions](https://github.com/Oisinwang/get-shit-done-codex/discussions) | ユーザー、評価者 | 質問、例、安全なトライアルのフィードバック向けコミュニティサポート |
| [Contributing Guide](../../CONTRIBUTING.md) | コントリビューター、評価者 | 貢献タイプ、開発セットアップ、テスト要件、review 期待値、pull request フロー |
| [Good First Issues](https://github.com/Oisinwang/get-shit-done-codex/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22) | コントリビューター、新規ユーザー | 現在のロードマップの穴、docs 更新、公開ローンチの磨き込みに沿った最初のタスク |
| [Security Policy](../../SECURITY.md) | ユーザー、コントリビューター | 非公開の脆弱性報告、開示ガイド、応答タイムライン、スコープ、安全境界 |
| [Private Vulnerability Report](https://github.com/Oisinwang/get-shit-done-codex/security/advisories/new) | セキュリティ報告者 | 公開 issue に載せるべきではない脆弱性向けの GitHub 非公開 advisory 入口 |
| [Code of Conduct](../../CODE_OF_CONDUCT.md) | ユーザー、コントリビューター | コミュニティ基準、許容される行動、執行責任、スコープ、報告ガイド |
| [Private Conduct Report](https://github.com/Oisinwang/get-shit-done-codex/security/advisories/new) | ユーザー、コントリビューター | センシティブな行動報告、報告者の安全、名前、スクリーンショット、公開 issue に載せない詳細 |
| [License](../../LICENSE) | ユーザー、コントリビューター | MIT License 条項、再利用、コピー、変更、配布、サブライセンス権 |
| [MIT License Terms](../../LICENSE) | ユーザー、コントリビューター | 許諾表示、著作権表示、無保証声明、責任制限 |
| [Package Metadata](../../package.json) | ユーザー、評価者、メンテナー | 公開 npm パッケージ名、説明、keywords、CLI bin、同梱ファイル、公開 publish 設定 |
| [SDK Package Metadata](../../sdk/package.json) | SDK ユーザー、インテグレーター | SDK npm パッケージ名、CLI bin、同梱 dist と prompts、prepublish build、公開 publish 設定 |
| [Installer CLI](../../bin/install.js) | ユーザー、評価者、メンテナー | Codex-first インストーラー入口、local/global 対象、runtime flags、SDK インストール制御、uninstall モード、WSL パス保護 |
| [Hook Build Script](../../scripts/build-hooks.js) | コントリビューター、メンテナー | prepublish build、ローカルソースインストール、テスト実行向けのインストーラー hook payload を生成 |
| [Safe Trial Demo Script](../../scripts/safe-trial-demo.cjs) | 新規ユーザー、評価者 | インストールなしのコマンドプレビュー、sandbox trial と既存リポジトリ trial フロー |
| [Test Runner Script](../../scripts/run-tests.cjs) | コントリビューター、メンテナー | 公開 release metadata、リンクチェック、インストール回帰、coverage を対象にした Node テスト編成 |
| [Hotfix Validation Script](../../scripts/validate-hotfix.cjs) | メンテナー | hotfix release の保護、バージョン入力、dry-run 状態、package metadata、publish workflow チェック |
| [Runtime Support Matrix](../FEATURES.md#36-multi-runtime-support) | ユーザー、評価者 | サポート対象 runtime 一覧、コマンド形式、agent 形式、hook イベント、config 形状、インストーラー要件 |
| [Runtime Abstraction](../ARCHITECTURE.md#runtime-abstraction) | コントリビューター、インテグレーター | runtime ごとのコマンド形式、agent システム、config 位置、ツール対応、hook イベント名、frontmatter 差分、モデル継承 |
| [Compatibility Runtime Guide](../USER-GUIDE.md#using-compatibility-runtimes-opencode-gemini-cli-kilo) | ユーザー、評価者 | 互換 runtime がモデル選択を継承し、resolve_model_ids omit を使い、runtime 別モデル override を設定する方法 |
| [Non-Claude Runtime Configuration](../CONFIGURATION.md#non-claude-runtimes-codex-opencode-gemini-cli-kilo) | ユーザー、メンテナー | Codex、OpenCode、Gemini CLI、Kilo の config 挙動、継承モデル profile、runtime が選ぶモデル ID |
| [Manual Update Runtime Flags](../manual-update.md#runtime-flags) | ユーザー、メンテナー | Codex、Claude Code、Gemini CLI、OpenCode、Kilo、Copilot、Cursor、Windsurf、Augment、Antigravity、Trae、Qwen Code、CodeBuddy、Cline、all runtimes の runtime flag 表 |
| [Test Workflow](../../.github/workflows/test.yml) | コントリビューター、メンテナー | GitHub Actions CI マトリクス、Node.js バージョン、依存関係インストール、coverage テスト、ブランチ検証 |
| [Hotfix Release Workflow](../../.github/workflows/hotfix.yml) | メンテナー | 手動 hotfix dispatch、dry-run モード、バージョン、npm-publish environment、NPM_TOKEN、publish 検証 |
| [Issue Chooser](../../.github/ISSUE_TEMPLATE/config.yml) | ユーザー、コントリビューター | 質問、安全 trial troubleshooting、行動規範、非公開セキュリティ報告、issue ルーティング |
| [Bug Report Template](../../.github/ISSUE_TEMPLATE/bug_report.yml) | ユーザー、コントリビューター | パッケージバージョン、runtime、Node.js バージョン、shell、再現手順、エラーテキスト、安全 trial 証拠、プライバシーチェック |
| [Documentation Issue Template](../../.github/ISSUE_TEMPLATE/docs_issue.yml) | 読者、コントリビューター | 誤り、欠落、不明瞭な docs について、影響パス、現在の問題、期待する修正を記録 |
| [Feature Request Template](../../.github/ISSUE_TEMPLATE/feature_request.yml) | ユーザー、コントリビューター | 新 feature 提案、問題文、スコープ、ユーザーストーリー、受け入れ基準、runtime 互換性、保守コスト |
| [Enhancement Proposal Template](../../.github/ISSUE_TEMPLATE/enhancement.yml) | ユーザー、コントリビューター | 既存 feature 改善、現在の挙動、望ましい挙動、影響ファイル、互換性影響、代替案、review 文脈 |
| [Chore Template](../../.github/ISSUE_TEMPLATE/chore.yml) | メンテナー、コントリビューター | リファクタリング、テスト品質、CI/CD、依存関係、技術的負債、完了基準、関連 issue 向けの保守作業 |
| [Pull Request Template Chooser](../../.github/pull_request_template.md) | コントリビューター、メンテナー | codex/bootstrap 向けの標準 typed template chooser、Codex-first 契約、承認済み issue 要件、draft 禁止ルール |
| [Fix PR Template](../../.github/PULL_REQUEST_TEMPLATE/fix.md) | コントリビューター、メンテナー | fix PR ルート、確認済み bug issue リンク、壊れた挙動、根本原因、回帰テスト、platform/runtime チェック |
| [Enhancement PR Template](../../.github/PULL_REQUEST_TEMPLATE/enhancement.md) | コントリビューター、メンテナー | enhancement PR ルート、承認済み enhancement issue、before/after、実装メモ、スコープ確認、tests、docs、changelog |
| [Feature PR Template](../../.github/PULL_REQUEST_TEMPLATE/feature.md) | コントリビューター、メンテナー | feature PR ルート、承認済み feature issue、機能概要、変更ファイル、受け入れ基準、platform/runtime テスト、スコープ確認、スクリーンショットまたは録画 |
| [Release Workflow](../../.github/workflows/release.yml) | メンテナー | create、rc、finalize アクション、バージョン入力、dry-run モード、npm-publish environment、NPM_TOKEN、npm test coverage、dist-tag publish |
| [PR Gate Workflow](../../.github/workflows/pr-gate.yml) | コントリビューター、メンテナー | pull request サイズ label、size/S、size/M、size/L、size/XL、大きい PR の警告、分割ガイド |
| [Require Issue Link Workflow](../../.github/workflows/require-issue-link.yml) | コントリビューター、メンテナー | Closes、Fixes、Resolves #NNN がない PR をブロックし、issue chooser リンクをコメントし、issue-first review 方針を表示 |
| [Branch Naming Workflow](../../.github/workflows/branch-naming.yml) | コントリビューター、メンテナー | feat/、fix/、hotfix/、docs/、chore/、dependabot/、renovate/ の branch prefix を検証し GSD branch と互換 |
| [Branch Cleanup Workflow](../../.github/workflows/branch-cleanup.yml) | メンテナー | merge 済み PR branch を削除し、codex/bootstrap を含む protected branches を保持し、workflow_dispatch で週次 orphan branch sweep を実行 |
| [Close Draft PRs Workflow](../../.github/workflows/close-draft-prs.yml) | コントリビューター、メンテナー | draft PR を拒否し、テスト期待値、正しい template、リンク済み承認 issue、ready-for-review 方針をコメント |
| [Auto-label Issues Workflow](../../.github/workflows/auto-label-issues.yml) | メンテナー | GitHub Script retries で新規 issue に needs-triage を付与し、triage queue を見える状態に保つ |
| [Auto-branch Workflow](../../.github/workflows/auto-branch.yml) | メンテナー、コントリビューター | label 付き issue から fix、feat、chore、docs branch を codex/bootstrap に作成し、checkout commands をコメント |
| [Security Scan Workflow](../../.github/workflows/security-scan.yml) | コントリビューター、メンテナー | PR で prompt injection、base64 obfuscation、secret scan、.planning runtime-data check を実行 |
| [Stale Cleanup Workflow](../../.github/workflows/stale.yml) | メンテナー | 28 日後に inactive issue と PR をマークし、14 日後に閉じ、critical、pinned、confirmed exemptions を保持 |
| [Dependabot Config](../../.github/dependabot.yml) | メンテナー | npm と GitHub Actions の週次依存関係更新、open PR 制限、dependencies labels、chore commit prefix |
| [Repository Labels Contract](../../.github/labels.json) | メンテナー、コントリビューター | 公開 label 名、説明、色、needs-triage、approved-feature、approved-enhancement、pending release、type: chore |
| [CODEOWNERS](../../.github/CODEOWNERS) | メンテナー、コントリビューター | すべての変更に公開 fork のメンテナー review を要求 |
| [Funding Metadata](../../.github/FUNDING.yml) | ユーザー、スポンサー | Oisinwang 向け GitHub Sponsors メタデータ |
| [Release Checklist](../RELEASE.md) | メンテナー | npm publish 設定、hotfix workflow 手順、`npx @latest` 復旧の検証 |
| [Maintainer Checklist](../MAINTAINER-CHECKLIST.md) | メンテナー | 解決済み good-first issue を verification、CI、labels、公開メモとともに閉じる |
| [Troubleshooting](../TROUBLESHOOTING.md) | ユーザー | Codex config、install、PATH、Windows PowerShell、古い npm metadata の高速復旧パス |
| [Promotion Assets](../PROMOTION.md) | メンテナー | ローンチコピー、social preview 設定、公開 positioning snippets |
| [Codex fork notes](../CODEX-FORK.md) | すべてのユーザー | Codex-first の範囲、命名境界、移行メモ |
| [比較ガイド](COMPARISON.md) | 新規ユーザー | 生の Codex、prompt pack、task manager、CI-only workflow との適合度比較 |
| [プロンプトレシピ](PROMPTS.md) | 新規ユーザー | Codex に貼り付けられる開始、再開、監査、小修正用プロンプト |
| [User Guide](USER-GUIDE.md) | すべてのユーザー | ワークフロー、トラブルシューティング、復旧 |
| [Feature Reference](FEATURES.md) | すべてのユーザー | 機能、要件、期待される動作 |
| [Command Reference](COMMANDS.md) | すべてのユーザー | コマンド、構文、フラグ、使用例 |
| [Configuration Reference](CONFIGURATION.md) | すべてのユーザー | 設定 schema、ワークフロートグル、モデルプロファイル |
| [Architecture](ARCHITECTURE.md) | コントリビューター | システム構造、agent モデル、データフロー |
| [CLI Tools](CLI-TOOLS.md) | コントリビューター | `gsd-tools.cjs` のプログラム API |
| [Agent Reference](AGENTS.md) | コントリビューター | 専門 agent、役割、オーケストレーション |
| [Context Monitor](context-monitor.md) | すべてのユーザー | コンテキストウィンドウ監視 hook |
| [Discuss Mode](workflow-discuss-mode.md) | すべてのユーザー | 前提確認モードとインタビューモード |

## クイックリンク

- **開始:** [root README](../../README.ja-JP.md) -> install -> `$gsd-help`
- **fork を理解する:** [Codex fork notes](../CODEX-FORK.md)
- **使うべきか判断する:** [比較ガイド](COMPARISON.md)
- **プロンプトを貼り付ける:** [プロンプトレシピ](PROMPTS.md)
- **ワークフローを実行:** [User Guide](USER-GUIDE.md)
- **コマンドを探す:** [Command Reference](COMMANDS.md)
- **設定する:** [Configuration Reference](CONFIGURATION.md)
- **拡張する:** [CLI Tools](CLI-TOOLS.md) + [Agent Reference](AGENTS.md)
