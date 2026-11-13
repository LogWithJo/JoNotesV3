# JoNotesV3

> A React web app for signing in and managing categorized notes.

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Getting Started](#getting-started)
5. [Environment Variables](#environment-variables)
6. [Available Scripts](#available-scripts)
7. [Project Structure](#project-structure)
8. [Architecture and Conventions](#architecture-and-conventions)
9. [State Management and Data Fetching](#state-management-and-data-fetching)
10. [Code Quality](#code-quality)
11. [Production Build](#production-build)
12. [Browser Support](#browser-support)

## Overview

JoNotesV3 is the frontend client for a note-taking application. Users can sign in with their name and email, view notes, add notes with a title and category, edit a note's title, category, and content, delete notes, and toggle their pinned state. They can also filter notes by category, search them, and sort them by date or title. The client communicates with a separate API service.

## Tech Stack

- React 19 and TypeScript
- Vite 8 with the React plugin and React Compiler Babel preset
- TanStack Query for server data and mutations
- Axios for HTTP requests
- Zod for request and response schemas
- ESLint with TypeScript, React Hooks, and React Refresh rules

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0` (the range required by Vite 8)
- pnpm
- An API service accessible at the configured API base URL

## Getting Started

1. Check out the repository into a local directory.
2. From the project root, install dependencies:

   ```sh
   pnpm install --frozen-lockfile
   ```

3. If the API is hosted on a different origin, set `VITE_API_BASE_URL` in a root `.env.local` file to that API's base URL.
4. Start the development server:

   ```sh
   pnpm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

Vite uses port 3000 and does not select another port if it is already occupied. The API service must be started separately.

## Environment Variables

Vite reads environment files from the project root. The application uses this client-side variable:

| Variable | Required | Description | Default |
| -------- | -------- | ----------- | ------- |
| `VITE_API_BASE_URL` | Only when the API is on another origin | Base URL used by the Axios API client. Trailing slashes are removed. | Empty string; API requests use the current origin. |

Variables prefixed with `VITE_` are exposed to browser code. Do not place secrets in them. The Axios client sends requests with credentials enabled.

## Available Scripts

| Command | Purpose |
| ------- | ------- |
| `pnpm run dev` | Start the Vite development server on port 3000. |
| `pnpm run build` | Run the TypeScript project build, then create the production bundle. |
| `pnpm run preview` | Serve the production build locally. |
| `pnpm run lint` | Run ESLint across the project. |

## Project Structure

```text
.
├── notes/
│   ├── AI/                     # AI prompt templates
│   ├── api/                    # API, authentication, and query-key notes
│   │   ├── query-keys.csv      # Query-key reference data
│   │   ├── query-keys.excalidraw # Query-key diagram
│   │   └── query-keys.md       # Query-key reference
│   └── plan/                   # Project learning plan
├── src/
│   ├── app/                    # Root application components
│   │   └── providers/          # TanStack Query provider and client
│   ├── entities/
│   │   ├── notes/
│   │   │   ├── api/            # Note queries and query keys
│   │   │   └── model/          # Note schemas and types
│   │   └── user/
│   │       ├── api/            # Current-user query
│   │       └── model/          # User response schema
│   ├── features/
│   │   ├── add-note/
│   │   │   ├── api/            # Add-note request and mutation hook
│   │   │   └── model/          # Add-note input schema
│   │   ├── delete-note/
│   │   │   └── api/            # Delete-note request and mutation hook
│   │   ├── edit-note/
│   │   │   ├── api/            # Edit-note request and mutation hook
│   │   │   └── model/          # Edit-note input schema
│   │   ├── get-note/
│   │   │   └── api/            # Single-note request and query hook
│   │   ├── toggle-pin/
│   │   │   └── api/            # Pin-toggle request and mutation hook
│   │   ├── user-login/
│   │   │   ├── api/            # Login request and mutation hook
│   │   │   └── model/          # Login input and response schemas
│   │   └── user-logout/
│   │       ├── api/            # Logout request and mutation hook
│   │       └── model/          # Logout response type
│   ├── shared/
│   │   └── api/                # Shared Axios client and configuration
│   └── main.tsx                # React application entry point
├── eslint.config.js            # ESLint configuration
├── index.html                  # Vite HTML entry point
├── package.json                # Dependencies and scripts
├── pnpm-lock.yaml              # Locked dependency versions
├── tsconfig.json               # TypeScript project references
├── tsconfig.app.json           # Application TypeScript options
├── tsconfig.node.json          # Vite configuration TypeScript options
└── vite.config.ts              # Vite and development server configuration
```

The source is organized by application layer and feature. Feature-specific API operations and mutations belong under `src/features/`; shared domain schemas and queries belong under `src/entities/`; shared HTTP configuration belongs under `src/shared/api/`.

## Architecture and Conventions

- `src/main.tsx` mounts the React application and wraps it in `StrictMode` and the TanStack Query provider.
- `src/app/App.tsx` composes the current user, login, logout, and notes UI.
- Feature directories contain their API functions, TanStack Query hooks, and input schemas where applicable.
- Entity directories contain reusable schemas, types, query option factories, and query keys.
- Components use PascalCase names; hooks use the `use` prefix. Source files use relative imports.

## State Management and Data Fetching

- React `useState` holds form values and the client-side authentication flag. The flag is persisted in browser local storage under `isAuth`.
- TanStack Query loads the current user and notes. The notes query accepts category, search, and sort filters, and keeps the previous results visible while fetching updated results. Successful note mutations invalidate note-list and affected detail queries; successful login and logout invalidate the current-user query.
- The note query-key structure is documented in [the query-key reference](notes/api/query-keys.md).
- The shared Axios client uses `VITE_API_BASE_URL`, JSON headers, a 10-second timeout, and credentialed requests. The authentication flow relies on the API's cookie handling.
- Zod schemas validate API responses and mutation inputs. The query client retries failed queries twice by default.
- The frontend calls the API routes described in [the API endpoint notes](notes/api/API_Endpoints.md).

## Code Quality

`pnpm run lint` runs ESLint with the project's TypeScript, React Hooks, and React Refresh configuration. The production build also runs the TypeScript project build before bundling.

## Production Build

Run:

```sh
pnpm run build
```

Vite writes the production bundle to `dist/`. To serve that bundle locally, run `pnpm run preview`.

## Browser Support

The project does not override Vite 8's default production target. It supports Chrome 111+, Edge 111+, Firefox 114+, and Safari 16.4+. Vite transforms syntax for this target but does not add polyfills by default. See [Vite's browser compatibility documentation](https://vite.dev/guide/build#browser-compatibility).