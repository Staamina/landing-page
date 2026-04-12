# Multi-Part Integration Architecture

**Generated:** 2026-01-07  
**Scan Level:** Exhaustive

## Overview

This monorepo follows a **monorepo architecture** with clear separation of concerns and well-defined integration patterns between parts. The architecture enables code sharing while maintaining independence of applications.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Monorepo Root                            │
│  (Turborepo + pnpm workspaces)                             │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Backend    │    │   Frontend   │    │   Packages   │
│   (NestJS)   │    │   (React)    │    │  (Shared)    │
└──────────────┘    └──────────────┘    └──────────────┘
        │                   │                   │
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                    ┌───────▼───────┐
                    │  PostgreSQL   │
                    │   Database    │
                    └───────────────┘
```

## Integration Patterns

### 1. Shared Packages Integration

#### Types Package (`@staamina/types`)

**Purpose:** Shared TypeScript type definitions

**Consumers:**

- Backend (NestJS)
- All frontend applications
- UI component library

**Usage Pattern:**

```typescript
import { ApiResponse, PaginationMeta, EquipmentType } from '@staamina/types';
```

**Shared Types:**

- `ApiResponse<T>` - Standard API response format
- `PaginatedResponse<T>` - Paginated API response
- `PaginationMeta` - Pagination metadata
- `EquipmentType` - Equipment type enum
- `SiteType` - Site type enum
- `ActivityType` - Activity type enum
- Address types
- Opening hours types

**Integration Points:**

- Backend DTOs use shared types for consistency
- Frontend API clients expect shared response types
- UI components use shared enums (e.g., `EquipmentType`)

#### UI Component Library (`@staamina/ui`)

**Purpose:** Reusable React components

**Consumers:**

- Field Maintenance System
- Headquarter System
- Landing Page

**Usage Pattern:**

```typescript
import { Button, Table, Modal } from '@staamina/ui';
// or
import { Button } from '@staamina/ui/src/button';
```

**Shared Components:**

- Form components (Button, Input, Select, etc.)
- Layout components (Table, Modal, Drawer, etc.)
- 3D components (Site3DViewer)
- Utility components (Loader, SplashScreen, etc.)

**Integration Points:**

- All frontend apps import UI components
- UI library uses `@staamina/types` for type safety
- Components are styled with Tailwind CSS (shared theme)

### 2. Backend-Frontend Integration

#### API Communication

**Protocol:** HTTP/REST

**Authentication:** JWT Bearer tokens (via Logto)

**Base URL:** Configurable via environment variables

- Development: `http://localhost:4000`
- Production: Set via `VITE_API_BASE_URL` (frontend) or `API_BASE_URL` (backend)

#### API Client Pattern

**Frontend Applications:**

- Each app has its own API service layer
- Shared pattern: Token injection, error handling, retry logic

**Field Maintenance System:**

```typescript
// apps/field-maintenance-system/src/services/api.ts
- Token getter/setter pattern
- Automatic token refresh on 401
- Retry logic
- Uses @staamina/types for response types
```

**Headquarter System:**

```typescript
// apps/headquarter-system/src/services/api.ts
- Similar pattern to FMS
- Additional pagination support
- Domain-specific services (companies, sites, etc.)
```

**Landing Page:**

```typescript
// apps/landing-page/src/lib/api/client.ts
- Next.js API client
- Request timeout handling
- Error handling with ApiClientError
- Uses @staamina/types
```

#### Authentication Flow

**OAuth 2.0 / OpenID Connect (Logto):**

1. **Frontend initiates login:**
   - Redirects to `/api/auth/sign-in`
   - Backend redirects to Logto

2. **Logto authentication:**
   - User authenticates with Logto
   - Logto redirects to `/api/auth/callback`

3. **Backend callback:**
   - Exchanges code for token
   - Redirects to frontend with token in query parameter

4. **Frontend stores token:**
   - Extracts token from URL
   - Stores in memory/localStorage
   - Uses token for subsequent API calls

5. **API requests:**
   - Frontend includes token: `Authorization: Bearer <token>`
   - Backend validates token via JWT strategy
   - Backend extracts user info from token

6. **Token refresh:**
   - Frontend detects 401 responses
   - Calls refresh function (if configured)
   - Retries original request

#### Response Format

**Standard API Response:**

```typescript
{
  success: boolean;
  data: T | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pageCount: number;
  } | null;
  error: {
    code: string;
    message: string;
    details?: any;
  } | null;
  statusCode: number;
  timestamp: string;
}
```

**Backend Implementation:**

- `ResponseInterceptor` automatically wraps responses
- `GlobalExceptionFilter` formats errors consistently

**Frontend Expectation:**

- All apps expect this format
- Type-safe with `ApiResponse<T>` from `@staamina/types`

### 3. Frontend Applications Integration

#### Shared Patterns

**Authentication:**

- All apps use Logto React SDK
- Shared authentication context pattern
- Protected routes with role-based access

**Internationalization:**

- All apps support i18n (English, French)
- Shared translation keys where applicable
- UI library provides i18n utilities

**State Management:**

- React Context for auth, i18n
- TanStack Query for server state
- Local state with React hooks

**Styling:**

- Tailwind CSS across all apps
- Shared design system from UI library
- Consistent color palette and typography

#### Application-Specific Integration

**Field Maintenance System:**

- Focus: Field operations, equipment maintenance
- Uses: UI library, types package, backend API
- Features: PWA support, offline capability

**Headquarter System:**

- Focus: Administrative operations, data management
- Uses: UI library (extensively), types package, backend API
- Features: Complex data tables, forms, CRUD operations

