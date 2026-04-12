---
main_config: '{project-root}/_bmad/bmm/config.yaml'
---

# Auto-Advance Autonomous Workflow

**Goal:** Advance the project autonomously by orchestrating BMad BMM skills in the correct
order — review one pending story and fix all findings, or implement the next ready story.
Zero human interaction required.

**Your Role:** Autonomous orchestrator. You direct BMad BMM skills with pre-made decisions so
they run without stopping for user input. You never reimplement their logic — you invoke them
with the right context and answer their HALT points automatically per the rules below.

**Scope per run:** Process exactly ONE story per run (either one review or one implementation).
This prevents context window exhaustion and keeps each run's diff small and reviewable.

---

## CONFIGURATION LOADING

Load config from `{project-root}/_bmad/bmm/config.yaml` and resolve:

- `implementation_artifacts` → path prefix for story files and sprint status
- `communication_language` → use for all output (French for this project)
- `sprint_status` = `{implementation_artifacts}/sprint-status.yaml`
- `project_context` = `**/project-context.md` (load if exists)
- `session_log` = `{implementation_artifacts}/auto-advance-log.md`
- Load CLAUDE.md and memory files if they exist

---

## AUTONOMOUS DECISION RULES

These rules replace every HALT/user-input point in the BMad BMM skills you invoke.
Never deviate from them:

| HALT point in an invoked skill             | Autonomous answer                                                                                                                   |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| "What do you want to review?"              | Targeted file diff (see Step 2A.2)                                                                                                  |
| "Is there a spec/story file?"              | Yes — provide `{story_file_path}`                                                                                                   |
| "Confirm diff stats before proceeding?"    | Yes, proceed                                                                                                                        |
| `decision-needed` finding                  | Apply the safest fix (stricter typing, better error handling). If still ambiguous after one attempt → defer it, note in session log |
| `patch` finding                            | **Option 0: batch-apply all**                                                                                                       |
| `defer` finding                            | Accept deferral, append to deferred-work.md                                                                                         |
| "Start next story / re-run review / done?" | Done (one story per run)                                                                                                            |
| "Choose option [1][2][3][4]?" in dev-story | Option 1 if asked to choose story creation mode                                                                                     |
| "Do you need explanations?"                | No                                                                                                                                  |
| New dependency required                    | Skip that task, log in Dev Agent Record, continue                                                                                   |
| 3 consecutive implementation failures      | HALT — write session log entry and stop                                                                                             |
| Diff exceeds ~3000 lines warning           | Proceed as-is (do not chunk)                                                                                                        |

---

## STEP 1 — LOAD SPRINT STATUS AND DETERMINE MODE

1. Read the FULL `{sprint_status}` file from start to end.
2. Parse `development_status` completely.
3. Find the FIRST story (non-epic, non-retrospective key) with status `review` → `{target_story}`.
4. If none: find the FIRST story with status `ready-for-dev` → `{target_story}`.

**Decision:**

```
if a "review" story exists    →  MODE = "review",    {target_story} = first review story
else if "ready-for-dev" exists →  MODE = "implement", {target_story} = first ready-for-dev story
else                          →  HALT: session log "Nothing to do" + stop
```

Announce the chosen mode and `{target_story}` before continuing.

---

## STEP 2A — MODE: REVIEW

### 2A.1 — Locate the story file

Search `{implementation_artifacts}` for `**/{target_story}*.md`.

If not found:

- Log "Story file not found for {target_story}" in session log.
- HALT — cannot review without story file.

Read the COMPLETE story file.

### 2A.2 — Run `bmad-code-review`

Invoke the **`bmad-code-review`** skill with this pre-loaded context:

```
Review story {target_story}.
The story spec file is: {story_file_path}
```

The skill handles diff source detection automatically from the story context — do not
override or pre-compute the diff yourself. It uses `{project-root}/_bmad/bmm/config.yaml`
automatically (same BMM config as the rest of the project).

