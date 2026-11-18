# Global Codebase Naming, FSD Architecture & Barrel Audit

You are a Staff Software Engineer and Architecture Guardian. Perform a comprehensive, repository-wide audit and refactoring across all source files in this project.

Execute the following phases sequentially and atomically. Do not stop after auditing—apply all safe fixes directly and update every reference across the codebase so the project compiles cleanly.

---

## Phase 1: Global Naming Convention Audit & Refactoring

Inspect `tsconfig.json` and project configuration files first to understand path aliases and language settings. Then scan all variables, constants, functions, hooks, classes, types, and parameters across the codebase.

### Naming Rules (Universal & Evergreen)

1. **Variables (`camelCase`):**
   - Must be descriptive, domain-specific nouns or noun phrases (`activeUserList`, `invoiceTotal`, `searchQuery`).
   - **Reject & Rename:** Cryptic abbreviations (`usr`, `btn`, `res`, `req`, `tmp`, `val`, `obj`, `arr`, `cb`, `cfg`), vague names (`data`, `info`, `item`, `thing`, `handle`), and single-letter identifiers (except standard loop indices `i`, `j`, `k` or math coordinates `x`, `y`, `z`).
2. **Booleans (`camelCase` with Predicate Prefix):**
   - Boolean variables, state flags, parameters, and boolean-returning functions must read as yes/no questions using prefixes: `is`, `has`, `can`, `should`, `will`, `did` (e.g., `isAuthenticated`, `hasPendingChanges`, `canDeleteAccount`).
   - **Reject & Rename:** Ambiguous nouns/adjectives (`loading`, `open`, `disabled`, `admin`, `valid`) and double-negative names (`isNotDisabled`, `hasNoErrors`).
3. **Constants (`UPPER_SNAKE_CASE` vs `camelCase`):**
   - Module-level, static configuration values, magic numbers, regex patterns, and immutable primitives must use `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`, `DEFAULT_DEBOUNCE_MS`, `API_TIMEOUT_MS`).
   - Runtime-computed constants inside functions and structured lookup maps/objects use `camelCase`.
4. **Functions & Methods (`camelCase` with Action Verb):**
   - Must begin with a clear action verb describing what the function does (`fetchUserProfile`, `calculateOrderTax`, `parseDateString`, `validateEmailFormat`).
   - **Event Handlers & Callbacks:** Use `handle<Event>` for internal event handlers (`handleFormSubmit`, `handleDialogClose`) and `on<Event>` for callback props (`onSubmit`, `onClose`).
   - **Custom Hooks:** Must start with `use` followed by a descriptive domain action (`useDebouncedSearch`, `useCurrentSession`).
5. **Types, Interfaces, Classes & Components (`PascalCase`):**
   - Must use `PascalCase` (`UserProfile`, `PaymentGatewayError`, `OrderSummaryCard`). Do not prefix interfaces with `I` (use `User`, not `IUser`).

### Execution & Safety Constraints for Renaming

- **Keep compliant names untouched:** If an identifier already obeys the rules above, do not rename it.
- **Boundary protection:** Do NOT rename keys matching external REST/GraphQL API payloads, database columns, third-party library contracts, or environment variables—map them to compliant internal names at the boundary instead.
- **Atomic reference updates:** Whenever you rename a symbol, update every import, export, type signature, JSX usage, and test reference across the entire repository.

---

## Phase 2: Feature-Sliced Design (FSD) Dependency & Boundary Audit

Scan all `import` and `export` statements across the codebase and enforce strict FSD architectural boundaries:

### Layer Hierarchy (Top to Bottom)

`app` -> `pages` -> `widgets` -> `features` -> `entities` -> `shared`

### Architectural Rules

1. **No Cross-Slice Imports on the Same Layer (Critical):**
   - Slices within the same layer (`entities/*`, `features/*`, `widgets/*`, `pages/*`) MUST NEVER import from one another (e.g., `entities/order` importing from `entities/user` is a violation).
   - **How to resolve:**
     - If the shared logic/type is domain-agnostic, move it down to `shared`.
     - If two entities or features need to interact, lift the composition up to a higher layer (`features`, `widgets`, or `pages`), or pass data/render slots via props.
     - If the repository explicitly uses FSD `@x` cross-import public APIs (`entities/user/@x/order.ts`), route the import strictly through that `@x` entry point.
2. **No Upward Layer Imports:**
   - A lower layer must never import from a higher layer (e.g., `entities` cannot import from `features` or `widgets`; `shared` cannot import from any upper layer).
3. **Public API Encapsulation (No Deep Imports):**
   - External files must ONLY import from a slice's public API root (`@/entities/user`, `@/features/auth`), never from internal segments (`@/entities/user/model/store`, `@/entities/user/ui/Avatar`).
   - **Intra-slice exception:** Files inside the _same_ slice must use relative imports (`./`, `../`) and MUST NOT import from their own slice's `index.ts` (to prevent circular dependencies).

---

## Phase 3: `index.ts` (Barrel File) Cleanup & Synchronization

Audit every `index.ts` / `index.tsx` file across all layers, slices, and segments:

1. **Remove Dead & Forgotten Exports:** Delete exports pointing to deleted files, unused types, or orphaned internal helpers that are never consumed outside the slice.
2. **Expose Forgotten Public Symbols:** If external files were reaching into a slice via deep imports because a legitimate public component, hook, or type was omitted from `index.ts`, export it from the slice's `index.ts` and rewrite the deep imports to use the public API.
3. **Eliminate Wildcard Barrel Leaks:** Replace reckless `export * from ...` statements in slice roots with explicit named exports so internal implementation details do not leak into the public API.

---

## Phase 4: Verification & Final Audit Report

1. Run the project's type-checker, linter, and test suite (e.g., `tsc --noEmit`, linter, unit tests) to verify zero broken imports, circular dependencies, or type errors.
2. Provide a concise, structured summary of all changes made:
   - **Renamed Identifiers:** Table of `Original Name` | `New Name` | `File Path` | `Rule Applied`.
   - **FSD Violations Fixed:** List of cross-entity/layer imports resolved and how they were refactored.
   - **`index.ts` Cleanups:** Summary of removed dead exports, newly exposed public APIs, and fixed deep imports.
   - **Manual Review Required:** Flag any complex cross-entity coupling that requires a product or domain modeling decision rather than an automated refactor.
