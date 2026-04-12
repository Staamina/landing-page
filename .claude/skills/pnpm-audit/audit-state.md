# pnpm-audit State

## Last scan

2026-04-10 (run 2) — 69 vulnerabilities found (down from 86 at start)
(0 critical, 33 high, 32 moderate, 4 low)

## Fixed vulnerabilities

| Date       | IDs                                                             | Package         | Old version          | New version | Strategy               | Workspace                             |
| ---------- | --------------------------------------------------------------- | --------------- | -------------------- | ----------- | ---------------------- | ------------------------------------- |
| 2026-04-10 | 1115538,1115539,1115544,1115588,1115589,1115692,1115693,1115694 | handlebars      | 4.7.8                | 4.7.9       | C — pnpm override      | apps/backend (dev, via ts-jest)       |
| 2026-04-10 | 1113568,1113569,1114153,1115339,1116307                         | fast-xml-parser | >=5.3.4 (override)   | >=5.3.5     | C — pnpm override bump | apps/backend (via @aws-sdk/client-s3) |
| 2026-04-10 | 1116365,1113275                                                 | axios           | 1.13.3               | 1.15.0      | C — pnpm override      | apps/backend (via node-mailjet)       |
| 2026-04-10 | 1115806,1115810                                                 | lodash          | >=4.17.23 (override) | >=4.18.0    | C — pnpm override bump | apps/backend (multiple transitives)   |

## Deferred vulnerabilities

| Date       | ID      | Package   | Severity | Reason                                                                    |
| ---------- | ------- | --------- | -------- | ------------------------------------------------------------------------- |
| 2026-04-10 | 1113531 | storybook | high     | Requires major upgrade 8.x — UI regression risk HIGH, defer manual review |

## Failed attempts

_none_

## Prioritized remaining (from last scan run 2 — top 10)

| Score | Sev  | Package                 | Title                                          | Fix type          | Next action                                         |
| ----- | ---- | ----------------------- | ---------------------------------------------- | ----------------- | --------------------------------------------------- |
| 85    | HIGH | serialize-javascript    | RCE via RegExp (ID 1113686)                    | patch 7.0.2→7.0.3 | override — via @nestjs/cli>webpack                  |
| 85    | HIGH | flatted                 | Prototype Pollution (ID 1115357)               | patch →3.4.2      | override — via eslint (dev)                         |
| 80    | HIGH | path-to-regexp          | ReDoS (ID 1115527)                             | patch →0.1.13     | override — via express                              |
| 75    | HIGH | undici                  | WebSocket DoS x3 (IDs 1114591,1114637,1114639) | minor →7.24.7     | override — via testcontainers (dev)                 |
| 65    | HIGH | defu                    | Prototype Pollution (ID 1116102)               | patch →6.1.7      | override — via prisma (transitive)                  |
| 65    | HIGH | multer                  | DoS x3 (IDs 1113635,1113636,1113996)           | minor →2.1.1      | check if multer is direct dep                       |
| 60    | HIGH | rollup                  | Path Traversal (ID 1113515)                    | minor →4.60.1     | override — via vite (dev, field-maintenance-system) |
| 55    | HIGH | @isaacs/brace-expansion | Uncontrolled Resource (ID 1112954)             | minor →5.0.1      | override — via eslint (dev)                         |
| 50    | HIGH | undici                  | HTTP smuggling (IDs 1114591+)                  | minor             | already covered by undici override                  |
| 45    | HIGH | picomatch               | ReDoS extglob (IDs 1115552,1115554)            | patch             | override — via tinyglobby (dev)                     |

## Known pre-existing test failures (unrelated to audit fixes)

These 19 tests fail without any audit changes (confirmed via git stash):

- `core/auth/services/resource-authorization.integration.spec.ts` — requires live DB
- `modules/workflows/execution/step-action-executor.service.spec.ts` — mocked DB issue
- `modules/workflows/execution/execution.service.spec.ts` — mocked DB issue

## Session log

### Session 2026-04-10T07:20:00

- **Target 1:** handlebars 4.7.8 → 4.7.9 (CRITICAL JS Injection, score 125)
- **Target 2 (bonus):** fast-xml-parser override >=5.3.4 → >=5.3.5 (CRITICAL entity bypass)
- **Fix strategy:** Strategy C — pnpm.overrides in root package.json
- **Quality checks:** PASS (pnpm check 6/6, lint PASS, unit tests: 19 pre-existing failures confirmed pre-change via git stash)
- **Outcome:** FIXED
- **Advisories resolved:** 1115538, 1115539, 1115544, 1115588, 1115589, 1115692, 1115693, 1115694 (handlebars) + 1113568 (fast-xml-parser bump)
- **Next run will target:** axios CRITICAL (ID 1116365) — SSRF bypass, score 110, override via node-mailjet

---

### Session 2026-04-10T07:40:00

- **Target 1:** axios 1.13.3 → 1.15.0 (CRITICAL — SSRF bypass ID 1116365, score 110)
- **Target 2 (bonus):** lodash override >=4.17.23 → >=4.18.0 (HIGH — Code Injection ID 1115806, existing override was insufficient)
- **Fix strategy:** Strategy C — pnpm.overrides: added `"axios": ">=1.15.0"`, bumped `"lodash": ">=4.18.0"`
- **Quality checks:** PASS (pnpm check 6/6, lint PASS)
- **Outcome:** FIXED — 0 CRITICAL remaining (was 1)
- **Progress:** 86 → 69 total vulnerabilities (-17 over 2 runs)
- **Advisories resolved:** 1116365, 1113275 (axios) + 1115806, 1115810 (lodash)
- **Next run will target:** serialize-javascript HIGH (ID 1113686) — RCE, score 85, override via @nestjs/cli>webpack

---
