# CLAUDE.md

## Project Overview

**Staamina** is a multi-tenant SaaS B2B platform for intelligent maintenance management (GMAIA) targeting retail and food
service chains. Features AI-powered incident management, WhatsApp-first communication, and offline-capable mobile apps.

**Tech Stack:** Turborepo monorepo, NestJS backend, React frontends (Vite), PostgreSQL, Prisma ORM, TailwindCSS v4.

## Common Commands

```bash
# Development
pnpm install              # Install dependencies
pnpm all:dev              # Run all apps
pnpm backend:dev          # Backend API (port 4000)
pnpm head:dev             # Headquarter System (port 5173)
pnpm fsm:dev              # Field Maintenance System (port 5174)
pnpm land:dev             # Landing Page (port 3000)

# Quality checks (run before committing)
pnpm check                # Lint + type-check all packages
pnpm lint:fix             # Auto-fix linting issues
pnpm format               # Format with Prettier

# Testing
pnpm test                                    # Run unit tests
pnpm --filter backend test:unit              # Backend unit tests only
pnpm --filter backend test:integration       # Backend integration tests (uses testcontainers)
pnpm --filter backend test:all               # Backend unit + integration
pnpm --filter headquarter-system test        # Frontend tests (Vitest)

# Database (from apps/backend)
pnpm prisma:generate                         # Generate Prisma Client
pnpm prisma:migrate                          # Run migrations (dev)
pnpm prisma:studio                           # Open Prisma Studio
npx prisma migrate dev --name <name>         # Create new migration
```

## Critical Rules

### Git Hooks - Never Skip

**Never use `--no-verify`** on git commit or push. If hooks fail, fix the underlying issue (tests, lint) rather than bypassing.

### pnpm Catalogs - Centralized Dependencies

All shared dependencies must use named catalogs defined in `pnpm-workspace.yaml`:

```json
// ✅ Correct
"react": "catalog:core-runtime"
// ❌ Wrong - hardcoded version
"react": "^18.2.0"
```

Catalog names: `core-runtime`, `state-management`, `forms-validation`, `ui-libraries`, `build-tools`, `testing`, `backend-nestjs`, `backend-database`, etc. See `pnpm-workspace.yaml` for full list.

### Multi-Tenant Isolation

All data queries **MUST** filter by `companyId`. Row-level isolation via Guards and Interceptors.

## Architecture Overview

### Monorepo Structure

```
apps/
├── backend/                 # NestJS API (port 4000)
├── headquarter-system/      # React admin app (Vite, port 4002)
├── field-maintenance-system/# React PWA for technicians (port 4003)
└── landing-page/            # Next.js marketing site (port 4001)

packages/
├── types/                   # @staamina/types - Shared TypeScript types
└── ui/                      # @staamina/ui - Component library (Storybook port 6006)
```

### Authentication

**Provider:** Zitadel (self-hosted on production, OIDC/OAuth2)

- RBAC hierarchy: SuperAdmin → Administrator → SiteManager → Technician
- Backend: NestJS Guards + `@Roles()` decorator
- Frontend: @zitadel/react SDK (wraps oidc-client-ts)

### State Management

- **Zustand:** Global UI state (auth, preferences, theme)
- **TanStack Query:** Server state with query keys like `['companies']`, `['companies', id]`, `['companies', id, 'sites']`

### API Design

REST with OpenAPI/Swagger at `/api/v1/`. Standard response format:

```typescript
{ success: boolean, data: T | null, pagination?: {...}, error?: {...}, statusCode: number, timestamp: string }
```

### Front-end Coding style

- Declarative over Imperative: Favor event-driven props over passing state setters directly.
  -Preferred: <Component onXXX={handleXXX} />
  -Avoid: <Component setXXX={setXXX} />
- Immutability: Never mutate arrays or objects. Instead of using .push(), create a new reference using the spread operator: [...old, newItem].
- Functional Patterns: Prioritize native immutable methods such as .map(), .filter(), and .reduce() for data transformation.

## Key Patterns

### Backend Module Structure (NestJS)

