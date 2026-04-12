---
section: 'backend/prisma-patterns'
parent: 'project-context'
rule_count: 5
last_updated: '2026-01-16'
---

# 🗄️ Prisma Patterns

## ⚠️ Critical Constraints

- **Architecture:** Singleton Service via DI. Never use in Controllers.
- **Queries:** `companyId` MUST be in `where` clause for business entities.
- **Immutability:** Results are frozen. **NEVER mutate**. Use `structuredClone` or spread `...` to copy before modifying.
