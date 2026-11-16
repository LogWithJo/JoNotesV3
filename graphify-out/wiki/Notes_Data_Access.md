# Notes Data Access

> 33 nodes · cohesion 0.17

## Key Concepts

- **notes/index.ts** (21 connections) — `src/entities/notes/index.ts`
- **notes.schema.ts** (12 connections) — `src/entities/notes/model/notes.schema.ts`
- **NoteId** (11 connections) — `src/entities/notes/model/notes.schema.ts`
- **apiClient** (11 connections) — `src/shared/api/cleint.ts`
- **api/index.ts** (11 connections) — `src/shared/api/index.ts`
- **edit-note.api.ts** (10 connections) — `src/features/edit-note/api/edit-note.api.ts`
- **use-edit-note.ts** (10 connections) — `src/features/edit-note/api/use-edit-note.ts`
- **use-notes.ts** (9 connections) — `src/entities/notes/api/use-notes.ts`
- **use-delete-note.ts** (9 connections) — `src/features/delete-note/api/use-delete-note.ts`
- **use-toggle-pin.ts** (9 connections) — `src/features/toggle-pin/api/use-toggle-pin.ts`
- **notesKeys** (8 connections) — `src/entities/notes/api/keys.ts`
- **notes.api.ts** (8 connections) — `src/entities/notes/api/notes.api.ts`
- **edit-note.schema.ts** (8 connections) — `src/features/edit-note/model/edit-note.schema.ts`
- **get-note.api.ts** (8 connections) — `src/features/get-note/api/get-note.api.ts`
- **toggle-pin.api.ts** (8 connections) — `src/features/toggle-pin/api/toggle-pin.api.ts`
- **delete-note.api.ts** (7 connections) — `src/features/delete-note/api/delete-note.api.ts`
- **notes/api/keys.ts** (6 connections) — `src/entities/notes/api/keys.ts`
- **noteIdSchema** (6 connections) — `src/entities/notes/model/notes.schema.ts`
- **noteSchema** (6 connections) — `src/entities/notes/model/notes.schema.ts`
- **getNotesOptions()** (5 connections) — `src/entities/notes/api/use-notes.ts`
- **useEditNote()** (5 connections) — `src/features/edit-note/api/use-edit-note.ts`
- **NotesFilters** (4 connections) — `src/entities/notes/model/notes.schema.ts`
- **getNotes()** (3 connections) — `src/entities/notes/api/notes.api.ts`
- **notesSchemaArray** (3 connections) — `src/entities/notes/model/notes.schema.ts`
- **deleteNote()** (3 connections) — `src/features/delete-note/api/delete-note.api.ts`
- *... and 8 more nodes in this community*

## Relationships

- [Application UI and Auth](Application_UI_and_Auth.md) (24 shared connections)
- [Add Note API Flow](Add_Note_API_Flow.md) (6 shared connections)
- [User Data Access](User_Data_Access.md) (6 shared connections)
- [Login API Flow](Login_API_Flow.md) (2 shared connections)
- [Runtime Dependencies](Runtime_Dependencies.md) (2 shared connections)

## Source Files

- `src/entities/notes/api/keys.ts`
- `src/entities/notes/api/notes.api.ts`
- `src/entities/notes/api/use-notes.ts`
- `src/entities/notes/index.ts`
- `src/entities/notes/model/notes.schema.ts`
- `src/features/delete-note/api/delete-note.api.ts`
- `src/features/delete-note/api/use-delete-note.ts`
- `src/features/edit-note/api/edit-note.api.ts`
- `src/features/edit-note/api/use-edit-note.ts`
- `src/features/edit-note/index.ts`
- `src/features/edit-note/model/edit-note.schema.ts`
- `src/features/get-note/api/get-note.api.ts`
- `src/features/toggle-pin/api/toggle-pin.api.ts`
- `src/features/toggle-pin/api/use-toggle-pin.ts`
- `src/shared/api/cleint.ts`
- `src/shared/api/index.ts`

## Audit Trail

- EXTRACTED: 129 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*