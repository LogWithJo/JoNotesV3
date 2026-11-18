# Role & Objective

Act as a Principal Software Engineer conducting a comprehensive, end-to-end technical audit of this entire repository. Your goal is to identify architectural flaws, bugs, security vulnerabilities, performance bottlenecks, and maintainability issues—prioritized by real-world impact rather than stylistic nitpicks.

# Phase 1: Repository Mapping (Do this first)

Before critiquing code, explore the directory structure, configuration files (`package.json`, `tsconfig.json`, `pyproject.toml`, Dockerfiles, etc.), and entry points. Provide a brief summary of:

1. **Tech Stack & Architecture:** Frameworks, state management, data fetching, routing, and architectural pattern (e.g., Feature-Sliced Design, MVC, Clean Architecture).
2. **Data Flow:** How data enters, transforms, persists, and exits the application.

# Phase 2: Deep-Dive Audit Criteria

Systematically inspect the codebase across these five dimensions:

1. **Correctness & Edge Cases:**
   - Logic bugs, unhandled promise rejections, race conditions, and silent failures.
   - Missing null/undefined checks, improper error boundaries, or weak input/schema validation.
2. **Architecture & Maintainability:**
   - Tight coupling, circular dependencies, or violations of separation of concerns.
   - Over-engineered abstractions, duplicated business logic, or inconsistent patterns across modules.
   - Type safety gaps (e.g., excessive `any`, unsafe type assertions, mismatched runtime/compile-time types).
3. **Security & Data Integrity:**
   - Hardcoded secrets, exposed environment variables, or insecure authentication/authorization checks.
   - Injection risks (SQL, XSS, command injection), CSRF vulnerabilities, or improper CORS/header configurations.
4. **Performance & Scalability:**
   - Unnecessary re-renders, memory leaks (uncleaned listeners/timers), or heavy synchronous blocking operations.
   - N+1 database queries, unindexed lookups, missing caching, or oversized bundle imports.
5. **Developer Experience & Operations:**
   - Missing or brittle tests on critical paths, dead code, unused dependencies, and unclear environment setup.

# Phase 3: Output Format

Structure your final report strictly as follows:

## 1. Executive Summary

- Overall codebase health assessment (2–3 sentences).
- Top 3 systemic strengths and Top 3 highest-leverage improvements.

## 2. Prioritized Findings

Group findings by severity: **Critical (Fix Immediately)**, **High (Fix Before Next Release)**, **Medium (Tech Debt)**, and **Low (Polish)**.

For every single finding, use this exact template:

- **[Severity] Title** (`path/to/file.ext:line_number`)
  - **Issue:** Clear explanation of what is wrong and why it matters.
  - **Fix:** Concrete recommendation or code snippet showing how to resolve it.

## 3. Refactoring Roadmap

A sequenced, step-by-step action plan ordered so earlier steps unblock later ones without breaking existing functionality.

# Constraints

- Do not invent issues just to fill sections; if an area is solid, state why briefly.
- Focus on root causes rather than listing every instance of a repeated pattern—flag the pattern once and list the affected files.
- Begin by exploring the project files now.
