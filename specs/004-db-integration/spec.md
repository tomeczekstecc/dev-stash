# Feature Specification: Database Integration

**Feature Branch**: `004-db-integration`  
**Created**: 2026-05-05  
**Status**: Reviewed  
**Input**: User description: "add db integration to project use @context/database-spec.md"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Schema Persists Application Data (Priority: P1)

A developer running the application can store and retrieve Users, Items, Collections, Tags, and ItemTypes from the database. All core data models from the project overview are persisted to Neon PostgreSQL via Prisma.

**Why this priority**: Without this, no application feature that requires data persistence can function. Everything downstream depends on a working schema.

**Independent Test**: Run `prisma migrate dev`, start the app, and confirm that creating a user record and querying it back succeeds — that alone delivers a working data layer.

**Acceptance Scenarios**:

1. **Given** a fresh database branch, **When** `prisma migrate dev` is run, **Then** all tables are created with correct columns, indexes, and relations with no errors.
2. **Given** a running application, **When** a User record is created via Prisma, **Then** the record is readable from Neon and all fields match.
3. **Given** an Item referencing a User and ItemType, **When** the User is deleted, **Then** the Item is also deleted (cascade).
4. **Given** a Collection with Items, **When** the Collection is deleted, **Then** all Items in that collection are also deleted.
5. **Given** an Item belonging to an ItemType that has other Items, **When** a delete of that ItemType is attempted, **Then** the database rejects the delete.

---

### User Story 2 - Authentication Session Storage (Priority: P2)

NextAuth can persist accounts, sessions, and verification tokens to the database so that user sessions survive server restarts and multi-instance deployments. The schema tables are present and ready; NextAuth wiring is a separate feature.

**Why this priority**: Auth is required before any user-facing feature can be protected. Having the schema tables ready unblocks the auth feature immediately after this one.

**Independent Test**: Run migrations and confirm Account, Session, and VerificationToken tables exist in the database with correct columns.

**Acceptance Scenarios**:

1. **Given** a migrated database, **When** the schema is inspected, **Then** Account, Session, and VerificationToken tables exist with all columns required by the NextAuth Prisma adapter.
2. **Given** the NextAuth adapter documentation, **When** compared against the schema, **Then** no missing fields or type mismatches exist.

---

### User Story 3 - Safe Schema Evolution via Migrations (Priority: P3)

A developer making schema changes runs `prisma migrate dev` locally to generate a migration file that can be safely applied to the development Neon branch, and later promoted to production via `prisma migrate deploy`.

**Why this priority**: Without migration discipline, schema drift between environments causes silent data loss or deployment failures.

**Independent Test**: Make a schema change, run `prisma migrate dev`, inspect the generated SQL migration file, and confirm `prisma migrate status` reports no drift.

**Acceptance Scenarios**:

1. **Given** a schema change in `schema.prisma`, **When** `prisma migrate dev` is run, **Then** a new SQL migration file is generated in `prisma/migrations/`.
2. **Given** a production deployment, **When** `prisma migrate deploy` is run before the app starts, **Then** all pending migrations are applied without errors.
3. **Given** the development branch URL in `DATABASE_URL`, **When** migrations are run, **Then** the production branch is not affected.

---

### User Story 4 - Seeded Reference Data (Priority: P4)

After running migrations, a developer runs the seed command and all 7 system ItemTypes (Snippet, Prompt, Note, Command, File, Image, URL) are present in the database, ready for use without any manual inserts.

**Why this priority**: Without system ItemTypes, no Item can be created — the app is non-functional out of the box without this seed data.

**Independent Test**: Run `pnpm prisma db seed` on a freshly migrated database and query the ItemType table — all 7 system types must exist.

**Acceptance Scenarios**:

1. **Given** a migrated database with no data, **When** `pnpm prisma db seed` is run, **Then** 7 ItemType rows exist with `isSystem: true`.
2. **Given** a database with existing system types, **When** the seed is run again, **Then** no duplicate types are created (idempotent).

---

### Edge Cases

