---
section: 'frontend/react-hook-form'
parent: 'project-context'
rule_count: 14
last_updated: '2026-01-17'
---

# 📋 Forms & Validation (RHF + Zod)

## ⚠️ FATAL Constraints

- **Stack:** **React Hook Form** ONLY. No `useState` for form state.
- **Validation:** **Zod Schema** via `zodResolver` ONLY. No manual validation or HTML5 attributes.
- **I18n:** Validation messages MUST use translation keys (e.g., `z.string().min(1, t('error.required'))`).

## 🏗️ Implementation Pattern

- **Structure:** Co-locate schema: `MyForm.schema.ts` next to `MyForm.tsx`.
- **Typing:** ALWAYS derive types via `export type MyData = z.infer<typeof schema>`.
- **Access:** Use `formState.errors` for UI feedback.
