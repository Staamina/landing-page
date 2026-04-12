# pnpm-audit Autonomous Workflow

**Goal:** Fix ONE dependency vulnerability per run, in priority order, without breaking the project.
Designed for `/loop` usage — each run is fully autonomous and resumes from persisted state.

**Your Role:** Autonomous security fixer. You read state, identify the next fix, apply it safely,
verify correctness, and update state. One vulnerability per run. No human interaction needed.

---

## CONSTANTS

```
STATE_FILE      = {project-root}/.claude/skills/pnpm-audit/audit-state.md
PROJECT_ROOT    = {project-root}
```

---

## PRIORITY MATRIX

Use this matrix to score every unfixed vulnerability. Higher score = fix first.

### Severity score

| Severity | Score |
| -------- | ----- |
| critical | 100   |
| high     | 60    |
| moderate | 30    |
| low      | 10    |
| info     | 2     |

### Regression risk multiplier (applied as penalty — subtract from total)

The regression risk represents how likely fixing this package is to break something.

| Package category                                                 | Risk level | Penalty |
| ---------------------------------------------------------------- | ---------- | ------- |
| `react`, `react-dom` — core runtime                              | VERY HIGH  | -80     |
| `@nestjs/*`, `prisma`, `@prisma/client` — core backend framework | VERY HIGH  | -70     |
| `next` — Next.js framework                                       | HIGH       | -50     |
| `@zitadel/*`, `oidc-client-ts` — auth packages                   | HIGH       | -50     |
| `@tanstack/react-query` — critical state mgmt                    | HIGH       | -40     |
| `three`, `@react-three/*` — 3D engine                            | MEDIUM     | -20     |
| `@radix-ui/*`, `tailwindcss` — UI libraries                      | MEDIUM     | -15     |
| `vite`, `turbo`, `typescript` — build tools                      | MEDIUM     | -20     |
| `jest`, `@testing-library/*`, `vitest` — test tools              | LOW        | -5      |
| `eslint`, `prettier`, `husky` — dev tooling                      | LOW        | -5      |
| All other packages                                               | NONE       | 0       |

### Fix type bonus

| Fix available         | Bonus       |
| --------------------- | ----------- |
| Patch upgrade (x.y.Z) | +30         |
| Minor upgrade (x.Y.z) | +10         |
| Major upgrade (X.y.z) | -20         |
| No fix available      | -999 (skip) |

### Final priority score

`score = severity_score - regression_penalty + fix_type_bonus`

Fix the vulnerability with the **highest positive score** that has not been attempted in this
session. Skip items with score ≤ 0 or no fix available.

---

## STEP 1 — LOAD STATE

Read `{STATE_FILE}`. If it does not exist, initialize it:

```markdown
# pnpm-audit State

## Last scan

_not yet run_

## Fixed vulnerabilities

_none_

## Deferred vulnerabilities

_none_

## Failed attempts

_none_

## Session log

_none_
```

Extract from state:

- `{last_scan_date}` — date of last `pnpm audit` run
- `{fixed_ids}` — list of advisory IDs already fixed
- `{deferred_ids}` — list of advisory IDs deliberately deferred
- `{failed_ids}` — list of advisory IDs where fix was attempted but failed or broke checks

---

## STEP 2 — RUN AUDIT

Run: `pnpm audit --json 2>/dev/null || true`

Parse the JSON output. Extract all vulnerabilities as a list with:

- `id` — advisory ID
- `package` — package name
- `severity` — critical/high/moderate/low/info
- `title` — short description
- `fix_available` — boolean + whether it's patch/minor/major
- `range` — affected version range
- `workspace` — which workspace(s) are affected

**Also run:** `pnpm audit 2>/dev/null || true` (human-readable) for context on direct vs transitive deps.

If audit output is empty or has 0 vulnerabilities, write to state and STOP:

```
STOP: No vulnerabilities found. All clear.
```

Update `{last_scan_date}` in state file.

---

## STEP 3 — SCORE AND SELECT

1. Filter out vulnerabilities already in `{fixed_ids}`, `{deferred_ids}`, or `{failed_ids}`.
2. Score each remaining vulnerability using the Priority Matrix above.
3. Sort descending by score.
4. Print the full prioritized list as a table:

```
| Score | Severity | Package | Title | Fix type | Regression Risk |
|-------|----------|---------|-------|----------|-----------------|
| 125   | critical | lodash  | ...   | patch    | NONE            |
| 40    | high     | axios   | ...   | minor    | NONE            |
| -10   | high     | react   | ...   | major    | VERY HIGH       |
```

5. Select `{target}` = first item with score > 0.

If no item with score > 0 exists:

- Write to state: all remaining items deferred (score ≤ 0 means risk too high or no safe fix)
- STOP: "All remaining vulnerabilities are either not safely fixable or have too high regression
  risk. Manual review required."

---

## STEP 4 — RESEARCH THE FIX

Before touching any file, research the fix:

1. Read the `pnpm-workspace.yaml` catalog to find which catalog (if any) controls `{target.package}`.
2. Check `package.json` in the affected workspace(s).
3. Determine the upgrade strategy:
   - **Direct dependency with catalog:** update the version in `pnpm-workspace.yaml` catalog entry
   - **Direct dependency without catalog:** update in the workspace `package.json`
   - **Transitive dependency:** use `pnpm audit --fix` or add an override in root `package.json`
     under `pnpm.overrides` (for pnpm) — document why the override is needed