```
apps/backend/src/
├── core/               # Cross-cutting: auth, common filters/interceptors, location
└── modules/            # Business domains: catalog, equipment, organizations, sites, users
```

Standard module: `dto/`, `{entity}.controller.ts`, `{entity}.service.ts`, `{entity}.module.ts`

### Frontend Structure

**Headquarter System:** `services/` → `hooks/` → `view/components/` → `view/pages/`

- Forms follow pattern: `{Feature}Form.tsx` + `{Feature}Form.schema.ts` (Zod)
- we call it head as acronyme
  **Field Maintenance System (PWA):** Uses `screens/` instead of `pages/`, includes `navigation/` for mobile routing
- we call it fsm as acronyme
  **Landing Page:**
- we call if landing as short name

### Naming Conventions

| Type               | Convention                                        | Example                                                   |
| ------------------ | ------------------------------------------------- | --------------------------------------------------------- |
| API Endpoints      | Plural, kebab-case                                | `/api/v1/service-providers`                               |
| Components         | PascalCase.tsx                                    | `CompanyForm.tsx`                                         |
| Schemas            | `*.schema.ts`                                     | `CompanyForm.schema.ts`                                   |
| Tests              | `*.spec.ts` / `*.test.tsx`                        | `companies.service.spec.ts`                               |
| DB Enums           | SCREAMING_SNAKE_CASE                              | `RETAIL`, `FOOD_SERVICES`                                 |
| Hooks              | `*.hooks.ts` or /hooks/useCamelCase.ts            | `Component.hooks.ts`, `/hooks/useCamelCase.ts`            |
| Helpers            | `*.utils.ts` or /utils/camelCase.ts               | `Component.helpers.ts`, `/helpers/camelCase.ts`           |
| Adapters           | `*.adapters.ts` or /adapters/adaptApiResponse.ts  | `Component.adapters.ts`, `/adapters/adaptApiResponse.ts`  |
| Adapters (prepare) | `*.adapters.ts` or /adapters/prepareApiPayload.ts | `Component.adapters.ts`, `/adapters/prepareApiPayload.ts` |

### Validation

**Frontend:** Zod schemas + React Hook Form with `zodResolver`
**Backend:** class-validator decorators + class-transformer

### Error Handling

**Backend:** NestJS exceptions (`NotFoundException`, `BadRequestException`, `ForbiddenException`)
**Frontend:** `getResponseData()` helper throws on `!success`, used with TanStack Query

## Important Context

### AI Integration (DeepSeek API)

Hybrid approach: LLM extracts keywords from user text, backend matches equipment algorithmically. LLM never sees database data.

### Internationalization

Custom i18n (not react-i18next): JSON files in `i18n/locales/` with `I18nProvider` and `useTranslation` hook.
Always use i18n sytem

### Offline Support (Field Maintenance System)

PWA with Service Worker, local storage caching, sync queue for pending operations.

### Business Rules

- All entities need `createdAt`, `updatedAt`, `createdBy` for audit trail
- RGPD compliance: no impersonation, explicit consent required
- WhatsApp Business API is primary notification channel
- Site types: `RETAIL`, `FOOD_SERVICES`, `GYM`, `HOTEL`, `WAREHOUSE`, `OFFICE`

### Infrastructure

- **Valkey:** Caching, sessions, job queues
- **Zitadel:** Auth provider (self-hosted)
- **Dozzle:** Error tracking (self-hosted)

## Reference Documentation

- `_bmad-output/planning-artifacts/architecture.md` - Architectural decisions
- `_bmad-output/planning-artifacts/prd/` - Product requirements (all PRDs)
- `apps/backend/prisma/schema.prisma` - Database schema
- `_bmad-output/planning-artifacts/wireframes-detailed` - Product wireframes

# Important instructions

Always try to use the best skills for a task

- If you have a prompt that need multiple skills then use subagents each subagent will use the required skill
  Exemple: `Implement a brand CRUD accessible only by SuperAdmin` then you need to use backend skills for the backend agent,
  and frontend skills for the front-end agent
