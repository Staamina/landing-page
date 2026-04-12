# Architecture Overview

**Generated:** 2026-01-07  
**Scan Level:** Exhaustive

## System Architecture

The Staamina platform is built as a **monorepo** with a **modular monolithic backend** and **multiple frontend applications**, all sharing common packages for types and UI components.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Applications                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Landing    │  │ Headquarter  │  │ Field Maint. │   │
│  │     Page     │  │   System     │  │   System     │   │
│  │  (Next.js)  │  │ (React/Vite) │  │ (React/Vite) │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│         │                  │                  │           │
│         └──────────────────┼──────────────────┘           │
│                            │                              │
│                    ┌───────▼───────┐                      │
│                    │  @staamina/ui│                      │
│                    │  @staamina/  │                      │
│                    │    types     │                      │
│                    └───────┬───────┘                      │
└────────────────────────────┼──────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   Backend API   │
                    │    (NestJS)     │
                    │   Port: 4000    │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   PostgreSQL    │
                    │   Database      │
                    └─────────────────┘
```

## Backend Architecture

### Architecture Pattern

**Modular Monolith** using NestJS module system

### Layers

1. **Controller Layer** (`*.controller.ts`)
   - HTTP endpoints
   - Request/response handling
   - Route guards (authentication, authorization)
   - DTO validation

2. **Service Layer** (`*.service.ts`)
   - Business logic
   - Data transformation
   - Business rules enforcement

3. **Repository Layer** (Prisma)
   - Database access
   - Query optimization
   - Data persistence

### Core Modules

**Location:** `src/core/`

- **Auth Module:** Authentication and authorization
  - JWT strategy
  - Logto integration
  - Role-based access control
  - Guards and decorators

- **Common Module:** Shared functionality
  - Global exception filter
  - Response interceptor
  - Logger service
  - Prisma service

- **Location Module:** Address/geolocation services

### Feature Modules

**Location:** `src/modules/`

- **Users Module:** User management, roles, organizations
- **Organizations Module:** Companies and service providers
- **Sites Module:** Sites, buildings, floors
- **Equipment Module:** Equipment management, spatial data
- **Catalog Module:** Brands, categories, models

### Cross-Cutting Concerns

**Global Interceptors:**

- `ResponseInterceptor` - Formats all responses uniformly

**Global Filters:**

- `GlobalExceptionFilter` - Handles all exceptions uniformly

**Global Guards:**

- `JwtAuthGuard` - JWT authentication (applied globally)
- `RolesGuard` - Role-based access control (applied per route)

**Global Pipes:**

- `ValidationPipe` - DTO validation (whitelist, transform)

### Database Architecture

**ORM:** Prisma

**Database:** PostgreSQL

**Schema Design:**

- Relational model with foreign keys
- Hierarchical structures (categories, equipment)
- Many-to-many relationships (users-roles, companies-service providers)
- Enums for type safety

**Migrations:**

- Version-controlled in `prisma/migrations/`
- Applied automatically on deployment

## Frontend Architecture

### Field Maintenance System

**Framework:** React + Vite

**Architecture Pattern:** Component-based with feature-based organization

**Key Features:**

- PWA support (offline capability)
- Equipment management
- Maintenance tasks
- Reports

**State Management:**

- React Context (auth, i18n)
- TanStack Query (server state)
- Local state (React hooks)

### Headquarter System

**Framework:** React + Vite

**Architecture Pattern:** View layer pattern (pages + components)

**Key Features:**

- Administrative dashboard
- CRUD operations for all entities
- Data tables with pagination
- Complex forms with validation

**State Management:**

- React Context (auth, i18n)
- TanStack Query (server state with caching)
- Local state (React hooks)

**Component Organization:**

- `view/pages/` - Page-level components
- `view/components/` - Feature-specific components
- `services/` - API client services
- `hooks/` - Custom hooks for data fetching

### Landing Page

**Framework:** Next.js 14 (App Router)

**Architecture Pattern:** Next.js App Router with internationalization

**Key Features:**

- Public marketing site
- Server-side rendering
- Static generation
- Multi-language support (next-intl)

**Routing:**

- File-based routing
- Locale-based routes (`/[locale]/`)
- API routes (`/api/`)

## Shared Packages Architecture

### Types Package (`@staamina/types`)

**Purpose:** Shared TypeScript type definitions

**Structure:**

- Single entry point: `src/index.ts`
- Exports all shared types

**Types Provided:**

- API response types
- Entity types
- Enum types
- Utility types

### UI Component Library (`@staamina/ui`)

**Purpose:** Reusable React components

**Architecture:**

- Component-based organization
- Storybook for documentation
- Tailwind CSS for styling
- Radix UI for accessibility

**Component Categories:**

- Form components
- Layout components
- Overlay components
- Data display components
- 3D components
- Utility components

## Integration Architecture

### API Communication

**Protocol:** HTTP/REST

**Authentication:** JWT Bearer tokens

**Response Format:** Standardized `ApiResponse<T>` format

**Error Handling:** Consistent error format across all endpoints

### Authentication Flow

1. Frontend redirects to backend `/api/auth/sign-in`
2. Backend redirects to Logto
3. User authenticates with Logto
4. Logto redirects to backend `/api/auth/callback`
5. Backend exchanges code for token
6. Backend redirects to frontend with token
7. Frontend stores token and uses for API calls

### Type Safety

**End-to-End Type Safety:**

- Backend DTOs use shared types
- Frontend expects shared response types
- TypeScript ensures compatibility
- Compile-time error detection

## Deployment Architecture

### Backend Deployment

**Target:** VPS on OVH

**Method:** Docker Compose or PM2/systemd

**Services:**

- Backend API (Node.js)
- PostgreSQL database

**Process:**

1. Build Docker image
2. Run migrations
3. Start application
4. Health check monitoring

### Frontend Deployment

**Target:** Vercel

**Method:** Git-based deployment

**Process:**

1. Push to Git repository
2. Vercel builds application
3. Deploys to CDN
4. Environment variables configured

## Security Architecture

### Authentication

**Provider:** Logto (OAuth 2.0 / OpenID Connect)

**Flow:** Authorization Code Flow

**Token Type:** JWT

**Validation:** JWKS (JSON Web Key Set)

### Authorization

**Model:** Role-Based Access Control (RBAC)

**Roles:**

- SuperAdministrator
- Administrator
- SiteManager

**Implementation:**

- Roles stored in database
- JWT contains user roles
- Guards enforce role requirements

### API Security

**CORS:** Configured for specific origins

**HTTPS:** Required in production

**Rate Limiting:** (Can be added with @nestjs/throttler)

**Input Validation:** DTO validation with class-validator

## Scalability Considerations

### Backend Scalability

**Current:** Single instance (modular monolith)

**Scaling Options:**

- Vertical scaling (increase VPS resources)
- Horizontal scaling (multiple instances with load balancer)
- Database connection pooling (Prisma)
- Caching layer (Redis - can be added)

### Frontend Scalability

**Current:** CDN-based (Vercel)

**Scaling:** Automatic via Vercel CDN

**Optimization:**

- Code splitting
- Lazy loading
- Static generation (Next.js)
- Image optimization

## Monitoring and Observability

### Logging

**Backend:** Pino (structured JSON logging)

**Levels:** log, error, warn, debug, verbose

**Features:**

- Request/response logging
- Error logging with stack traces
- Context information

### Health Checks

**Backend:** `GET /api` endpoint

**Docker:** Health check configured

**Response:** API version and status

## Development Workflow

### Local Development

1. Start PostgreSQL (Docker Compose)
2. Run migrations
3. Start backend (`pnpm backend:dev`)
4. Start frontend apps (`pnpm fsm:dev`, `pnpm head:dev`, etc.)

### Build Process

1. Install dependencies (`pnpm install`)
2. Build shared packages
3. Build backend
4. Build frontend apps

### Testing

- Backend: Jest
- Frontend: Vitest + React Testing Library
- E2E: (Can be added)

## Future Architecture Considerations

### Potential Enhancements

1. **Caching Layer:** Redis for session storage, caching
2. **Message Queue:** Bull/Redis for background jobs
3. **Real-time:** WebSockets for live updates
4. **Microservices:** Split modules if needed
5. **API Gateway:** If multiple backend services
6. **Monitoring:** Prometheus + Grafana
7. **Tracing:** OpenTelemetry

## Architecture Principles

1. **Separation of Concerns:** Clear layer separation
2. **DRY (Don't Repeat Yourself):** Shared packages for common code
3. **Type Safety:** End-to-end TypeScript
4. **Consistency:** Standard patterns across apps
5. **Scalability:** Architecture supports growth
6. **Security:** Authentication and authorization at all layers
7. **Maintainability:** Clear structure and documentation

## Related Documentation

- [Technology Stack](./technology-stack.md) - Detailed technology choices
- [Source Tree Analysis](./source-tree-analysis.md) - File structure details
- [Integration Architecture](./integration-architecture.md) - Integration patterns
- [API Contracts](./api-contracts-backend.md) - API endpoint documentation
- [Data Models](./data-models-backend.md) - Database schema documentation
- [Development Operations](./development-operations.md) - Development workflow

_Sources: Source code analysis, architecture patterns, integration points (exhaustive scan)_
