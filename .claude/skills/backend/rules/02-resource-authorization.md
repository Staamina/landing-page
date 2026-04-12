---
section: 'backend/resource-authorization'
parent: 'project-context'
rule_count: 10
last_updated: '2026-01-16'
---

# 🔐 Resource Authorization (Backend)

## 🛡️ Access Policy (FATAL)

- **Decorator:** Endpoints accessing specific resources (`/:id`) MUST use `@RequireResourceAccess()`.
- **Guard:** `ResourceAccessGuard` is MANDATORY for resource verification.
- **Logic:** Centralized in `ResourceAuthorizationService`.
- **Constraint:** Role guards (`@Roles`) are NOT enough. Resource ownership must be verified.

## 👥 Role Scopes

- **SuperAdmin:** Full access (Bypass checks).
- **Admin:** Scope = Assigned Company + its Sites.
- **SiteManager:** Scope = Assigned Site + parent Company.
- **Others:** Direct assignment only.
