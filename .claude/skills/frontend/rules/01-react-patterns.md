---
section: 'frontend/react-patterns'
parent: 'project-context'
rule_count: 50
last_updated: '2026-01-18'
---

# Frontend Patterns (Vite & Next.js)

## ⚛️ React Core

- **Type:** Functional components ONLY. No Class components.
- **Props:** Destructure immediately: `({ prop1 }: Props)`. Never mutate.
- **Render:** Use `&&` or ternary. No `if/else` inside JSX.
- **Naming:** `handleAction` for events.
- **Hooks:**
  - Prefix custom hooks with `use`.
  - **FATAL:** Custom hooks returning objects MUST use `useMemo`.
  - **FATAL:** Context values & Provider configs MUST be memoized (`useMemo`/`useCallback`).
  - `useEffect`: **LAST RESORT**. Use derived state, event handlers, or Query first.

## 💾 State Management

- **Server:** **TanStack Query** ONLY. No `useEffect` fetching. No Redux.
- **Global UI:** **Zustand** (sidebar, theme) or Context (simple).
- **Local:** `useState`/`useReducer`.
- **Auth:** Single `UserProvider` source. Persistent `wasAuthenticated` state (prevent flicker).

## ⚡ Performance (FATAL)

- **Providers:** Never inline objects `config={{...}}` (causes re-mounts).
- **Routing:**
  - **BAD:** `<ProtectedRoute>` on every route.
  - **GOOD:** Single `<ProtectedRoute>` wrapper around `<Routes>`.
- **Cycles:** Dev mount=2, Prod mount=1.

## 🌐 Internationalization (I18n)

- **Rule:** **NO HARDCODED STRINGS** in JSX.
- **Usage:** `t('button.submit')`.
- **Libs:** `react-i18next` (Vite) / `next-intl` (Next.js).
- **Exception:** Tech logs/errors in English.

## 🚀 Next.js Specific

- **Router:** App Router (`app/`).
- **Data:** Fetch in Server Components. `use client` only for interactivity.

## 🛡️ Routing (React Router v6)

- Syntax: `useNavigate`.
- Load: `React.lazy()` for code splitting.

## 🧹 Code Style

- **Declarative:** `.map`, `.filter`, `.reduce`. No loops/push.
- **Immutability:** `const` by default.
- **Clarity:** Self-documenting names > Comments.
