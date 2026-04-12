---
name: pnpm-audit
description: >
  Autonomous dependency audit agent for Staamina. Runs `pnpm audit`, prioritizes vulnerabilities
  by severity and regression risk, picks the highest-priority unfixed item, applies the fix,
  then verifies nothing is broken (lint, types, tests, build). Persists progress in a dedicated
  state file so each `/loop` run knows exactly where to resume.
  Use with /loop to run automatically at intervals (e.g. /loop 30m /pnpm-audit).
  Also trigger when user says "audit dependencies", "fix vulnerabilities", or "pnpm audit".
---

Follow the instructions in ./workflow.md.
