# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Chronoverse Toolkit is an Nx-powered monorepo workspace using Yarn 4 as the package manager. The workspace is configured for TypeScript development with strict type checking and ESNext module resolution.

## Development Environment

- **Node Version**: 24.11.1 (see .nvmrc)
- **Package Manager**: Yarn 4.12.0
- **Build System**: Nx 22.2.3
- **Nx Cloud**: Enabled (ID: 690cedc204fe72bfe84bb069)
- **Cached targets**: `build`, `check-types`, `format:check` (configured in nx.json targetDefaults)

## Common Commands

### Building

```bash
yarn build              # Build all projects via Nx
nx run-many -t build    # Direct Nx command to build all
nx build <project-name> # Build a specific project (e.g., nx build @chronoverse-toolkit/commitlint)
```

### Code Quality

```bash
# Formatting
yarn format:check:all       # Check formatting with Prettier (used in CI)
yarn format:fix:all         # Fix formatting issues
yarn format:check:cache:all # Check with caching for faster local runs
yarn format:fix:cache:all   # Fix with caching for faster local runs

# Type Checking
yarn check-types            # Run TypeScript type checking across all projects
nx check-types <project>    # Type check a specific project

# Workspace Linting
yarn lint:ws                # Lint workspace with Sherif (checks package dependencies, used in CI)

# Cleaning
yarn clean                  # Remove node_modules from all projects
yarn clean:all              # Remove dist and node_modules from all projects
```

### Working with Individual Packages

```bash
# Navigate to a package directory and run commands directly
cd packages/linting/commitlint
yarn build                  # Build this package only
yarn check-types            # Type check this package only
yarn format:fix:cache       # Format this package with caching

# Or use Nx from root to target specific packages
nx build @chronoverse-toolkit/commitlint
nx check-types @chronoverse-toolkit/prettier
```

### Git Workflow

The repository uses Husky hooks and Commitizen for enforcing commit conventions:

- **pre-commit**: Runs `yarn format:fix:all`, `yarn check-types`, `yarn build`, and `yarn lint:ws`
- **commit-msg**: Validates commit messages against conventional commit format using commitlint
- **prepare-commit-msg**: Opens Commitizen interactive prompt for guided commit message creation
- **Commitlint config**: Uses `@chronoverse-toolkit/commitlint` package with emoji support and Nx-aware scoping

When committing, Commitizen will guide you through creating conventional commits. Commit messages support emojis and must follow the format: `[emoji] type(scope): description`

### CI/CD

The CI pipeline (.github/workflows/ci.yml) runs on pull requests and pushes to main:

1. **Format check**: Uses `nx affected -t format:check` for PRs, `nx run-many -t format:check --all` for pushes
2. **Type checking**: Uses `nx affected -t check-types` for PRs, `nx run-many -t check-types --all` for pushes
3. **Build**: Uses `nx affected -t build` for PRs, `nx run-many -t build --all` for pushes
4. **Workspace linting**: `yarn lint:ws` (Sherif - checks package dependencies)

All checks must pass for CI to succeed. The pipeline uses Nx Cloud for distributed task execution and caching.

## Architecture

### TypeScript Configuration

The base TypeScript configuration (`tsconfig.base.json`) enforces extremely strict type checking:

- **Module System**: ESNext with Bundler resolution
- **Module Detection**: Forced with `verbatimModuleSyntax` and `isolatedModules`
- **Strict Flags**: All standard strict options plus:
  - `exactOptionalPropertyTypes` - exact type matching for optional properties
  - `noUncheckedIndexedAccess` - array/index accesses return `T | undefined`
  - `noUncheckedSideEffectImports` - imports must be used or explicitly marked as side-effect
  - `noPropertyAccessFromIndexSignature` - require bracket notation for index signatures
  - `noImplicitReturns`, `noImplicitOverride`
  - `noUnusedLocals`, `noUnusedParameters`
  - `noFallthroughCasesInSwitch`
  - `allowUnreachableCode: false`, `allowUnusedLabels: false`

These strict settings mean:

- All array accesses must handle potential undefined values
- Index signature properties must use bracket notation
- Side-effect-only imports must be explicit

### Code Style

Prettier configuration with these key settings:

- **Indentation**: Tabs (width: 4) for code files
- **Quotes**: Single quotes for JS/TS, including JSX
- **Line width**: 120 characters
- **Trailing commas**: Always
- **Arrow parens**: Avoid when possible
- **End of line**: LF
- **JSON override**: 2-space indentation (no tabs)
- **Multiline arrays**: Wraps arrays with 3+ elements (via `multilineArraysWrapThreshold`)
- **Plugins**:
  - `prettier-plugin-packagejson` - formats package.json files
  - `prettier-plugin-sort-json` - sorts JSON files
  - `prettier-plugin-multiline-arrays` - formats arrays

