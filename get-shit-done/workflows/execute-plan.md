<purpose>
Execute a phase prompt (PLAN.md) and create the outcome summary (SUMMARY.md).
</purpose>

<required_reading>
Read STATE.md before any operation to load project context.
Read config.json for planning behavior settings.

@~/.codex/get-shit-done/references/git-integration.md
</required_reading>

<available_agent_types>
Valid GSD subagent types (use exact names 鈥?do not fall back to 'general-purpose'):
- gsd-executor 鈥?Executes plan tasks, commits, creates SUMMARY.md
</available_agent_types>

<process>

<step name="init_context" priority="first">
Load execution context (paths only to minimize orchestrator context):

```bash
INIT=$(gsd-sdk query init.execute-phase "${PHASE}")
if [[ "$INIT" == @file:* ]]; then INIT=$(cat "${INIT#@file:}"); fi
```

Extract from init JSON: `executor_model`, `commit_docs`, `sub_repos`, `phase_dir`, `phase_number`, `plans`, `summaries`, `incomplete_plans`, `state_path`, `config_path`.

If `.planning/` missing: error.
</step>

<step name="identify_plan">
```bash
# Use plans/summaries from INIT JSON, or list files
(ls .planning/phases/XX-name/*-PLAN.md 2>/dev/null || true) | sort
(ls .planning/phases/XX-name/*-SUMMARY.md 2>/dev/null || true) | sort
```

Find first PLAN without matching SUMMARY. Decimal phases supported (`01.1-hotfix/`):

```bash
PHASE=$(echo "$PLAN_PATH" | grep -oE '[0-9]+(\.[0-9]+)?-[0-9]+')
# config settings can be fetched via gsd-sdk query config-get if needed
```

<if mode="yolo">
Auto-approve: `鈿?Execute {phase}-{plan}-PLAN.md [Plan X of Y for Phase Z]` 鈫?parse_segments.
</if>

<if mode="interactive" OR="custom with gates.execute_next_plan true">
Present plan identification, wait for confirmation.
</if>
</step>

<step name="record_start_time">
```bash
PLAN_START_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
PLAN_START_EPOCH=$(date +%s)
```
</step>

<step name="parse_segments">
```bash
# Count tasks 鈥?match <task tag at any indentation level
TASK_COUNT=$(grep -cE '^\s*<task[[:space:]>]' .planning/phases/XX-name/{phase}-{plan}-PLAN.md 2>/dev/null || echo "0")
INLINE_THRESHOLD=$(gsd-sdk query config-get workflow.inline_plan_threshold 2>/dev/null || echo "2")
grep -n "type=\"checkpoint" .planning/phases/XX-name/{phase}-{plan}-PLAN.md
```

