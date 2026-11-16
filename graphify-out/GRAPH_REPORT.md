# Graph Report - JoNotesV3  (2026-11-16)

## Corpus Check
- Corpus is ~7,184 words - fits in a single context window. You may not need a graph.

## Summary
- 210 nodes · 401 edges · 12 communities (11 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

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
- Package Scripts
- TypeScript Project References

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `compilerOptions` - 15 edges
3. `@tanstack/react-query` - 14 edges
4. `allowBuilds` - 13 edges
5. `NoteId` - 11 edges
6. `apiClient` - 11 edges
7. `zod` - 8 edges
8. `Notes()` - 8 edges
9. `notesKeys` - 8 edges
10. `App()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `useLogout()` --indirect_call--> `logout()`  [INFERRED]
  src/features/user-logout/api/use-logout.ts → src/features/user-logout/api/logout.api.ts
- `User()` --calls--> `getMeOptions()`  [EXTRACTED]
  src/app/App.tsx → src/entities/user/api/use-get-me.ts
- `Login()` --calls--> `useLogin()`  [EXTRACTED]
  src/app/App.tsx → src/features/user-login/api/use-login.ts
- `Notes()` --calls--> `getNotesOptions()`  [EXTRACTED]
  src/app/App.tsx → src/entities/notes/api/use-notes.ts
- `Notes()` --calls--> `useAddNote()`  [EXTRACTED]
  src/app/App.tsx → src/features/add-note/api/use-add-note.ts

## Import Cycles
- None detected.

## Communities (12 total, 1 thin omitted)

### Community 0 - "Linting Dependencies"
Cohesion: 0.08
Nodes (37): devDependencies, @babel/core@^7.29.7, babel-plugin-react-compiler@^1.0.0, eslint@^10.14.0, @eslint/js@^10.0.1, eslint-plugin-react-hooks@^7.1.1, eslint-plugin-react-refresh@^0.5.7, globals@^17.13.0 (+29 more)

### Community 1 - "Notes Data Access"
Cohesion: 0.17
Nodes (18): notesKeys, getNotes(), getNotesOptions(), Note, NoteId, noteIdSchema, noteSchema, NotesFilters (+10 more)

### Community 2 - "Application UI and Auth"
Cohesion: 0.14
Nodes (16): react, @tanstack/react-query, App(), Login(), Logout(), Notes(), Props, useIsAuth() (+8 more)

### Community 3 - "App TypeScript Settings"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 4 - "User Data Access"
Cohesion: 0.17
Nodes (11): zod@^4.6.7, zod, authKeys, getMeOptions(), getMe(), User, userRes, userSchema (+3 more)

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

### Community 10 - "Package Scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, preview

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@tanstack/react-query` connect `Application UI and Auth` to `Linting Dependencies`, `Notes Data Access`, `User Data Access`, `Runtime Dependencies`, `Login API Flow`, `Add Note API Flow`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Should `Linting Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07948717948717948 - nodes in this community are weakly interconnected._
- **Why does `zod` connect `User Data Access` to `Linting Dependencies`, `Notes Data Access`, `Add Note API Flow`, `Login API Flow`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Should `Application UI and Auth` be split into smaller, more focused modules?**
  _Cohesion score 0.14153846153846153 - nodes in this community are weakly interconnected._
- **Should `App TypeScript Settings` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Node TypeScript Settings` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._