<purpose>
Initialize a new project through unified flow: questioning, research (optional), requirements, roadmap. This is the most leveraged moment in any project 鈥?deep questioning here means better plans, better execution, better outcomes. One workflow takes you from idea to ready-for-planning.
</purpose>

<required_reading>
Read all files referenced by the invoking prompt's execution_context before starting.
</required_reading>

<available_agent_types>
Valid GSD subagent types (use exact names 鈥?do not fall back to 'general-purpose'):
- gsd-project-researcher 鈥?Researches project-level technical decisions
- gsd-research-synthesizer 鈥?Synthesizes findings from parallel research agents
- gsd-roadmapper 鈥?Creates phased execution roadmaps
</available_agent_types>

<auto_mode>

## Auto Mode Detection

Check if `--auto` flag is present in $ARGUMENTS.

**If auto mode:**

- Skip brownfield mapping offer (assume greenfield)
- Skip deep questioning (extract context from provided document)
- Config: YOLO mode is implicit (skip that question), but ask granularity/git/agents FIRST (Step 2a)
- After config: run Steps 6-9 automatically with smart defaults:
  - Research: Always yes
  - Requirements: Include all table stakes + features from provided document
  - Requirements approval: Auto-approve
  - Roadmap approval: Auto-approve

**Document requirement:**
Auto mode requires an idea document 鈥?either:

- File reference: `/gsd-new-project --auto @prd.md`
- Pasted/written text in the prompt

If no document content provided, error:

```
Error: --auto requires an idea document.

Usage:
  /gsd-new-project --auto @your-idea.md
  /gsd-new-project --auto [paste or write your idea here]

The document should describe what you want to build.
```

</auto_mode>

<process>

## 1. Setup

**MANDATORY FIRST STEP 鈥?Execute these checks before ANY user interaction:**

```bash
INIT=$(gsd-sdk query init.new-project)
if [[ "$INIT" == @file:* ]]; then INIT=$(cat "${INIT#@file:}"); fi
AGENT_SKILLS_RESEARCHER=$(gsd-sdk query agent-skills gsd-project-researcher 2>/dev/null)
AGENT_SKILLS_SYNTHESIZER=$(gsd-sdk query agent-skills gsd-synthesizer 2>/dev/null)
AGENT_SKILLS_ROADMAPPER=$(gsd-sdk query agent-skills gsd-roadmapper 2>/dev/null)
```

Parse JSON for: `researcher_model`, `synthesizer_model`, `roadmapper_model`, `commit_docs`, `project_exists`, `has_codebase_map`, `planning_exists`, `has_existing_code`, `has_package_file`, `is_brownfield`, `needs_codebase_map`, `has_git`, `project_path`.

**Detect runtime and set instruction file name:**

Derive `RUNTIME` from the invoking prompt's `execution_context` path:
- Path contains `/.codex/` 鈫?`RUNTIME=codex`
- Path contains `/.gemini/` 鈫?`RUNTIME=gemini`
- Path contains `/.config/opencode/` or `/.opencode/` 鈫?`RUNTIME=opencode`
- Otherwise 鈫?`RUNTIME=claude`

If `execution_context` path is not available, fall back to env vars:
```bash
if [ -n "$CODEX_HOME" ]; then RUNTIME="codex"
elif [ -n "$GEMINI_CONFIG_DIR" ]; then RUNTIME="gemini"
elif [ -n "$OPENCODE_CONFIG_DIR" ] || [ -n "$OPENCODE_CONFIG" ]; then RUNTIME="opencode"
else RUNTIME="claude"; fi
```

Set the canonical instruction file variable:
```bash
INSTRUCTION_FILE="AGENTS.md"
```

All subsequent references to the project instruction file use `$INSTRUCTION_FILE`. Legacy `CLAUDE.md` remains a migration alias only; this fork generates `AGENTS.md` as the canonical project guide.

**If `project_exists` is true:** Error 鈥?project already initialized. Use `/gsd-progress`.

**If `has_git` is false:** Initialize git:

```bash
git init
```

## 2. Brownfield Offer

**If auto mode:** Skip to Step 4 (assume greenfield, synthesize PROJECT.md from provided document).

**If `needs_codebase_map` is true** (from init 鈥?existing code detected but no codebase map):


**Text mode (`workflow.text_mode: true` in config or `--text` flag):** Set `TEXT_MODE=true` if `--text` is present in `$ARGUMENTS` OR `text_mode` from init JSON is `true`. When TEXT_MODE is active, replace every `AskUserQuestion` call with a plain-text numbered list and ask the user to type their choice number. This is required for non-Claude runtimes (OpenAI Codex, Gemini CLI, etc.) where `AskUserQuestion` is not available.
Use AskUserQuestion:

- header: "Codebase"
- question: "I detected existing code in this directory. Would you like to map the codebase first?"
- options:
  - "Map codebase first" 鈥?Run /gsd-map-codebase to understand existing architecture (Recommended)
  - "Skip mapping" 鈥?Proceed with project initialization

**If "Map codebase first":**

```
Run `/gsd-map-codebase` first, then return to `/gsd-new-project`
```

Exit command.

**If "Skip mapping" OR `needs_codebase_map` is false:** Continue to Step 3.

## 2a. Auto Mode Config (auto mode only)

**If auto mode:** Collect config settings upfront before processing the idea document.

YOLO mode is implicit (auto = YOLO). Ask remaining config questions:

