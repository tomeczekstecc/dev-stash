# Implementation Plan: Dashboard UI Phase 3

**Branch**: `003-dashboard-phase-3` | **Date**: 2026-05-04 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/003-dashboard-phase-3/spec.md`

## Summary

Implement the main content area of the dashboard with four sections: a stat card row (total items, collections, favorite items, favorite collections), a responsive collections grid with per-collection item counts and type icons, a pinned items list, and a 10-item recent items list sorted by recency. All data sourced from `src/lib/mock-data.ts`. New components live in `src/components/dashboard/main-content.tsx`. ShadCN Badge and Card are added; `icons.tsx` gains 8 new exports.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode)
**Primary Dependencies**: Next.js 16 App Router, React 19, Tailwind CSS v4, shadcn/ui (Badge + Card to be added)
**Storage**: `src/lib/mock-data.ts` — no database in this phase
**Testing**: `pnpm build` (TypeScript + ESLint; no unit tests in this phase)
**Target Platform**: Web browser — dark mode first, responsive down to 320px
**Project Type**: Next.js web application (App Router)
**Performance Goals**: Instant render — all data is in-memory module constants
**Constraints**: No server fetch, no auth, no database; all data derived client-side from mock arrays
**Scale/Scope**: Single dashboard page — 17 mock items, 6 mock collections

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Server-First | ⚠️ Justified | `dashboard/page.tsx` is already `'use client'` from Phase 2 (owns `isSidebarOpen`). New main content renders in this client tree. No server data in this phase — deviation is acceptable; will be refactored when Prisma is introduced. See Complexity Tracking. |
| II. Migration-Driven DB | ✅ N/A | No schema changes in this phase. |
| III. Strict TypeScript | ✅ Required | Explicit interfaces for all props and view-model types. Zero `any`. |
| IV. CSS-Only Tailwind | ✅ Required | No `tailwind.config.*`. All theme values in `src/app/globals.css` via `@theme`. |
| V. Freemium | ✅ N/A | No Pro-gated features involved in this UI phase. |
| VI. Minimal Change | ✅ Required | `sidebar.tsx` and `top-bar.tsx` MUST NOT be modified. Changes confined to new file `main-content.tsx`, additions to `icons.tsx`, and the `<main>` block in `dashboard/page.tsx`. |

## Project Structure

### Documentation (this feature)

```text
specs/003-dashboard-phase-3/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── ui-components.md # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit-tasks — NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── dashboard/
│       └── page.tsx              # MODIFY: replace placeholder <main> with <DashboardMain />
├── components/
│   ├── dashboard/
│   │   ├── top-bar.tsx           # NO CHANGES
│   │   ├── sidebar.tsx           # NO CHANGES
│   │   └── main-content.tsx      # NEW: all dashboard main-area sections
│   ├── icons.tsx                 # ADD: 8 new icon exports
│   └── ui/
│       ├── badge.tsx             # ADD via: pnpm dlx shadcn@latest add badge
│       └── card.tsx              # ADD via: pnpm dlx shadcn@latest add card
└── lib/
    └── mock-data.ts              # NO CHANGES (read-only data source)
```

**Structure Decision**: Single-project Next.js App Router. All new UI logic goes into one new file (`main-content.tsx`) to satisfy Principle VI. ShadCN Badge and Card are added to match the ShadCN preference (FR-018).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| `'use client'` on `dashboard/page.tsx` (Principle I deviation) | Introduced in Phase 2 to own the mobile drawer `isSidebarOpen` state — not caused by this feature | Could be fixed by extracting `<DashboardMain />` as a true Server Component via React composition (`children` prop pattern), but that refactor is out of scope for Phase 3 and should be done when real Prisma data fetching is introduced |
