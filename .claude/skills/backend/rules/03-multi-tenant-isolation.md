---
section: 'backend/multi-tenant-isolation'
parent: 'project-context'
rule_count: 8
last_updated: '2026-01-16'
---

# 🏢 Multi-Tenant Isolation (Backend)

## ⚠️ Critical Constraints (FATAL)

- **Source:** `companyId` MUST come from authenticated `user` context.
- **Forbidden:** NEVER accept `companyId` from client (Query Params or Body).
- **Logic:**
  1. **Guard:** Throw `ForbiddenException` if `!user.companyId`.
  2. **Query:** ALWAYS force filter: `where: { companyId: user.companyId, ...filters }`.
- **Scope:** Applies to ALL business entity list endpoints.
