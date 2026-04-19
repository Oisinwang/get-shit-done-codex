<div align="center">

# GET SHIT DONE CODEX

**English** | [Portuguese](README.pt-BR.md) | [Chinese](README.zh-CN.md) | [Japanese](README.ja-JP.md) | [Korean](README.ko-KR.md)

**A lightweight meta-prompting, context-engineering, and spec-driven development system with a Codex-first contract and multi-runtime compatibility.**

**Solves context rot: the quality degradation that appears as long-running AI coding sessions accumulate stale context.**

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

<br>

```bash
npx get-shit-done-codex@latest
```

**Works on Mac, Windows, and Linux.**

<br>

![GSD Install](assets/terminal.svg)

<br>

*"If you know clearly what you want, this WILL build it for you. No bs."*

*"I've done SpecKit, OpenSpec, and Taskmaster - this has produced the best results for me."*

*"By far the most powerful addition to my AI coding workflow. Nothing over-engineered. Literally just gets shit done."*

<br>

**Built for individual developers and small teams who want a reliable AI-assisted build workflow without heavyweight process theater.**

[Why I Built This](#why-i-built-this) | [How It Works](#how-it-works) | [Commands](#commands) | [Why It Works](#why-it-works) | [User Guide](docs/USER-GUIDE.md)

</div>

---

> [!IMPORTANT]
> This repository is an independent Codex-first fork.
>
> Primary semantics in this fork:
> - `AGENTS.md`
> - `.codex/`
> - `$gsd-*`
> - `agents_md_path`
> - `generate-agents-md`
> - `generate-agents-profile`
> - `~/.codex/sessions`
>
> Legacy Claude-first names remain only as compatibility shims. Migration and release notes live in [docs/CODEX-FORK.md](docs/CODEX-FORK.md).

---

## Why I Built This

I built this because I wanted a practical system for shipping software with AI without pretending I run a 50-person organization.

Most spec-driven tools either add too much ceremony or stop short of giving the coding runtime the context it actually needs. GSD pushes the complexity into the system instead of the human workflow: context engineering, structured prompts, subagent orchestration, verification loops, and state management.

The goal is simple: describe what you want, keep requirements explicit, execute in small verifiable chunks, and retain enough context that the runtime can keep making correct decisions.

That is what this fork is for. It keeps the workflow sharp, keeps the semantics Codex-first, and keeps compatibility only where migration still matters.

AI coding gets a bad reputation when the system around it is loose. GSD is the structure that turns those sessions into something repeatable.

---

## Who This Is For

People who want to describe what they want and have it built correctly without pretending they are running a 50-person engineering organization.

Built-in quality gates catch real problems: schema drift detection flags ORM changes missing migrations, security enforcement anchors verification to threat models, and scope reduction detection prevents the planner from silently dropping your requirements.

### Current Highlights

- **Spiking and sketching**: `/gsd-spike` runs focused experiments with Given/When/Then verdicts, and `/gsd-sketch` produces interactive HTML mockup variants that can be wrapped into project-local skills.
- **Agent size-budget enforcement**: tiered prompt-size limits keep agent definitions lean and catch regressions in CI.
- **Shared boilerplate extraction**: mandatory-initial-read and project-skill discovery logic are factored into reusable references to reduce drift across agent prompts.

---

## Getting Started

```bash
npx get-shit-done-codex@latest
```

If you are running directly from this repository before publishing the package, use:

```bash
npm install
npm run build:hooks
node bin/install.js --codex --local
```

The installer prompts you to choose:
1. **Runtime**: Codex, Claude Code, OpenCode, Gemini, Kilo, Copilot, Cursor, Windsurf, Antigravity, Augment, Trae, Qwen Code, CodeBuddy, Cline, or all
2. **Location**: global (all projects) or local (current project only)

Verify with:
- Claude Code / Gemini / Copilot / Antigravity / Qwen Code: `/gsd-help`
- OpenCode / Kilo / Augment / Trae / CodeBuddy: `/gsd-help`
- Codex: `$gsd-help`
- Cline: GSD installs via `.clinerules`; verify by checking `.clinerules` exists

> [!NOTE]
> Codex is the primary runtime in this fork. Managed installs write skills to `./.codex/skills/` or `~/.codex/skills/` and generate `AGENTS.md` by default. Legacy Claude compatibility still understands `.claude/skills/`, `~/.claude/skills/`, and `~/.claude/commands/gsd/` when present, but those paths are no longer the primary contract.
> Read `AGENTS.md` first for project instructions. `CLAUDE.md` only remains as a migration alias.

The canonical discovery contract is documented in [docs/skills/discovery-contract.md](docs/skills/discovery-contract.md).

> [!TIP]
> For source-based installs or environments where npm is unavailable, see **[docs/manual-update.md](docs/manual-update.md)**.

### Staying Updated

This fork is intended to update from source until you publish it under your own remote and package registry:

```bash
git pull
npm install
npm run build:hooks
node bin/install.js --codex --global
```
<details>
<summary><strong>Non-interactive Install (Docker, CI, Scripts)</strong></summary>

The Claude Code entries below are runtime-specific compatibility instructions. Codex remains the default target in this fork.

```bash
# Claude Code compatibility/runtime
npx get-shit-done-codex --claude --global   # Install to ~/.claude/
npx get-shit-done-codex --claude --local    # Install to ./.claude/

# OpenCode
npx get-shit-done-codex --opencode --global # Install to ~/.config/opencode/

# Gemini CLI
npx get-shit-done-codex --gemini --global   # Install to ~/.gemini/

# Kilo
npx get-shit-done-codex --kilo --global     # Install to ~/.config/kilo/
npx get-shit-done-codex --kilo --local      # Install to ./.kilo/

# Codex
npx get-shit-done-codex --codex --global    # Install to ~/.codex/
npx get-shit-done-codex --codex --local     # Install to ./.codex/

# Copilot
npx get-shit-done-codex --copilot --global  # Install to ~/.github/
npx get-shit-done-codex --copilot --local   # Install to ./.github/

# Cursor CLI
npx get-shit-done-codex --cursor --global      # Install to ~/.cursor/
npx get-shit-done-codex --cursor --local       # Install to ./.cursor/

# Windsurf
npx get-shit-done-codex --windsurf --global    # Install to ~/.codeium/windsurf/
npx get-shit-done-codex --windsurf --local     # Install to ./.windsurf/

# Antigravity
npx get-shit-done-codex --antigravity --global # Install to ~/.gemini/antigravity/
npx get-shit-done-codex --antigravity --local  # Install to ./.agent/

# Augment
npx get-shit-done-codex --augment --global     # Install to ~/.augment/
npx get-shit-done-codex --augment --local      # Install to ./.augment/

# Trae
npx get-shit-done-codex --trae --global        # Install to ~/.trae/
npx get-shit-done-codex --trae --local         # Install to ./.trae/

# Qwen Code
npx get-shit-done-codex --qwen --global        # Install to ~/.qwen/
npx get-shit-done-codex --qwen --local         # Install to ./.qwen/

# CodeBuddy
npx get-shit-done-codex --codebuddy --global   # Install to ~/.codebuddy/
npx get-shit-done-codex --codebuddy --local    # Install to ./.codebuddy/

# Cline
npx get-shit-done-codex --cline --global       # Install to ~/.cline/
npx get-shit-done-codex --cline --local        # Install to ./.clinerules

# All runtimes
npx get-shit-done-codex --all --global      # Install to all directories
```

Use `--global` (`-g`) or `--local` (`-l`) to skip the location prompt.
Use `--claude`, `--opencode`, `--gemini`, `--kilo`, `--codex`, `--copilot`, `--cursor`, `--windsurf`, `--antigravity`, `--augment`, `--trae`, `--qwen`, `--codebuddy`, `--cline`, or `--all` to skip the runtime prompt.
The GSD SDK CLI (`gsd-sdk`) is installed automatically (required by `/gsd-*` commands). Pass `--no-sdk` to skip the SDK install, or `--sdk` to force a reinstall.

</details>

<details>
<summary><strong>Development Installation</strong></summary>

Clone the repository, build hooks, and run the installer locally:

```bash
git clone https://github.com/Oisinwang/get-shit-done-codex.git
cd get-shit-done-codex
npm run build:hooks
node bin/install.js --codex --local
```

The `build:hooks` step is required. It compiles hook sources into `hooks/dist/`, which the installer copies from. Without it, hooks will not be installed and runtime hook behavior will be incomplete. The npm release handles this automatically via `prepublishOnly`.

Installs to `./.codex/` for testing modifications before contributing.

</details>

### Recommended: Skip Permissions Mode

GSD is designed for frictionless automation. If you are using Claude Code, run it with:

```bash
claude --dangerously-skip-permissions
```

> [!TIP]
> This is how GSD is intended to be used; stopping to approve `date` and `git commit` 50 times defeats the purpose.

<details>
<summary><strong>Alternative: Granular Permissions</strong></summary>

If you prefer not to use that flag, Claude Code compatibility/runtime users can add this to their project's `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(date:*)",
      "Bash(echo:*)",
      "Bash(cat:*)",
      "Bash(ls:*)",
      "Bash(mkdir:*)",
      "Bash(wc:*)",
      "Bash(head:*)",
      "Bash(tail:*)",
      "Bash(sort:*)",
      "Bash(grep:*)",
      "Bash(tr:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git status:*)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git tag:*)"
    ]
  }
}
```

</details>

---

## How It Works

> **Already have code?** Run `/gsd-map-codebase` first. It spawns parallel agents to analyze your stack, architecture, conventions, and concerns. Then `/gsd-new-project` starts from your existing codebase instead of asking generic greenfield questions.

### 1. Initialize Project

```
/gsd-new-project
```

One command, one flow. The system:

1. **Questions**: asks until it understands your idea completely
2. **Research**: spawns parallel agents to investigate the domain
3. **Requirements**: extracts what is v1, v2, and out of scope
4. **Roadmap**: creates phases mapped to requirements

You approve the roadmap. Now you are ready to build.

**Creates:** `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, `.planning/research/`

