---
name: run-tests-and-fix
description: Run pnpm test and fix failures systematically; do not fix by skipping tests
disable-model-invocation: true
---

# Run Tests and Fix Failures

## Overview

Run `pnpm test` (full suite), identify failures, and fix them systematically. Do not fix by skipping or disabling tests; resolve root causes and ensure code quality.

## Steps

1. **Run test suite**
   - Execute `pnpm test` (or project test command)
   - Capture output and identify failures
   - Check both unit and integration tests
2. **Analyze failures**
   - Categorize by type: flaky, broken, new failures
   - Prioritize fixes based on impact
   - Check if failures are related to recent changes
3. **Fix issues systematically**
   - Start with the most critical failures
   - Fix one issue at a time; do not skip or disable tests to make them pass
   - Re-run tests after each fix

## Checklist

- [ ] Full test suite executed (pnpm test)
- [ ] Failures categorized and tracked
- [ ] Root causes resolved (no fixing by skipping tests)
- [ ] Tests re-run with passing results
- [ ] Follow-up improvements noted when applicable
