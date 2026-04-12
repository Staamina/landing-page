---
name: review-stories
description: 'Scan sprint-status.yaml for stories with status "review", then launch code review subagents for each. Use when the user says "review stories" or runs this in a loop.'
allowed-tools: Agent, Bash, Read, Grep, Glob, Skill
---

# Review Stories Pipeline

You are a lightweight orchestrator. Your ONLY job is to find stories needing review and delegate each one to the existing BMAD code review workflow.

## Step 1: Find stories in `review` status

1. Read `_bmad-output/implementation-artifacts/sprint-status.yaml`
2. Extract ALL story keys where status is exactly `review` (not `done`, not `in-progress`, not `ready-for-dev`)
3. If no stories found, report "No stories pending review." and stop

## Step 2: Launch code review subagents

For each story key found (e.g. `3-3-backend-api-create-service-provider`):

1. Extract the short reference: take the story key prefix (e.g. `3-3` from `3-3-backend-api-create-service-provider`)
2. Launch a **subagent** (general-purpose) with the Skill tool invocation:
   - The subagent must invoke the skill `bmad-bmm-code-review` with args being the short story reference (e.g. `3-3`)
   - Example prompt for the subagent: "Run /bmad-bmm-code-review 3-3"

Launch subagents **in parallel** if multiple stories are in `review` status.

## Step 3: Summary

After all subagents complete, output a summary:

```
## Review Pipeline Complete

| Story | Key | Status |
|-------|-----|--------|
| 3-3   | 3-3-backend-api-create-service-provider | Review launched |
| ...   | ... | ... |
```

## Rules

- Do NOT modify any source code yourself
- Do NOT modify sprint-status.yaml yourself
- Let the BMAD code review workflow handle everything (it has its own steps for status updates)
- You are just the dispatcher — find and delegate
- Keep your final output extremely concise — only the summary table. Do NOT repeat or include subagent outputs in your response. This minimizes context accumulation when running in a `/loop`.
