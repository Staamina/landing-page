# Development and Operations

**Generated:** 2026-01-07  
**Scan Level:** Exhaustive

## Development Environment

### Prerequisites

- **Node.js:** >= 18
- **pnpm:** >= 8.15.0
- **PostgreSQL:** 16+ (or use Docker Compose)
- **Docker:** (optional, for containerized development)

### Package Manager

**pnpm** is used as the package manager for:

- Fast, disk-efficient installations
- Workspace support for monorepo
- Strict dependency resolution

## Monorepo Management

### Turborepo

**Configuration:** `turbo.json`

**Tasks:**

- `build` - Build all packages/apps (depends on dependencies)
- `dev` - Development mode (persistent, no cache)
- `lint` - Lint all packages (depends on dependencies)
- `lint:fix` - Auto-fix linting issues (no cache)
- `format` - Format code with Prettier (no cache)
- `format:check` - Check code formatting
- `test` - Run tests (depends on build)

**Task Dependencies:**

- Build tasks depend on upstream builds (`^build`)
- Lint tasks depend on upstream lints (`^lint`)
- Test tasks depend on build (`^build`)

**Caching:**

- Build outputs cached: `dist/**`, `.next/**`, `build/**`
- Test outputs cached: `coverage/**`
- Dev tasks: No cache (persistent)
- Format tasks: No cache

### Workspace Structure

**Configuration:** `pnpm-workspace.yaml`

**Workspaces:**

- `apps/*` - Applications
- `packages/*` - Shared packages

**Workspace Dependencies:**

- Packages use `workspace:*` protocol for internal dependencies
- Example: `"@staamina/ui": "workspace:*"`

## Root Scripts

**Location:** `package.json`

### Available Commands

```bash
# Build all packages and apps
pnpm build

# Run all apps in development mode
pnpm all:dev

# Lint all packages
pnpm lint

# Auto-fix linting issues
pnpm lint:fix

# Format all files
pnpm format

# Check formatting
pnpm format:check

# Run tests
pnpm test

# Run specific app in dev mode
pnpm backend:dev          # Backend only
pnpm fsm:dev              # Field maintenance system
pnpm head:dev             # Headquarter system
pnpm head:land            # Landing page
pnpm storybook:dev         # UI library Storybook
```

## Backend Development

### Setup

```bash
# Install dependencies
pnpm install

# Generate Prisma Client
pnpm --filter backend prisma:generate

# Run database migrations
pnpm --filter backend prisma:migrate

# Start development server
pnpm backend:dev
# or
pnpm --filter backend start:dev
```

### Environment Variables

**Template:** `apps/backend/.env.example`

**Required Variables:**

- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 4000)
- `CORS_ORIGIN` - Allowed CORS origins (comma-separated)
- `NODE_ENV` - Environment (development, production)

**Logto Configuration:**

- `LOGTO_ENDPOINT` - Logto instance URL
- `LOGTO_APP_ID` - Logto application ID
- `LOGTO_APP_SECRET` - Logto application secret
- `LOGTO_RESOURCE` - Logto API resource identifier

### Database

**ORM:** Prisma

**Migrations:**

```bash
# Create migration
pnpm --filter backend prisma migrate dev --name migration_name

# Apply migrations
pnpm --filter backend prisma migrate deploy

# Reset database (dev only)
pnpm --filter backend prisma migrate reset

# Open Prisma Studio
pnpm --filter backend prisma:studio
```

**Schema Location:** `apps/backend/prisma/schema.prisma`

### Development Server

- **Port:** 4000 (default)
- **API Base:** `/api`
- **Swagger Docs:** `http://localhost:4000/api/docs`
- **Health Check:** `http://localhost:4000/api`

### Testing

```bash
# Run tests
pnpm --filter backend test

# Run tests in watch mode
pnpm --filter backend test:watch

# Run tests with coverage
pnpm --filter backend test:cov
```

**Test Framework:** Jest

## Frontend Development

### Field Maintenance System

```bash
# Start dev server
pnpm fsm:dev
# or
pnpm --filter field-maintenance-system dev
```

**Port:** Typically 3001 (check Vite config)

### Headquarter System

```bash
# Start dev server
pnpm head:dev
# or
pnpm --filter headquarter-system dev
```

**Port:** Typically 3002 (check Vite config)

### Landing Page

```bash
# Start dev server
pnpm head:land
# or
pnpm --filter landing-page dev
```

**Port:** Typically 3000 (check Next.js config)

## UI Library Development

### Storybook

```bash
# Start Storybook
pnpm storybook:dev
# or
pnpm --filter @staamina/ui dev
```

**Port:** 6006

**Purpose:**

- Component documentation
- Visual testing
- Interactive examples
- Props documentation

### Building UI Library

```bash
# Build library
pnpm --filter @staamina/ui build
```

## Docker Development

### Docker Compose

**Files:**

- `docker-compose.yml` - Production services
- `docker-compose.dev.yml` - Development services

### Development Setup

```bash
# Start services (PostgreSQL + Backend)
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f backend

# Stop services
docker-compose -f docker-compose.dev.yml down
```

### Services

**PostgreSQL:**

- Image: `postgres:16-alpine`
- Port: 5432 (configurable)
- Database: `staamina` (configurable)
- User: `staamina` (configurable)
- Volume: `postgres_data` (persistent)

**Backend:**

- Build: `apps/backend/Dockerfile`
- Port: 3000 (configurable)
- Depends on: PostgreSQL (health check)
- Command: Runs migrations then starts server