**Primary routing: task count threshold (#1979)**

If `INLINE_THRESHOLD > 0` AND `TASK_COUNT <= INLINE_THRESHOLD`: Use Pattern C (inline) regardless of checkpoint type. Small plans execute faster inline 鈥?avoids ~14K token subagent spawn overhead and preserves prompt cache. Configure threshold via `workflow.inline_plan_threshold` (default: 2, set to `0` to always spawn subagents).

Otherwise: Apply checkpoint-based routing below.

**Checkpoint-based routing (plans with > threshold tasks):**

| Checkpoints | Pattern | Execution |
|-------------|---------|-----------|
| None | A (autonomous) | Single subagent: full plan + SUMMARY + commit |
| Verify-only | B (segmented) | Segments between checkpoints. After none/human-verify 鈫?SUBAGENT. After decision/human-action 鈫?MAIN |
| Decision | C (main) | Execute entirely in main context |

**Pattern A:** init_agent_tracking 鈫?capture `EXPECTED_BASE=$(git rev-parse HEAD)` 鈫?spawn Task(subagent_type="gsd-executor", model=executor_model) with prompt: execute plan at [path], autonomous, all tasks + SUMMARY + commit, follow deviation/auth rules, report: plan name, tasks, SUMMARY path, commit hash 鈫?track agent_id 鈫?wait 鈫?update tracking 鈫?report. **Include `isolation="worktree"` only if `workflow.use_worktrees` is not `false`** (read via `config-get workflow.use_worktrees`). **When using `isolation="worktree"`, include a `<worktree_branch_check>` block in the prompt** instructing the executor to run `git merge-base HEAD {EXPECTED_BASE}` and, if the result differs from `{EXPECTED_BASE}`, hard-reset the branch with `git reset --hard {EXPECTED_BASE}` before starting work (safe 鈥?runs before any agent work), then verify with `[ "$(git rev-parse HEAD)" != "{EXPECTED_BASE}" ] && exit 1`. This corrects a known issue where `EnterWorktree` creates branches from `main` instead of the feature branch HEAD (affects all platforms).

**Pattern B:** Execute segment-by-segment. Autonomous segments: spawn subagent for assigned tasks only (no SUMMARY/commit). Checkpoints: main context. After all segments: aggregate, create SUMMARY, commit. See segment_execution.

**Pattern C:** Execute in main using standard flow (step name="execute").

Fresh context per subagent preserves peak quality. Main context stays lean.
</step>

<step name="init_agent_tracking">
```bash
if [ ! -f .planning/agent-history.json ]; then
  echo '{"version":"1.0","max_entries":50,"entries":[]}' > .planning/agent-history.json
fi
rm -f .planning/current-agent-id.txt
if [ -f .planning/current-agent-id.txt ]; then
  INTERRUPTED_ID=$(cat .planning/current-agent-id.txt)
  echo "Found interrupted agent: $INTERRUPTED_ID"
fi
```

If interrupted: ask user to resume (Task `resume` parameter) or start fresh.

**Tracking protocol:** On spawn: write agent_id to `current-agent-id.txt`, append to agent-history.json: `{"agent_id":"[id]","task_description":"[desc]","phase":"[phase]","plan":"[plan]","segment":[num|null],"timestamp":"[ISO]","status":"spawned","completion_timestamp":null}`. On completion: status 鈫?"completed", set completion_timestamp, delete current-agent-id.txt. Prune: if entries > max_entries, remove oldest "completed" (never "spawned").

Run for Pattern A/B before spawning. Pattern C: skip.
</step>

<step name="segment_execution">
Pattern B only (verify-only checkpoints). Skip for A/C.

1. Parse segment map: checkpoint locations and types
2. Per segment:
   - Subagent route: spawn gsd-executor for assigned tasks only. Prompt: task range, plan path, read full plan for context, execute assigned tasks, track deviations, NO SUMMARY/commit. Track via agent protocol.
   - Main route: execute tasks using standard flow (step name="execute")
3. After ALL segments: aggregate files/deviations/decisions 鈫?create SUMMARY.md 鈫?commit 鈫?self-check:
   - Verify key-files.created exist on disk with `[ -f ]`
   - Check `git log --oneline --all --grep="{phase}-{plan}"` returns 鈮? commit
   - Re-run ALL `<acceptance_criteria>` from every task 鈥?if any fail, fix before finalizing SUMMARY
   - Re-run the plan-level `<verification>` commands 鈥?log results in SUMMARY
   - Append `## Self-Check: PASSED` or `## Self-Check: FAILED` to SUMMARY

   **Known Claude Code bug (classifyHandoffIfNeeded):** If any segment agent reports "failed" with `classifyHandoffIfNeeded is not defined`, this is a Claude Code runtime bug 鈥?not a real failure. Run spot-checks; if they pass, treat as successful.




</step>

<step name="load_prompt">
```bash
cat .planning/phases/XX-name/{phase}-{plan}-PLAN.md
```
This IS the execution instructions. Follow exactly. If plan references CONTEXT.md: honor user's vision throughout.

**If plan contains `<interfaces>` block:** These are pre-extracted type definitions and contracts. Use them directly 鈥?do NOT re-read the source files to discover types. The planner already extracted what you need.
</step>

<step name="previous_phase_check">
```bash
gsd-sdk query phases.list --type summaries --raw
# Extract the second-to-last summary from the JSON result
```

**Text mode (`workflow.text_mode: true` in config or `--text` flag):** Set `TEXT_MODE=true` if `--text` is present in `$ARGUMENTS` OR `text_mode` from init JSON is `true`. When TEXT_MODE is active, replace every `AskUserQuestion` call with a plain-text numbered list and ask the user to type their choice number. This is required for non-Claude runtimes (OpenAI Codex, Gemini CLI, etc.) where `AskUserQuestion` is not available.
If previous SUMMARY has unresolved "Issues Encountered" or "Next Phase Readiness" blockers: AskUserQuestion(header="Previous Issues", options: "Proceed anyway" | "Address first" | "Review previous").
</step>

<step name="execute">
Deviations are normal 鈥?handle via rules below.

1. Read @context files from prompt
2. **MCP tools:** If AGENTS.md or legacy CLAUDE.md project instructions reference MCP tools (e.g. jCodeMunch for code navigation), prefer them over Grep/Glob when available. Fall back to Grep/Glob if MCP tools are not accessible.
3. Per task:
   - **MANDATORY read_first gate:** If the task has a `<read_first>` field, you MUST read every listed file BEFORE making any edits. This is not optional. Do not skip files because you "already know" what's in them 鈥?read them. The read_first files establish ground truth for the task.
   - `type="auto"`: if `tdd="true"` 鈫?TDD execution. Implement with deviation rules + auth gates. Verify done criteria. Commit (see task_commit). Track hash for Summary.
   - `type="checkpoint:*"`: STOP 鈫?checkpoint_protocol 鈫?wait for user 鈫?continue only after confirmation.
   - **HARD GATE 鈥?acceptance_criteria verification:** After completing each task, if it has `<acceptance_criteria>`, you MUST run a verification loop before proceeding:
     1. For each criterion: execute the grep, file check, or CLI command that proves it passes
     2. Log each result as PASS or FAIL with the command output
     3. If ANY criterion fails: fix the implementation immediately, then re-run ALL criteria
     4. Repeat until all criteria pass 鈥?you are BLOCKED from starting the next task until this gate clears
     5. If a criterion cannot be satisfied after 2 fix attempts, log it as a deviation with reason 鈥?do NOT silently skip it
     This is not advisory. A task with failing acceptance criteria is an incomplete task.
3. Run `<verification>` checks
4. Confirm `<success_criteria>` met
5. Document deviations in Summary
</step>

<authentication_gates>

## Authentication Gates

Auth errors during execution are NOT failures 鈥?they're expected interaction points.

**Indicators:** "Not authenticated", "Unauthorized", 401/403, "Please run {tool} login", "Set {ENV_VAR}"

**Protocol:**
1. Recognize auth gate (not a bug)
2. STOP task execution
3. Create dynamic checkpoint:human-action with exact auth steps
4. Wait for user to authenticate
5. Verify credentials work
6. Retry original task
7. Continue normally

**Example:** `vercel --yes` 鈫?"Not authenticated" 鈫?checkpoint asking user to `vercel login` 鈫?verify with `vercel whoami` 鈫?retry deploy 鈫?continue

**In Summary:** Document as normal flow under "## Authentication Gates", not as deviations.

</authentication_gates>

<deviation_rules>

## Deviation Rules

Apply deviation rules from the gsd-executor agent definition (single source of truth):
- **Rules 1-3** (bugs, missing critical, blockers): auto-fix, test, verify, track as deviations
- **Rule 4** (architectural changes): STOP, present decision to user, await approval
- **Scope boundary**: do not auto-fix pre-existing issues unrelated to current task
- **Fix attempt limit**: max 3 retries per deviation before escalating
- **Priority**: Rule 4 (STOP) > Rules 1-3 (auto) > unsure 鈫?Rule 4

</deviation_rules>

<deviation_documentation>

## Documenting Deviations

Summary MUST include deviations section. None? 鈫?`## Deviations from Plan\n\nNone - plan executed exactly as written.`

Per deviation: **[Rule N - Category] Title** 鈥?Found during: Task X | Issue | Fix | Files modified | Verification | Commit hash

End with: **Total deviations:** N auto-fixed (breakdown). **Impact:** assessment.

</deviation_documentation>

<tdd_plan_execution>
## TDD Execution

For `type: tdd` plans 鈥?RED-GREEN-REFACTOR:

1. **Infrastructure** (first TDD plan only): detect project, install framework, config, verify empty suite
2. **RED:** Read `<behavior>` 鈫?failing test(s) 鈫?run (MUST fail) 鈫?commit: `test({phase}-{plan}): add failing test for [feature]`
3. **GREEN:** Read `<implementation>` 鈫?minimal code 鈫?run (MUST pass) 鈫?commit: `feat({phase}-{plan}): implement [feature]`
4. **REFACTOR:** Clean up 鈫?tests MUST pass 鈫?commit: `refactor({phase}-{plan}): clean up [feature]`

Errors: RED doesn't fail 鈫?investigate test/existing feature. GREEN doesn't pass 鈫?debug, iterate. REFACTOR breaks 鈫?undo.

See `~/.codex/get-shit-done/references/tdd.md` for structure.
</tdd_plan_execution>

<precommit_failure_handling>
## Pre-commit Hook Failure Handling

Your commits may trigger pre-commit hooks. Auto-fix hooks handle themselves transparently 鈥?files get fixed and re-staged automatically.

**If running as a parallel executor agent (spawned by execute-phase):**
Use `--no-verify` on all commits. Pre-commit hooks cause build lock contention when multiple agents commit simultaneously (e.g., cargo lock fights in Rust projects). The orchestrator validates once after all agents complete.

**If running as the sole executor (sequential mode):**
If a commit is BLOCKED by a hook:

1. The `git commit` command fails with hook error output
2. Read the error 鈥?it tells you exactly which hook and what failed
3. Fix the issue (type error, lint violation, secret leak, etc.)
4. `git add` the fixed files
5. Retry the commit
6. Budget 1-2 retry cycles per commit
</precommit_failure_handling>

<task_commit>
## Task Commit Protocol

Canonical per-task commit rules live in **`agents/gsd-executor.md`** (`<task_commit_protocol>`). Follow that section for staging, `{type}({phase}-{plan})` messages, `commit-to-subrepo` when `sub_repos` is set, post-commit checks, and untracked-file handling 鈥?do not duplicate or paraphrase the full protocol here (single source of truth).

**Orchestrator note:** After each task, the spawned executor reports commit hashes; this workflow does not re-specify commit semantics beyond pointing at the executor.

</task_commit>

<step name="checkpoint_protocol">
On `type="checkpoint:*"`: automate everything possible first. Checkpoints are for verification/decisions only.

Display: `CHECKPOINT: [Type]` box 鈫?Progress {X}/{Y} 鈫?Task name 鈫?type-specific content 鈫?`YOUR ACTION: [signal]`

| Type | Content | Resume signal |
|------|---------|---------------|
| human-verify (90%) | What was built + verification steps (commands/URLs) | "approved" or describe issues |
| decision (9%) | Decision needed + context + options with pros/cons | "Select: option-id" |
| human-action (1%) | What was automated + ONE manual step + verification plan | "done" |

After response: verify if specified. Pass 鈫?continue. Fail 鈫?inform, wait. WAIT for user 鈥?do NOT hallucinate completion.

See ~/.codex/get-shit-done/references/checkpoints.md for details.
</step>

<step name="checkpoint_return_for_orchestrator">
When spawned via Task and hitting checkpoint: return structured state (cannot interact with user directly).

**Required return:** 1) Completed Tasks table (hashes + files) 2) Current Task (what's blocking) 3) Checkpoint Details (user-facing content) 4) Awaiting (what's needed from user)