**Round 1 鈥?Core settings (3 questions, no Mode question):**

```
AskUserQuestion([
  {
    header: "Granularity",
    question: "How finely should scope be sliced into phases?",
    multiSelect: false,
    options: [
      { label: "Coarse (Recommended)", description: "Fewer, broader phases (3-5 phases, 1-3 plans each)" },
      { label: "Standard", description: "Balanced phase size (5-8 phases, 3-5 plans each)" },
      { label: "Fine", description: "Many focused phases (8-12 phases, 5-10 plans each)" }
    ]
  },
  {
    header: "Execution",
    question: "Run plans in parallel?",
    multiSelect: false,
    options: [
      { label: "Parallel (Recommended)", description: "Independent plans run simultaneously" },
      { label: "Sequential", description: "One plan at a time" }
    ]
  },
  {
    header: "Git Tracking",
    question: "Commit planning docs to git?",
    multiSelect: false,
    options: [
      { label: "Yes (Recommended)", description: "Planning docs tracked in version control" },
      { label: "No", description: "Keep .planning/ local-only (add to .gitignore)" }
    ]
  }
])
```

**Round 2 鈥?Workflow agents (same as Step 5):**

```
AskUserQuestion([
  {
    header: "Research",
    question: "Research before planning each phase? (adds tokens/time)",
    multiSelect: false,
    options: [
      { label: "Yes (Recommended)", description: "Investigate domain, find patterns, surface gotchas" },
      { label: "No", description: "Plan directly from requirements" }
    ]
  },
  {
    header: "Plan Check",
    question: "Verify plans will achieve their goals? (adds tokens/time)",
    multiSelect: false,
    options: [
      { label: "Yes (Recommended)", description: "Catch gaps before execution starts" },
      { label: "No", description: "Execute plans without verification" }
    ]
  },
  {
    header: "Verifier",
    question: "Verify work satisfies requirements after each phase? (adds tokens/time)",
    multiSelect: false,
    options: [
      { label: "Yes (Recommended)", description: "Confirm deliverables match phase goals" },
      { label: "No", description: "Trust execution, skip verification" }
    ]
  },
  {
    header: "AI Models",
    question: "Which AI models for planning agents?",
    multiSelect: false,
    options: [
      { label: "Balanced (Recommended)", description: "Sonnet for most agents 鈥?good quality/cost ratio" },
      { label: "Quality", description: "Opus for research/roadmap 鈥?higher cost, deeper analysis" },
      { label: "Budget", description: "Haiku where possible 鈥?fastest, lowest cost" },
      { label: "Inherit", description: "Use the current session model for all agents (OpenCode /model)" }
    ]
  }
])
```

Create `.planning/config.json` with all settings (CLI fills in remaining defaults automatically):

```bash
mkdir -p .planning
gsd-sdk query config-new-project '{"mode":"yolo","granularity":"[selected]","parallelization":true|false,"commit_docs":true|false,"model_profile":"quality|balanced|budget|inherit","workflow":{"research":true|false,"plan_check":true|false,"verifier":true|false,"nyquist_validation":true|false,"auto_advance":true}}'
```

**If commit_docs = No:** Add `.planning/` to `.gitignore`.

**Commit config.json:**

```bash
mkdir -p .planning
gsd-sdk query commit "chore: add project config" .planning/config.json
```

**Persist auto-advance chain flag to config (survives context compaction):**

```bash
gsd-sdk query config-set workflow._auto_chain_active true
```

Proceed to Step 4 (skip Steps 3 and 5).

## 2b. Prior Spike/Sketch Detection

Check for existing spike and sketch work that should inform project setup:

```bash
# Check for spike findings skill (project-local, Codex-first with legacy fallback)
SPIKE_SKILL=$(ls ./.codex/skills/spike-findings-*/SKILL.md 2>/dev/null | head -1)
[ -n "$SPIKE_SKILL" ] || SPIKE_SKILL=$(ls ./.claude/skills/spike-findings-*/SKILL.md 2>/dev/null | head -1)

# Check for sketch findings skill (project-local, Codex-first with legacy fallback)
SKETCH_SKILL=$(ls ./.codex/skills/sketch-findings-*/SKILL.md 2>/dev/null | head -1)
[ -n "$SKETCH_SKILL" ] || SKETCH_SKILL=$(ls ./.claude/skills/sketch-findings-*/SKILL.md 2>/dev/null | head -1)

# Check for raw spikes/sketches in .planning/
HAS_SPIKES=$(ls .planning/spikes/MANIFEST.md 2>/dev/null)
HAS_SKETCHES=$(ls .planning/sketches/MANIFEST.md 2>/dev/null)
```

If any of these exist, surface them before questioning:

```
鈿?Prior exploration detected:
{if SPIKE_SKILL}  鉁?Spike findings skill: {path} 鈥?validated patterns from experiments
{if SKETCH_SKILL}  鉁?Sketch findings skill: {path} 鈥?validated design decisions
{if HAS_SPIKES && !SPIKE_SKILL}  鈼?Raw spikes in .planning/spikes/ 鈥?consider `/gsd-spike-wrap-up` to package findings
{if HAS_SKETCHES && !SKETCH_SKILL}  鈼?Raw sketches in .planning/sketches/ 鈥?consider `/gsd-sketch-wrap-up` to package findings

These findings will be incorporated into project context and available to planning agents.
```

