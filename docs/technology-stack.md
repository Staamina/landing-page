# Technology Stack Analysis

**Generated:** 2026-01-07  
**Scan Level:** Exhaustive

## Overview

This monorepo uses a modern TypeScript-based stack with Turborepo for monorepo management and pnpm for package management.

## Monorepo Infrastructure

| Category        | Technology | Version | Justification                           |
| --------------- | ---------- | ------- | --------------------------------------- |
| Package Manager | pnpm       | 8.15.0  | Fast, disk-efficient, workspace support |
| Monorepo Tool   | Turborepo  | 2.0.0   | Build system and task orchestration     |
| Language        | TypeScript | 5.3.3   | Type safety across all packages         |
| Node Version    | Node.js    | >=18    | Modern runtime features                 |

## Backend (apps/backend)

| Category       | Technology        | Version | Justification                                               |
| -------------- | ----------------- | ------- | ----------------------------------------------------------- |
| Framework      | NestJS            | 10.3.0  | Enterprise-grade Node.js framework with DI, modules, guards |
| Language       | TypeScript        | 5.3.3   | Type safety, strict mode enabled                            |
| ORM            | Prisma            | 5.9.1   | Type-safe database access, migrations                       |
| Database       | PostgreSQL        | -       | Relational database for structured data                     |
| Authentication | Logto             | 1.0.0   | OAuth2/OpenID Connect identity provider                     |
| JWT            | @nestjs/jwt       | 10.2.0  | JWT token validation with JWKS                              |
| Passport       | @nestjs/passport  | 10.0.3  | Authentication strategies                                   |
| Logging        | Pino              | 8.17.2  | Fast, structured JSON logging                               |
| API Docs       | Swagger/OpenAPI   | 7.1.17  | Auto-generated API documentation                            |
| Validation     | class-validator   | 0.14.0  | DTO validation                                              |
| Transformation | class-transformer | 0.5.1   | Object transformation                                       |
| Testing        | Jest              | 29.7.0  | Unit and integration testing                                |

### Architecture Pattern

- **Modular Monolith**: NestJS module-based architecture
- **Layered Architecture**: Controllers → Services → Repositories (Prisma)
- **Dependency Injection**: NestJS DI container
- **Global Interceptors**: Response formatting, exception handling
- **Global Guards**: JWT authentication, role-based access control

## Field Maintenance System (apps/field-maintenance-system)

| Category       | Technology      | Version      | Justification                                   |
| -------------- | --------------- | ------------ | ----------------------------------------------- |
| Framework      | React           | 18.2.0       | UI library for building user interfaces         |
| Build Tool     | Vite            | 5.0.8        | Fast development server and build tool          |
| Language       | TypeScript      | 5.2.2        | Type safety                                     |
| Routing        | React Router    | 6.21.0       | Client-side routing                             |
| Authentication | Logto React     | 2.0.0        | Frontend authentication integration             |
| Data Fetching  | TanStack Query  | 5.17.0       | Server state management, caching                |
| Forms          | React Hook Form | -            | Form state management (via @hookform/resolvers) |
| Styling        | Tailwind CSS    | 3.3.6        | Utility-first CSS framework                     |
| PWA            | Vite PWA Plugin | 0.17.4       | Progressive Web App support                     |
| UI Library     | @staamina/ui    | workspace:\* | Shared component library                        |

### Architecture Pattern

- **Component-Based**: React functional components with hooks
- **Feature-Based Structure**: Organized by screens, components, services
- **Client-Side Routing**: React Router for navigation
- **State Management**: TanStack Query for server state, React Context for app state

## Headquarter System (apps/headquarter-system)

| Category        | Technology             | Version | Justification                      |
| --------------- | ---------------------- | ------- | ---------------------------------- |
| Framework       | React                  | 18.2.0  | UI library                         |
| Build Tool      | Vite                   | 5.0.8   | Fast development and build         |
| Language        | TypeScript             | 5.2.2   | Type safety                        |
| Routing         | React Router           | 6.21.0  | Client-side routing                |
| Authentication  | Logto React            | 2.0.0   | Frontend authentication            |
| Data Fetching   | TanStack Query         | 5.17.0  | Server state management            |
| Tables          | TanStack Table         | 8.11.0  | Powerful table/data grid component |
| Forms           | React Hook Form        | 7.49.3  | Form state management              |
| Validation      | Zod                    | 4.2.1   | Schema validation                  |
| Styling         | Tailwind CSS           | 3.3.6   | Utility-first CSS                  |
| Testing         | Vitest                 | 1.0.4   | Fast unit testing framework        |
| Testing Library | @testing-library/react | 14.1.2  | React component testing            |

