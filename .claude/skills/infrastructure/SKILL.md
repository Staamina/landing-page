---
name: staamina-infrastructure
description: Staamina infrastructure expert with full context of Docker stacks, CI/CD workflows, networking, deployment procedures, and the Claude bot. Use when debugging infrastructure issues, discussing deployment, Docker configs, GitHub Actions, Portainer stacks, or the GitHub webhook bot.
---

# Staamina Infrastructure

Expert context on the full Staamina infrastructure: Docker stacks on OVH VPS, CI/CD on GitHub Actions, Vercel frontends, and the GitHub Claude bot.

## When to Use This Skill

- Debugging deployment issues (backend, bot, frontends)
- Discussing Docker/Portainer stack configuration
- Reviewing or modifying GitHub Actions workflows
- Understanding service networking and communication
- Configuring or troubleshooting the Claude bot (webhook agent)
- Discussing secrets, env vars, or resource limits
- Planning infrastructure changes or migrations

---

## Deployment Architecture

```
VPS OVH (Docker + Portainer)
├── stack-data.yml        → PostgreSQL 16, Valkey 7.2, MinIO
├── stack-backend.yml     → NestJS API (port 4000)
├── stack-auth.yml        → Logto (OIDC), Logto DB
├── stack-monitoring.yml  → Dozzle + Uptime Kuma
└── stack-claude-bot.yml  → GitHub webhook agent (port 3333)

Vercel (frontends, auto-deployed on PR)
├── headquarter-system   → HQ React app
├── field-maintenance-system → FSM React PWA
├── landing-page          → Next.js marketing
└── storybook             → @staamina/ui docs

GHCR (ghcr.io/marwen-cherif/)
├── staamina-backend      → tagged by semver (v1.2.3)
└── staamina-claude-bot   → tagged latest + SHA
```

---

## Docker Stacks — Key Details

### stack-data.yml

- **PostgreSQL 16** — `staamina-postgres`, port `127.0.0.1:5432` (localhost only), resources: 2 CPU / 2GB, backup: daily
- **Valkey 7.2** — `staamina-valkey`, internal only (6379), 512MB maxmemory LRU, RDB + AOF persistence
- **MinIO** — `staamina-minio`, ports `9002:9000` (API) + `9001:9001` (console), backup: daily
- Network: `staamina-backend-network` (internal) + `sas_network` (external)

### stack-backend.yml

- **NestJS API** — `staamina-backend`, image `ghcr.io/marwen-cherif/staamina-backend:${APP_VERSION:-latest}`
- Port 4000 (internal), healthcheck: `GET /api/v1/health` every 30s, start period 120s
- Resources: 2 CPU / 1GB (256MB reservation)
- Deployment: `start-first` with auto-rollback
- **To deploy a new version:** In Portainer → Stacks → `staamina-backend` → update `APP_VERSION=v1.2.3` → "Update the stack"
- **Critical:** `APP_VERSION` format is `v1.2.3` NOT `v-1.2.3`

### stack-auth.yml

- **Logto** — `staamina-logto`, image `svhd/logto:latest`, ports 3001 (API) + 3002 (Admin)
- Has own PostgreSQL: `staamina-logto-db`
- Runs migrations on startup (~30s)
- Network: `staamina-logto-network` (internal) + `sas_network` (so backend can reach it)

### stack-monitoring.yml

- **Dozzle** — real-time container logs via Docker socket, filters `name=staamina-*`
- **Uptime Kuma** — uptime monitoring, port configurable via `UPTIME_KUMA_PORT` (default 3001)

### stack-claude-bot.yml

- **Claude bot** — `staamina-claude-bot`, port `3333:3333`
- Runs `claude --dangerously-skip-permissions` via Express webhook server
- Requires one-time OAuth: `docker exec -it staamina-claude-bot claude auth login`
- Credentials persisted in volume `claude_credentials:/home/botuser/.claude`
- Backup: `never` (OAuth tokens should NOT be backed up)