---

### 2. Discuss Phase

```
/gsd-discuss-phase 1
```

**This is where you shape the implementation.**

Your roadmap has a sentence or two per phase. That is not enough context to build something the way you imagine it. This step captures your preferences before anything gets researched or planned.

The system analyzes the phase and identifies gray areas based on what is being built:

- **Visual features**: layout, density, interactions, empty states
- **APIs and CLIs**: response format, flags, error handling, verbosity
- **Content systems**: structure, tone, depth, flow
- **Organization tasks**: grouping criteria, naming, duplicates, exceptions

For each area you select, it asks until you are satisfied. The output, `CONTEXT.md`, feeds directly into the next two steps.

**Creates:** `{phase_num}-CONTEXT.md`

> **Assumptions Mode:** Prefer codebase analysis over questions? Set `workflow.discuss_mode` to `assumptions` in `/gsd-settings`. The system reads your code, surfaces what it would do and why, and only asks you to correct what is wrong. See [Discuss Mode](docs/workflow-discuss-mode.md).

---

### 3. Plan Phase

```
/gsd-plan-phase 1
```

The system:

1. **Researches**: investigates how to implement this phase, guided by your `CONTEXT.md` decisions
2. **Plans**: creates 2-3 atomic task plans with XML structure
3. **Verifies**: checks plans against requirements and loops until they pass