If spike/sketch findings skills exist, read their SKILL.md files to inform the questioning phase 鈥?they contain validated patterns, constraints, and design decisions that should shape the project definition.

## 3. Deep Questioning

**If auto mode:** Skip (already handled in Step 2a). Extract project context from provided document instead and proceed to Step 4.

**Display stage banner:**

```
鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹?
 GSD 鈻?QUESTIONING
鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹?
```

**Open the conversation:**

Ask inline (freeform, NOT AskUserQuestion):

"What do you want to build?"

Wait for their response. This gives you the context needed to ask intelligent follow-up questions.

**Research-before-questions mode:** Check if `workflow.research_before_questions` is enabled in `.planning/config.json` (or the config from init context). When enabled, before asking follow-up questions about a topic area:

1. Do a brief web search for best practices related to what the user described
2. Mention key findings naturally as you ask questions (e.g., "Most projects like this use X 鈥?is that what you're thinking, or something different?")
3. This makes questions more informed without changing the conversational flow

When disabled (default), ask questions directly as before.

**Follow the thread:**

Based on what they said, ask follow-up questions that dig into their response. Use AskUserQuestion with options that probe what they mentioned 鈥?interpretations, clarifications, concrete examples.

Keep following threads. Each answer opens new threads to explore. Ask about:

- What excited them
- What problem sparked this
- What they mean by vague terms
- What it would actually look like
- What's already decided

Consult `questioning.md` for techniques:

- Challenge vagueness
- Make abstract concrete
- Surface assumptions
- Find edges
- Reveal motivation

**Check context (background, not out loud):**

As you go, mentally check the context checklist from `questioning.md`. If gaps remain, weave questions naturally. Don't suddenly switch to checklist mode.

**Decision gate:**

When you could write a clear PROJECT.md, use AskUserQuestion:

- header: "Ready?"
- question: "I think I understand what you're after. Ready to create PROJECT.md?"
- options:
  - "Create PROJECT.md" 鈥?Let's move forward
  - "Keep exploring" 鈥?I want to share more / ask me more

If "Keep exploring" 鈥?ask what they want to add, or identify gaps and probe naturally.

Loop until "Create PROJECT.md" selected.

## 4. Write PROJECT.md

**If auto mode:** Synthesize from provided document. No "Ready?" gate was shown 鈥?proceed directly to commit.

Synthesize all context into `.planning/PROJECT.md` using the template from `templates/project.md`.

**For greenfield projects:**

Initialize requirements as hypotheses:

```markdown
## Requirements

### Validated

(None yet 鈥?ship to validate)

### Active

- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [ ] [Requirement 3]

### Out of Scope

- [Exclusion 1] 鈥?[why]
- [Exclusion 2] 鈥?[why]
```

All Active requirements are hypotheses until shipped and validated.

**For brownfield projects (codebase map exists):**

Infer Validated requirements from existing code:

1. Read `.planning/codebase/ARCHITECTURE.md` and `STACK.md`
2. Identify what the codebase already does
3. These become the initial Validated set

```markdown
## Requirements

### Validated

- 鉁?[Existing capability 1] 鈥?existing
- 鉁?[Existing capability 2] 鈥?existing
- 鉁?[Existing capability 3] 鈥?existing

### Active

- [ ] [New requirement 1]
- [ ] [New requirement 2]

### Out of Scope

- [Exclusion 1] 鈥?[why]
```

**Key Decisions:**

Initialize with any decisions made during questioning:

```markdown
## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| [Choice from questioning] | [Why] | 鈥?Pending |
```

**Last updated footer:**

```markdown
---
*Last updated: [date] after initialization*
```

**Evolution section** (include at the end of PROJECT.md, before the footer):

```markdown
## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? 鈫?Move to Out of Scope with reason
2. Requirements validated? 鈫?Move to Validated with phase reference
3. New requirements emerged? 鈫?Add to Active
4. Decisions to log? 鈫?Add to Key Decisions
5. "What This Is" still accurate? 鈫?Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check 鈥?still the right priority?
3. Audit Out of Scope 鈥?reasons still valid?
4. Update Context with current state
```

Do not compress. Capture everything gathered.

**Commit PROJECT.md:**

```bash
mkdir -p .planning
gsd-sdk query commit "docs: initialize project" .planning/PROJECT.md
```

## 5. Workflow Preferences

**If auto mode:** Skip 鈥?config was collected in Step 2a. Proceed to Step 5.5.

**Check for global defaults** at `~/.gsd/defaults.json`. If the file exists, read and display its contents before asking:

```bash
DEFAULTS_RAW=$(cat ~/.gsd/defaults.json 2>/dev/null)
```

Format the JSON into human-readable bullets using these label mappings:
- `mode` 鈫?"Mode"
- `granularity` 鈫?"Granularity"
- `parallelization` 鈫?"Execution" (`true` 鈫?"Parallel", `false` 鈫?"Sequential")
- `commit_docs` 鈫?"Git Tracking" (`true` 鈫?"Yes", `false` 鈫?"No")
- `model_profile` 鈫?"AI Models"
- `workflow.research` 鈫?"Research" (`true` 鈫?"Yes", `false` 鈫?"No")
- `workflow.plan_check` 鈫?"Plan Check" (`true` 鈫?"Yes", `false` 鈫?"No")
- `workflow.verifier` 鈫?"Verifier" (`true` 鈫?"Yes", `false` 鈫?"No")

