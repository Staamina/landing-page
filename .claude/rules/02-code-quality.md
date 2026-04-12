---
section: 'shared/code-quality'
parent: 'project-context'
rule_count: 35
last_updated: '2026-01-16'
---

# Code Quality & Style Rules

## Prettier Configuration (Enforced)

- Single quotes for strings
- Semicolons required
- 2-space indentation (no tabs)
- 80 character line width
- Trailing commas (ES5 style)
- NEVER disable Prettier rules or format manually
- Run `pnpm format` before committing

## File Naming Conventions

- Backend files: kebab-case (auth.service.ts, user.controller.ts)
- React components: PascalCase (MyComponent.tsx, UserProfile.tsx)
- Utilities/helpers: camelCase (formatDate.ts, apiClient.ts)
- Types/interfaces: PascalCase (User.ts, ApiResponse.ts)
- Constants: UPPER_SNAKE_CASE files or const declarations
- DO NOT mix naming conventions within same directory

## Code Organization

- Group imports: external -> workspace -> relative
- Sort imports alphabetically within groups
- One component per file (except small related sub-components)
- Keep files under 300 lines (refactor if larger)
- Barrel exports (index.ts) for public API of modules

Example import order:

```typescript
// External dependencies
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Workspace packages
import { User } from '@staamina/types';
import { Button } from '@staamina/ui';

// Relative imports
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
```

## Naming Conventions

- Variables/functions: camelCase (userData, handleClick, getUserById)
- Classes/Components: PascalCase (UserService, MyComponent)
- Interfaces: PascalCase with descriptive suffix (UserProps, ApiResponse)
- Types: PascalCase (UserId, AuthToken)
- Enums: PascalCase with UPPER_CASE values
- Constants: UPPER_SNAKE_CASE (API_BASE_URL, MAX_RETRY_COUNT)
- Private class members: prefix with \_ (private \_connection)
- Boolean variables: is/has/should prefix (isActive, hasPermission, shouldRetry)
- NEVER use single-letter variable names (except in very short lambda functions)
- NEVER use generic numbered names (x1, x2, data1, data2, temp, tmp)
- Variable names MUST describe what they contain or represent

## Immutability Rules

- NEVER mutate objects passed as function arguments
- ALWAYS create new objects/arrays instead of modifying existing ones
- Use spread operator for shallow copies: { ...obj }, [...array]
- Use structuredClone() for deep copies when needed

## Code Documentation

- Document WHY, not WHAT
- Complex business logic requires explanation comments
- Public APIs need JSDoc comments
- DO NOT comment obvious code
- DO NOT leave commented-out code (use git history)
- TODO comments must include ticket number: // TODO(STAM-123): Fix edge case
- CRITICAL: ALL comments MUST be in English - Never use French or other languages

## Error Handling

- Use specific error types, not generic Error
- Include context in error messages
- Log errors with appropriate level (error, warn, info)
- Backend: Use NestJS exception filters
- Frontend: Use error boundaries for component errors
- NEVER swallow errors silently (empty catch blocks)
- NEVER log and rethrow (log OR rethrow, not both)

## Performance Considerations

- Avoid premature optimization
- Measure before optimizing
- Use React.memo() only when proven beneficial
- Lazy load routes and heavy components
- Debounce user input handlers

## Storybook Coverage (@staamina/ui)

- Every atom, molecule, and organism in `packages/ui/src/` MUST have a co-located `*.stories.tsx` file
- Stories MUST use `tags: ['autodocs']` for automatic documentation
- Stories MUST showcase all variants/props of the component
- Include an `AllVariants` story when the component has multiple visual variants
- When creating or modifying a UI component, always verify the corresponding story exists and update it if props changed
- DO NOT merge a new UI component without its Storybook story

## Security Rules

- Never commit secrets, API keys, or passwords
- Use environment variables for configuration
- Sanitize user input before using in queries
- Validate all DTOs with class-validator
- Use parameterized queries (Prisma handles this)
- NEVER construct SQL/queries with string concatenation
- NEVER trust client-side data without validation