Each plan is small enough to execute in a fresh context window.

**Creates:** `{phase_num}-RESEARCH.md`, `{phase_num}-{N}-PLAN.md`

---

### 4. Execute Phase

```
/gsd-execute-phase 1
```

The system:

1. **Runs plans in waves**: parallel where possible, sequential when dependent
2. **Fresh context per plan**: isolated execution context instead of one long degrading session
3. **Commits per task**: every task gets its own atomic commit
4. **Verifies against goals**: checks the codebase delivers what the phase promised

Walk away, come back to completed work with clean git history.

**How wave execution works:**

Plans are grouped into waves based on dependencies. Plans in the same wave can run in parallel; dependent plans wait for later waves.

Example:

- **Wave 1**: Plan 01 (User model), Plan 02 (Product model)
- **Wave 2**: Plan 03 (Orders API, depends on Plan 01), Plan 04 (Cart API, depends on Plan 02)
- **Wave 3**: Plan 05 (Checkout UI, depends on Plans 03 and 04)

**Why waves matter:**
- Independent plans -> same wave -> run in parallel
- Dependent plans -> later wave -> wait for dependencies
- File conflicts -> sequential plans or merged into one plan

This is why vertical slices parallelize better than horizontal layers.

**Creates:** `{phase_num}-{N}-SUMMARY.md`, `{phase_num}-VERIFICATION.md`