Display above the prompt:

```text
Your saved defaults (~/.gsd/defaults.json):
  鈥?Mode: [value]
  鈥?Granularity: [value]
  鈥?Execution: [Parallel|Sequential]
  鈥?Git Tracking: [Yes|No]
  鈥?AI Models: [value]
  鈥?Research: [Yes|No]
  鈥?Plan Check: [Yes|No]
  鈥?Verifier: [Yes|No]
```

Then ask:

```text
AskUserQuestion([
  {
    question: "Use these saved defaults?",
    header: "Defaults",
    multiSelect: false,
    options: [
      { label: "Use as-is (Recommended)", description: "Proceed with the defaults shown above" },
      { label: "Modify some settings", description: "Keep defaults, change a few" },
      { label: "Configure fresh", description: "Walk through all questions from scratch" }
    ]
  }
])
```

**If "Use as-is":** use the defaults values for config.json and skip directly to **Commit config.json** below.

**If "Modify some settings":** present a selection of every setting with its current saved value.

**If TEXT_MODE is active** (non-Claude runtimes): display a numbered list and ask the user to type the numbers of settings they want to change (comma-separated). Parse the response and proceed.

```text
Which settings do you want to change? (enter numbers, comma-separated)

  1. Mode 鈥?Currently: [value]
  2. Granularity 鈥?Currently: [value]
  3. Execution 鈥?Currently: [Parallel|Sequential]
  4. Git Tracking 鈥?Currently: [Yes|No]
  5. AI Models 鈥?Currently: [value]
  6. Research 鈥?Currently: [Yes|No]
  7. Plan Check 鈥?Currently: [Yes|No]
  8. Verifier 鈥?Currently: [Yes|No]
```

**Otherwise** (Claude runtime with AskUserQuestion): use multiSelect:

```text
AskUserQuestion([
  {
    question: "Which settings do you want to change?",
    header: "Change Settings",
    multiSelect: true,
    options: [
      { label: "Mode", description: "Currently: [value]" },
      { label: "Granularity", description: "Currently: [value]" },
      { label: "Execution", description: "Currently: [Parallel|Sequential]" },
      { label: "Git Tracking", description: "Currently: [Yes|No]" },
      { label: "AI Models", description: "Currently: [value]" },
      { label: "Research", description: "Currently: [Yes|No]" },
      { label: "Plan Check", description: "Currently: [Yes|No]" },
      { label: "Verifier", description: "Currently: [Yes|No]" }
    ]
  }
])
```

For each selected setting, ask only that question using the option set from Round 1 / Round 2 below. Merge user answers over the saved defaults 鈥?unchanged settings retain their saved values. Then skip to **Commit config.json**.

**If "Configure fresh" or `~/.gsd/defaults.json` doesn't exist:** proceed with the questions below.

**Round 1 鈥?Core workflow settings (4 questions):**

```
questions: [
  {
    header: "Mode",
    question: "How do you want to work?",
    multiSelect: false,
    options: [
      { label: "YOLO (Recommended)", description: "Auto-approve, just execute" },
      { label: "Interactive", description: "Confirm at each step" }
    ]
  },
  {
    header: "Granularity",
    question: "How finely should scope be sliced into phases?",
    multiSelect: false,
    options: [
      { label: "Coarse", description: "Fewer, broader phases (3-5 phases, 1-3 plans each)" },
      { label: "Standard", description: "Balanced phase size (5-8 phases, 3-5 plans each)" },
      { label: "Fine", description: "Many focused phases (8-12 phases, 5-10 plans each)" }
    ]
  },
  {
    header: "Execution",
    question: "Run plans in parallel?",
    multiSelect: false,
    options: [
      { label: "Parallel (Recommended)", description: "Independent plans run simultaneously" },
      { label: "Sequential", description: "One plan at a time" }
    ]
  },
  {
    header: "Git Tracking",
    question: "Commit planning docs to git?",
    multiSelect: false,
    options: [
      { label: "Yes (Recommended)", description: "Planning docs tracked in version control" },
      { label: "No", description: "Keep .planning/ local-only (add to .gitignore)" }
    ]
  }
]
```

**Round 2 鈥?Workflow agents:**

These spawn additional agents during planning/execution. They add tokens and time but improve quality.

| Agent | When it runs | What it does |
|-------|--------------|--------------|
| **Researcher** | Before planning each phase | Investigates domain, finds patterns, surfaces gotchas |
| **Plan Checker** | After plan is created | Verifies plan actually achieves the phase goal |
| **Verifier** | After phase execution | Confirms must-haves were delivered |

All recommended for important projects. Skip for quick experiments.

```
questions: [
  {
    header: "Research",
    question: "Research before planning each phase? (adds tokens/time)",
    multiSelect: false,
    options: [
      { label: "Yes (Recommended)", description: "Investigate domain, find patterns, surface gotchas" },
      { label: "No", description: "Plan directly from requirements" }
    ]
  },
  {
    header: "Plan Check",
    question: "Verify plans will achieve their goals? (adds tokens/time)",
    multiSelect: false,
    options: [
      { label: "Yes (Recommended)", description: "Catch gaps before execution starts" },
      { label: "No", description: "Execute plans without verification" }
    ]
  },
  {
    header: "Verifier",
    question: "Verify work satisfies requirements after each phase? (adds tokens/time)",
    multiSelect: false,
    options: [
      { label: "Yes (Recommended)", description: "Confirm deliverables match phase goals" },
      { label: "No", description: "Trust execution, skip verification" }
    ]
  },
  {
    header: "AI Models",
    question: "Which AI models for planning agents?",
    multiSelect: false,
    options: [
      { label: "Balanced (Recommended)", description: "Sonnet for most agents 鈥?good quality/cost ratio" },
      { label: "Quality", description: "Opus for research/roadmap 鈥?higher cost, deeper analysis" },
      { label: "Budget", description: "Haiku where possible 鈥?fastest, lowest cost" },
      { label: "Inherit", description: "Use the current session model for all agents (OpenCode /model)" }
    ]
  }
]
```