#### Critical Coding Conventions (from docs/rules/stylistic/)

These rules are **mandatory** and apply to all TypeScript, JavaScript, JSX, and TSX files:

1. **Always use arrow functions**: Use `const fn = () => {}` instead of `function` declarations everywhere (components, hooks, callbacks, handlers)
2. **Export at the end of files**: Never use inline exports. First declare all functions, variables, classes, types, and interfaces, then export them at the bottom using `export { ... }` for values and `export type { ... }` for types
3. **Prefix types with `T` and interfaces with `I`**: All types must be prefixed with `T` and all interfaces with `I` to prevent naming conflicts and improve readability

### Workspace Structure

- **Workspace pattern**: `packages/**/*` for nested package organization
- **Monorepo approach**: Nx manages task orchestration and caching
- **Package manager**: Yarn 4 workspaces with Plug'n'Play enabled (.yarnrc.yml)
- **Release strategy**: Independent versioning for all packages under `packages/**/*`
  - Uses conventional commits for version bumping
  - GitHub releases created automatically (no workspace changelog file)
  - Per-project changelogs disabled
  - Publishing depends on successful build

### Current Packages

The workspace is organized into domain-specific directories under `packages/`:

#### Linting (`packages/linting/`)

##### **@chronoverse-toolkit/commitlint**

- **Location**: `packages/linting/commitlint`
- **Purpose**: Fully typed commitlint configuration for Nx monorepos with emoji support and custom scope resolution
- **Key features**: Nx-aware scope resolution, emoji parser integration, conventional commits
- **Dependencies**: @nx/devkit

#### Formatting (`packages/formatting/`)

##### **@chronoverse-toolkit/prettier**

- **Location**: `packages/formatting/prettier`
- **Purpose**: Prettier configuration for chronoverse projects
- **Key features**: Plugin management (multiline-arrays, packagejson, sort-json, tailwindcss), fluent configuration API
- **Dependencies**: @chronoverse-toolkit/utils

#### Shared (`packages/shared/`)

##### **@chronoverse-toolkit/flat**

- **Location**: `packages/shared/flat`
- **Purpose**: ESLint flat config composition tool with fluent API
- **Key features**: Config composer with operations (append, prepend, insert, replace, override, transform, remove)

##### **@chronoverse-toolkit/utils**

- **Location**: `packages/shared/utils`
- **Purpose**: Common utilities and constants for ESLint tooling
- **Key features**: Shared utility functions, interop helpers

##### **@chronoverse-toolkit/types**

- **Location**: `packages/shared/types`
- **Purpose**: Shared TypeScript type definitions
- **Key features**: Common type definitions used across packages

### Package Development

Each package follows a consistent structure:

- **Build**: `yarn build` (or `nx build <package-name>`) - Runs `tsdown` bundler
- **Type check**: `yarn check-types` - Validates TypeScript without emitting
- **Clean**: `yarn clean` - Removes node_modules, `yarn clean:all` - Removes dist and node_modules
- **Format**: `yarn format:check` / `yarn format:fix` - Check/fix formatting (add `:cache` for faster runs)
- **TypeScript**: Uses project references pattern with `tsconfig.json` → `tsconfig.lib.json`
- **Module format**: ESM-only (type: "module") with `.mjs` extensions
- **Publishing**: Configured for public npm with `@chronoverse-toolkit` scope
- **Scope**: All packages use `@chronoverse-toolkit/*` naming convention

### Build System (tsdown)

Packages use `tsdown` for building with these characteristics:

- **Output format**: ESM (.mjs files)
- **Declaration files**: Automatically moved to `dist/@types/` via build hooks
- **Target**: ESNext with Node.js platform
- **Sourcemaps**: Enabled for debugging
- **Additional constraint**: `isolatedDeclarations: true` for faster DTS generation

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- You have access to the Nx MCP server and its tools, use them to help the user
- When answering questions about the repository, use the `nx_workspace` tool first to gain an understanding of the workspace architecture where applicable.
- When working in individual projects, use the `nx_project_details` mcp tool to analyze and understand the specific project structure and dependencies
- For questions around nx configuration, best practices or if you're unsure, use the `nx_docs` tool to get relevant, up-to-date docs. Always use this instead of assuming things about nx configuration
- If the user needs help with an Nx configuration or project graph error, use the `nx_workspace` tool to get any errors

<!-- nx configuration end-->
