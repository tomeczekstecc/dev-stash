<!--
## Sync Impact Report
- Version change: N/A (template) → 1.0.0 (initial ratification)
- Modified principles: N/A — first fill from template placeholders
- Added sections: Core Principles (I–VI), Tech Stack Constraints, Development Workflow, Governance
- Removed sections: N/A
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md — Constitution Check references principles; no structural
    change needed; filled per-feature at plan time
  - ✅ .specify/templates/spec-template.md — Scope/requirements align with freemium gating and
    TypeScript requirements; no structural update required
  - ✅ .specify/templates/tasks-template.md — Phase structure aligns with workflow; no update required
  - ⚠ .specify/templates/commands/ — Directory not found; no command files validated
- Deferred TODOs: None
-->

# DevStash Constitution

## Core Principles

### I. Server-First Architecture

Next.js Server Components MUST be used by default. `'use client'` is permitted only for interactivity,
hooks, or browser APIs. Data fetching MUST happen directly in server components using Prisma.
Client components MUST use Server Actions for mutations and form submissions. API routes are reserved
for webhooks, file uploads with progress tracking, long-running operations, specific HTTP
status/header requirements, or third-party integrations.

### II. Migration-Driven Database

All schema changes MUST go through `prisma migrate dev` — never `db push` or manual DDL.
`prisma migrate status` MUST be run before every commit to verify migrations are in sync.
Production deployments MUST run `prisma migrate deploy` before the app starts. All inputs at
system boundaries MUST be validated with Zod before reaching Prisma.

### III. Strict TypeScript

TypeScript strict mode is non-negotiable. `any` types are prohibited; use explicit types or
`unknown`. Interfaces MUST be defined for all component props, API responses, and data models.
Type inference is acceptable where the type is obvious; explicit annotations are required where
the type is ambiguous or non-obvious.

### IV. CSS-Only Tailwind Configuration

Tailwind CSS v4 is in use and uses CSS-based configuration. `tailwind.config.ts` and
`tailwind.config.js` files MUST NOT exist in this project. All theme customization MUST use
the `@theme` directive inside `src/app/globals.css`. No JavaScript-based Tailwind config is
permitted under any circumstances.

### V. Freemium Access Boundary

Pro-only features (file/image uploads, AI features, custom item types, data export) MUST be
guarded behind plan checks at the service/Server Action layer, not only in UI. Free-tier limits
(50 items, 3 collections) MUST be enforced server-side. During development, all users MAY access
all features for testing — this gate is toggled off in dev, not removed from code.

### VI. Minimal Change Discipline

Each implementation task MUST make the smallest change that accomplishes the stated goal.
Unrelated refactoring, unsolicited abstractions, and "nice to have" additions are prohibited.
Existing patterns in the codebase MUST be preserved unless a pattern change is explicitly
requested and documented.

## Tech Stack Constraints

- **Framework**: Next.js 16 (App Router), React 19
- **Language**: TypeScript 5 (strict mode, path alias `@/*` → `src/*`)
- **Database**: Neon PostgreSQL via Prisma ORM (Prisma 7); Redis for caching (optional)
- **Auth**: NextAuth v5 — email/password + GitHub OAuth
- **File Storage**: Cloudflare R2
- **Styling**: Tailwind CSS v4 + shadcn/ui; dark mode first, light mode optional
- **AI**: OpenAI gpt-5-nano (Pro-only features only)
- **Payments**: Stripe (subscriptions + webhooks for plan sync)
- **Package Manager**: pnpm (npm and yarn are prohibited)
- **Deployment**: Vercel

## Development Workflow

1. Document the feature/fix in `context/current-feature.md` before writing code.
2. Create a branch: `feature/[name]` or `fix/[name]`.
3. Implement. Run `pnpm build` and resolve all errors before committing.
4. Ask before committing. Use conventional commit messages (`feat:`, `fix:`, `chore:`, etc.).
5. Commit only after a clean build. Never skip a failing build.
6. Merge to main, then delete the feature branch.

## Governance

This constitution supersedes all other development practices for DevStash. Amendments require:
(a) documenting the motivation for the change, (b) incrementing the version using semantic
versioning (MAJOR for principle redefinitions/removals, MINOR for new sections, PATCH for
clarifications), and (c) propagating the change to dependent templates and guidance files.

All PRs and AI-assisted implementations MUST be reviewed for compliance with Principles I–VI
before merge. Any violation of a principle MUST be justified in the plan's Complexity Tracking
table before implementation proceeds.

Runtime guidance lives in `CLAUDE.md` and `context/` — this constitution governs their content.

**Version**: 1.0.0 | **Ratified**: 2026-05-03 | **Last Amended**: 2026-05-03