Orchestrator parses 鈫?presents to user 鈫?spawns fresh continuation with your completed tasks state. You will NOT be resumed. In main context: use checkpoint_protocol above.
</step>

<step name="verification_failure_gate">
If verification fails:

**Check if node repair is enabled** (default: on):
```bash
NODE_REPAIR=$(gsd-sdk query config-get workflow.node_repair 2>/dev/null || echo "true")
```

If `NODE_REPAIR` is `true`: invoke `@./.codex/get-shit-done/workflows/node-repair.md` with:
- FAILED_TASK: task number, name, done-criteria
- ERROR: expected vs actual result
- PLAN_CONTEXT: adjacent task names + phase goal
- REPAIR_BUDGET: `workflow.node_repair_budget` from config (default: 2)

Node repair will attempt RETRY, DECOMPOSE, or PRUNE autonomously. Only reaches this gate again if repair budget is exhausted (ESCALATE).

If `NODE_REPAIR` is `false` OR repair returns ESCALATE: STOP. Present: "Verification failed for Task [X]: [name]. Expected: [criteria]. Actual: [result]. Repair attempted: [summary of what was tried]." Options: Retry | Skip (mark incomplete) | Stop (investigate). If skipped 鈫?SUMMARY "Issues Encountered".
</step>

<step name="record_completion_time">
```bash
PLAN_END_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
PLAN_END_EPOCH=$(date +%s)

DURATION_SEC=$(( PLAN_END_EPOCH - PLAN_START_EPOCH ))
DURATION_MIN=$(( DURATION_SEC / 60 ))

if [[ $DURATION_MIN -ge 60 ]]; then
  HRS=$(( DURATION_MIN / 60 ))
  MIN=$(( DURATION_MIN % 60 ))
  DURATION="${HRS}h ${MIN}m"
else
  DURATION="${DURATION_MIN} min"
fi
```
</step>