### Architecture Pattern

- **Component-Based**: React functional components
- **Feature-Based Structure**: Organized by features/modules
- **Data Tables**: TanStack Table for complex data grids
- **Form Validation**: Zod schemas with React Hook Form

## Landing Page (apps/landing-page)

| Category             | Technology      | Version      | Justification                          |
| -------------------- | --------------- | ------------ | -------------------------------------- |
| Framework            | Next.js         | 14.2.35      | React framework with SSR, SSG, routing |
| Language             | TypeScript      | 5.3.3        | Type safety                            |
| Internationalization | next-intl       | 3.5.0        | i18n for Next.js                       |
| Forms                | React Hook Form | 7.49.3       | Form state management                  |
| Validation           | Yup             | 1.4.0        | Schema validation                      |
| Tables               | TanStack Table  | 8.11.0       | Data tables                            |
| UI Components        | Radix UI        | 1.0.5        | Accessible component primitives        |
| Styling              | Tailwind CSS    | 3.4.1        | Utility-first CSS                      |
| Icons                | Lucide React    | 0.309.0      | Icon library                           |
| UI Library           | @staamina/ui    | workspace:\* | Shared component library               |

### Architecture Pattern

- **Next.js App Router**: File-based routing (if using app directory)
- **Server Components**: React Server Components for performance
- **Internationalization**: Multi-language support with next-intl
- **Static Generation**: Pre-rendering for performance

## UI Component Library (packages/ui)

| Category      | Technology        | Version | Justification                       |
| ------------- | ----------------- | ------- | ----------------------------------- |
| Framework     | React             | 18.2.0  | Component library base              |
| Language      | TypeScript        | 5.3.3   | Type safety                         |
| Build Tool    | Vite              | 5.1.0   | Component development and build     |
| Storybook     | Storybook         | 8.1.0   | Component documentation and testing |
| UI Primitives | Radix UI          | Various | Accessible, unstyled components     |
| 3D Rendering  | React Three Fiber | 8.15.0  | 3D graphics for site viewer         |
| 3D Utilities  | @react-three/drei | 9.88.0  | Helpers for React Three Fiber       |
| 3D Engine     | Three.js          | 0.158.0 | 3D graphics library                 |
| Styling       | Tailwind CSS      | 3.4.1   | Utility-first CSS                   |
| Icons         | Lucide React      | 0.309.0 | Icon library                        |
| Tables        | TanStack Table    | 8.11.0  | Table component                     |
| Data Fetching | TanStack Query    | 5.17.0  | For components that need data       |

### Architecture Pattern

- **Component Library**: Reusable UI components
- **Storybook-Driven**: Component documentation and visual testing
- **3D Components**: Site 3D viewer for equipment visualization
- **Accessibility**: Radix UI primitives for accessible components

## Types Package (packages/types)

| Category  | Technology   | Version | Justification                           |
| --------- | ------------ | ------- | --------------------------------------- |
| Language  | TypeScript   | 5.3.3   | Type definitions only                   |
| Structure | Shared Types | -       | Common type definitions across monorepo |

### Architecture Pattern

- **Shared Types**: Common TypeScript types and enums
- **Workspace Package**: Imported by all apps and packages

## Development Tools

| Category      | Technology | Version | Justification                    |
| ------------- | ---------- | ------- | -------------------------------- |
| Linting       | ESLint     | 8.56.0  | Code quality and consistency     |
| Formatting    | Prettier   | 3.2.5   | Code formatting                  |
| Type Checking | TypeScript | 5.3.3   | Static type checking             |
| Git Hooks     | Husky      | -       | Pre-commit hooks (if configured) |

## Summary

- **Backend**: NestJS modular monolith with Prisma ORM, PostgreSQL, Logto authentication
- **Frontend Apps**: React with Vite (field-maintenance, headquarter) and Next.js (landing-page)
- **Shared Libraries**: UI component library with Storybook, shared TypeScript types
- **Monorepo**: Turborepo + pnpm for efficient builds and dependency management
- **Common Patterns**: TypeScript strict mode, Tailwind CSS, TanStack Query, Logto authentication