---

### 5. Verify Work

```
/gsd-verify-work 1
```

**This is where you confirm it actually works.**

Automated verification checks that code exists and tests pass. But does the feature work the way you expected? This is your chance to use it.

The system:

1. **Extracts testable deliverables**: what you should be able to do now
2. **Walks you through them one at a time**: yes/no or describe what is wrong
3. **Diagnoses failures automatically**: spawns debug agents to find root causes
4. **Creates verified fix plans**: ready for immediate re-execution

If everything passes, you move on. If something is broken, you rerun `/gsd-execute-phase` with the fix plans it created.

**Creates:** `{phase_num}-UAT.md`, fix plans if issues are found

---

### 6. Repeat -> Ship -> Complete -> Next Milestone

```
/gsd-discuss-phase 2
/gsd-plan-phase 2
/gsd-execute-phase 2
/gsd-verify-work 2
/gsd-ship 2                  # Create PR from verified work
...
/gsd-complete-milestone
/gsd-new-milestone
```

Or let GSD figure out the next step automatically:

```
/gsd-next                    # Auto-detect and run next step
```

Loop **discuss -> plan -> execute -> verify -> ship** until the milestone is complete.

If you want faster intake during discussion, use `/gsd-discuss-phase <n> --batch` to answer a small grouped set of questions at once instead of one-by-one. Use `--chain` to auto-chain discuss into plan+execute without stopping between steps.

Each phase gets your input, proper research, clean execution, and human verification. Context stays fresh. Quality stays high.

When all phases are done, `/gsd-complete-milestone` archives the milestone and tags the release.

Then `/gsd-new-milestone` starts the next version using the same flow as `new-project`, but for your existing codebase.

---

### Quick Mode

```
/gsd-quick
```

**For ad-hoc tasks that do not need full planning.**

Quick mode gives you GSD guarantees (atomic commits, state tracking) with a faster path:

- **Same agents**: planner + executor, same quality bar
- **Skips optional steps**: no research, no plan checker, no verifier by default
- **Separate tracking**: lives in `.planning/quick/`, not phase directories

**`--discuss` flag:** Lightweight discussion to surface gray areas before planning.

**`--research` flag:** Spawns a focused researcher before planning. Investigates implementation approaches, library options, and pitfalls.

**`--full` flag:** Enables all phases: discussion + research + plan-checking + verification.

**`--validate` flag:** Enables plan-checking + post-execution verification only.

Flags are composable: `--discuss --research --validate` gives discussion + research + plan-checking + verification.

```
/gsd-quick
> What do you want to do? "Add dark mode toggle to settings"
```

**Creates:** `.planning/quick/001-add-dark-mode-toggle/PLAN.md`, `SUMMARY.md`

---

## Why It Works

### Context Engineering

Claude Code is incredibly powerful *if* you give it the context it needs. Most people don't.

GSD handles it for you:

| File | What it does |
|------|--------------|
| `PROJECT.md` | Project vision, always loaded |
| `research/` | Ecosystem knowledge (stack, features, architecture, pitfalls) |
| `REQUIREMENTS.md` | Scoped v1/v2 requirements with phase traceability |
| `ROADMAP.md` | Where you're going, what's done |
| `STATE.md` | Decisions, blockers, and current position across sessions |
| `PLAN.md` | Atomic task with XML structure, verification steps |
| `SUMMARY.md` | What happened, what changed, committed to history |
| `todos/` | Captured ideas and tasks for later work |
| `threads/` | Persistent context threads for cross-session work |
| `seeds/` | Forward-looking ideas that surface at the right milestone |

Size limits based on where Claude's quality degrades. Stay under, get consistent excellence.

### XML Prompt Formatting

Every plan is structured XML optimized for Claude:

```xml
<task type="auto">
  <name>Create login endpoint</name>
  <files>src/app/api/auth/login/route.ts</files>
  <action>
    Use jose for JWT (not jsonwebtoken - CommonJS issues).
    Validate credentials against users table.
    Return httpOnly cookie on success.
  </action>
  <verify>curl -X POST localhost:3000/api/auth/login returns 200 + Set-Cookie</verify>
  <done>Valid credentials return cookie, invalid return 401</done>
</task>
```

Precise instructions. No guessing. Verification built in.

### Multi-Agent Orchestration

