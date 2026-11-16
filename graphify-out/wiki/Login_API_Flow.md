# Login API Flow

> 9 nodes · cohesion 0.44

## Key Concepts

- **use-login.ts** (9 connections) — `src/features/user-login/api/use-login.ts`
- **login.api.ts** (8 connections) — `src/features/user-login/api/login.api.ts`
- **login.schema.ts** (6 connections) — `src/features/user-login/model/login.schema.ts`
- **useLogin()** (5 connections) — `src/features/user-login/api/use-login.ts`
- **continueAuth()** (3 connections) — `src/features/user-login/api/login.api.ts`
- **user-login/index.ts** (3 connections) — `src/features/user-login/index.ts`
- **LoginInput** (3 connections) — `src/features/user-login/model/login.schema.ts`
- **loginResponseSchema** (2 connections) — `src/features/user-login/model/login.schema.ts`
- **loginSchema** (2 connections) — `src/features/user-login/model/login.schema.ts`

## Relationships

- [Application UI and Auth](Application_UI_and_Auth.md) (4 shared connections)
- [User Data Access](User_Data_Access.md) (3 shared connections)
- [Notes Data Access](Notes_Data_Access.md) (2 shared connections)

## Source Files

- `src/features/user-login/api/login.api.ts`
- `src/features/user-login/api/use-login.ts`
- `src/features/user-login/index.ts`
- `src/features/user-login/model/login.schema.ts`

## Audit Trail

- EXTRACTED: 25 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*