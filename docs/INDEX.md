# Staamina Project Documentation Index

**Generated:** 2026-01-07  
**Scan Level:** Exhaustive  
**Purpose:** Master index for AI retrieval and project understanding

## Quick Overview

**Project Type:** Monorepo (Turborepo + pnpm)  
**Backend:** NestJS API (Node.js/TypeScript)  
**Frontend:** React applications (Vite, Next.js)  
**Database:** PostgreSQL (Prisma ORM)  
**Authentication:** Logto (OAuth 2.0 / OpenID Connect)  
**Deployment:** VPS (OVH) for backend, Vercel for frontend

## Project Structure

```
Staamina/
├── apps/
│   ├── backend/              # NestJS API
│   ├── field-maintenance-system/  # React/Vite app
│   ├── headquarter-system/   # React/Vite app
│   └── landing-page/         # Next.js app
├── packages/
│   ├── ui/                   # React component library
│   └── types/                # Shared TypeScript types
└── docs/                     # This documentation
```

## Core Documentation Files

### 1. Architecture Documentation

**File:** [architecture-overview.md](./architecture-overview.md)  
**Content:** High-level system architecture, patterns, layers, deployment  
**Use When:** Understanding overall system design, architecture decisions

**File:** [integration-architecture.md](./integration-architecture.md)  
**Content:** How parts integrate, API communication, authentication flow  
**Use When:** Understanding how frontend/backend communicate, shared packages usage

**File:** [source-tree-analysis.md](./source-tree-analysis.md)  
**Content:** Detailed file structure, directory purposes, organization  
**Use When:** Finding specific files, understanding code organization

### 2. Technology Documentation

**File:** [technology-stack.md](./technology-stack.md)  
**Content:** Complete technology stack for each part, versions, justifications  
**Use When:** Understanding what technologies are used, versions, why chosen

**File:** [development-operations.md](./development-operations.md)  
**Content:** Development setup, build process, deployment, scripts  
**Use When:** Setting up development environment, deploying, running commands

**File:** [storage-architecture.md](./storage-architecture.md)  
**Content:** File storage architecture, MinIO setup, provider abstraction, migration guide  
**Use When:** Understanding file upload system, configuring storage, migrating to production

### 3. API Documentation

**File:** [api-contracts-backend.md](./api-contracts-backend.md)  
**Content:** Complete API endpoint documentation, request/response formats  
**Use When:** Integrating with backend, understanding API endpoints, testing

### 4. Data Documentation

**File:** [data-models-backend.md](./data-models-backend.md)  
**Content:** Database schema, Prisma models, relationships, enums  
**Use When:** Understanding database structure, data relationships, schema changes

### 5. UI Documentation

**File:** [ui-components-library.md](./ui-components-library.md)  
**Content:** UI component library, available components, usage  
**Use When:** Using UI components, understanding design system, component API

### 6. Project Status

**File:** [project-scan-report.json](./project-scan-report.json)  
**Content:** Scan status, completed steps, findings  
**Use When:** Understanding documentation status, what has been analyzed

**File:** [existing-documentation-inventory.md](./existing-documentation-inventory.md)  
**Content:** List of existing documentation files found  
**Use When:** Finding existing docs, understanding what was already documented

## Key Concepts

### Authentication & Authorization

