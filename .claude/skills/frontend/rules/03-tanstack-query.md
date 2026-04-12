---
section: 'frontend/tanstack-query'
parent: 'project-context'
rule_count: 8
last_updated: '2026-01-16'
---

# 📡 TanStack Query (Server State)

## ⚠️ Critical Constraints

- **Usage:** ALL server state via `useQuery` / `useMutation`.
- **Forbidden:** NO `useEffect` fetching. NO custom fetch logic. NO direct cache mutation.
- **Version:** `v5.17.0` MUST match across all workspaces (Peer Dependency issue).

## 🔑 Query Keys

- **Convention:** `['entity', id?, 'relation?']`
- **Examples:** `['incidents', siteId, 'list']`, `['incident', id]`
