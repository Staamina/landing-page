---
name: auto-advance
description: >
  Autonomous project advancement agent for Staamina. Checks sprint-status.yaml for stories
  in "review" status, runs code review and auto-applies all fixes. If no review stories exist,
  implements the next "ready-for-dev" story. Updates sprint-status throughout.
  Use with /loop to run automatically at intervals (e.g. /loop 2h /auto-advance).
---

Follow the instructions in ./workflow.md.