- **Provider:** Logto (OAuth 2.0 / OpenID Connect)
- **Flow:** Authorization Code Flow
- **Token:** JWT Bearer tokens
- **Roles:** SuperAdministrator, Administrator, SiteManager
- **Implementation:** See [integration-architecture.md](./integration-architecture.md#authentication-flow)

### API Communication

- **Protocol:** HTTP/REST
- **Base URL:** `/api` (backend)
- **Response Format:** Standardized `ApiResponse<T>` (see [api-contracts-backend.md](./api-contracts-backend.md#response-format))
- **Authentication:** JWT Bearer token in `Authorization` header

### Data Models

- **ORM:** Prisma
- **Database:** PostgreSQL
- **Schema:** See [data-models-backend.md](./data-models-backend.md)
- **Key Entities:** User, Company, Site, Equipment, Brand, Category, Model

### Frontend Applications

1. **Field Maintenance System:** React/Vite, PWA support, equipment management
2. **Headquarter System:** React/Vite, administrative dashboard, CRUD operations
3. **Landing Page:** Next.js, public marketing site, SSR/SSG

### Shared Packages

1. **@staamina/types:** Shared TypeScript types (API responses, enums, entities)
2. **@staamina/ui:** React component library (forms, tables, modals, 3D viewer)

## Common Tasks

### Development Setup

1. Install dependencies: `pnpm install`
2. Start PostgreSQL: `docker-compose up -d postgres`
3. Run migrations: `pnpm --filter backend prisma migrate dev`
4. Start backend: `pnpm backend:dev`
5. Start frontend: `pnpm fsm:dev` or `pnpm head:dev`

See [development-operations.md](./development-operations.md) for details.

### Adding a New API Endpoint

1. Create DTO in module's `dto/` folder
2. Add service method in `*.service.ts`
3. Add controller endpoint in `*.controller.ts`
4. Use `@Roles()` decorator for authorization
5. Document with Swagger decorators

See [api-contracts-backend.md](./api-contracts-backend.md) for examples.

### Adding a New UI Component

1. Create component in `packages/ui/src/`
2. Add Storybook story
3. Export from component's `index.ts`
4. Use in frontend apps

See [ui-components-library.md](./ui-components-library.md) for structure.

### Database Changes

1. Update `apps/backend/prisma/schema.prisma`
2. Create migration: `pnpm --filter backend prisma migrate dev --name migration_name`
3. Update shared types if needed

See [data-models-backend.md](./data-models-backend.md) for schema structure.

## Technology Quick Reference

### Backend

- **Framework:** NestJS 10.3.0
- **Language:** TypeScript 5.3.3
- **ORM:** Prisma 5.9.1
- **Database:** PostgreSQL 16
- **Auth:** Logto
- **Logging:** Pino

### Frontend

- **Framework:** React 18.2.0
- **Build:** Vite 5.0.8 (field-maintenance, headquarter) or Next.js 14.2.35 (landing)
- **State:** TanStack Query 5.17.0
- **Styling:** Tailwind CSS 3.3.6+
- **Auth:** Logto React SDK

### Monorepo

- **Tool:** Turborepo 2.0.0
- **Package Manager:** pnpm 8.15.0
- **Node:** >= 18

## File Locations

### Backend Key Files

- Entry: `apps/backend/src/main.ts`
- Root Module: `apps/backend/src/app.module.ts`
- Schema: `apps/backend/prisma/schema.prisma`
- Docker: `apps/backend/Dockerfile`

### Frontend Key Files

- Field Maintenance: `apps/field-maintenance-system/src/main.tsx`
- Headquarter: `apps/headquarter-system/src/main.tsx`
- Landing: `apps/landing-page/src/app/page.tsx`

### Shared Packages

- Types: `packages/types/src/index.ts`
- UI: `packages/ui/src/` (component folders)

## API Endpoints Summary

### Authentication

- `GET /api/auth/sign-in` - Initiate login
- `GET /api/auth/callback` - OAuth callback
- `POST /api/auth/login` - Email/password login
- `GET /api/auth/me` - Current user
- `GET /api/auth/verify` - Verify token

### Users

- `GET /api/users/me` - Current user info
- `GET /api/users` - List users (paginated)
- `POST /api/users` - Create user
- `PUT /api/users/:userId/organization` - Assign organization

### Sites

- `GET /api/sites` - List sites
- `POST /api/sites` - Create site
- `GET /api/sites/:id` - Get site
- `PATCH /api/sites/:id` - Update site

### Equipment

- `GET /api/equipment` - List equipment
- `POST /api/equipment` - Create equipment
- `PATCH /api/equipment/:id/spatial-data` - Update 3D position

See [api-contracts-backend.md](./api-contracts-backend.md) for complete list.

## Environment Variables

### Backend

- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 4000)
- `CORS_ORIGIN` - Allowed CORS origins
- `LOGTO_ENDPOINT` - Logto instance URL
- `LOGTO_APP_ID` - Logto application ID
- `LOGTO_APP_SECRET` - Logto application secret
- `STORAGE_PROVIDER` - Storage provider (minio | s3 | cloudflare-r2)
- `MINIO_ENDPOINT` - MinIO endpoint (default: localhost)
- `MINIO_PORT` - MinIO port (default: 9000)
- `MINIO_BUCKET_NAME` - MinIO bucket name (default: staamina-attachments)

### Frontend

- `VITE_API_BASE_URL` - Backend API URL

## Deployment

### Backend (VPS on OVH)

- Docker Compose or PM2/systemd
- PostgreSQL + Backend API
- Environment variables configured
- Migrations run automatically

### Frontend (Vercel)

- Git-based deployment
- Automatic builds
- Environment variables in dashboard
- CDN distribution

## Testing

- **Backend:** Jest (`*.spec.ts` files)
- **Frontend:** Vitest + React Testing Library
- **Run:** `pnpm test` (all) or `pnpm --filter <package> test`

## Code Quality

- **Linting:** ESLint
- **Formatting:** Prettier
- **Type Checking:** TypeScript strict mode
- **Commands:** `pnpm lint`, `pnpm format`, `pnpm build`

## Support and Troubleshooting

### Common Issues

**Dependencies:** Clean install with `rm -rf node_modules pnpm-lock.yaml && pnpm install`  
**Prisma:** Regenerate with `pnpm --filter backend prisma:generate`  
**Build Cache:** Clear with `pnpm turbo clean`  
**Port Conflicts:** Check running processes, change ports in config

See [development-operations.md](./development-operations.md#troubleshooting) for more.

## Documentation Status

**Scan Completed:** 2026-01-07  
**Scan Level:** Exhaustive  
**Parts Documented:** 6 (backend, 3 frontend apps, 2 packages)  
**Documentation Files:** 10+ markdown files

See [project-scan-report.json](./project-scan-report.json) for detailed status.

## Related External Documentation

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Logto Documentation](https://docs.logto.io/)

## Quick Links

- [Architecture Overview](./architecture-overview.md)
- [Technology Stack](./technology-stack.md)
- [API Contracts](./api-contracts-backend.md)
- [Data Models](./data-models-backend.md)
- [UI Components](./ui-components-library.md)
- [Development Guide](./development-operations.md)
- [Integration Patterns](./integration-architecture.md)
- [Storage Architecture](./storage-architecture.md)

---

**Last Updated:** 2026-01-07  
**Maintained By:** Documentation generated via exhaustive project scan