Create `.planning/config.json` with all settings (CLI fills in remaining defaults automatically):

```bash
mkdir -p .planning
gsd-sdk query config-new-project '{"mode":"[yolo|interactive]","granularity":"[selected]","parallelization":true|false,"commit_docs":true|false,"model_profile":"quality|balanced|budget|inherit","workflow":{"research":true|false,"plan_check":true|false,"verifier":true|false,"nyquist_validation":[false if granularity=coarse, true otherwise]}}'
```

**Note:** Run `/gsd-settings` anytime to update model profile, workflow agents, branching strategy, and other preferences.

**If commit_docs = No:**

- Set `commit_docs: false` in config.json
- Add `.planning/` to `.gitignore` (create if needed)

**If commit_docs = Yes:**

- No additional gitignore entries needed

**Commit config.json:**

```bash
gsd-sdk query commit "chore: add project config" .planning/config.json
```

## 5.1. Sub-Repo Detection

**Detect multi-repo workspace:**

Check for directories with their own `.git` folders (separate repos within the workspace):

```bash
find . -maxdepth 1 -type d -not -name ".*" -not -name "node_modules" -exec test -d "{}/.git" \; -print
```

**If sub-repos found:**

Strip the `./` prefix to get directory names (e.g., `./backend` 鈫?`backend`).

Use AskUserQuestion:

- header: "Multi-Repo Workspace"
- question: "I detected separate git repos in this workspace. Which directories contain code that GSD should commit to?"
- multiSelect: true
- options: one option per detected directory
  - "[directory name]" 鈥?Separate git repo

**If user selects one or more directories:**

- Set `planning.sub_repos` in config.json to the selected directory names array (e.g., `["backend", "frontend"]`)
- Auto-set `planning.commit_docs` to `false` (planning docs stay local in multi-repo workspaces)
- Add `.planning/` to `.gitignore` if not already present

Config changes are saved locally 鈥?no commit needed since `commit_docs` is `false` in multi-repo mode.

**If no sub-repos found or user selects none:** Continue with no changes to config.

## 5.5. Resolve Model Profile

Use models from init: `researcher_model`, `synthesizer_model`, `roadmapper_model`.

## 6. Research Decision

**If auto mode:** Default to "Research first" without asking.

Use AskUserQuestion:

- header: "Research"
- question: "Research the domain ecosystem before defining requirements?"
- options:
  - "Research first (Recommended)" 鈥?Discover standard stacks, expected features, architecture patterns
  - "Skip research" 鈥?I know this domain well, go straight to requirements

**If "Research first":**

Display stage banner:

```
鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹?
 GSD 鈻?RESEARCHING
鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹?

Researching [domain] ecosystem...
```

Create research directory:

```bash
mkdir -p .planning/research
```

**Determine milestone context:**

Check if this is greenfield or subsequent milestone:

- If no "Validated" requirements in PROJECT.md 鈫?Greenfield (building from scratch)
- If "Validated" requirements exist 鈫?Subsequent milestone (adding to existing app)

Display spawning indicator:

```
鈼?Spawning 4 researchers in parallel...
  鈫?Stack research
  鈫?Features research
  鈫?Architecture research
  鈫?Pitfalls research
```

Spawn 4 parallel gsd-project-researcher agents with path references:

```
Task(prompt="<research_type>
Project Research 鈥?Stack dimension for [domain].
</research_type>

<milestone_context>
[greenfield OR subsequent]

Greenfield: Research the standard stack for building [domain] from scratch.
Subsequent: Research what's needed to add [target features] to an existing [domain] app. Don't re-research the existing system.
</milestone_context>

<question>
What's the standard 2025 stack for [domain]?
</question>

<files_to_read>
- {project_path} (Project context and goals)
</files_to_read>

${AGENT_SKILLS_RESEARCHER}

<downstream_consumer>
Your STACK.md feeds into roadmap creation. Be prescriptive:
- Specific libraries with versions
- Clear rationale for each choice
- What NOT to use and why
</downstream_consumer>

<quality_gate>
- [ ] Versions are current (verify with Context7/official docs, not training data)
- [ ] Rationale explains WHY, not just WHAT
- [ ] Confidence levels assigned to each recommendation
</quality_gate>

<output>
Write to: .planning/research/STACK.md
Use template: ~/.codex/get-shit-done/templates/research-project/STACK.md
</output>
", subagent_type="gsd-project-researcher", model="{researcher_model}", description="Stack research")

Task(prompt="<research_type>
Project Research 鈥?Features dimension for [domain].
</research_type>

<milestone_context>
[greenfield OR subsequent]

Greenfield: What features do [domain] products have? What's table stakes vs differentiating?
Subsequent: How do [target features] typically work? What's expected behavior?
</milestone_context>

<question>
What features do [domain] products have? What's table stakes vs differentiating?
</question>

<files_to_read>
- {project_path} (Project context)
</files_to_read>

${AGENT_SKILLS_RESEARCHER}

<downstream_consumer>
Your FEATURES.md feeds into requirements definition. Categorize clearly:
- Table stakes (must have or users leave)
- Differentiators (competitive advantage)
- Anti-features (things to deliberately NOT build)
</downstream_consumer>

<quality_gate>
- [ ] Categories are clear (table stakes vs differentiators vs anti-features)
- [ ] Complexity noted for each feature
- [ ] Dependencies between features identified
</quality_gate>

<output>
Write to: .planning/research/FEATURES.md
Use template: ~/.codex/get-shit-done/templates/research-project/FEATURES.md
</output>
", subagent_type="gsd-project-researcher", model="{researcher_model}", description="Features research")

Task(prompt="<research_type>
Project Research 鈥?Architecture dimension for [domain].
</research_type>

<milestone_context>
[greenfield OR subsequent]

Greenfield: How are [domain] systems typically structured? What are major components?
Subsequent: How do [target features] integrate with existing [domain] architecture?
</milestone_context>

<question>
How are [domain] systems typically structured? What are major components?
</question>

<files_to_read>
- {project_path} (Project context)
</files_to_read>

${AGENT_SKILLS_RESEARCHER}

<downstream_consumer>
Your ARCHITECTURE.md informs phase structure in roadmap. Include:
- Component boundaries (what talks to what)
- Data flow (how information moves)
- Suggested build order (dependencies between components)
</downstream_consumer>

<quality_gate>
- [ ] Components clearly defined with boundaries
- [ ] Data flow direction explicit
- [ ] Build order implications noted
</quality_gate>

<output>
Write to: .planning/research/ARCHITECTURE.md
Use template: ~/.codex/get-shit-done/templates/research-project/ARCHITECTURE.md
</output>
", subagent_type="gsd-project-researcher", model="{researcher_model}", description="Architecture research")

Task(prompt="<research_type>
Project Research 鈥?Pitfalls dimension for [domain].
</research_type>

<milestone_context>
[greenfield OR subsequent]

Greenfield: What do [domain] projects commonly get wrong? Critical mistakes?
Subsequent: What are common mistakes when adding [target features] to [domain]?
</milestone_context>

<question>
What do [domain] projects commonly get wrong? Critical mistakes?
</question>

<files_to_read>
- {project_path} (Project context)
</files_to_read>

${AGENT_SKILLS_RESEARCHER}

<downstream_consumer>
Your PITFALLS.md prevents mistakes in roadmap/planning. For each pitfall:
- Warning signs (how to detect early)
- Prevention strategy (how to avoid)
- Which phase should address it
</downstream_consumer>

<quality_gate>
- [ ] Pitfalls are specific to this domain (not generic advice)
- [ ] Prevention strategies are actionable
- [ ] Phase mapping included where relevant
</quality_gate>

<output>
Write to: .planning/research/PITFALLS.md
Use template: ~/.codex/get-shit-done/templates/research-project/PITFALLS.md
</output>
", subagent_type="gsd-project-researcher", model="{researcher_model}", description="Pitfalls research")
```

After all 4 agents complete, spawn synthesizer to create SUMMARY.md:

```
Task(prompt="
<task>
Synthesize research outputs into SUMMARY.md.
</task>

<files_to_read>
- .planning/research/STACK.md
- .planning/research/FEATURES.md
- .planning/research/ARCHITECTURE.md
- .planning/research/PITFALLS.md
</files_to_read>

${AGENT_SKILLS_SYNTHESIZER}

<output>
Write to: .planning/research/SUMMARY.md
Use template: ~/.codex/get-shit-done/templates/research-project/SUMMARY.md
Commit after writing.
</output>
", subagent_type="gsd-research-synthesizer", model="{synthesizer_model}", description="Synthesize research")
```

Display research complete banner and key findings:

```
鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹?
 GSD 鈻?RESEARCH COMPLETE 鉁?
鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹?

## Key Findings

**Stack:** [from SUMMARY.md]
**Table Stakes:** [from SUMMARY.md]
**Watch Out For:** [from SUMMARY.md]

Files: `.planning/research/`
```

**If "Skip research":** Continue to Step 7.

## 7. Define Requirements

Display stage banner:

```
鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹?
 GSD 鈻?DEFINING REQUIREMENTS
鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹?
```

**Load context:**

Read PROJECT.md and extract:

- Core value (the ONE thing that must work)
- Stated constraints (budget, timeline, tech limitations)
- Any explicit scope boundaries

**If research exists:** Read research/FEATURES.md and extract feature categories.

**If auto mode:**

- Auto-include all table stakes features (users expect these)
- Include features explicitly mentioned in provided document
- Auto-defer differentiators not mentioned in document
- Skip per-category AskUserQuestion loops
- Skip "Any additions?" question
- Skip requirements approval gate
- Generate REQUIREMENTS.md and commit directly

**Present features by category (interactive mode only):**

```
Here are the features for [domain]:

## Authentication
**Table stakes:**
- Sign up with email/password
- Email verification
- Password reset
- Session management

**Differentiators:**
- Magic link login
- OAuth (Google, GitHub)
- 2FA

**Research notes:** [any relevant notes]

---

## [Next Category]
...
```

