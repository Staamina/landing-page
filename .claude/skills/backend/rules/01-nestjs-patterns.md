---
section: 'backend/nestjs-patterns'
parent: 'project-context'
rule_count: 12
last_updated: '2026-01-16'
---

# 🏗️ Backend Patterns (NestJS)

## 🏛️ Architecture & Modules

- **Structure:** Feature-based modules (auth, users, companies).
- **DI:** Dependency Injection ONLY. Never instantiate services manually (`new Service()`).
- **Layers:**
  - **Controllers:** HTTP layer only (Params, DTOs). **NO Business Logic.**
  - **Services:** Business logic layer.
  - **Decorators:** Use custom decorators (`@CurrentUser`, `@Roles`).

## 🛡️ Validation & Security

- **DTOs:** MUST use `class-validator` decorators.
- **Guards:** Use Guards for Auth/Roles (not middleware).
- **Prisma:** Singleton service via DI.
- **Resource Access (FATAL):**
  - Always verify access via `ResourceAccessGuard` / `@RequireResourceAccess`.
  - **Isolation:** List endpoints MUST filter by `companyId`.
