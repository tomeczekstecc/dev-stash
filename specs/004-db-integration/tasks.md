# Tasks: Database Integration

**Input**: Design documents from `specs/004-db-integration/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Organization**: Tasks grouped by user story for independent implementation and testing.  
**Tests**: Not requested — no test tasks included.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US4)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and configure project scaffolding before any Prisma work begins.

- [x] T001 Install Prisma 7 production dependencies: `pnpm add @prisma/client @prisma/adapter-pg pg`
- [x] T002 Install Prisma 7 dev dependencies: `pnpm add -D prisma tsx @types/pg`
- [x] T003 [P] Update `.gitignore` — add `!.env.example` exception and `src/generated/prisma/` entry
- [x] T004 [P] Create `.env.example` at repo root with empty `DATABASE_URL` and `DIRECT_URL` keys
- [x] T005 [P] Update `package.json` — add `"postinstall": "prisma generate"` script and `"engines": { "node": ">=20.19" }` field

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core Prisma configuration files that must exist before any schema or migration work.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T006 Create `prisma/schema.prisma` — set `generator client` with `provider = "prisma-client"` and `output = "../src/generated/prisma"`, set `datasource db` with `provider = "postgresql"` and no `url` field
- [x] T007 Create `prisma.config.ts` at repo root — use `import { config } from "dotenv"; config({ path: ".env.local" })`, `defineConfig` with `schema: "prisma/schema.prisma"`, `migrations: { path: "prisma/migrations", seed: "tsx prisma/seed.ts" }`, and `datasource: { url: env("DIRECT_URL") }`

**Checkpoint**: Prisma CLI is fully configured. Schema and config files exist. User story work can now begin.

---

## Phase 3: User Story 1 — Schema Persists Application Data (Priority: P1) 🎯 MVP

**Goal**: All core data models defined in schema, Prisma client generated, and singleton available for server components.

**Independent Test**: Run `pnpm prisma generate` — command completes without errors and `src/generated/prisma/` is created with typed models for User, Item, ItemType, Collection, Tag, and ItemTag.

- [x] T008 [P] [US1] Add `ContentType` enum (`TEXT`, `FILE`) to `prisma/schema.prisma`
- [x] T009 [P] [US1] Add `ItemType` model to `prisma/schema.prisma` — fields: `id`, `name`, `icon?`, `color?`, `isSystem`, `userId?`; relation `user User?` with `onDelete: Cascade`; add `@@index([userId])`
- [x] T010 [P] [US1] Add `Collection` model to `prisma/schema.prisma` — fields: `id`, `name`, `description?`, `isFavorite`, `userId`, `createdAt`, `updatedAt`; relation `user User` with `onDelete: Cascade`; add `@@index([userId])`
- [x] T011 [P] [US1] Add `Tag` model to `prisma/schema.prisma` — fields: `id`, `name`, `userId`; relation `user User` with `onDelete: Cascade`; add `@@unique([userId, name])` and `@@unique([userId, name])` and `@@index([userId])`
- [x] T012 [US1] Add `User` model to `prisma/schema.prisma` — fields: `id`, `email @unique`, `password?`, `isPro`, `stripeCustomerId?`, `stripeSubscriptionId?`, `createdAt`, `updatedAt`; relations `items Item[]`, `itemTypes ItemType[]`, `collections Collection[]`, `tags Tag[]`
- [x] T013 [US1] Add `Item` model to `prisma/schema.prisma` — fields: `id`, `title`, `contentType ContentType`, `content?`, `fileUrl?`, `fileName?`, `fileSize?`, `url?`, `description?`, `isFavorite`, `isPinned`, `language?`, `userId`, `typeId`, `collectionId?`, `createdAt`, `updatedAt`; relation `user User` with `onDelete: Cascade`; relation `type ItemType` with `onDelete: Restrict`; relation `collection Collection?` with `onDelete: Cascade`; add `@@index([userId])`, `@@index([typeId])`, `@@index([collectionId])`
- [x] T014 [US1] Add `ItemTag` model to `prisma/schema.prisma` — fields: `itemId`, `tagId`; relations `item Item` and `tag Tag` both with `onDelete: Cascade`; add `@@id([itemId, tagId])`
- [x] T015 [US1] Run `pnpm prisma generate` — verify `src/generated/prisma/` is created with no errors
- [x] T016 [US1] Create `src/lib/db.ts` — import `PrismaClient` from `@/generated/prisma/client` and `PrismaPg` from `@prisma/adapter-pg`; create adapter with `process.env.DATABASE_URL!`; use `globalThis` singleton pattern; export named `db` constant

**Checkpoint**: `pnpm prisma generate` succeeds. `db` singleton is importable. Core models are type-safe.

---

## Phase 4: User Story 2 — Authentication Session Storage (Priority: P2)

**Goal**: NextAuth adapter models added to schema, User model extended with auth fields, client regenerated.

**Independent Test**: Run `pnpm prisma generate` — `Account`, `Session`, and `VerificationToken` types exist in generated client at `src/generated/prisma/`.

- [x] T017 [P] [US2] Add `Account` model to `prisma/schema.prisma` — fields: `userId`, `type`, `provider`, `providerAccountId`, `refresh_token?`, `access_token?`, `expires_at?`, `token_type?`, `scope?`, `id_token?`, `session_state?`, `createdAt`, `updatedAt`; relation `user User` with `onDelete: Cascade`; add `@@id([provider, providerAccountId])`
- [x] T018 [P] [US2] Add `Session` model to `prisma/schema.prisma` — fields: `sessionToken @unique`, `userId`, `expires`, `createdAt`, `updatedAt`; relation `user User` with `onDelete: Cascade`; add `@@index([userId])`
- [x] T019 [P] [US2] Add `VerificationToken` model to `prisma/schema.prisma` — fields: `identifier`, `token`, `expires`; add `@@id([identifier, token])`
- [x] T020 [US2] Extend `User` model in `prisma/schema.prisma` — add fields `name?`, `emailVerified?`, `image?`; add relations `accounts Account[]` and `sessions Session[]`
- [x] T021 [US2] Run `pnpm prisma generate` — verify `Account`, `Session`, `VerificationToken` types present in generated client

**Checkpoint**: All 10 models are defined. Generated client includes NextAuth adapter types.

---

## Phase 5: User Story 3 — Safe Schema Evolution via Migrations (Priority: P3)

**Goal**: Initial migration created and applied to Neon `develop` branch. Migration status clean.

**Independent Test**: Run `pnpm prisma migrate status` — output reports all migrations applied, zero drift.

- [x] T022 [US3] Run `pnpm prisma migrate dev --name init` — creates `prisma/migrations/<timestamp>_init/migration.sql` and applies all tables to Neon `develop` branch
- [x] T023 [US3] Run `pnpm prisma migrate status` — confirm output shows zero drift and all migrations applied; commit `prisma/migrations/` directory to source control

**Checkpoint**: All tables exist on Neon `develop` branch. Migration history committed. `migrate status` is clean.

---

## Phase 6: User Story 4 — Seeded Reference Data (Priority: P4)

**Goal**: 7 system ItemTypes seeded into database, idempotent.

**Independent Test**: Run `pnpm prisma db seed` twice — second run produces no duplicates; `ItemType` table contains exactly 7 rows with `isSystem: true`.

- [x] T024 [US4] Create `prisma/seed.ts` — import `db` from `src/lib/db.ts`; upsert 7 system ItemTypes using hardcoded stable IDs (`itemtype_snippet`, `itemtype_prompt`, `itemtype_note`, `itemtype_command`, `itemtype_file`, `itemtype_image`, `itemtype_url`) with names, icons, and `isSystem: true`; wrap in `async main()` with `db.$disconnect()` in finally block
- [x] T025 [US4] Run `pnpm prisma db seed` — verify 7 rows in `ItemType` table on Neon `develop` branch; run a second time to confirm idempotency

**Checkpoint**: Database is fully operational with reference data. All user stories independently validated.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Finalize project metadata and verify clean build.

- [x] T026 [P] Update `CLAUDE.md` project structure section — add `prisma/` directory tree, `prisma.config.ts`, `src/lib/db.ts`, and `src/generated/prisma/` (generated) entries
- [x] T027 [P] Update `context/current-feature.md` — set status to In Progress, add feature goal summary
- [x] T028 Run `pnpm build` — resolve all TypeScript errors before marking feature complete

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — BLOCKS all user stories
- **Phase 3 (US1)**: Depends on Phase 2
- **Phase 4 (US2)**: Depends on Phase 3 (User model must exist before adding relations to it)
- **Phase 5 (US3)**: Depends on Phase 4 — migration runs after all models are defined
- **Phase 6 (US4)**: Depends on Phase 5 — seed requires tables to exist
- **Phase 7 (Polish)**: Depends on Phase 6

### User Story Dependencies

- **US1 (P1)**: Unblocked after Phase 2 — no story dependencies
- **US2 (P2)**: Depends on US1 — User model must exist to add auth fields and relations
- **US3 (P3)**: Depends on US1 + US2 — migration runs after all models are complete
- **US4 (P4)**: Depends on US3 — tables must exist before seed can run

### Within Each Phase

- Tasks marked [P] within the same phase can run in parallel
- T012 (User model) depends on T009–T011 being present in the file first (relations reference them)
- T013 (Item model) depends on T012 (User), T009 (ItemType), T010 (Collection) being present
- T014 (ItemTag) depends on T013 (Item) and T011 (Tag) being present
- T020 (User model extension) must come after T017–T019 (auth models must exist before User can reference them)

### Parallel Opportunities

```bash
# Phase 1 — run together:
T003: Update .gitignore
T004: Create .env.example
T005: Update package.json