**If no research:** Gather requirements through conversation instead.

Ask: "What are the main things users need to be able to do?"

For each capability mentioned:

- Ask clarifying questions to make it specific
- Probe for related capabilities
- Group into categories

**Scope each category:**

For each category, use AskUserQuestion:

- header: "[Category]" (max 12 chars)
- question: "Which [category] features are in v1?"
- multiSelect: true
- options:
  - "[Feature 1]" 鈥?[brief description]
  - "[Feature 2]" 鈥?[brief description]
  - "[Feature 3]" 鈥?[brief description]
  - "None for v1" 鈥?Defer entire category

Track responses:

- Selected features 鈫?v1 requirements
- Unselected table stakes 鈫?v2 (users expect these)
- Unselected differentiators 鈫?out of scope

**Identify gaps:**

Use AskUserQuestion:

- header: "Additions"
- question: "Any requirements research missed? (Features specific to your vision)"
- options:
  - "No, research covered it" 鈥?Proceed
  - "Yes, let me add some" 鈥?Capture additions

**Validate core value:**

Cross-check requirements against Core Value from PROJECT.md. If gaps detected, surface them.

**Generate REQUIREMENTS.md:**

Create `.planning/REQUIREMENTS.md` with:

- v1 Requirements grouped by category (checkboxes, REQ-IDs)
- v2 Requirements (deferred)
- Out of Scope (explicit exclusions with reasoning)
- Traceability section (empty, filled by roadmap)

**REQ-ID format:** `[CATEGORY]-[NUMBER]` (AUTH-01, CONTENT-02)

**Requirement quality criteria:**

Good requirements are:

- **Specific and testable:** "User can reset password via email link" (not "Handle password reset")
- **User-centric:** "User can X" (not "System does Y")
- **Atomic:** One capability per requirement (not "User can login and manage profile")
- **Independent:** Minimal dependencies on other requirements

Reject vague requirements. Push for specificity:

- "Handle authentication" 鈫?"User can log in with email/password and stay logged in across sessions"
- "Support sharing" 鈫?"User can share post via link that opens in recipient's browser"

**Present full requirements list (interactive mode only):**

Show every requirement (not counts) for user confirmation:

```
## v1 Requirements

### Authentication
- [ ] **AUTH-01**: User can create account with email/password
- [ ] **AUTH-02**: User can log in and stay logged in across sessions
- [ ] **AUTH-03**: User can log out from any page

### Content
- [ ] **CONT-01**: User can create posts with text
- [ ] **CONT-02**: User can edit their own posts

[... full list ...]

---

Does this capture what you're building? (yes / adjust)
```

If "adjust": Return to scoping.

**Commit requirements:**

```bash
gsd-sdk query commit "docs: define v1 requirements" .planning/REQUIREMENTS.md
```

## 8. Create Roadmap

Display stage banner:

```
鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹?
 GSD 鈻?CREATING ROADMAP
鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹?

鈼?Spawning roadmapper...
```

Spawn gsd-roadmapper agent with path references:

```
Task(prompt="
<planning_context>

<files_to_read>
- .planning/PROJECT.md (Project context)
- .planning/REQUIREMENTS.md (v1 Requirements)
- .planning/research/SUMMARY.md (Research findings - if exists)
- .planning/config.json (Granularity and mode settings)
</files_to_read>

${AGENT_SKILLS_ROADMAPPER}

</planning_context>

<instructions>
Create roadmap:
1. Derive phases from requirements (don't impose structure)
2. Map every v1 requirement to exactly one phase
3. Derive 2-5 success criteria per phase (observable user behaviors)
4. Validate 100% coverage
5. Write files immediately (ROADMAP.md, STATE.md, update REQUIREMENTS.md traceability)
6. Return ROADMAP CREATED with summary

Write files first, then return. This ensures artifacts persist even if context is lost.
</instructions>
", subagent_type="gsd-roadmapper", model="{roadmapper_model}", description="Create roadmap")
```

**Handle roadmapper return:**

**If `## ROADMAP BLOCKED`:**

- Present blocker information
- Work with user to resolve
- Re-spawn when resolved

**If `## ROADMAP CREATED`:**

Read the created ROADMAP.md and present it nicely inline:

```
---

## Proposed Roadmap

**[N] phases** | **[X] requirements mapped** | All v1 requirements covered 鉁?

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | [Name] | [Goal] | [REQ-IDs] | [count] |
| 2 | [Name] | [Goal] | [REQ-IDs] | [count] |
| 3 | [Name] | [Goal] | [REQ-IDs] | [count] |
...

### Phase Details

**Phase 1: [Name]**
Goal: [goal]
Requirements: [REQ-IDs]
Success criteria:
1. [criterion]
2. [criterion]
3. [criterion]

**Phase 2: [Name]**
Goal: [goal]
Requirements: [REQ-IDs]
Success criteria:
1. [criterion]
2. [criterion]

[... continue for all phases ...]

---
```

**If auto mode:** Skip approval gate 鈥?auto-approve and commit directly.

**CRITICAL: Ask for approval before committing (interactive mode only):**

Use AskUserQuestion:

- header: "Roadmap"
- question: "Does this roadmap structure work for you?"
- options:
  - "Approve" 鈥?Commit and continue
  - "Adjust phases" 鈥?Tell me what to change
  - "Review full file" 鈥?Show raw ROADMAP.md