4. Check the package's changelog (search for the version diff) to identify any breaking changes
   in the target upgrade version. If breaking changes exist AND regression risk is HIGH/VERY HIGH,
   add to `{deferred_ids}` with a note and go back to Step 3 to pick the next item.

---

## STEP 5 — APPLY THE FIX

Apply the fix using the appropriate strategy from Step 4.

### Strategy A — Catalog update (preferred for catalog-managed deps)

Edit `pnpm-workspace.yaml` to bump the version in the relevant catalog.
Then run: `pnpm install`

### Strategy B — Direct dependency update

Edit the affected `package.json`.
Then run: `pnpm install`

### Strategy C — pnpm override (transitive deps)

Add to root `package.json`:

```json
"pnpm": {
  "overrides": {
    "vulnerable-package": "^safe-version"
  }
}
```

Then run: `pnpm install`
Document this override with a comment in the file (use a companion key or inline comment).

---

## STEP 6 — VERIFY: QUALITY CHECKS

Run all checks in sequence. Stop at first failure and report.

### 6.1 Type check

```bash
pnpm check
```

Expected: exits 0. If fails → regression detected.

### 6.2 Lint

```bash
pnpm lint
```

Expected: exits 0. If fails → lint errors (may be auto-fixable).

If lint fails, try auto-fix: `pnpm lint:fix && pnpm format`
Then re-run `pnpm lint`. If still fails → regression.

### 6.3 Tests (if project has tests)

```bash
pnpm test --passWithNoTests 2>/dev/null || pnpm --filter backend test:unit 2>/dev/null || true
```

Note: skip if test infrastructure is not running (DB needed for integration tests).
Only run unit tests that do not require external services.

### 6.4 Build check (optional — only if previous checks pass)

```bash
pnpm --filter backend build 2>/dev/null || true
```

Run backend build as a quick sanity check. Frontend builds are slow — skip unless there's
a specific concern flagged in the changelog research.

---

## STEP 7 — HANDLE RESULT

### If ALL checks PASS:

1. Mark `{target.id}` as fixed in state file.
2. Record the fix details (package, old version, new version, strategy used).
3. Proceed to Step 8 (write state + report).

### If ANY check FAILS:

1. REVERT the change:
   - Restore the file(s) modified in Step 5 to their original state.
   - Run `pnpm install` to restore lockfile.
2. Mark `{target.id}` as FAILED in state file with reason.
3. Add a note: what broke and why.
4. Proceed to Step 8 (write state + report) — do NOT attempt another fix in this run.

---

## STEP 8 — UPDATE STATE FILE

Rewrite `{STATE_FILE}` with updated content:

```markdown
# pnpm-audit State

## Last scan

{current_date} — {total_vulnerabilities_count} vulnerabilities found
({critical} critical, {high} high, {moderate} moderate, {low} low)

## Fixed vulnerabilities

| Date | ID  | Package | Old version | New version | Strategy | Workspace |
| ---- | --- | ------- | ----------- | ----------- | -------- | --------- |

{...existing rows...}
{new row if fixed this run}

## Deferred vulnerabilities

| Date | ID  | Package | Severity | Reason |
| ---- | --- | ------- | -------- | ------ |

{...existing rows...}
{new row if deferred this run}

## Failed attempts

| Date | ID  | Package | Fix tried | What broke |
| ---- | --- | ------- | --------- | ---------- |

{...existing rows...}
{new row if failed this run}

## Prioritized remaining (from last scan)

{score table from Step 3, minus fixed/deferred/failed items}

## Session log

{...existing entries...}

### Session {current_datetime}

- **Target:** {target.package}@{old_version} → {new_version}
- **Severity:** {target.severity}
- **Advisory:** {target.title}
- **Priority score:** {score}
- **Fix strategy:** {strategy A/B/C}
- **Quality checks:** {PASS/FAIL} — {details}
- **Outcome:** {FIXED / REVERTED / DEFERRED}
- **Next run will target:** {next_highest_score_item or "manual review needed"}

---
```

---

## STEP 9 — FINAL REPORT

Output a concise summary to stdout:

```
## pnpm-audit Run — {current_datetime}

**Vulnerabilities found:** {total} ({critical} critical, {high} high, {moderate} moderate, {low} low)
**Fixed this run:** {package} {old_version} → {new_version} ({severity})
**Quality checks:** PASS / FAIL
**Remaining unfixed (prioritized):**
1. [score: X] {package} — {severity} — {title}
2. [score: X] {package} — {severity} — {title}
...

**State persisted to:** .claude/skills/pnpm-audit/audit-state.md
**Next /loop run will fix:** {next_target or "nothing — manual review needed"}

⚠️ Nothing committed. Run `git diff` to review changes before committing.
```

---

## CRITICAL REMINDERS

- **ONE vulnerability per run** — never attempt more than one fix regardless of how many are pending
- **NEVER use `--no-verify`** — git hooks must always run if committing
- **NEVER commit or push** — leave all changes uncommitted for human review
- **ALWAYS revert on failure** — a broken build is worse than a known vulnerability
- **Catalog-managed deps:** always update via `pnpm-workspace.yaml`, never hardcode versions in package.json
- **pnpm.overrides:** use sparingly and document why; they can cause subtle version conflicts
- **Test scope:** only run unit tests here — integration tests need DB and are out of scope
- **State file is source of truth** — if state is missing, treat as fresh start (re-scan everything)