<step name="generate_user_setup">
```bash
grep -A 50 "^user_setup:" .planning/phases/XX-name/{phase}-{plan}-PLAN.md | head -50
```

If user_setup exists: create `{phase}-USER-SETUP.md` using template `~/.codex/get-shit-done/templates/user-setup.md`. Per service: env vars table, account setup checklist, dashboard config, local dev notes, verification commands. Status "Incomplete". Set `USER_SETUP_CREATED=true`. If empty/missing: skip.
</step>

<step name="create_summary">
Create `{phase}-{plan}-SUMMARY.md` at `.planning/phases/XX-name/`. Use `~/.codex/get-shit-done/templates/summary.md`.

**Frontmatter:** phase, plan, subsystem, tags | requires/provides/affects | tech-stack.added/patterns | key-files.created/modified | key-decisions | requirements-completed (**MUST** copy `requirements` array from PLAN.md frontmatter verbatim) | duration ($DURATION), completed ($PLAN_END_TIME date).

Title: `# Phase [X] Plan [Y]: [Name] Summary`

One-liner SUBSTANTIVE: "JWT auth with refresh rotation using jose library" not "Authentication implemented"

Include: duration, start/end times, task count, file count.

Next: more plans 鈫?"Ready for {next-plan}" | last 鈫?"Phase complete, ready for next step".
</step>