**If "Approve":** Continue to commit.

**If "Adjust phases":**

- Get user's adjustment notes
- Re-spawn roadmapper with revision context:

  ```
  Task(prompt="
  <revision>
  User feedback on roadmap:
  [user's notes]

  <files_to_read>
  - .planning/ROADMAP.md (Current roadmap to revise)
  </files_to_read>

  ${AGENT_SKILLS_ROADMAPPER}

  Update the roadmap based on feedback. Edit files in place.
  Return ROADMAP REVISED with changes made.
  </revision>
  ", subagent_type="gsd-roadmapper", model="{roadmapper_model}", description="Revise roadmap")
  ```

- Present revised roadmap
- Loop until user approves

**If "Review full file":** Display raw `cat .planning/ROADMAP.md`, then re-ask.

**Generate or refresh project instruction file before final commit:**

```bash
gsd-sdk query generate-agents-md --output "$INSTRUCTION_FILE"
```

This ensures new projects get the default GSD workflow-enforcement guidance and current project context in `$INSTRUCTION_FILE`.

**Commit roadmap (after approval or auto mode):**

```bash
gsd-sdk query commit "docs: create roadmap ([N] phases)" .planning/ROADMAP.md .planning/STATE.md .planning/REQUIREMENTS.md "$INSTRUCTION_FILE"
```

## 9. Done

Present completion summary:

```
鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹?
 GSD 鈻?PROJECT INITIALIZED 鉁?
鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹佲攣鈹?

**[Project Name]**

| Artifact       | Location                    |
|----------------|-----------------------------|
| Project        | `.planning/PROJECT.md`      |
| Config         | `.planning/config.json`     |
| Research       | `.planning/research/`       |
| Requirements   | `.planning/REQUIREMENTS.md` |
| Roadmap        | `.planning/ROADMAP.md`      |
| Project guide  | `$INSTRUCTION_FILE`         |

**[N] phases** | **[X] requirements** | Ready to build 鉁?
```

**If auto mode:**

```
鈺斺晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晽
鈺? AUTO-ADVANCING 鈫?DISCUSS PHASE 1        鈺?
鈺氣晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨暆
```

Exit skill and invoke SlashCommand("/gsd-discuss-phase 1 --auto")

**If interactive mode:**

Check if Phase 1 has UI indicators (look for `**UI hint**: yes` in Phase 1 detail section of ROADMAP.md):

```bash
PHASE1_SECTION=$(gsd-sdk query roadmap.get-phase 1 2>/dev/null)
PHASE1_HAS_UI=$(echo "$PHASE1_SECTION" | grep -qi "UI hint.*yes" && echo "true" || echo "false")
```

**If Phase 1 has UI (`PHASE1_HAS_UI` is `true`):**

```
鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€

## 鈻?Next Up 鈥?[${PROJECT_CODE}] ${PROJECT_TITLE}

**Phase 1: [Phase Name]** 鈥?[Goal from ROADMAP.md]

/clear then:

/gsd-discuss-phase 1 鈥?gather context and clarify approach

---

**Also available:**
- /gsd-ui-phase 1 鈥?generate UI design contract (recommended for frontend phases)
- /gsd-plan-phase 1 鈥?skip discussion, plan directly

鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
```

**If Phase 1 has no UI:**

```
鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€

## 鈻?Next Up 鈥?[${PROJECT_CODE}] ${PROJECT_TITLE}

**Phase 1: [Phase Name]** 鈥?[Goal from ROADMAP.md]

/clear then:

/gsd-discuss-phase 1 鈥?gather context and clarify approach

---

**Also available:**
- /gsd-plan-phase 1 鈥?skip discussion, plan directly

鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
```

</process>

<output>

- `.planning/PROJECT.md`
- `.planning/config.json`
- `.planning/research/` (if research selected)
  - `STACK.md`
  - `FEATURES.md`
  - `ARCHITECTURE.md`
  - `PITFALLS.md`
  - `SUMMARY.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/STATE.md`
- `$INSTRUCTION_FILE` (`AGENTS.md`, canonical in this fork; `CLAUDE.md` is compatibility-only)

</output>

<success_criteria>

- [ ] .planning/ directory created
- [ ] Git repo initialized
- [ ] Brownfield detection completed
- [ ] Deep questioning completed (threads followed, not rushed)
- [ ] PROJECT.md captures full context 鈫?**committed**
- [ ] config.json has workflow mode, granularity, parallelization 鈫?**committed**
- [ ] Research completed (if selected) 鈥?4 parallel agents spawned 鈫?**committed**
- [ ] Requirements gathered (from research or conversation)
- [ ] User scoped each category (v1/v2/out of scope)
- [ ] REQUIREMENTS.md created with REQ-IDs 鈫?**committed**
- [ ] gsd-roadmapper spawned with context
- [ ] Roadmap files written immediately (not draft)
- [ ] User feedback incorporated (if any)
- [ ] ROADMAP.md created with phases, requirement mappings, success criteria
- [ ] STATE.md initialized
- [ ] REQUIREMENTS.md traceability updated
- [ ] `$INSTRUCTION_FILE` generated with GSD workflow guidance (`AGENTS.md`, canonical in this fork)
- [ ] User knows next step is `/gsd-discuss-phase 1`

**Atomic commits:** Each phase commits its artifacts immediately. If context is lost, artifacts persist.

</success_criteria>