### Dockerfile (Backend)

**Multi-stage build:**

1. **Builder stage:**
   - Installs pnpm
   - Copies package files
   - Installs dependencies
   - Generates Prisma Client
   - Builds application

2. **Production stage:**
   - Installs pnpm
   - Installs production dependencies only
   - Copies built application
   - Copies Prisma files
   - Exposes port 4000
   - Health check endpoint

**Health Check:**

```bash
curl http://localhost:4000/api
```

## Code Quality

### Linting

**Tool:** ESLint

**Configuration:** `.eslintrc.json`

**Rules:**

- TypeScript ESLint plugin
- Import resolver for TypeScript
- Prettier integration

**Commands:**

```bash
# Lint all
pnpm lint

# Auto-fix
pnpm lint:fix

# Lint specific package
pnpm --filter <package> lint
```

### Formatting

**Tool:** Prettier

**Configuration:** `.prettierrc`

**File Types:** TypeScript, JavaScript, JSON, Markdown, CSS, SCSS, YAML

**Commands:**

```bash
# Format all
pnpm format

# Check formatting
pnpm format:check
```

### Type Checking

**Tool:** TypeScript

**Configuration:** `tsconfig.json` (root) + package-specific

**Strict Mode:** Enabled

**Commands:**

```bash
# Type check (via build)
pnpm build

# Type check specific package
pnpm --filter <package> tsc --noEmit
```

## Build Process

### Turborepo Build Pipeline

1. **Dependency Resolution:**
   - Resolves workspace dependencies
   - Installs external dependencies

2. **Build Order:**
   - Packages built first (types, ui)
   - Apps built after dependencies

3. **Caching:**
   - Build outputs cached
   - Skipped if no changes detected

4. **Outputs:**
   - Backend: `apps/backend/dist/`
   - Next.js: `apps/landing-page/.next/`
   - Vite: `apps/*/dist/`
   - Packages: `packages/*/dist/`

### Production Build

```bash
# Build all
pnpm build

# Build specific package/app
pnpm --filter <package> build
```

## Deployment

### Backend Deployment

**Options:**

1. **Docker Compose** (recommended for VPS)
2. **PM2/systemd** (direct Node.js)
3. **Kubernetes** (if using K8s)

**Docker Compose Steps:**

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop
docker-compose down
```

**Environment Setup:**

- Set `NODE_ENV=production`
- Configure `DATABASE_URL`
- Configure `CORS_ORIGIN`
- Configure Logto credentials

**Database Migrations:**

- Run automatically on container start: `npx prisma migrate deploy`
- Or manually: `pnpm --filter backend prisma migrate deploy`

### Frontend Deployment

**Vercel (Recommended):**

- Automatic deployments from Git
- Environment variables in Vercel dashboard
- Next.js optimized builds

**Manual Build:**

```bash
# Build for production
pnpm --filter <app> build

# Output directory:
# - Next.js: .next/
# - Vite: dist/
```

## Environment Management

### Environment Files

**Pattern:** `.env`, `.env.local`, `.env.production`

**Priority:**

1. `.env.local` (highest, git-ignored)
2. `.env.production` (production)
3. `.env` (default)

**Backend:** `apps/backend/.env*`
**Frontend:** `apps/*/.env*`

### Secrets Management

**Development:**

- Use `.env.local` files (git-ignored)
- Never commit secrets

**Production:**

- Use environment variables
- Use secret management service (if available)
- Vercel: Environment variables in dashboard
- VPS: System environment variables or `.env` file (secure permissions)

## Monitoring and Logging

### Backend Logging

**Tool:** Pino (via `AppLoggerService`)

**Log Levels:**

- `log` - Info
- `error` - Errors
- `warn` - Warnings
- `debug` - Debug
- `verbose` - Trace

**Structured Logging:**

- JSON format
- Request/response logging
- Context information

### Health Checks

**Backend:**

- Endpoint: `GET /api`
- Docker health check configured
- Returns API version and status

## Troubleshooting

### Common Issues

**Dependency Issues:**

```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Prisma Issues:**

```bash
# Regenerate Prisma Client
pnpm --filter backend prisma:generate

# Reset database (dev only)
pnpm --filter backend prisma migrate reset
```

**Build Cache Issues:**

```bash
# Clear Turborepo cache
pnpm turbo clean

# Clear pnpm cache
pnpm store prune
```

**Port Conflicts:**

- Check running processes
- Change port in config files
- Update environment variables

## CI/CD

### GitHub Actions (if configured)

**Typical Workflow:**

1. Install dependencies
2. Lint code
3. Type check
4. Run tests
5. Build packages/apps
6. Deploy (if on main branch)

**Turborepo Integration:**

- Uses Turborepo for parallel execution
- Caches build outputs
- Only builds changed packages

## Development Workflow

### Feature Development

1. Create feature branch
2. Make changes
3. Run linter: `pnpm lint:fix`
4. Run formatter: `pnpm format`
5. Run tests: `pnpm test`
6. Build: `pnpm build`
7. Commit and push
8. Create pull request

### Code Review Checklist

- [ ] Code follows linting rules
- [ ] Code is formatted
- [ ] Types are correct
- [ ] Tests pass
- [ ] Build succeeds
- [ ] No console.logs in production code
- [ ] Environment variables documented

_Sources: Configuration files, package.json files, Docker files (exhaustive scan)_
