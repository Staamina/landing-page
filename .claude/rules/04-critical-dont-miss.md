---
section: 'shared/critical-dont-miss'
parent: 'project-context'
rule_count: 125
last_updated: '2026-01-18'
---

# Critical Technical Constraints (System Prompts)

## Monorepo & Build

- **Manager:** `pnpm` ONLY. No `npm`/`yarn`.
- **Deps:** Root deps must use `--save-dev`. Keep `workspace:*` versions within monorepo.
- **Sync:** React & TypeScript versions MUST match across all workspaces. Peer deps (TanStack Query) must match.
- **CI/CD:** No console.log. No secrets (.env). Build locally before merge.

## Security & Auth (FATAL)

- **Validation:** Trust NO client input. Validate ALL DTOs (class-validator) + Forms (Zod).
- **Access:**
  - **Routes:** Backend `JwtAuthGuard`, Frontend `ProtectedRoute`.
  - **Resources:** endpoints `/:id` MUST use `@RequireResourceAccess()` + `ResourceAccessGuard`.
  - **Multi-Tenant:** `findAll` MUST filter by `companyId`. Regular users: from `user.dbUser.companyId`. **SuperAdmin:** MUST use `resolveCompanyId(user, queryCompanyId)` pattern — accept `?companyId=` query param (see `05-architecture-decisions.md`).
- **Secrets:** Never commit .env.

## Frontend (React/Next)

- **State:**
  - Server state -> **TanStack Query** (No `useEffect`, No custom fetch).
  - Client state -> **Zustand** (complex) or **Context** (simple). No Redux.
  - Form state -> **React Hook Form** ONLY (No `useState`).
- **Forms:** Always `useForm` + `zodResolver` + Co-located Schema (`MyComp.schema.ts`).
- **Perf:** `useMemo` for provider configs/objects. Lazy load routes/Three.js. No inline functions in Context.
- **I18n:** No hardcoded strings. Use translation keys (`t('key')`). Technical logs in English only.

## Backend (NestJS/Prisma)

- **DB:** Never mutate Prisma results. Use `structuredClone` if needed.
- **Signatures:** Functions with 2+ args MUST use object payload.
- **Types:** No `any`. No `@ts-ignore`. Strict mode ON.

## Testing

- **Tooling:** `@testing-library/user-event` (No `fireEvent`).
- **Mocks:** IDs MUST be `uuidv4()` in production code and in integration tests that interact with real DB constraints. **Exception:** Unit test fixture objects (e.g. `mockUser`, `mockSite`) may use readable string IDs like `'user-1'` or `'company-id-123'` when the test does not validate UUID format — readability over formalism in pure unit test fixtures. Mock external deps (Prisma/API).
- **Scope:** Test user behavior, not implementation details.

## AI Features

- **Security:** User inputs never go directly to LLM (Backend templates only).
- **Validation:** LLM output MUST be validated via Zod.
- **Isolation:** Never mix tenant data in context.
- **Equip. Matching:** LLM extracts keywords -> Backend matches (Category 40%, Brand 25%, Loc 25%). Never send full DB list to LLM.

## Library Usage

- **Version check:** Before using any library API, check the version installed in `package.json` (or `pnpm-workspace.yaml` catalogs). If unsure about the API for that version, use the **context7 MCP** (`resolve-library-id` then `query-docs`) to fetch up-to-date documentation.
- **Never assume standard conventions:** Import paths, API signatures, and defaults change between major versions. Always verify against the actual project config and docs before writing code.

## Code Standards

- **Language:** **ENGLISH ONLY** (Comments, Variables, Commits). No French.
- **Style:** Declarative over Imperative (map/filter > loops). Variables: `camelCase`, Files: `kebab-case`. Components: `PascalCase`.
