# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Chronoverse Toolkit is an Nx-powered monorepo workspace using Yarn 4 as the package manager. The workspace is configured for TypeScript development with strict type checking and ESNext module resolution.

## Development Environment

- **Node Version**: 24.11.1 (see .nvmrc)
- **Package Manager**: Yarn 4.12.0
- **Build System**: Nx 22.1.1
- **Nx Cloud**: Enabled (ID: 690cedc204fe72bfe84bb069)

## Common Commands

### Building

```bash
yarn build              # Build all projects via Nx
nx run-many -t build    # Direct Nx command to build all
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

# Workspace Linting
yarn lint:ws                # Lint workspace with Sherif (checks package dependencies, used in CI)
```

### Git Workflow

The repository uses Husky hooks and Commitizen for enforcing commit conventions:

- **pre-commit**: Runs lint-staged which formats changed files and runs workspace linting
- **commit-msg**: Validates commit messages against conventional commit format using commitlint
- **prepare-commit-msg**: Opens Commitizen interactive prompt for guided commit message creation
- **Commitlint config**: Uses `@commitlint/config-conventional` and `@commitlint/config-nx-scopes` for Nx workspace-aware scoping

When committing, Commitizen will guide you through creating conventional commits. Commit messages must follow the format: `type(scope): description`

### CI/CD

The CI pipeline (.github/workflows/ci.yml) runs:

1. **Format check**: `yarn format:check:all`
2. **Type checking**: `yarn check-types`
3. **Workspace linting**: `yarn lint:ws` (Sherif)

All checks must pass for CI to succeed.

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
- **Plugins**:
    - `prettier-plugin-packagejson` - formats package.json files
    - `prettier-plugin-sort-json` - sorts JSON files
    - `prettier-plugin-multiline-arrays` - formats arrays

### Workspace Structure

- **Workspace pattern**: `packages/**/*` for nested package organization
- **Monorepo approach**: Nx manages task orchestration and caching
- **Package manager**: Yarn 4 workspaces with Plug'n'Play enabled (.yarnrc.yml)

### Current Packages

The workspace currently contains two packages under `packages/shared/`:

#### @chronoverse-shared/flat

ESLint flat config composition tool that provides a fluent API for building ESLint configurations.

- **Location**: `packages/shared/flat`
- **Purpose**: Tools for creating and modifying ESLint configurations in flat config format
- **Build tool**: tsdown (bundles to `dist/index.mjs` with types in `dist/@types/`)
- **Key features**: Config composer with operations (append, prepend, insert, replace, override, transform, remove)
- **Tags**: `npm:public`, `npm:eslint`, `npm:shared`, `npm:utils`, `npm:flat`

#### @chronoverse-shared/utils

Shared utilities and constants for ESLint configuration.

- **Location**: `packages/shared/utils`
- **Purpose**: Common utilities, constants, and type definitions for ESLint tooling
- **Build tool**: tsdown (bundles to `dist/index.mjs` with types in `dist/@types/`)
- **Tags**: `npm:public`, `npm:eslint`, `npm:shared`, `npm:utils`, `npm:flat`

### Package Development

Each package follows a consistent structure:

- **Build**: `yarn build` (or `nx build <package-name>`) - Runs `tsdown` bundler
- **Type check**: `yarn check-types` - Validates TypeScript without emitting
- **Clean**: `yarn clean` - Removes node_modules, `yarn clean:all` - Removes dist and node_modules
- **TypeScript**: Uses project references pattern with `tsconfig.json` → `tsconfig.lib.json`
- **Module format**: ESM-only (type: "module") with `.mjs` extensions
- **Publishing**: Configured for public npm with `@chronoverse-shared` scope

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
