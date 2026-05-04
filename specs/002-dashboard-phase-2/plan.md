# Implementation Plan: Dashboard UI Phase 2

**Branch**: `002-dashboard-phase-2` | **Date**: 2026-05-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/002-dashboard-phase-2/spec.md`

## Summary

Build the collapsible sidebar with item type navigation, favorite/recent collection links,
user profile area, and mobile overlay drawer — all sourced from mock data. Replaces the
`<h2>Sidebar</h2>` placeholder installed in Phase 1.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode)
**Primary Dependencies**: Next.js 16.2.4, React 19, Tailwind CSS v4, shadcn/ui Avatar (already installed)
**Storage**: `src/lib/mock-data.ts` (no database in this phase)
**Testing**: Browser verification per `quickstart.md` + `pnpm build`
**Target Platform**: Web — desktop-first, mobile-responsive (768px breakpoint)
**Project Type**: web-app (Next.js 16 App Router)
**Performance Goals**: Sidebar transition < 200ms visual; no overhead from mock data
**Constraints**: No tailwind.config.*; icons via `@/components/icons` only; ShadCN Sheet for mobile drawer
**Scale/Scope**: 1 updated file (icons.tsx), 1 new file (sidebar.tsx), 1 updated page

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Server-First Architecture | ⚠ JUSTIFIED EXCEPTION | Sidebar requires `useState` for collapse + mobile drawer — Client Component necessary; see Complexity Tracking |
| II. Migration-Driven Database | ✅ N/A | No database; mock data only |
| III. Strict TypeScript | ✅ PASS | All props and state typed; icon map typed as `Record<string, LucideIcon>` |
| IV. CSS-Only Tailwind Config | ✅ PASS | No tailwind.config.* introduced |
| V. Freemium Access Boundary | ✅ N/A | Display-only navigation; no gated features |
| VI. Minimal Change Discipline | ✅ PASS | 1 new component, 2 small file updates |

*Post-design re-check: Exception to Principle I justified and documented in Complexity Tracking.*

## Project Structure

### Documentation (this feature)

```text
specs/002-dashboard-phase-2/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── ui-components.md # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit-tasks — not yet created)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── dashboard/
│       └── page.tsx              # Updated: replace <h2>Sidebar</h2> with <Sidebar />
├── components/
│   ├── icons.tsx                 # Updated: add Code, Sparkles, Terminal, StickyNote,
│   │                             #   FileText, ImageIcon, Link, Star, Settings,
│   │                             #   PanelLeft, X, Menu
│   └── dashboard/
│       └── sidebar.tsx           # New: Client Component — full sidebar
```

**Structure Decision**: Single `sidebar.tsx` Client Component handles all sidebar state and
rendering. No sub-components extracted in this phase to stay minimal per Principle VI.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| Principle I — `sidebar.tsx` uses `'use client'` | `isCollapsed` and `isOpen` state require browser event handlers | URL-param collapse causes full-page reload on toggle; CSS-only drawer cannot maintain open/closed state reactively |
