# Source Tree Analysis

**Generated:** 2026-01-07  
**Scan Level:** Exhaustive

## Overview

This document provides a detailed analysis of the source code structure for each part of the monorepo, with annotations explaining the purpose and organization of directories and key files.

## Backend (apps/backend)

### Root Structure

```
apps/backend/
├── prisma/                    # Database schema and migrations
│   └── schema.prisma         # Prisma schema definition
├── src/                       # Source code
│   ├── main.ts               # Application entry point
│   ├── app.module.ts         # Root NestJS module
│   ├── app.controller.ts     # Root controller (health check)
│   ├── app.service.ts        # Root service
│   ├── app.controller.spec.ts # Root controller tests
│   ├── core/                  # Core/shared functionality
│   └── modules/               # Feature modules
├── Dockerfile                 # Docker build configuration
├── .env.example              # Environment variables template
├── package.json              # Dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

### Core Directory (`src/core/`)

**Purpose:** Shared, reusable functionality used across modules.

#### `core/auth/`

- **Purpose:** Authentication and authorization system
- **Key Files:**
  - `auth.module.ts` - Auth module configuration
  - `auth.controller.ts` - Auth endpoints (sign-in, callback, token exchange)
  - `auth.service.ts` - Authentication business logic
  - `guards/jwt-auth.guard.ts` - JWT authentication guard
  - `guards/roles.guard.ts` - Role-based access control guard
  - `strategies/jwt.strategy.ts` - Passport JWT strategy
  - `services/logto.service.ts` - Logto integration service
  - `adapters/logto-adapter.ts` - Logto adapter abstraction
  - `decorators/current-user.decorator.ts` - Extract current user from request
  - `decorators/roles.decorator.ts` - Role requirement decorator
  - `decorators/public.decorator.ts` - Public route decorator
  - `config/logto.config.ts` - Logto configuration
  - `dto/` - Auth DTOs (login, exchange-code)
  - `types/auth.types.ts` - Auth-related TypeScript types
  - `AUTH.md` - Authentication documentation

#### `core/common/`

- **Purpose:** Common utilities, filters, interceptors, services
- **Key Files:**
  - `common.module.ts` - Common module (global)
  - `filters/global-exception.filter.ts` - Global exception handler
  - `interceptors/response.interceptor.ts` - Response formatting interceptor
  - `services/app-logger.service.ts` - Application logger (Pino wrapper)
  - `services/prisma.service.ts` - Prisma service (database access)
  - `dto/api-response.dto.ts` - Standard API response DTO
  - `dto/pagination-query.dto.ts` - Pagination query parameters DTO
  - `types/response.types.ts` - Response type definitions
  - `types/address.types.ts` - Address type definitions
  - `types/opening-hours.types.ts` - Opening hours type definitions
  - `enums/` - Shared enums (AccessType, LocationType, ParkingType)
  - `test-utils/test-helpers.ts` - Testing utilities

#### `core/location/`

- **Purpose:** Location/address services
- **Key Files:**
  - `location.module.ts` - Location module
  - `location.controller.ts` - Address suggestions endpoint
  - `location.service.ts` - Address autocomplete logic
  - `dto/` - Address suggestion DTOs

### Modules Directory (`src/modules/`)

**Purpose:** Feature modules following NestJS module pattern (Controller → Service → Repository).

#### Module Structure Pattern

Each module typically contains:

- `*.module.ts` - Module definition
- `*.controller.ts` - HTTP endpoints
- `*.service.ts` - Business logic
- `*.controller.spec.ts` - Controller tests (some modules)
- `dto/` - Data Transfer Objects (Create, Update DTOs)

#### `modules/users/`

- **Purpose:** User management
- **Files:**
  - `users.module.ts`
  - `users.controller.ts` - User CRUD, role assignment, organization assignment
  - `users.service.ts` - User business logic
  - `users.controller.spec.ts` - Tests
  - `dto/create-user.dto.ts`
  - `dto/assign-user-organization.dto.ts`

#### `modules/organizations/`

- **Purpose:** Organization management (Companies, Service Providers)
- **Sub-modules:**
  - `companies/` - Company CRUD, sites, service providers, users
  - `service-providers/` - Service provider CRUD, company relationships
- **Files:**
  - `organizations.module.ts` - Aggregates sub-modules
  - Each sub-module follows standard pattern (module, controller, service, DTOs, tests)

#### `modules/sites/`

- **Purpose:** Site management (stores, facilities)
- **Sub-modules:**
  - `sites/` - Site CRUD, company relationships
  - `site-buildings/` - Building information (floors, parking, access)
  - `floors/` - Floor management within buildings
- **Files:**
  - `sites.module.ts` - Aggregates sub-modules
  - Each sub-module follows standard pattern

#### `modules/equipment/`

- **Purpose:** Equipment management (physical equipment at sites)
- **Files:**
  - `equipment.module.ts`
  - `equipment.controller.ts` - Equipment CRUD, electrical panels, spatial data
  - `equipment.service.ts` - Equipment business logic
  - `dto/create-equipment.dto.ts`
  - `dto/update-equipment.dto.ts`
  - `dto/create-electrical-panel.dto.ts`
  - `dto/create-panel-port.dto.ts`
  - `dto/spatial-data.dto.ts` - 3D position/rotation/dimensions

#### `modules/catalog/`

- **Purpose:** Product catalog (Brands, Categories, Models)
- **Sub-modules:**
  - `brands/` - Brand CRUD
  - `categories/` - Category CRUD (hierarchical)
  - `models/` - Model CRUD (links brands, categories, companies)
- **Files:**
  - `catalog.module.ts` - Aggregates sub-modules
  - Each sub-module follows standard pattern

## Field Maintenance System (apps/field-maintenance-system)

### Root Structure

```
apps/field-maintenance-system/
├── src/
│   ├── main.tsx              # React app entry point
│   ├── App.tsx               # Root component
│   ├── App.css               # Global styles
│   ├── index.css             # Base styles
│   ├── components/           # Reusable components
│   ├── screens/             # Page/screen components
│   ├── services/             # API services
│   ├── hooks/                # Custom React hooks
│   ├── contexts/            # React contexts
│   ├── config/               # Configuration files
│   ├── constants/            # Constants
│   ├── types/                # TypeScript types
│   ├── utils/                # Utility functions
│   ├── i18n/                 # Internationalization
│   └── navigation/           # Routing configuration
├── public/                   # Static assets
├── package.json
└── vite.config.ts           # Vite configuration
```

### Key Directories

#### `src/components/`

- **Purpose:** Reusable UI components
- **Files:**
  - `Layout.tsx` - Main layout wrapper
  - `Sidebar.tsx` - Navigation sidebar
  - `ProtectedRoute.tsx` - Route protection wrapper
  - `RoleGuard.tsx` - Role-based access control
  - `LoadingSpinner.tsx` - Loading indicator
  - `LanguageSwitcher.tsx` - Language selection
  - `PWAInstallButton.tsx` - PWA installation prompt
  - `PWAOfflineReady.tsx` - Offline status indicator
  - `PWAUpdatePrompt.tsx` - Update notification

#### `src/screens/`

- **Purpose:** Page-level components (routes)
- **Files:**
  - `Home.tsx` - Home page
  - `Equipment.tsx` - Equipment management screen
  - `Maintenance.tsx` - Maintenance tasks screen
  - `Reports.tsx` - Reports screen
  - `Callback.tsx` - OAuth callback handler

#### `src/services/`

- **Purpose:** API client services
- **Files:**
  - `api.ts` - Base API client configuration
  - `user.service.ts` - User API calls

#### `src/hooks/`

- **Purpose:** Custom React hooks
- **Files:**
  - `usePWAInstall.ts` - PWA installation hook
  - `useTranslation.ts` - i18n hook
  - `useUserRoles.ts` - User roles hook

#### `src/contexts/`

- **Purpose:** React context providers
- **Files:**
  - `AuthProvider.tsx` - Authentication context
  - `I18nProvider.tsx` - Internationalization context

#### `src/config/`

- **Purpose:** Configuration files
- **Files:**
  - `logto.config.ts` - Logto authentication config
  - `theme.ts` - Theme configuration

#### `src/i18n/`

- **Purpose:** Internationalization
- **Files:**
  - `index.ts` - i18n setup
  - `locales/en.json` - English translations
  - `locales/fr.json` - French translations
  - `types.ts` - Translation type definitions

## Headquarter System (apps/headquarter-system)

### Root Structure

```
apps/headquarter-system/
├── src/
│   ├── main.tsx              # React app entry point
│   ├── App.tsx               # Root component
│   ├── view/                 # View layer (pages and components)
│   │   ├── pages/           # Page components
│   │   └── components/      # Feature components
│   ├── services/            # API services
│   ├── hooks/               # Custom React hooks
│   ├── contexts/            # React contexts
│   ├── config/              # Configuration
│   ├── constants/           # Constants
│   ├── types/               # TypeScript types
│   ├── utils/               # Utility functions
│   ├── i18n/                # Internationalization
│   └── test/                # Test setup
├── package.json
└── vite.config.ts
```

### Key Directories

#### `src/view/pages/`

- **Purpose:** Page-level components (routes)
- **Pages:**
  - `Home.tsx` - Dashboard
  - `Companies/` - Company management pages
  - `Sites/` - Site management pages
  - `Stores/` - Store management pages
  - `ServiceProviders/` - Service provider pages
  - `Users/` - User management pages
  - `Brands/` - Brand management pages
  - `Models/` - Model management pages
  - `Callback.tsx` - OAuth callback

#### `src/view/components/`

- **Purpose:** Feature-specific form components
- **Components:**
  - `CompanyForm/` - Company creation/editing form
  - `SiteForm/` - Site creation/editing form
  - `StoreForm/` - Store creation/editing form
  - `ServiceProviderForm/` - Service provider form
  - `UserForm/` - User creation/editing form
  - `BrandForm/` - Brand form
  - `ModelForm/` - Model form
  - `EquipmentForm/` - Equipment form
  - `Layout.tsx` - Main layout
  - `Sidebar.tsx` - Navigation sidebar
  - `ProtectedRoute.tsx` - Route protection
  - `ProtectedRoutes.tsx` - Route configuration
  - `RoleGuard.tsx` - Role-based access
  - `LanguageSwitcher.tsx` - Language selection
  - `LoadingSpinner.tsx` - Loading indicator

#### `src/services/`

- **Purpose:** API client services (one per domain)
- **Services:**
  - `api.ts` - Base API client
  - `companies.service.ts` - Company API
  - `sites.service.ts` - Site API
  - `stores.service.ts` - Store API
  - `service-providers.service.ts` - Service provider API
  - `users.service.ts` - User API
  - `user.service.ts` - Current user API
  - `equipment.service.ts` - Equipment API
  - `brands.service.ts` - Brand API
  - `models.service.ts` - Model API
  - `location.service.ts` - Location/address API

#### `src/hooks/`

- **Purpose:** Custom React hooks for data fetching
- **Hooks:**
  - `useCompanies.ts` - Company data hook
  - `useSites.ts` - Site data hook
  - `useStores.ts` - Store data hook
  - `useServiceProviders.ts` - Service provider hook
  - `useUsers.ts` - User data hook
  - `useEquipment.ts` - Equipment data hook
  - `useBrands.ts` - Brand data hook
  - `useModels.ts` - Model data hook
  - `usePagination.ts` - Pagination hook
  - `usePWAInstall.ts` - PWA installation
  - `useTranslation.ts` - i18n hook
  - `useUserRoles.ts` - User roles hook

## Landing Page (apps/landing-page)

### Root Structure

```
apps/landing-page/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── [locale]/       # Internationalized routes
│   │   ├── api/             # API routes
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Root page
│   │   ├── providers.tsx    # Context providers
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   ├── config/              # Configuration
│   ├── hooks/               # Custom hooks
│   ├── i18n/                # Internationalization
│   └── lib/                 # Library code
│       └── api/             # API client
├── public/                  # Static assets
├── package.json
└── next.config.js           # Next.js configuration
```

### Key Directories

#### `src/app/[locale]/`

- **Purpose:** Internationalized pages (Next.js App Router)
- **Files:**
  - `layout.tsx` - Locale-specific layout
  - `page.tsx` - Landing page
  - `providers.tsx` - Context providers

#### `src/app/api/`

- **Purpose:** Next.js API routes
- **Files:**
  - `locale/route.ts` - Locale API endpoint

#### `src/components/landing/`

- **Purpose:** Landing page components
- **Files:**
  - `landing-page.tsx` - Main landing component
  - `landing-page-header.tsx` - Header
  - `landing-page-footer.tsx` - Footer
  - `animated-title.tsx` - Animated title component

#### `src/lib/api/`

- **Purpose:** API client library
- **Files:**
  - `client.ts` - API client configuration
  - `config.ts` - API configuration
  - `users.ts` - User API
  - `types.ts` - API types
  - `address.types.ts` - Address types

#### `src/i18n/`

- **Purpose:** Next.js internationalization
- **Files:**
  - `request.ts` - i18n request handler
  - `routing.ts` - Routing configuration

## UI Component Library (packages/ui)

### Root Structure

```
packages/ui/
├── src/
│   ├── button/              # Button component
│   ├── input/               # Input component
│   ├── select.tsx           # Select component
│   ├── table/               # Table component
│   ├── modal/               # Modal component
│   ├── site-3d-viewer/      # 3D viewer component
│   ├── form-group/          # Form group component
│   ├── autocomplete/         # Autocomplete component
│   ├── date-picker/         # Date picker component
│   ├── dropdown/            # Dropdown component
│   ├── drawer/              # Drawer component
│   ├── menu/                # Menu component
│   ├── card.tsx             # Card component
│   ├── sidebar/             # Sidebar component
│   ├── loader/              # Loader component
│   ├── splash-screen/       # Splash screen component
│   ├── button-group/        # Button group component
│   ├── language-menu/       # Language menu component
│   ├── country-dropdown/    # Country dropdown
│   ├── country-autocomplete/# Country autocomplete
│   ├── places-autocomplete/ # Places autocomplete
│   ├── confirm-modal/       # Confirm modal
│   ├── action-block/        # Action block
│   ├── grid-layout/         # Grid layout
│   ├── user-provider/       # User provider
│   ├── i18n/                # i18n utilities
│   └── utils.ts             # Utility functions
├── .storybook/              # Storybook configuration
├── package.json
└── tsconfig.json
```

### Component Organization

Each component typically has:

- Component file (`*.tsx`)
- Index file (`index.ts`) for exports
- Storybook stories (`*.stories.tsx`) for documentation
- Type definitions (inline or separate)

#### `src/site-3d-viewer/`

- **Purpose:** 3D site visualization component
- **Structure:**
  - `site-3d-viewer.tsx` - Main component
  - `components/scene/` - 3D scene components
  - `components/equipment/` - Equipment 3D models
  - `components/controls/` - UI controls
  - `components/interactions/` - Interaction handlers
  - `components/ui/` - UI overlays
  - `hooks/` - Custom hooks
  - `types/` - Type definitions
  - `utils/` - Utility functions

## Types Package (packages/types)

### Root Structure

```
packages/types/
├── src/
│   └── index.ts            # Type exports
├── package.json
└── tsconfig.json
```

**Purpose:** Shared TypeScript type definitions used across all apps and packages.

## Monorepo Root

### Key Files

- `package.json` - Root package.json with workspace configuration
- `pnpm-workspace.yaml` - pnpm workspace definition
- `turbo.json` - Turborepo build configuration
- `tsconfig.json` - Root TypeScript configuration
- `docker-compose.yml` - Docker Compose for services
- `docker-compose.dev.yml` - Development Docker Compose
- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier configuration

## File Naming Conventions

- **TypeScript files:** `*.ts` (logic), `*.tsx` (React components)
- **Test files:** `*.spec.ts`, `*.test.ts`
- **Configuration:** `*.config.ts`, `*.config.js`
- **DTOs:** `create-*.dto.ts`, `update-*.dto.ts`
- **Modules:** `*.module.ts` (NestJS)
- **Services:** `*.service.ts` (NestJS)
- **Controllers:** `*.controller.ts` (NestJS)

## Architecture Patterns

### Backend (NestJS)

- **Layered Architecture:** Controller → Service → Repository (Prisma)
- **Module Pattern:** Feature-based modules with clear boundaries
- **Dependency Injection:** NestJS DI container
- **Guards:** Authentication and authorization
- **Interceptors:** Response formatting, logging
- **Filters:** Exception handling

### Frontend (React)

- **Component-Based:** Functional components with hooks
- **Feature-Based Structure:** Organized by features/screens
- **Context API:** State management for auth, i18n
- **Custom Hooks:** Data fetching, business logic
- **Service Layer:** API client abstraction

### Shared Libraries

- **Package-Based:** Separate packages for UI and types
- **Workspace Dependencies:** `workspace:*` protocol
- **Type Safety:** Shared types across monorepo

_Sources: Source code analysis (exhaustive scan)_
