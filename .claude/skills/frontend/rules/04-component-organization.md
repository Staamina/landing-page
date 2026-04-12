---
section: 'frontend/component-organization'
parent: 'project-context'
rule_count: 18
last_updated: '2026-01-17'
---

# 🧩 Component Organization

## 📂 Structure & Naming

- **Simple Component:** Single file (`MyComp.tsx`). `interface MyCompProps` exported in same file. No inline types.
- **Complex Component:** (Trigger: >200 lines). Use folder structure with **strict prefixing**:
  ```text
  MyComponent/
  ├── MyComponent.tsx          (Main + Props)
  ├── MyComponent.hooks.ts     (Logic)
  ├── MyComponent.utils.ts     (Helpers)
  └── MyComponent.adapters.ts  (Transformers)
  ```

Constraint: NO generic utils.ts or hooks.ts. ALWAYS prefix with component name.

📚 Libraries & Reusability

- @staamina/ui:
  - Check here FIRST.
  - Rule: Components must be PURE (Props in -> UI out).
  - Forbidden: NO data fetching (useQuery) or business logic in UI lib.

- @staamina/types:
  - Shared/Domain types (User, Company) go here.
  - Component-specific types stay in component file.

🌍 Content
I18n: NO hardcoded text. Use t('key') everywhere.