Answer all HALT points per the Autonomous Decision Rules above.

The skill will:

- Write findings to the story file (`### Senior Developer Review (AI)` section)
- Update `{sprint_status}` to `done` (all resolved) or `in-progress` (items remain)

### 2A.4 — Run `check-and-fix`

After `bmad-bmm-code-review` completes, invoke the **`check-and-fix`** skill to ensure
lint and type-check pass. This skill auto-runs `pnpm lint:fix`, `pnpm format`, and
`pnpm check` in sequence.

Log the result (PASS/FAIL) in the session log.

### 2A.5 — Verify and patch sprint-status

Read `{sprint_status}` again. Confirm `development_status[{target_story}]` was updated
by the skill. If not updated (skill skipped it):

- Determine outcome: if no unresolved HIGH/MEDIUM findings → `done`, else → `in-progress`
- Manually update `development_status[{target_story}]` and `last_updated`. Save file
  preserving all comments and structure.

---

## STEP 2B — MODE: IMPLEMENT

### 2B.1 — Ensure the story file exists

Search `{implementation_artifacts}` for `**/{target_story}*.md`.

**If not found:** invoke **`bmad-create-story`** with action `create` to generate the
story file from the epics. Answer all HALT points per Autonomous Decision Rules.
After creation, re-read the story file path.

**If found:** read the COMPLETE story file to confirm it has Tasks/Subtasks and Dev Notes.

### 2B.2 — Run `bmad-dev-story`

Invoke the **`bmad-dev-story`** skill with:

```
Implement story {target_story}.
Story file: {story_file_path}
```

Answer all HALT points per Autonomous Decision Rules:

- Story discovery → provide `{story_file_path}` directly (skip auto-discovery)
- New dependency needed → skip task, log in Dev Agent Record, continue
- 3 consecutive failures → HALT, write session log
- "Do you need explanations?" → No
- Suggested next steps at end → acknowledge, this run is done

The skill handles the full TDD cycle and sets story status to `review` in `{sprint_status}`
when complete.

### 2B.3 — Run `check-and-fix`

Invoke the **`check-and-fix`** skill after implementation completes.
Log the result in the session log.

### 2B.4 — Verify sprint-status

Read `{sprint_status}` again. Confirm `development_status[{target_story}]` = `review`.
If not: manually update and save.

---

## STEP 3 — WRITE SESSION LOG

Append an entry to `{session_log}` (`{implementation_artifacts}/auto-advance-log.md`).
Create the file if it does not exist.

```markdown
## Session {current_datetime}

**Mode:** {MODE}
**Story:** {target_story} — {old_status} → {new_status}

**Skills invoked:**

- {skill_name}: {outcome}
- check-and-fix: PASS / FAIL

**Autonomous decisions:**

- {count} patch findings batch-applied
- {count} decision-needed findings resolved / deferred
- {count} findings deferred to deferred-work.md

**Quality check (check-and-fix):** PASS / FAIL
{details if FAIL}

**Changes:** NOTHING committed or pushed. Run `git diff main...HEAD` to review.

**Next run will:** {what the next /auto-advance run will do}

---
```

Then output the same content to stdout as a summary.

---

## CRITICAL REMINDERS

- **ONE story per run** — never process more than one story regardless of how many are pending
- **NEVER use `--no-verify`** — git hooks must always run
- **NEVER commit or push** — leave all changes uncommitted for human review
- **Skills to invoke** — `bmad-code-review`, `bmad-dev-story`, `bmad-create-story` (dans `.claude/skills/`, déjà configurés avec la config BMM)
- **Multi-tenant**: every `findAll` must filter by `companyId` — flag missing filter as HIGH in review
- **i18n**: no hardcoded UI strings — flag as MEDIUM in review
- **Import paths**: Prisma types from `@/prisma-client`, PrismaService from `@/core/common/services/prisma.service`
- **No `any` types** — flag as MEDIUM severity in review
- **All code comments in English**