<step name="update_current_position">
**Skip this step if running in parallel mode** (the orchestrator in execute-phase.md
handles STATE.md/ROADMAP.md updates centrally after merging worktrees to avoid
merge conflicts).

Update STATE.md using gsd-sdk query (or legacy gsd-tools) state mutations:

```bash
# Auto-detect parallel mode: .git is a file in worktrees, a directory in main repo
IS_WORKTREE=$([ -f .git ] && echo "true" || echo "false")

# Skip in parallel mode 鈥?orchestrator handles STATE.md centrally
if [ "$IS_WORKTREE" != "true" ]; then
  # Advance plan counter (handles last-plan edge case)
  gsd-sdk query state.advance-plan

  # Recalculate progress bar from disk state
  gsd-sdk query state.update-progress

  # Record execution metrics
  gsd-sdk query state.record-metric \
    --phase "${PHASE}" --plan "${PLAN}" --duration "${DURATION}" \
    --tasks "${TASK_COUNT}" --files "${FILE_COUNT}"
fi
```
</step>

<step name="extract_decisions_and_issues">
From SUMMARY: Extract decisions and add to STATE.md:

```bash
# Add each decision from SUMMARY key-decisions
# Prefer file inputs for shell-safe text (preserves `$`, `*`, etc. exactly)
gsd-sdk query state.add-decision \
  --phase "${PHASE}" --summary-file "${DECISION_TEXT_FILE}" --rationale-file "${RATIONALE_FILE}"

# Add blockers if any found
gsd-sdk query state.add-blocker --text-file "${BLOCKER_TEXT_FILE}"
```
</step>

<step name="update_session_continuity">
Update session info using gsd-sdk query (or legacy gsd-tools):

```bash
gsd-sdk query state.record-session \
  --stopped-at "Completed ${PHASE}-${PLAN}-PLAN.md" \
  --resume-file "None"
```

Keep STATE.md under 150 lines.
</step>

<step name="issues_review_gate">
If SUMMARY "Issues Encountered" 鈮?"None": yolo 鈫?log and continue. Interactive 鈫?present issues, wait for acknowledgment.
</step>

<step name="update_roadmap">
**Skip this step if running in parallel mode** (the orchestrator handles ROADMAP.md
updates centrally after merging worktrees).