# Phase 3 — run together (independent models, same file — apply sequentially but review together):
T008: ContentType enum
T009: ItemType model
T010: Collection model
T011: Tag model
# Then sequentially: T012 (User) → T013 (Item) → T014 (ItemTag)

# Phase 4 — run together:
T017: Account model
T018: Session model
T019: VerificationToken model
# Then: T020 (extend User) → T021 (generate)

# Phase 7 — run together:
T026: Update CLAUDE.md
T027: Update current-feature.md
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (T008–T016)
4. **STOP and VALIDATE**: `pnpm prisma generate` succeeds, `db` singleton imports cleanly
5. Continue to US2+ when ready

### Incremental Delivery

1. Phase 1 + 2 → Prisma configured
2. Phase 3 → Core schema + client (MVP)
3. Phase 4 → Auth models ready for NextAuth feature
4. Phase 5 → Database live on Neon, migration committed
5. Phase 6 → Seed data present, app fully operable
6. Phase 7 → Clean build, docs updated

---

## Notes

- [P] tasks = different files or additive changes with no cross-dependency
- Schema edits (T008–T014, T017–T020) are all to `prisma/schema.prisma` — apply them in order, not truly parallel; the [P] mark means they can be prepared in parallel and applied sequentially
- Run `pnpm prisma generate` after every schema change to keep the type-safe client in sync
- Do not run `pnpm prisma migrate dev` until ALL models (US1 + US2) are complete — one clean initial migration is preferable to multiple incremental ones
- Commit `prisma/migrations/` — never gitignore migration files
- Never commit `.env.local` — it is covered by `.env*` in `.gitignore`
