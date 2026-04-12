---
section: 'technology-stack'
parent: 'project-context'
rule_count: 7
last_updated: '2026-01-16'
---

# Technology Stack & Versions

## Monorepo Architecture

- pnpm 8.15.0 (workspace manager)
- Turbo 2.0.0 (build orchestration)
- TypeScript 5.3.3 (strict mode) - MUST be uniform across all workspaces
- Node.js >=18

## Backend (NestJS)

- @nestjs/common, @nestjs/core 10.3.0
- @prisma/client 5.9.1
- Valkey (Redis fork) for caching, sessions, job queues
- Zitadel (self-hosted) for OIDC authentication
- @nestjs/passport 10.0.3 + passport-jwt 4.0.1
- nestjs-pino 4.0.0 + pino 8.17.2
- jest 29.7.0 + ts-jest 29.1.1

## Frontend (React + Vite)

- react, react-dom 18.2.0 - CRITICAL: Must be identical across ALL apps and @staamina/ui
- vite 5.0.8+ (field-maintenance-system, headquarter-system) - Should harmonize to 5.1.0
- react-router-dom 6.21.0
- @tanstack/react-query 5.17.0 - CRITICAL: Must match across apps (peer dependency)
- @zitadel/react ^1.0.0 + oidc-client-ts ^3.1.0 - Frontend OIDC SDK
- tailwindcss 3.3.6+ (Vite apps can differ from Next.js app)

## Frontend (Next.js)

- next 14.2.35 (landing-page)
- next-intl 3.5.0
- tailwindcss 3.4.1 - OK to differ from Vite apps

## Shared UI (@staamina/ui)

- @radix-ui/\* 2.0+
- @react-three/fiber 8.15.0, @react-three/drei 9.88.0, three 0.158.0 - Lock three.js to 0.158.x
- storybook 8.1.0
- class-variance-authority 0.7.0

## Critical Version Constraints

1. React 18.2.0 - NEVER update in isolation, must update ALL workspaces simultaneously
2. @tanstack/react-query 5.17.0 - Must match between apps and UI package (peer dep)
3. TypeScript 5.3.3 - Must be uniform, defined in root, no overrides in sub-packages
4. @zitadel/react + oidc-client-ts - Check compatibility before updating
5. three.js 0.158.x - Breaking changes in minor versions, stay on 0.158.x
6. workspace:_ protocol - NEVER replace with npm versions for @staamina/_ packages
7. Tailwind CSS - Vite apps on 3.3.6+, Next.js on 3.4.1+ (acceptable difference)
