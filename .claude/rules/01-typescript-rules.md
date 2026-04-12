---
section: 'shared/typescript-rules'
parent: 'project-context'
rule_count: 20
last_updated: '2026-01-16'
---

# Language-Specific Rules (TypeScript)

## TypeScript Configuration

- Strict mode MUST be enabled in all tsconfig.json files
- strictNullChecks, noImplicitAny, strictBindCallApply required
- NEVER disable strict checks to fix type errors - fix the types instead
- Backend requires experimentalDecorators + emitDecoratorMetadata for NestJS
- forceConsistentCasingInFileNames prevents cross-platform issues

## Import/Export Conventions

- Backend: Use `@/*` path alias for internal imports (maps to src/\*)
- Workspaces: Use `@staamina/types` and `@staamina/ui` for shared packages
- NEVER use relative imports that go up more than 2 levels (../../..) - use aliases
- Backend uses CommonJS (module: commonjs), frontend uses ESM (module: ESNext)
- Always use named exports, avoid default exports except for React components

### Backend-Specific Import Paths (CRITICAL — do NOT guess)

These paths are project-specific and differ from standard NestJS/Prisma conventions:

```typescript
// ❌ WRONG — standard Prisma import (does NOT work in this project)
import { MyEnum } from '@prisma/client';
// ✅ CORRECT — custom re-export from generated client
import { MyEnum } from '@/prisma-client';

// ❌ WRONG — common NestJS convention (does NOT exist)
import { PrismaService } from '@/prisma/prisma.service';
// ✅ CORRECT — actual location in this project
import { PrismaService } from '@/core/common/services/prisma.service';
```

- **Prisma types/enums:** Always import from `@/prisma-client` (re-exports `generated/prisma/client.js`)
- **PrismaService:** Always import from `@/core/common/services/prisma.service`

## Type Safety

- NEVER use `any` type - use `unknown` and type guards instead
- Define explicit return types for all exported functions
- Use const assertions for literal types: `as const`
- Prefer interfaces for objects, type aliases for unions/intersections
- NestJS: Use DTOs with class-validator decorators for validation

## Function Signatures with Object Payloads

- ALWAYS use object payloads for function parameters when a function takes 2+ parameters
- Object payloads provide more flexible and maintainable function signatures
- Benefits: Easy to extend, named parameters, optional properties, better readability
- NEVER use multiple positional parameters when an object payload would be clearer
- Pattern: `function doSomething(payload: { param1: string; param2: number; param3?: boolean })`
- For single parameter functions, object payload is optional but recommended for consistency

Example:

```typescript
// BAD - Multiple positional parameters
function createUser(
  name: string,
  email: string,
  role: string,
  companyId: string
) {
  // Hard to extend, easy to mix up parameter order
}

// GOOD - Object payload
function createUser(payload: {
  name: string;
  email: string;
  role: string;
  companyId: string;
}) {
  // Easy to extend, clear parameter names, can add optional properties
}

// GOOD - Single parameter can also use object for consistency
function getUserById(payload: { id: string }) {
  // Consistent pattern, easy to extend later
}
```

## Async/Await Patterns

- Always use async/await, avoid raw Promises
- NestJS controllers: Return promises directly, framework handles them
- React: Use TanStack Query for data fetching, not useEffect with fetch
- NEVER forget error handling in async functions