---

## Networking

Services communicate by container name within stacks:

- Backend → DB: `staamina-postgres:5432`
- Backend → Cache: `valkey:6379` (via `REDIS_URL`)
- Backend → Logto: via `sas_network` (shared external network)
- Backend → MinIO: `staamina-minio:9000`

---

## CI/CD Workflows

### pr-checks.yml

**Triggers:** PR or push to `main`/`develop`

- `code-quality` (15min): `pnpm check` (lint + typecheck) + Prisma generate
- `test` (20min): PostgreSQL service container, `prisma migrate reset --force`, `pnpm --filter backend test`
- `build-validation` (15min): `pnpm build` (full monorepo)

### deploy-backend.yml

**Triggers:** Git tag `v*.*.*` or manual `workflow_dispatch`

- Builds `apps/backend/Dockerfile` (multi-stage)
- Pushes to GHCR with tags: `v1.2.3`, `v1.2`, `v1`, `sha-abc123`
- **Post-build:** Manual Portainer step required (no auto-deploy)

### deploy-claude-bot.yml

**Triggers:** Push to `main` with changes in `infrastructure/claude-bot/**`

- Pushes `latest` + `sha-abc123` tags to GHCR
- Portainer auto-pulls `latest`

### deploy-vercel-preview.yml

**Triggers:** PR opened/synchronized against `main`

- Deploys 4 apps in parallel: HQ, FSM, Landing, Storybook
- Comments PR with preview URLs
- Uses `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID_*` secrets

---

## Backend Dockerfile (Multi-stage)

**Builder stage:**

1. Install pnpm 10.28.2
2. Copy all workspace `package.json` files
3. Copy Prisma schema + migrations
4. `pnpm install --frozen-lockfile`
5. Generate Prisma client
6. Build `@staamina/types` first
7. Compile backend: `pnpm build`

**Production stage:**

- Minimal image, runtime deps only
- Entrypoint: `docker-entrypoint.sh` → runs Prisma migrations → starts app
- Health check: 30s interval, 60s start period (allows migrations)

---

## Claude Bot Architecture

```
GitHub event (issue / issue_comment / PR review comment)
  → HMAC-SHA256 webhook verification
  → Deduplication (bounded Set, last 500 delivery IDs)
  → Add "eyes" reaction
  → Fetch issue/PR context (labels, last 10 comments)
  → Spawn: claude --dangerously-skip-permissions (15min timeout)
  → Parse <bot-response type="changes|answer">...</bot-response>
  → If git changes: commit → push branch → create PR
  → Else: post comment only
  → Heartbeat every 30s ("Claude is on it...")
```

**Key files:**

- `infrastructure/claude-bot/src/index.ts` — Express webhook server
- `infrastructure/claude-bot/src/handlers/issue.handler.ts` — Issue/comment handler
- `infrastructure/claude-bot/src/handlers/pr.handler.ts` — PR review handler
- `infrastructure/claude-bot/src/services/claude.service.ts` — Claude CLI runner
- `infrastructure/claude-bot/src/services/github.service.ts` — GitHub API client
- `infrastructure/claude-bot/bot-instructions.md` — Claude system prompt
- `infrastructure/claude-bot/entrypoint.sh` — `.claude.json` symlink management

**Trigger condition:** Comment or title contains `@claude`
**Bot ignores:** Events where `sender.type === "Bot"` (prevents self-triggering)

---

## Required Secrets

### GitHub Actions

| Secret                        | Usage              |
| ----------------------------- | ------------------ |
| `VERCEL_TOKEN`                | Vercel deployments |
| `VERCEL_ORG_ID`               | Vercel org         |
| `VERCEL_PROJECT_ID_HQ`        | HQ app project     |
| `VERCEL_PROJECT_ID_FSM`       | FSM app project    |
| `VERCEL_PROJECT_ID_LANDING`   | Landing project    |
| `VERCEL_PROJECT_ID_STORYBOOK` | Storybook project  |