**Landing Page:**

- Focus: Public-facing marketing site
- Uses: UI library, types package (minimal), backend API (minimal)
- Features: Next.js SSR, internationalization, static generation

### 4. Database Integration

#### Backend-Database

**ORM:** Prisma

**Database:** PostgreSQL

**Schema Location:** `apps/backend/prisma/schema.prisma`

**Migration Strategy:**

- Prisma migrations in `apps/backend/prisma/migrations/`
- Migrations run automatically on Docker container start
- Manual migration: `pnpm --filter backend prisma migrate deploy`

**Connection:**

- Environment variable: `DATABASE_URL`
- Format: `postgresql://user:password@host:port/database`

#### Data Flow

```
Frontend Request
    │
    ▼
Backend Controller
    │
    ▼
Backend Service
    │
    ▼
Prisma Service
    │
    ▼
PostgreSQL Database
```

### 5. Build and Deployment Integration

#### Monorepo Build

**Tool:** Turborepo

**Build Order:**

1. Shared packages (`@staamina/types`, `@staamina/ui`)
2. Backend (depends on types)
3. Frontend apps (depend on types and UI)

**Caching:**

- Build outputs cached
- Only rebuilds changed packages
- Parallel execution where possible

#### Deployment Architecture

**Backend:**

- **Target:** VPS on OVH
- **Method:** Docker Compose or PM2/systemd
- **Services:** Backend API + PostgreSQL

**Frontend:**

- **Target:** Vercel
- **Method:** Git-based deployment
- **Build:** Next.js/Vite production builds

**Integration Points:**

- Frontend apps configured with backend API URL
- CORS configured on backend for frontend domains
- Environment variables for API endpoints

### 6. Development Integration

#### Local Development

**Shared Services:**

- PostgreSQL via Docker Compose
- Backend API on localhost:4000
- Frontend apps on different ports (3000, 3001, 3002)

**Hot Reload:**

- Backend: NestJS watch mode
- Frontend: Vite/Next.js dev servers
- Shared packages: Rebuild triggers app rebuilds

#### Code Sharing

**Workspace Protocol:**

```json
{
  "dependencies": {
    "@staamina/ui": "workspace:*",
    "@staamina/types": "workspace:*"
  }
}
```

**TypeScript Path Mapping:**

```json
{
  "compilerOptions": {
    "paths": {
      "@staamina/ui/*": ["@staamina/ui/src"],
      "@staamina/types/*": ["@staamina/types/src"]
    }
  }
}
```

### 7. Testing Integration

#### Test Strategy

**Backend:**

- Jest for unit/integration tests
- Test files: `*.spec.ts`
- Prisma test database

**Frontend:**

- Vitest for unit tests
- React Testing Library for components
- Test files: `*.test.ts`, `*.spec.ts`

**Shared:**

- Type safety ensures integration correctness
- Shared types prevent API contract mismatches

### 8. Error Handling Integration

#### Backend Error Handling

**Global Exception Filter:**

- Catches all exceptions
- Formats errors consistently
- Returns standard error response format

**Error Response:**

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "ErrorCode",
    "message": "Error message",
    "details": {}
  },
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Frontend Error Handling

**API Client Error Handling:**

- Detects error responses
- Extracts error messages
- Handles 401 (unauthorized) with token refresh
- Throws typed errors (`ApiClientError`)

**User-Facing Errors:**

- Displayed via UI components (Modal, Toast, etc.)
- Error messages from backend
- Fallback messages for network errors

### 9. Type Safety Integration

#### End-to-End Type Safety

**Backend → Frontend:**

- Backend DTOs use shared types
- Frontend expects shared response types
- TypeScript ensures type compatibility

**Shared Types Flow:**

```
Prisma Schema
    │
    ▼
Backend DTOs (use @staamina/types)
    │
    ▼
API Response (ApiResponse<T>)
    │
    ▼
Frontend API Client (expects ApiResponse<T>)
    │
    ▼
Frontend Components (typed with shared types)
```

**Benefits:**

- Compile-time type checking
- IDE autocomplete
- Refactoring safety
- API contract enforcement

## Integration Checklist

### Backend Integration

- [x] Uses `@staamina/types` for response types
- [x] Exposes REST API with standard response format
- [x] Implements JWT authentication
- [x] CORS configured for frontend origins
- [x] Swagger documentation available

### Frontend Integration

- [x] Uses `@staamina/ui` for components
- [x] Uses `@staamina/types` for type safety
- [x] Implements API client with token handling
- [x] Handles authentication flow
- [x] Expects standard API response format

### Shared Packages Integration

- [x] Types package provides shared types
- [x] UI library uses types package
- [x] Workspace dependencies configured
- [x] TypeScript path mapping configured

### Development Integration

- [x] Turborepo manages builds
- [x] pnpm workspaces configured
- [x] Hot reload works across packages
- [x] Shared code changes trigger rebuilds

### Deployment Integration

- [x] Backend deployable independently
- [x] Frontend apps deployable independently
- [x] Environment variables configured
- [x] CORS allows frontend domains

## Integration Best Practices

1. **Type Safety First:** Always use shared types for API contracts
2. **Consistent Patterns:** Follow established patterns across apps
3. **Shared Components:** Use UI library instead of duplicating components
4. **API Standardization:** All endpoints follow standard response format
5. **Error Handling:** Consistent error handling across all layers
6. **Authentication:** Single authentication flow (Logto) across all apps
7. **Environment Variables:** Clear separation of config per environment

_Sources: Source code analysis, API clients, package dependencies (exhaustive scan)_