Every stage uses the same pattern: a thin orchestrator spawns specialized agents, collects results, and routes to the next step.

| Stage | Orchestrator does | Agents do |
|-------|------------------|-----------|
| Research | Coordinates, presents findings | 4 parallel researchers investigate stack, features, architecture, pitfalls |
| Planning | Validates, manages iteration | Planner creates plans, checker verifies, loop until pass |
| Execution | Groups into waves, tracks progress | Executors implement in parallel, each with fresh 200k context |
| Verification | Presents results, routes next | Verifier checks codebase against goals, debuggers diagnose failures |

The orchestrator never does heavy lifting. It spawns agents, waits, integrates results.

**The result:** you can run an entire phase with deep research, verified plans, parallel execution, and automated verification while your main context window stays responsive.

### Atomic Git Commits

Each task gets its own commit immediately after completion:

```bash
abc123f docs(08-02): complete user registration plan
def456g feat(08-02): add email confirmation flow
hij789k feat(08-02): implement password hashing
lmn012o feat(08-02): create registration endpoint
```

> [!NOTE]
> **Benefits:** Git bisect finds exact failing task. Each task independently revertable. Clear history for Claude in future sessions. Better observability in AI-automated workflow.

Every commit is surgical, traceable, and meaningful.

### Modular by Design

- Add phases to current milestone
- Insert urgent work between phases
- Complete milestones and start fresh
- Adjust plans without rebuilding everything

You're never locked in. The system adapts.

---

## Commands

### Core Workflow

| Command | What it does |
|---------|--------------|
| `/gsd-new-project [--auto]` | Full initialization: questions 鈫?research 鈫?requirements 鈫?roadmap |
| `/gsd-discuss-phase [N] [--auto] [--analyze] [--chain]` | Capture implementation decisions before planning (`--analyze` adds trade-off analysis, `--chain` auto-chains into plan+execute) |
| `/gsd-plan-phase [N] [--auto] [--reviews]` | Research + plan + verify for a phase (`--reviews` loads codebase review findings) |
| `/gsd-execute-phase <N>` | Execute all plans in parallel waves, verify when complete |
| `/gsd-verify-work [N]` | Manual user acceptance testing 鹿 |
| `/gsd-ship [N] [--draft]` | Create PR from verified phase work with auto-generated body |
| `/gsd-next` | Automatically advance to the next logical workflow step |
| `/gsd-fast <text>` | Inline trivial tasks that skip planning and execute immediately |
| `/gsd-audit-milestone` | Verify milestone achieved its definition of done |
| `/gsd-complete-milestone` | Archive milestone, tag release |
| `/gsd-new-milestone [name]` | Start next version: questions 鈫?research 鈫?requirements 鈫?roadmap |
| `/gsd-forensics [desc]` | Post-mortem investigation of failed workflow runs (diagnoses stuck loops, missing artifacts, git anomalies) |
| `/gsd-milestone-summary [version]` | Generate comprehensive project summary for team onboarding and review |

### Workstreams

| Command | What it does |
|---------|--------------|
| `/gsd-workstreams list` | Show all workstreams and their status |
| `/gsd-workstreams create <name>` | Create a namespaced workstream for parallel milestone work |
| `/gsd-workstreams switch <name>` | Switch active workstream |
| `/gsd-workstreams complete <name>` | Complete and merge a workstream |

### Multi-Project Workspaces

| Command | What it does |
|---------|--------------|
| `/gsd-new-workspace` | Create isolated workspace with repo copies (worktrees or clones) |
| `/gsd-list-workspaces` | Show all GSD workspaces and their status |
| `/gsd-remove-workspace` | Remove workspace and clean up worktrees |

### Spiking & Sketching

| Command | What it does |
|---------|--------------|
| `/gsd-spike [idea] [--quick]` | Throwaway experiments to validate feasibility before planning; no project init required |
| `/gsd-sketch [idea] [--quick]` | Throwaway HTML mockups with multi-variant exploration; no project init required |
| `/gsd-spike-wrap-up` | Package spike findings into a project-local skill for future build conversations |
| `/gsd-sketch-wrap-up` | Package sketch design findings into a project-local skill for future builds |

### UI Design

| Command | What it does |
|---------|--------------|
| `/gsd-ui-phase [N]` | Generate UI design contract (UI-SPEC.md) for frontend phases |
| `/gsd-ui-review [N]` | Retroactive 6-pillar visual audit of implemented frontend code |

