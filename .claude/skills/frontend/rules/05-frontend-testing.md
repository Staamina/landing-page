---
section: 'frontend/frontend-testing'
parent: 'project-context'
rule_count: 18
last_updated: '2026-01-17'
---

# 🧪 Frontend Testing (Vitest/RTL)

## 📂 Organization

- **Unit:** Co-locate `.test.tsx` & `.mock.ts` next to component.
- **Integration:** Use `__tests__` folder.

## ⚠️ Critical Constraints (FATAL)

- **Interaction:** **`userEvent`** (async/await) ONLY. `fireEvent` is FORBIDDEN.
- **Mock Data:** IDs MUST use `uuidv4()`. NO hardcoded strings ('123', 'id-1').
- **Fixtures:** Import large mocks from `.mock.ts`.

## 🧠 Philosophy & Pattern

- **Scope:** Test User Behavior (Render -> Click -> Result). Ignore internal state/methods.
- **Queries:** Use accessible queries (`getByRole`, `getByText`). Avoid `data-testid`.
- **Flow:** Arrange -> Act -> Assert.
