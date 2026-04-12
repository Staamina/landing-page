---
section: 'shared/development-workflow'
parent: 'project-context'
rule_count: 25
last_updated: '2026-01-16'
---

# Development Workflow Rules

## Git Workflow

- Main branch: `main` (protected)
- Feature branches: `feature/description` or `feat/STAM-123-description`
- Bug fixes: `fix/description` or `bugfix/STAM-123-description`
- Always create branches from latest `main`
- NEVER commit directly to `main`
- Keep branches focused on single feature/fix
- Delete branches after merge

## Commit Message Format

- Use conventional commits format: `type(scope): description`
- Types: feat, fix, refactor, test, docs, chore, style, perf
- Include ticket number when applicable: `feat(auth): add JWT validation [STAM-123]`
- Keep first line under 72 characters
- Use imperative mood: "add feature" not "added feature"

Example:

```
feat(auth): add JWT token validation

- Implement JWT verification middleware
- Add token expiration check
- Update auth guard to use new validation

Closes STAM-123
```

## Package Management (pnpm)

- ALWAYS use pnpm, NEVER npm or yarn
- Install dependencies: `pnpm install` (never `pnpm add` without approval)
- Add dependencies to correct workspace: `pnpm add <pkg> --filter <workspace>`
- NEVER install dependencies at root unless they're dev dependencies for all workspaces
- Run workspace script: `pnpm --filter <workspace> <script>`
- Run for all workspaces: `turbo run <script>`

## Development Commands

- Start all apps: `pnpm all:dev` (uses Turbo)
- Start specific app: `pnpm backend:dev`, `pnpm fsm:dev`, `pnpm head:dev`, `pnpm head:land`
- Build all: `pnpm build`
- Lint: `pnpm lint` or `pnpm lint:fix`
- Format: `pnpm format` (Prettier)
- Test: `pnpm test`

## Pre-Commit Checklist

- Run `pnpm lint:fix` to fix linting issues
- Run `pnpm format` to format code
- Run `pnpm test` to ensure tests pass
- Build locally: `pnpm build` to catch build errors
- DO NOT commit if any of above fail
- Review your changes with `git diff`
- DO NOT commit console.logs or debug code

## Pull Request Requirements

- PR title follows conventional commit format
- Description explains WHAT and WHY
- Link to related ticket/issue
- All tests passing
- No linting errors
- Code formatted with Prettier
- Self-review completed
- DO NOT merge your own PRs without review

## Turbo Caching

- Turbo caches build outputs automatically
- Clear cache if builds behave unexpectedly: `turbo run build --force`
- DO NOT commit `.turbo` directory
- Trust Turbo's caching for dev workflow

## Environment Variables

- Use `.env.local` for local development (git-ignored)
- Never commit `.env` files with secrets
- Document required env vars in README
- Use `.env.example` as template
- DO NOT hardcode environment-specific values
