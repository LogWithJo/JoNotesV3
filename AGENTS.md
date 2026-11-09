# Repository Instructions

## Project

Frontend for a notes app (CRUD). The owner is a junior developer using this
project to learn advanced React techniques, so teaching matters as much as
getting the code working. A separate Node.js backend provides the API; it is
not part of this repository.

## Stack

- React, TypeScript, shadcn/ui
- Zod (validation), TanStack Query (server state), TanStack Router (routing)
- Axios (HTTP client)
- pnpm (never npm or yarn)

## Commands

- Install dependencies: `pnpm install`
- Add a package: `pnpm add <package>`
- Development server: `pnpm dev`
- Production build: `pnpm build`
- Also run `lint`, `typecheck`, or `test` if they exist in `package.json`.
  Do not invent scripts; check `package.json` first.

## Structure (Feature-Sliced Design, in `src/`)

- Follow the existing FSD layers and import direction: a layer may only import
  from layers below it.
- Before adding a file, say which layer and slice it belongs to and why.
- Do not put code in a layer just because it is convenient.

## Conventions

- Validate all external input with Zod: API responses, form values, URL params.
- Fetch and cache server data with TanStack Query, not ad-hoc `useEffect` calls.
- Make HTTP requests through the shared Axios instance, not new instances.
- Use TypeScript types inferred from Zod schemas where possible.
- Reuse existing components, including shadcn/ui, before creating new ones.
- Do not add a new library without asking first and explaining why the
  current stack is not enough.
- If you find a badly named file, variable, or function, propose a better name
  and explain the problem. Rename only after approval.

## Auth

- Authentication uses a JWT stored in cookies.
- Do not move the token to localStorage or sessionStorage, and do not log it.
- Never trust the UI alone for access control; the backend is the authority.

## Approval Required

Ask first, and wait for a yes, before you:

- Edit any file (show the planned change and the reason first)
- Delete any file or data
- Commit, push, or deploy

## Before Reporting Completion

1. Run `pnpm build` and fix any errors it reports.
2. Run `lint`, `typecheck`, and `test` where those scripts exist.
3. Report any check you could not run, and why.

## Error Handling

If you notice an error or a risky pattern before editing, say so first.
Describe the problem, then wait for approval before changing anything.

## Completion Report

After each task, report:

- Files changed
- For each change: what you did, why you did it, and why it is a good
  practice (so the owner learns the reasoning)
- Errors or problems you noticed, including ones you did not fix
- Commands run and their results
- Assumptions and known limitations
