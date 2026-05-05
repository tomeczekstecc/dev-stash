# Research: Database Integration

**Feature**: 004-db-integration  
**Date**: 2026-05-05

---

## Decision 1: Prisma 7 Configuration Structure

**Decision**: Use `prisma.config.ts` at project root for CLI configuration; `schema.prisma` datasource block contains no `url`.

**Rationale**: Prisma 7 is a breaking change from v6. The database URL is no longer in `schema.prisma` — it moves to `prisma.config.ts` via `defineConfig`. The generator provider changes from `"prisma-client-js"` to `"prisma-client"`, and the client is generated to a custom output path (`src/generated/prisma`), not `node_modules`.

**Key `prisma.config.ts` shape**:
```typescript
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});
```

**Key `schema.prisma` generator block**:
```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  // no url here — configured in prisma.config.ts
}
```

**Alternatives considered**: Keeping `url` in `schema.prisma` (v6 style) — rejected because Prisma 7 moves the URL to `prisma.config.ts`; using the old approach would break `prisma generate` and `prisma migrate`.

---

## Decision 2: Pooled vs Direct URL Split

**Decision**: `DIRECT_URL` (unpooled Neon endpoint) goes into `prisma.config.ts` for the CLI. `DATABASE_URL` (pooled endpoint) is used by the `@prisma/adapter-pg` driver in the runtime singleton.

**Rationale**: PgBouncer (Neon's connection pooler) does not support prepared statements, which Prisma's migration engine requires. Migrations must use the direct (unpooled) connection. Runtime queries use the pooled connection to avoid exhausting Neon's connection limits on serverless (Vercel).

**Connection string structure**:
- `DATABASE_URL`: `postgresql://...ep-falling-bird-am9fqped-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
- `DIRECT_URL`: Same but with `-pooler` removed from hostname: `ep-falling-bird-am9fqped.c-5.us-east-1.aws.neon.tech`

**Alternatives considered**: Single URL for both — rejected because Neon pooler blocks Prisma migration DDL statements.

---

## Decision 3: Prisma Client Singleton with Driver Adapter

**Decision**: Use `@prisma/adapter-pg` in `src/lib/db.ts` with the pooled `DATABASE_URL`. Singleton stored on `globalThis` to survive Next.js hot-reload in development.

**Rationale**: Prisma 7 uses driver adapters for database connectivity. `PrismaPg` from `@prisma/adapter-pg` wraps the pooled connection string. The `globalThis` pattern prevents multiple `PrismaClient` instances being created on every hot-reload in Next.js dev mode.

**Singleton shape**:
```typescript
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const globalForPrisma = globalThis as unknown as { db?: PrismaClient };

export const db = globalForPrisma.db ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.db = db;
```

**Import path**: Because the generator outputs to `src/generated/prisma`, the path alias `@/generated/prisma/client` resolves correctly via the existing `@/*` → `src/*` TypeScript alias.

**Alternatives considered**: `import { PrismaClient } from "@prisma/client"` (v6 style) — rejected; Prisma 7 generates the client to `src/generated/prisma`, not `node_modules/@prisma/client`.

---

## Decision 4: Seed Configuration

**Decision**: Seed command is configured in `prisma.config.ts` under `migrations.seed: "tsx prisma/seed.ts"`. Run via `pnpm prisma db seed`. `tsx` added as a dev dependency.

**Rationale**: In Prisma 7, the seed command is part of `prisma.config.ts`, not a separate `package.json` `prisma.seed` field (which was the v6 approach). `tsx` is zero-config for TypeScript ESM and is the Prisma-recommended seed runner.

**Alternatives considered**: `ts-node` — rejected due to ESM/CJS conflicts with Next.js TypeScript config; `package.json prisma.seed` — rejected as it is the v6 pattern.

---

## Decision 5: NextAuth v5 Prisma Adapter Schema

**Decision**: Include Account, Session, VerificationToken models exactly as specified in the NextAuth Prisma adapter docs, merged into the application `User` model.

**Key fields required by NextAuth adapter**:
- `User`: `id`, `name?`, `email`, `emailVerified?`, `image?`, `accounts[]`, `sessions[]`
- `Account`: `userId`, `type`, `provider`, `providerAccountId`, composite `@@id([provider, providerAccountId])`, `onDelete: Cascade` on user relation
- `Session`: `sessionToken` (unique), `userId`, `expires`, `onDelete: Cascade` on user relation
- `VerificationToken`: `identifier`, `token`, `expires`, `@@id([identifier, token])`

**Merge strategy**: The application `User` model already has `email`, `createdAt`, `updatedAt`. NextAuth requires `name?`, `emailVerified?`, `image?` added to it. The application fields (`password`, `isPro`, `stripeCustomerId`, etc.) are additive and do not conflict with the adapter.

**Alternatives considered**: Separate `AuthUser` model — rejected; the adapter requires the main `User` model to carry auth fields directly.

---

## Decision 6: Node.js Version Requirement

**Decision**: Prisma 7 requires Node.js 20.19+. No action needed if the dev environment already meets this.

**Rationale**: Prisma 7 docs state Node.js 20.19+ and TypeScript 5.4.0+ are required. The project uses TypeScript 5 (strict mode) which satisfies the TypeScript requirement.

**Action**: Add `engines: { node: ">=20.19" }` to `package.json` to surface this constraint explicitly.
