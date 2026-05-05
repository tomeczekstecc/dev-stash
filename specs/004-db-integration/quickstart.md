# Quickstart: Database Setup

**Feature**: 004-db-integration

---

## Prerequisites

- Node.js 20.19+
- A Neon project with a `develop` branch
- `pnpm` installed

---

## Setup Steps

### 1. Copy environment template

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in both values from your Neon dashboard (`develop` branch):

```env
# Pooled endpoint (connection pooling ON) — used by the app at runtime
DATABASE_URL="postgresql://neondb_owner:<password>@<host>-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Direct endpoint (connection pooling OFF) — used by Prisma CLI for migrations
DIRECT_URL="postgresql://neondb_owner:<password>@<host>.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

The `DIRECT_URL` is the same as `DATABASE_URL` with `-pooler` removed from the hostname.

### 2. Install dependencies

```bash
pnpm install
```

### 3. Generate the Prisma client

```bash
pnpm prisma generate
```

This creates the typed client at `src/generated/prisma/`.

### 4. Run migrations

```bash
pnpm prisma migrate dev --name init
```

Creates all tables on the Neon `develop` branch.

### 5. Seed system data

```bash
pnpm prisma db seed
```

Inserts the 7 system ItemTypes. Safe to run multiple times (idempotent).

### 6. Verify

```bash
pnpm prisma migrate status
```

Should report: all migrations applied, no drift.

---

## Production Deployment

Before the app starts, run:

```bash
pnpm prisma migrate deploy
```

Set `DATABASE_URL` and `DIRECT_URL` as environment variables in Vercel pointing to the production Neon branch (not `develop`).

---

## Troubleshooting

**`P1001: Can't reach database server`** — Check `DIRECT_URL` is set correctly in `.env.local` and that the Neon branch is active.

**`Error: @prisma/adapter-pg not found`** — Run `pnpm install` to ensure all dependencies are installed.

**`migration already exists`** — Run `pnpm prisma migrate status` to check current state before re-running.
