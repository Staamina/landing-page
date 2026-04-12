---
section: 'architecture/architecture-decisions'
parent: 'project-context'
rule_count: 6
last_updated: '2026-01-16'
---

# Architecture Decisions Summary (2026-01-09)

**Full Details:** See `_bmad-output/planning-artifacts/architecture.md`

## Data Architecture

- PostgreSQL (primary) + Valkey (Redis fork for cache/sessions/queues)
- Multi-tenancy: Row-level isolation with `companyId` FK on all business entities
- Prisma Migrate for database migrations

## Authentication & Security

- Zitadel (self-hosted) for OIDC authentication
- JWT tokens with RBAC (Role-Based Access Control)
- Guards: `JwtAuthGuard` (backend), `ProtectedRoute` (frontend)
- **Resource-Based Authorization:** Users can only access resources they're assigned to
  - Use `@RequireResourceAccess()` decorator + `ResourceAccessGuard` for resource endpoints
  - SuperAdministrator: Full access to all resources
  - Administrator: Only assigned Company and its Sites
  - SiteManager: Only assigned Site and parent Company
  - Other roles: Only directly assigned resources
- **Multi-Tenant Isolation:** All list endpoints MUST filter by `companyId` from user context
  - Never return all resources - always scope to user's company
  - For regular users: Extract `companyId` from `user.dbUser.companyId`
  - **SuperAdmin `companyId` resolution (CRITICAL):** SuperAdmin users have NO `companyId` on their `dbUser`. Every company-scoped backend controller MUST use the `resolveCompanyId` pattern:
    ```typescript
    // Backend controller: accept optional ?companyId= query param
    @ApiQuery({ name: 'companyId', required: false })
    findAll(@CurrentUser() user: RequestUser, @Query('companyId') queryCompanyId?: string) {
      const companyId = this.resolveCompanyId(user, queryCompanyId);
      // ...
    }
    private resolveCompanyId(user: RequestUser, queryCompanyId?: string): string {
      const userCompanyId = user.dbUser?.companyId;
      if (userCompanyId) return userCompanyId;       // Regular user
      if (queryCompanyId) return queryCompanyId;     // SuperAdmin with selected company
      throw new BadRequestException('companyId query parameter is required for SuperAdmin users');
    }
    ```
    Frontend hooks MUST pass `companyId` **only when `isSuperAdmin` is true** (from `useCurrentSelection()`). Regular users (Administrator, SiteManager) MUST NOT send `companyId` — the backend resolves it from their JWT. Pattern: `isSuperAdmin ? (currentCompanyId ?? undefined) : undefined`. Always include `currentCompanyId` in TanStack Query keys so data refetches on company change.
    If the controller also uses `@Query() dto: SomeQueryDto`, add `companyId` as `@IsOptional() @IsUUID()` field in the DTO to avoid `forbidNonWhitelisted` rejection.
  - Reference: `_bmad-output/planning-artifacts/resource-based-authorization-architecture.md`

## Reference Data — Template Inheritance & Merge Resolution

Reference entities (Category, Issue, IssueGroup) follow a **template inheritance model**:

- **Templates** = global standard data (`siteId: null`, `companyId: null`). They define the base catalog shared by everyone.
- **Site overrides** = company/site-specific entries that **shadow** a template when they share the same `code`.
- Templates are **NOT copies** — they are references that get resolved at query time.

### Resolution rule (Merge & Resolve)

When querying reference data for a given site, **always apply this pattern**:

```typescript
// 1. Fetch templates
const templates = await prisma.entity.findMany({
  where: { siteId: null, isActive: true },
});
// 2. Fetch site-specific overrides
const siteItems = await prisma.entity.findMany({
  where: { siteId, isActive: true },
});
// 3. Merge by code — site override wins
const siteMap = new Map(
  siteItems.filter((i) => i.code).map((i) => [i.code, i])
);
const resolved = templates.map((t) => siteMap.get(t.code!) ?? t);
// 4. Add site-only items (no matching template)
```

The resolved item's `id` is either the site-specific ID (if an override exists) or the template ID.
The `source` field is `'merged'` | `'template'` | `'site'`.

### Critical rule: always match what is displayed

**Any service that needs to resolve a reference entity (category, issue, issueGroup) MUST use this merge pattern**, not a raw OR query like `{ companyId } OR { companyId: null }`.

This ensures that:

- The IDs returned match exactly what the user sees in the UI dropdowns.
- A template ID is never returned if a site override exists for it.
- Site-only entities (not derived from templates) are included.

**Applies to:** AI matching, reporting, validation, auto-assignment — any code that resolves reference data outside of the canonical service methods.

**Existing canonical implementations to reuse or replicate:**

- `CategoriesService.findAllForSite(siteId)` — `apps/backend/src/modules/catalog/categories/categories.service.ts`
- `IssuesService.findAllForSite(siteId)` — `apps/backend/src/modules/catalog/issues/issues.service.ts`
- `IssueGroupsService.findAllForSite(siteId)` — `apps/backend/src/modules/catalog/issue-groups/issue-groups.service.ts`

**Zones** are the exception: they have no template inheritance. Zone queries simply filter by `siteId`.

## Incident Status — Read-Model Rule (CRITICAL)

`Incident.status` is a **read-optimized projection** of the workflow state. It exists for fast queries, filters, and reporting.

**The ONLY place allowed to write `Incident.status` is the workflow execution engine:**

- ✅ `apps/backend/src/modules/workflows/execution/execution.service.ts` — updates status via `nextStepDef.incidentStatus` inside a transaction
- ❌ Any other service (assignment, quotes, incidents, etc.) MUST NOT call `prisma.incident.update({ data: { status: ... } })` directly

**How it works:** Each workflow step definition can declare an `incidentStatus` field. When the engine transitions to that step, it updates `Incident.status` atomically in the same transaction.

**Known violations to fix:**

- `assignment.service.ts` — sets `ASSIGNED` directly → must be handled via workflow step
- `manual-assignment.service.ts` — sets `ASSIGNED` directly → must be handled via workflow step
- `quotes.service.ts` — sets `QUOTE_PENDING` directly → must be handled via workflow step

**Why:** Bypassing the workflow engine creates two diverging sources of truth (`Incident.status` vs `WorkflowInstance.currentStepId`). If a service sets the status directly, the workflow engine may override it or contradict it on the next transition.

## API Standards

- REST + WebSocket (Socket.io) for real-time
- OpenAPI/Swagger auto-generated from NestJS decorators
- **Standard API Response Format:**
  ```typescript
  interface ApiResponse<T> {
    success: boolean;
    data: T | null;
    pagination: PaginationMeta | null;
    error: { code: string; message: string; details?: any } | null;
    statusCode: number;
    timestamp: string;
  }
  ```

## Frontend State Management

- **Zustand:** Global UI state (sidebar, theme, user preferences)
- **TanStack Query:** Server state (caching, fetching, mutations)
- Query Key Convention: `['entity', id?, 'relation?']`

## AI Integration

- DeepSeek API (cost-effective LLM)
- Use case: Incident text extraction (pre-fill forms)
- Auto-assignment: Algorithmic scoring first, AI if needed later
- Prompt control: Backend templates only, user provides data
- Fallback: Manual form always available

## Monitoring Stack

- Sentry (self-hosted) for error tracking
- Uptime Kuma for uptime monitoring
- Dozzle for Docker log visualization
- AI usage logging (tokens, cost, latency)

## Deployment

- Frontend: Vercel
- Backend: VPS OVH (Docker self-hosted)
- CI/CD: GitHub Actions -> GitHub Container Registry (ghcr.io)
