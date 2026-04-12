# staamina Monorepo

This is a [Turborepo](https://turbo.build/repo) monorepo using [pnpm](https://pnpm.io) as the package manager.

## What's inside?

This monorepo includes the following:

- **Apps**: Applications in the `apps` directory
- **Packages**: Shared packages in the `packages` directory

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Installation

```bash
pnpm install
```

### Development

To run all apps in development mode:

```bash
pnpm dev
```

To run a specific app:

```bash
pnpm --filter <app-name> dev
```

### Build

To build all apps and packages:

```bash
pnpm build
```

### Lint

To lint all apps and packages:

```bash
pnpm lint
```

To automatically fix linting issues:

```bash
pnpm lint:fix
```

### Format

To format all files with Prettier:

```bash
pnpm format
```

To check if files are formatted:

```bash
pnpm format:check
```

### Test

To run tests:

```bash
pnpm test
```

## Project Structure

```
.
├── apps/
│   ├── web/          # Example web application
│   └── backend/      # NestJS backend API
├── packages/
│   └── ui/           # Example shared UI package
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── docker-compose.yml # Docker Compose for backend services
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
├── .prettierignore     # Prettier ignore patterns
└── tsconfig.json       # TypeScript configuration
```

## Learn More

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [pnpm Documentation](https://pnpm.io/motivation)
- [pnpm Workspaces](https://pnpm.io/workspaces)
