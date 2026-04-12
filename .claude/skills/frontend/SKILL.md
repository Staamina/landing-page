---
name: staamina-frontend
description: Staamina frontend development patterns for React, TanStack Query, React Hook Form, Zustand, and component organization. Use when writing, reviewing, or refactoring frontend code in apps/headquarter-system/ or apps/field-maintenance-system/.
---

# Staamina Frontend

Frontend development rules and patterns for the Staamina React applications.

## When to Use This Skill

- Writing or modifying React components in `apps/headquarter-system/` or `apps/field-maintenance-system/`
- Implementing data fetching with TanStack Query
- Building forms with React Hook Form + Zod validation
- Managing state with Zustand stores
- Writing frontend tests with Vitest and Testing Library

## Key Rules

### Coding style

- Declarative over Imperative: Favor event-driven props over passing state setters directly.
  -Preferred: <Component onXXX={handleXXX} />
  -Avoid: <Component setXXX={setXXX} />
- Immutability: Never mutate arrays or objects. Instead of using .push(), create a new reference using the spread operator: [...old, newItem].
- Functional Patterns: Prioritize native immutable methods such as .map(), .filter(), and .reduce() for data transformation.

### State Management

- **Server state** -> TanStack Query (NEVER useEffect + fetch)
- **Client state** -> Zustand (complex) or Context (simple). No Redux.
- **Form state** -> React Hook Form ONLY (no useState for form fields)

### TanStack Query Patterns

- Query keys: `['entity']`, `['entity', id]`, `['entity', id, 'relation']`
- Use `getResponseData()` helper — throws on `!success`
- Custom hooks in `hooks/` wrapping queries and mutations

### Forms

- Always `useForm` + `zodResolver` + co-located schema (`MyComp.schema.ts`)
- Zod schema file next to the component

### Component Organization

```
services/     -> API calls
hooks/        -> Custom hooks (queries, mutations, logic)
view/
  components/ -> Reusable UI components
  pages/      -> Route pages (headquarter-system)
screens/      -> Route screens (field-maintenance-system)
stores/       -> Zustand stores
types/        -> TypeScript types
```

### Testing

- Use `@testing-library/user-event` (NEVER `fireEvent`)
- Test user behavior, not implementation details
- Mock API calls, not internal hooks

### I18n

- No hardcoded strings — use `t('key')` translation keys
- Custom i18n system (not react-i18next): JSON files in `i18n/locales/`

## Reference Files

- `packages/ui/` — Shared component library (@staamina/ui)
- `packages/types/` — Shared TypeScript types (@staamina/types)
