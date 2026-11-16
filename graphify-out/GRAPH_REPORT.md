# Graph Report - JoNotesV3  (2026-11-16)

## Corpus Check
- 61 files · ~7,828 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .csv 1, .excalidraw 1)

## Summary
- 296 nodes · 477 edges · 23 communities (14 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `79e0fc94`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Linting Dependencies
- Notes Data Access
- Application UI and Auth
- App TypeScript Settings
- User Data Access
- Node TypeScript Settings
- Runtime Dependencies
- Workspace Build Tools
- Login API Flow
- Add Note API Flow
- 2) Authentication routes
- TypeScript Project References
- <Project Name>
- JoNotesV3
- Feature Specification to Evaluate

## God Nodes (most connected - your core abstractions)
1. `<Project Name>` - 23 edges
2. `compilerOptions` - 18 edges
3. `compilerOptions` - 15 edges
4. `JoNotesV3` - 15 edges
5. `@tanstack/react-query` - 14 edges
6. `allowBuilds` - 13 edges
7. `2) Authentication routes` - 13 edges
8. `NoteId` - 11 edges
9. `apiClient` - 11 edges
10. `3) Notes routes` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Resource` --references--> `Note`  [INFERRED]
  notes/api/Pagination.prompt.md → src/entities/notes/model/notes.schema.ts
- `useLogout()` --indirect_call--> `logout()`  [INFERRED]
  src/features/user-logout/api/use-logout.ts → src/features/user-logout/api/logout.api.ts
- `Login()` --calls--> `useLogin()`  [EXTRACTED]
  src/app/App.tsx → src/features/user-login/api/use-login.ts
- `Notes()` --calls--> `getNotesOptions()`  [EXTRACTED]
  src/app/App.tsx → src/entities/notes/api/use-notes.ts
- `Notes()` --calls--> `useAddNote()`  [EXTRACTED]
  src/app/App.tsx → src/features/add-note/api/use-add-note.ts

## Import Cycles
- None detected.

## Communities (23 total, 9 thin omitted)

### Community 0 - "Linting Dependencies"
Cohesion: 0.07
Nodes (42): devDependencies, @babel/core@^7.29.7, babel-plugin-react-compiler@^1.0.0, eslint@^10.14.0, @eslint/js@^10.0.1, eslint-plugin-react-hooks@^7.1.1, eslint-plugin-react-refresh@^0.5.7, globals@^17.13.0 (+34 more)

### Community 1 - "Notes Data Access"
Cohesion: 0.16
Nodes (18): notesKeys, getNotes(), getNotesOptions(), NoteId, noteIdSchema, noteSchema, NotesFilters, notesFilterSchema (+10 more)

### Community 2 - "Application UI and Auth"
Cohesion: 0.13
Nodes (18): react, @tanstack/react-query, App(), Login(), Logout(), Notes(), Props, useIsAuth() (+10 more)

### Community 3 - "App TypeScript Settings"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 4 - "User Data Access"
Cohesion: 0.20
Nodes (8): zod@^4.6.7, zod, User, userRes, userSchema, logout(), LogoutResponse, logoutResponseSchema

### Community 5 - "Node TypeScript Settings"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 6 - "Runtime Dependencies"
Cohesion: 0.13
Nodes (14): dependencies, axios@^1.21.0, graphifyy@^0.10.0, jonotesv3@link:, react@^19.3.1, react-dom@^19.3.1, @tanstack/react-query@^5.107.1, usehooks-ts@^3.1.1 (+6 more)

### Community 7 - "Workspace Build Tools"
Cohesion: 0.14
Nodes (13): allowBuilds, tesseract.js, tree-sitter-c, tree-sitter-cpp, tree-sitter-go, tree-sitter-java, tree-sitter-javascript, tree-sitter-lua (+5 more)

### Community 8 - "Login API Flow"
Cohesion: 0.44
Nodes (5): continueAuth(), useLogin(), LoginInput, loginResponseSchema, loginSchema

### Community 9 - "Add Note API Flow"
Cohesion: 0.50
Nodes (4): addNote(), useAddNote(), AddNoteInput, addNoteInputSchema

### Community 10 - "2) Authentication routes"
Cohesion: 0.07
Nodes (29): 1) Health and status, 2) Authentication routes, 3) Notes routes, 4) Notes and implementation summary, Authentication model, Base URL, `DELETE /notes`, `DELETE /notes/:id` (+21 more)

### Community 12 - "<Project Name>"
Cohesion: 0.08
Nodes (23): Architecture & Conventions, Available Scripts, Browser Support, Build & Deployment, Code Quality, Contributing, Demo & Screenshots, Environment Variables (+15 more)

### Community 13 - "JoNotesV3"
Cohesion: 0.12
Nodes (15): Architecture and Conventions, Available Scripts, Browser Support, Code Quality, Environment Variables, Getting Started, JoNotesV3, Knowledge Graph (+7 more)

### Community 14 - "Feature Specification to Evaluate"
Cohesion: 0.22
Nodes (8): Critical Guardrails & Constraints (MUST FOLLOW), Endpoint 1: Offset pagination, Endpoint 2: Cursor pagination, Feature Specification to Evaluate, Requirements, Resource, Task: Safely Evaluate & Plan Pagination Implementation, Note

## Knowledge Gaps
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@tanstack/react-query` connect `Application UI and Auth` to `Linting Dependencies`, `Notes Data Access`, `Runtime Dependencies`, `Login API Flow`, `Add Note API Flow`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Should `Linting Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06767676767676768 - nodes in this community are weakly interconnected._
- **Why does `zod` connect `User Data Access` to `Linting Dependencies`, `Notes Data Access`, `Add Note API Flow`, `Login API Flow`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Should `Application UI and Auth` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `App TypeScript Settings` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Node TypeScript Settings` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._