### Portainer Stacks (env vars)

**Data stack:** `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `VALKEY_PASSWORD`, `MINIO_ROOT_USER`, `MINIO_ROOT_PASSWORD`

**Backend stack:** `DATABASE_URL`, `REDIS_URL`, `LOGTO_*` (endpoint, app*id, app_secret, resource, fsm_app_id, cookie_secret, base_url, management_api_resource), `MAILJET*\_`, `MINIO\_\_`, `CORS_ORIGIN`, `APP_VERSION`, `DEEPSEEK_API_KEY` (optional)

**Auth stack:** `LOGTO_DB_USER`, `LOGTO_DB_PASSWORD`, `LOGTO_DB_NAME`, `LOGTO_ENDPOINT`, `LOGTO_ADMIN_ENDPOINT`

**Claude bot stack:** `GITHUB_WEBHOOK_SECRET`, `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY` (PEM), `GITHUB_INSTALLATION_ID`, `GITHUB_OWNER`, `GITHUB_REPO`, `BOT_VERSION`

---

## Resource Limits Summary

| Service     | CPU | Memory limit | Reservation |
| ----------- | --- | ------------ | ----------- |
| Backend     | 2   | 1GB          | 256MB       |
| PostgreSQL  | 2   | 2GB          | 512MB       |
| Valkey      | 1   | 768MB        | 256MB       |
| MinIO       | 1   | 512MB        | —           |
| Logto       | 1   | 1GB          | 256MB       |
| Claude bot  | 1   | 1GB          | 256MB       |
| Dozzle      | 0.5 | 256MB        | —           |
| Uptime Kuma | 0.5 | 512MB        | —           |

---

## Backup Strategy

| Volume               | Backup label                    |
| -------------------- | ------------------------------- |
| `postgres_data`      | `daily`                         |
| `minio_data`         | `daily`                         |
| `logto_db_data`      | (not labeled)                   |
| `valkey_data`        | (not labeled — transient cache) |
| `claude_credentials` | `never` (OAuth tokens)          |

---

## Common Deployment Procedures

### Deploy new backend version

```bash
git tag v1.2.3
git push origin v1.2.3
# GitHub Action builds and pushes to GHCR
# Then in Portainer: update APP_VERSION=v1.2.3 on staamina-backend stack
```

### Deploy claude bot update

```bash
# Push changes to main in infrastructure/claude-bot/
# GitHub Action auto-builds and pushes :latest
# Portainer auto-pulls on next stack update
```

### Restart a stack

```
Portainer → Stacks → [stack-name] → Redeploy
```

### View logs

```
Dozzle → filter by container name (staamina-*)
# Or via Portainer → Containers → [name] → Logs
```

### Local dev environment

```bash
docker compose -f infrastructure/docker-compose.dev.yml up -d
# PostgreSQL on 15432, MinIO on 9000/9001, Valkey on 16379
```

---

## File Reference

| File                                          | Purpose                   |
| --------------------------------------------- | ------------------------- |
| `infrastructure/stack-backend.yml`            | NestJS API stack          |
| `infrastructure/stack-data.yml`               | PostgreSQL, Valkey, MinIO |
| `infrastructure/stack-auth.yml`               | Logto auth service        |
| `infrastructure/stack-monitoring.yml`         | Dozzle + Uptime Kuma      |
| `infrastructure/stack-claude-bot.yml`         | GitHub webhook agent      |
| `infrastructure/docker-compose.dev.yml`       | Local dev services        |
| `infrastructure/claude-bot/`                  | Claude bot source code    |
| `apps/backend/Dockerfile`                     | Backend container build   |
| `.github/workflows/pr-checks.yml`             | Quality gates             |
| `.github/workflows/deploy-backend.yml`        | Backend image CI/CD       |
| `.github/workflows/deploy-claude-bot.yml`     | Bot image CI/CD           |
| `.github/workflows/deploy-vercel-preview.yml` | Frontend previews         |
