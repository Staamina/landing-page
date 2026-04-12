---
name: staamina-backend
description: Staamina backend development patterns for NestJS, Prisma, multi-tenant isolation, resource authorization, and testing. Use when writing, reviewing, or refactoring backend code in apps/backend/.
---

# Staamina Backend

Backend development rules and patterns specific to the Staamina NestJS API.

## When to Use This Skill

- Writing or modifying NestJS controllers, services, or modules in `apps/backend/`
- Creating or updating Prisma queries and database interactions
- Implementing resource-based authorization (`@RequireResourceAccess()`)
- Ensuring multi-tenant isolation (companyId filtering)
- Writing backend unit or integration tests

## Key Rules

### Module Structure

Standard module follows: `dto/`, `{entity}.controller.ts`, `{entity}.service.ts`, `{entity}.module.ts`

```
apps/backend/src/
├── core/               # Cross-cutting: auth, common filters/interceptors, location
└── modules/            # Business domains: catalog, equipment, organizations, sites, users
```

### Multi-Tenant Isolation (CRITICAL)

- ALL `findAll` queries MUST filter by `user.companyId`
- NEVER trust `companyId` from request params — extract from authenticated user
- SuperAdmin can access all tenants

### Resource Authorization

- All `/:id` endpoints MUST use `@RequireResourceAccess()` + `ResourceAccessGuard`
- Role hierarchy: SuperAdmin > Administrator > SiteManager > Technician

### Prisma Patterns

- Never mutate Prisma results — use `structuredClone` if needed
- Functions with 2+ args MUST use object payload
- Use transactions for multi-step operations

### Testing

- Mock Prisma with `DeepMockProxy`
- IDs MUST be `uuidv4()` (never hardcoded strings like "123")
- Integration tests use testcontainers

## Reference Files

- `apps/backend/prisma/schema.prisma` — Database schema
- `apps/backend/src/core/` — Auth guards, interceptors, filters
- `_bmad-output/planning-artifacts/architecture.md` — Architecture decisions