### Navigation

| Command | What it does |
|---------|--------------|
| `/gsd-progress` | Where am I? What's next? |
| `/gsd-next` | Auto-detect state and run the next step |
| `/gsd-help` | Show all commands and usage guide |
| `/gsd-update` | Update GSD with changelog preview |
| `/gsd-join-discord` | Join the GSD Discord community |
| `/gsd-manager` | Interactive command center for managing multiple phases |

### Brownfield

| Command | What it does |
|---------|--------------|
| `/gsd-map-codebase [area]` | Analyze existing codebase before new-project |

### Phase Management

| Command | What it does |
|---------|--------------|
| `/gsd-add-phase` | Append phase to roadmap |
| `/gsd-insert-phase [N]` | Insert urgent work between phases |
| `/gsd-remove-phase [N]` | Remove future phase, renumber |
| `/gsd-list-phase-assumptions [N]` | See the planner's intended approach before planning |
| `/gsd-plan-milestone-gaps` | Create phases to close gaps from audit |

### Session

| Command | What it does |
|---------|--------------|
| `/gsd-pause-work` | Create handoff when stopping mid-phase (writes HANDOFF.json) |
| `/gsd-resume-work` | Restore from last session |
| `/gsd-session-report` | Generate session summary with work performed and outcomes |

### Workstreams

| Command | What it does |
|---------|--------------|
| `/gsd-workstreams` | Manage parallel workstreams (list, create, switch, status, progress, complete) |

### Code Quality

| Command | What it does |
|---------|--------------|
| `/gsd-review` | Cross-AI peer review of current phase or branch |
| `/gsd-secure-phase [N]` | Security enforcement with threat-model-anchored verification |
| `/gsd-pr-branch` | Create clean PR branch filtering `.planning/` commits |
| `/gsd-audit-uat` | Audit verification debt and find phases missing UAT |
| `/gsd-docs-update` | Verified documentation generation with doc-writer and doc-verifier agents |

### Backlog & Threads

| Command | What it does |
|---------|--------------|
| `/gsd-plant-seed <idea>` | Capture forward-looking ideas with trigger conditions that surface at the right milestone |
| `/gsd-add-backlog <desc>` | Add idea to backlog parking lot (999.x numbering, outside active sequence) |
| `/gsd-review-backlog` | Review and promote backlog items to active milestone or remove stale entries |
| `/gsd-thread [name]` | Persistent context threads for lightweight cross-session knowledge |

### Utilities

| Command | What it does |
|---------|--------------|
| `/gsd-settings` | Configure model profile and workflow agents |
| `/gsd-set-profile <profile>` | Switch model profile (quality/balanced/budget/inherit) |
| `/gsd-add-todo [desc]` | Capture idea for later |
| `/gsd-check-todos` | List pending todos |
| `/gsd-debug [desc]` | Systematic debugging with persistent state |
| `/gsd-do <text>` | Route freeform text to the right GSD command automatically |
| `/gsd-note <text>` | Zero-friction idea capture: append, list, or promote notes to todos |
| `/gsd-quick [--full] [--validate] [--discuss] [--research]` | Execute ad-hoc task with GSD guarantees (`--full` enables all phases, `--validate` adds plan-checking and verification, `--discuss` gathers context first, `--research` investigates approaches before planning) |
| `/gsd-health [--repair]` | Validate `.planning/` directory integrity, auto-repair with `--repair` |
| `/gsd-stats` | Display project statistics: phases, plans, requirements, and git metrics |
| `/gsd-profile-user [--questionnaire] [--refresh]` | Generate developer behavioral profile from session analysis for personalized responses |

<sup>鹿 Contributed by reddit user OracleGreyBeard</sup>

---

## Configuration

