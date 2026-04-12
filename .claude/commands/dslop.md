---
description: Detect and remove AI-generated slop (unnecessary code, comments, abstractions) from recent changes
---

# De-Slop

Scan recently changed files for AI-generated "slop" patterns and clean them up.

## What is slop?

Slop is low-value code typically produced by LLMs that adds noise without substance:

- **Obvious comments** — `// Get the user` above `getUser()`, `// Return the result` above `return result`
- **Redundant JSDoc** — Docstrings that just restate the function name and parameter types already visible in TypeScript
- **Over-engineering** — Wrapper functions used once, unnecessary abstractions, premature generalization
- **Defensive excess** — Try/catch around code that can't throw, null checks where types guarantee presence, fallback values for required fields
- **Console.log / debug artifacts** — Leftover debugging statements
- **Dead code** — Unused imports, unreachable branches, commented-out code blocks
- **Filler variables** — `const result = expr; return result;` instead of `return expr;`
- **Verbose boolean logic** — `if (x) return true; else return false;` instead of `return x;`
- **Empty implementations** — Empty catch blocks, no-op functions, stub methods left behind
- **Unnecessary type assertions** — `as Type` when the type is already inferred correctly
- **Redundant spread** — `{ ...obj }` when mutation isn't a concern
- **Over-logging** — Logging every step of a straightforward operation
- **Pointless re-exports** — Barrel files that re-export a single item

## Instructions

<<<<<<< Updated upstream

1. **Identify scope**
   - If arguments are provided (file paths or glob patterns), scan those files
   - Otherwise, detect recently changed files via `git diff --name-only HEAD~1` (or staged files if nothing committed)
   - Filter to only `.ts`, `.tsx`, `.js`, `.jsx` files

2. **Scan each file for slop patterns**
   - Read each file and identify instances of the patterns listed above
   - # For each finding, note the file, line number, pattern type, and the offending code
3. **Identify scope — uncommitted changes only**
   - If arguments are provided (file paths or glob patterns), intersect them with uncommitted files
   - Otherwise, detect uncommitted files via `git diff --name-only` (unstaged) and `git diff --name-only --cached` (staged)
   - Also include untracked files from `git ls-files --others --exclude-standard`
   - Filter to only `.ts`, `.tsx`, `.js`, `.jsx` files
   - **NEVER scan already-committed files** — only files with pending modifications, staged changes, or newly created (untracked)

4. **Scan only the changed lines for slop patterns**
   - Read each file but focus analysis on the changed/added lines (use `git diff` hunks to identify them)
   - For each finding, note the file, line number, pattern type, and the offending code
   - Do NOT flag slop in unchanged lines — even if they exist, they are out of scope
     > > > > > > > Stashed changes

5. **Present findings**
   - Group findings by file
   - For each finding show: line number, pattern type, the slop code, and the suggested fix (or removal)
   - Summarize total findings count

6. **Fix with confirmation**
   - Ask the user if they want to auto-fix all findings, fix selectively, or skip
   - Apply fixes: remove dead code, simplify logic, strip obvious comments
   - After fixing, run `pnpm check` to ensure nothing broke

## Important rules

- Do NOT remove comments that explain **why** (business logic, workarounds, TODOs with ticket numbers)
- Do NOT simplify code if it changes behavior or reduces readability for the team
- Do NOT touch test files unless explicitly asked — test verbosity is often intentional
- Preserve all meaningful error messages and user-facing strings
- When in doubt, flag it but don't auto-fix — let the user decide
