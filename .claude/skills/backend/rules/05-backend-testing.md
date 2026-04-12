---
section: 'backend/backend-testing'
parent: 'project-context'
rule_count: 21
last_updated: '2026-01-17'
---

# 🧪 Backend Testing (NestJS/Jest)

## 📂 Organization

- **Unit:** Co-locate `.spec.ts` & `.mock.ts` next to source (e.g., `auth.service.ts` -> `auth.service.spec.ts`).
- **E2E:** Use `test/` or `__tests__` folder.
- **Fixtures:** Large mock objects MUST go in `.mock.ts`. Inline mocks forbidden.

## ⚠️ Critical Constraints (FATAL)

- **IDs:** MUST use `uuidv4()`. **NO** hardcoded strings ('123', 'id-1').
- **Scope:** Test Business Logic (Service) & HTTP Mapping (Controller).
- **Database:** **NEVER** test actual Prisma queries in unit tests. Mock the `PrismaService`.
- **Flow:** Arrange -> Act -> Assert. Reset mocks `beforeEach`.