GSD stores project settings in `.planning/config.json`. Configure during `/gsd-new-project` or update later with `/gsd-settings`. For the full config schema, workflow toggles, git branching options, and per-agent model breakdown, see the [User Guide](docs/USER-GUIDE.md#configuration-reference).

### Core Settings

| Setting | Options | Default | What it controls |
|---------|---------|---------|------------------|
| `mode` | `yolo`, `interactive` | `interactive` | Auto-approve vs confirm at each step |
| `granularity` | `coarse`, `standard`, `fine` | `standard` | Phase granularity: how finely scope is sliced |
| `project_code` | string | `""` | Prefix phase directories with a project code |

### Model Profiles

Control which Claude model each agent uses. Balance quality vs token spend.

| Profile | Planning | Execution | Verification |
|---------|----------|-----------|--------------|
| `quality` | Opus | Opus | Sonnet |
| `balanced` (default) | Opus | Sonnet | Sonnet |
| `budget` | Sonnet | Sonnet | Haiku |
| `inherit` | Inherit | Inherit | Inherit |

Switch profiles:
```
/gsd-set-profile budget
```

Use `inherit` when using non-Anthropic providers (OpenRouter, local models) or to follow the current runtime model selection (e.g. OpenCode `/model`).

Or configure via `/gsd-settings`.

### Workflow Agents

These spawn additional agents during planning/execution. They improve quality but add tokens and time.

| Setting | Default | What it does |
|---------|---------|--------------|
| `workflow.research` | `true` | Researches domain before planning each phase |
| `workflow.plan_check` | `true` | Verifies plans achieve phase goals before execution |
| `workflow.verifier` | `true` | Confirms must-haves were delivered after execution |
| `workflow.auto_advance` | `false` | Auto-chain discuss 鈫?plan 鈫?execute without stopping |
| `workflow.research_before_questions` | `false` | Run research before discussion questions instead of after |
| `workflow.discuss_mode` | `'discuss'` | Discussion mode: `discuss` (interview), `assumptions` (codebase-first) |
| `workflow.skip_discuss` | `false` | Skip discuss-phase in autonomous mode |
| `workflow.text_mode` | `false` | Text-only mode for remote sessions (no TUI menus) |
| `workflow.use_worktrees` | `true` | Toggle worktree isolation for execution |

Use `/gsd-settings` to toggle these, or override per-invocation:
- `/gsd-plan-phase --skip-research`
- `/gsd-plan-phase --skip-verify`

### Execution

| Setting | Default | What it controls |
|---------|---------|------------------|
| `parallelization.enabled` | `true` | Run independent plans simultaneously |
| `planning.commit_docs` | `true` | Track `.planning/` in git |
| `hooks.context_warnings` | `true` | Show context window usage warnings |

### Agent Skills

Inject project-specific skills into subagents during execution.

| Setting | Type | What it does |
|---------|------|--------------|
| `agent_skills.<agent_type>` | `string[]` | Paths to skill directories loaded into that agent type at spawn time |

Skills are injected as `<agent_skills>` blocks in agent prompts, giving subagents access to project-specific knowledge.

### Git Branching

Control how GSD handles branches during execution.

| Setting | Options | Default | What it does |
|---------|---------|---------|--------------|
| `git.branching_strategy` | `none`, `phase`, `milestone` | `none` | Branch creation strategy |
| `git.phase_branch_template` | string | `gsd/phase-{phase}-{slug}` | Template for phase branches |
| `git.milestone_branch_template` | string | `gsd/{milestone}-{slug}` | Template for milestone branches |

**Strategies:**
- **`none`**: commits to the current branch (default GSD behavior)
- **`phase`**: creates a branch per phase and merges at phase completion
- **`milestone`**: creates one branch for the entire milestone and merges at completion

At milestone completion, GSD offers squash merge (recommended) or merge with history.

---

## Security

### Built-in Security Hardening

GSD includes defense-in-depth security since v1.27:

- **Path traversal prevention**: all user-supplied file paths (`--text-file`, `--prd`) are validated to resolve within the project directory
- **Prompt injection detection**: centralized `security.cjs` scans user-supplied text before it enters planning artifacts
- **PreToolUse prompt guard hook**: `gsd-prompt-guard` scans writes to `.planning/` for embedded injection vectors (advisory, not blocking)
- **Safe JSON parsing**: malformed `--fields` arguments are caught before they corrupt state
- **Shell argument validation**: user text is sanitized before shell interpolation
- **CI-ready injection scanner**: `prompt-injection-scan.test.cjs` scans all agent, workflow, and command files for embedded injection vectors

> [!NOTE]
> Because GSD generates markdown files that become LLM system prompts, any user-controlled text flowing into planning artifacts is a potential indirect prompt injection vector. These protections are designed to catch such vectors at multiple layers.

### Protecting Sensitive Files

GSD's codebase mapping and analysis commands read files to understand your project. **Protect files containing secrets** by adding them to Claude Code compatibility/runtime deny lists:

1. Open Claude Code compatibility/runtime settings (`.claude/settings.json` or global)
2. Add sensitive file patterns to the deny list:

```json
{
  "permissions": {
    "deny": [
      "Read(.env)",
      "Read(.env.*)",
      "Read(**/secrets/*)",
      "Read(**/*credential*)",
      "Read(**/*.pem)",
      "Read(**/*.key)"
    ]
  }
}
```

This prevents Claude from reading these files entirely, regardless of what commands you run.

> [!IMPORTANT]
> GSD includes built-in protections against committing secrets, but defense-in-depth is best practice. Deny read access to sensitive files as a first line of defense.

---

## Troubleshooting

**Commands not found after install?**
- Restart your runtime to reload commands/skills
- Verify files exist in `~/.codex/skills/gsd-*/SKILL.md` for managed global installs
- For local installs, verify `./.codex/skills/gsd-*/SKILL.md`
- If you are migrating from legacy Claude installs, also check `~/.claude/skills/gsd-*/SKILL.md` or `~/.claude/commands/gsd/`

**Commands not working as expected?**
- Run `$gsd-help` to verify installation in Codex
- Re-run `npx get-shit-done-codex` or `node bin/install.js --codex --global` to reinstall

**Updating to the latest version?**
```bash
npx get-shit-done-codex@latest
```

**Using Docker or containerized environments?**

If you are migrating a legacy Claude install in a container, keep the compatibility notes in [docs/CODEX-FORK.md](docs/CODEX-FORK.md) handy. The Codex-first install paths are still `./.codex/` and `~/.codex/`.

### Uninstalling

To remove GSD completely:

```bash
# Global installs
npx get-shit-done-codex --claude --global --uninstall
npx get-shit-done-codex --opencode --global --uninstall
npx get-shit-done-codex --gemini --global --uninstall
npx get-shit-done-codex --kilo --global --uninstall
npx get-shit-done-codex --codex --global --uninstall
npx get-shit-done-codex --copilot --global --uninstall
npx get-shit-done-codex --cursor --global --uninstall
npx get-shit-done-codex --windsurf --global --uninstall
npx get-shit-done-codex --antigravity --global --uninstall
npx get-shit-done-codex --augment --global --uninstall
npx get-shit-done-codex --trae --global --uninstall
npx get-shit-done-codex --qwen --global --uninstall
npx get-shit-done-codex --codebuddy --global --uninstall
npx get-shit-done-codex --cline --global --uninstall

# Local installs (current project)
npx get-shit-done-codex --claude --local --uninstall
npx get-shit-done-codex --opencode --local --uninstall
npx get-shit-done-codex --gemini --local --uninstall
npx get-shit-done-codex --kilo --local --uninstall
npx get-shit-done-codex --codex --local --uninstall
npx get-shit-done-codex --copilot --local --uninstall
npx get-shit-done-codex --cursor --local --uninstall
npx get-shit-done-codex --windsurf --local --uninstall
npx get-shit-done-codex --antigravity --local --uninstall
npx get-shit-done-codex --augment --local --uninstall
npx get-shit-done-codex --trae --local --uninstall
npx get-shit-done-codex --qwen --local --uninstall
npx get-shit-done-codex --codebuddy --local --uninstall
npx get-shit-done-codex --cline --local --uninstall
```

This removes all GSD commands, agents, hooks, and settings while preserving your other configurations.

---

## Community Ports

OpenCode, Gemini CLI, Kilo, and Codex are now natively supported via `npx get-shit-done-codex`.

These community ports pioneered multi-runtime support:

| Project | Platform | Description |
|---------|----------|-------------|
| [gsd-opencode](https://github.com/rokicool/gsd-opencode) | OpenCode | Original OpenCode adaptation |
| gsd-gemini (archived) | Gemini CLI | Original Gemini adaptation by uberfuzzy |

---

## Star History

<a href="https://star-history.com/#get-shit-done-codex&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=get-shit-done-codex&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=get-shit-done-codex&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=get-shit-done-codex&type=Date" />
 </picture>
</a>

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

**AI coding is powerful. GSD makes it reliable.**

</div>