```bash
# Auto-detect parallel mode: .git is a file in worktrees, a directory in main repo
IS_WORKTREE=$([ -f .git ] && echo "true" || echo "false")

# Skip in parallel mode 鈥?orchestrator handles ROADMAP.md centrally
if [ "$IS_WORKTREE" != "true" ]; then
  gsd-sdk query roadmap.update-plan-progress "${PHASE}"
fi
```
Counts PLAN vs SUMMARY files on disk. Updates progress table row with correct count and status (`In Progress` or `Complete` with date).
</step>

<step name="update_requirements">
Mark completed requirements from the PLAN.md frontmatter `requirements:` field:

```bash
gsd-sdk query requirements.mark-complete ${REQ_IDS}
```

Extract requirement IDs from the plan's frontmatter (e.g., `requirements: [AUTH-01, AUTH-02]`). If no requirements field, skip.
</step>

<step name="git_commit_metadata">
Task code already committed per-task. Commit plan metadata:

```bash
# Auto-detect parallel mode: .git is a file in worktrees, a directory in main repo
IS_WORKTREE=$([ -f .git ] && echo "true" || echo "false")

# In parallel mode: exclude STATE.md and ROADMAP.md (orchestrator commits these)
if [ "$IS_WORKTREE" = "true" ]; then
  gsd-sdk query commit "docs({phase}-{plan}): complete [plan-name] plan" .planning/phases/XX-name/{phase}-{plan}-SUMMARY.md .planning/REQUIREMENTS.md
else
  gsd-sdk query commit "docs({phase}-{plan}): complete [plan-name] plan" .planning/phases/XX-name/{phase}-{plan}-SUMMARY.md .planning/STATE.md .planning/ROADMAP.md .planning/REQUIREMENTS.md
fi
```
</step>

<step name="update_codebase_map">
If .planning/codebase/ doesn't exist: skip.

```bash
FIRST_TASK=$(git log --oneline --grep="feat({phase}-{plan}):" --grep="fix({phase}-{plan}):" --grep="test({phase}-{plan}):" --reverse | head -1 | cut -d' ' -f1)
git diff --name-only ${FIRST_TASK}^..HEAD 2>/dev/null || true
```

Update only structural changes: new src/ dir 鈫?STRUCTURE.md | deps 鈫?STACK.md | file pattern 鈫?CONVENTIONS.md | API client 鈫?INTEGRATIONS.md | config 鈫?STACK.md | renamed 鈫?update paths. Skip code-only/bugfix/content changes.

```bash
gsd-sdk query commit "" .planning/codebase/*.md --amend
```
</step>

<step name="offer_next">
If `USER_SETUP_CREATED=true`: display `鈿狅笍 USER SETUP REQUIRED` with path + env/config tasks at TOP.

```bash
(ls -1 .planning/phases/[current-phase-dir]/*-PLAN.md 2>/dev/null || true) | wc -l
(ls -1 .planning/phases/[current-phase-dir]/*-SUMMARY.md 2>/dev/null || true) | wc -l
```

| Condition | Route | Action |
|-----------|-------|--------|
| summaries < plans | **A: More plans** | Find next PLAN without SUMMARY. Yolo: auto-continue. Interactive: show next plan, suggest `/gsd-execute-phase {phase}` + `/gsd-verify-work`. STOP here. |
| summaries = plans, current < highest phase | **B: Phase done** | Show completion, suggest `/gsd-plan-phase {Z+1}` + `/gsd-verify-work {Z}` + `/gsd-discuss-phase {Z+1}` |
| summaries = plans, current = highest phase | **C: Milestone done** | Show banner, suggest `/gsd-complete-milestone` + `/gsd-verify-work` + `/gsd-add-phase` |

All routes: `/clear` first for fresh context.
</step>

</process>

<success_criteria>

- All tasks from PLAN.md completed
- All verifications pass
- USER-SETUP.md generated if user_setup in frontmatter
- SUMMARY.md created with substantive content
- STATE.md updated (position, decisions, issues, session) 鈥?unless parallel mode (orchestrator handles)
- ROADMAP.md updated 鈥?unless parallel mode (orchestrator handles)
- If codebase map exists: map updated with execution changes (or skipped if no significant changes)
- If USER-SETUP.md created: prominently surfaced in completion output
</success_criteria>
