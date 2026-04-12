---
name: auto-advance-epic
description: >
  Epic-scoped autonomous project advancement agent. Like auto-advance but restricted to a
  specific epic. Pass the epic number as argument (e.g. /auto-advance-epic 5).
  Checks sprint-status.yaml for stories in "review" status within the target epic, runs code
  review and auto-applies all fixes. If no review stories exist in that epic, implements the
  next "ready-for-dev" story from the same epic. Updates sprint-status throughout.
  Use with /loop to run automatically at intervals (e.g. /loop 2h /auto-advance-epic 5).
---

Follow the instructions in ./workflow.md.

**Epic argument:** The user MUST provide an epic number as argument (e.g. `/auto-advance-epic 5`).
If no argument is provided, HALT immediately and ask the user to specify an epic number.