- What happens when `DATABASE_URL` is missing or malformed at startup?
- How does the system handle a migration that fails halfway through?
- What happens when an Item references a deleted Collection — item is also deleted (cascade).
- How does the schema handle a user with no items or collections — nullable relations permit this.
- What prevents creating two tags with the same name for the same user — `@@unique([userId, name])` constraint.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST connect to Neon PostgreSQL using `DATABASE_URL` (pooled endpoint) for runtime queries and `DIRECT_URL` (unpooled endpoint) for migrations, both stored in `.env.local`.
- **FR-002**: A committed `.env.example` file MUST document all required environment variable keys with empty values.
- **FR-003**: System MUST define a Prisma schema including: User, Item, ItemType, Collection, Tag, ItemTag, Account, Session, and VerificationToken.
- **FR-004**: `Item.contentType` MUST be a Prisma enum with values `TEXT` and `FILE`.
- **FR-005**: System MUST define cascade deletes so that deleting a User removes all their Items, Collections, Tags, and ItemTypes.
- **FR-006**: System MUST define cascade deletes so that deleting a Collection removes all Items within it.
- **FR-007**: System MUST define `onDelete: Restrict` on the `Item` → `ItemType` relation, preventing deletion of an ItemType that has associated Items.
- **FR-008**: System MUST define `@@unique([userId, name])` on the Tag model to enforce one tag name per user at the database level.
- **FR-009**: System MUST define appropriate database indexes on foreign keys and frequently queried fields (e.g., `userId`, `email`).
- **FR-010**: Schema changes MUST be applied via `prisma migrate dev` — direct schema pushes (`prisma db push`) are prohibited except when explicitly authorized.
- **FR-011**: System MUST use Prisma 7, following the v7 upgrade guide for any breaking changes.
- **FR-012**: System MUST expose the Prisma client as a singleton in `src/lib/db.ts`, safe for Next.js hot-reload in development.
- **FR-013**: A seed file at `prisma/seed.ts` MUST create the 7 system ItemTypes (Snippet, Prompt, Note, Command, File, Image, URL) idempotently using `tsx` as the runner.

### Key Entities *(include if feature involves data)*

- **User**: Represents an authenticated developer user; owns items, collections, tags, and custom item types; linked to NextAuth Account and Session.
- **Item**: A single stashed resource; belongs to a User and an ItemType (restricted delete); optionally in a Collection (cascade delete if collection removed); content stored as text (`TEXT`) or file reference (`FILE`); has many Tags.
- **ItemType**: Describes the kind of item (system-defined or user-defined for Pro users); deletion restricted when Items reference it.
- **Collection**: A named grouping of Items owned by a User; deleting a collection cascades to all its Items.
- **Tag**: A user-scoped label with a unique name per user (`@@unique([userId, name])`); connected to Items via ItemTag.
- **ItemTag**: Join table linking Items and Tags with a composite primary key.
- **Account / Session / VerificationToken**: NextAuth adapter models — schema only, no application wiring in this feature.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `prisma migrate dev` completes without errors on the Neon development branch, creating all tables in under 10 seconds.
- **SC-002**: `prisma db seed` populates all 7 system ItemTypes and is idempotent — running it twice produces no duplicates.
- **SC-003**: All cascade and restrict behaviors are verifiable by creating and deleting records through Prisma without manual SQL.
- **SC-004**: `prisma migrate status` reports zero drift between migration history and the development database schema at the point of commit.
- **SC-005**: A developer can go from cloning the repo to a working database connection in under 5 minutes by following the setup steps in `.env.example`.

## Assumptions

- The Neon project and `develop` branch already exist; connection strings are available from the Neon dashboard.
- `DATABASE_URL` points to the pooled Neon endpoint; `DIRECT_URL` points to the unpooled endpoint (same host, `-pooler` removed).
- Both env vars are stored in `.env.local` and never committed to source control.
- A separate production `DATABASE_URL` will be configured in the deployment environment; not in scope for this feature.
- Prisma 7 is installed fresh — no migration from an older version.
- NextAuth Prisma adapter schema tables are included but NextAuth is not installed or configured in this feature.
- `tsx` is added as a dev dependency to run the TypeScript seed file.
- File storage (Cloudflare R2), AI features, and Stripe billing are out of scope; placeholder fields (`fileUrl`, `fileName`, `fileSize`, `stripeCustomerId`, `stripeSubscriptionId`) are included in the schema but have no associated logic.
- Tag names are normalized (lowercased, trimmed) at the application layer before hitting the unique constraint.
