# Implementation Plan: Dashboard Main Content Area (Phase 3)

**Branch**: `005-dashboard-main-content` | **Date**: 2026-05-05 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/001-dashboard-main-content/spec.md`

## Summary

Build the main content area of the dashboard, adding four stat cards, a recent collections grid, a pinned items section, and a recent items list — all driven by imported mock data. No new pages or routes are introduced; new components slot into the existing `<main>` element in `src/app/dashboard/page.tsx`.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, path alias `@/*` → `src/*`)  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui, Lucide React  
**Storage**: `src/lib/mock-data.ts` — no database operations  
**Testing**: Browser verification via `pnpm dev`; `pnpm build` must pass with no errors  
**Target Platform**: Web browser, desktop-first (≥ 1024 px), dark mode  
**Project Type**: Web application — Next.js App Router  
**Performance Goals**: Dashboard renders within 1 second; all data derived at build time from mock data  
**Constraints**: No `tailwind.config.*` files; all theme via `@theme` in `globals.css`; no `any` types; no unused imports  
**Scale/Scope**: 1 page modified, ~5 new components, ~2 icon exports added

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Server-First | ✅ Pass | New components have no `'use client'`; they are stateless display components. The parent page is already `'use client'` due to sidebar state (Phase 1/2 decision — not modified here). |
| II. Migration-Driven DB | ✅ N/A | No database changes; mock data only. |
| III. Strict TypeScript | ✅ Pass | All props typed via interfaces; no `any`; existing `ItemType`, `Item`, `Collection`, `Tag` interfaces from mock-data.ts used directly. |
| IV. CSS-Only Tailwind | ✅ Pass | No `tailwind.config.*` files created. |
| V. Freemium Access | ✅ N/A | Dashboard display only; no gated features. |
| VI. Minimal Change | ✅ Pass | Only `page.tsx`, `icons.tsx`, and new component files touched. No existing component refactored. |

## Project Structure

### Documentation (this feature)

```text
specs/001-dashboard-main-content/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code Changes

```text
src/
├── components/
│   ├── icons.tsx                         # ADD: Pin, ChevronRight, Clock, Layers, FolderOpen
│   └── dashboard/
│       ├── stats-cards.tsx               # NEW: four aggregate stat cards
│       ├── collections-grid.tsx          # NEW: grid of up to 6 collection cards
│       ├── pinned-items.tsx              # NEW: cards for isPinned items
│       ├── recent-items.tsx              # NEW: list of 10 most-recent items
│       └── main-content.tsx             # NEW: composes the four sections
└── app/
    └── dashboard/
        └── page.tsx                      # MODIFY: replace <h2>Main</h2> with <DashboardMain />
```

**Structure Decision**: Single-project web app layout. All new files live under the existing `src/components/dashboard/` feature directory. The page file is modified minimally (one line replaced).

## Phase 0: Research

See [research.md](./research.md) — all seven decisions resolved. No NEEDS CLARIFICATION markers remain.

**Key decisions summary**:
1. New components: no `'use client'` (stateless, parent is already client)
2. Data: direct mock-data.ts import, existing helpers only
3. Icons: extend `src/components/icons.tsx` with 5 new Lucide exports
4. Collection type badges: derive at render time via `getItemsByCollection`
5. "View all" links: non-functional styled buttons (no `href`)
6. Recent items sort: ISO string comparison descending, take first 10
7. Stats grid: `grid-cols-2 md:grid-cols-4`

## Phase 1: Design & Contracts

See [data-model.md](./data-model.md).

### Component contracts

#### `<StatsCards />`

No props. Derives all four counts from mock data internally.

Renders: 4 cards in a `grid-cols-2 md:grid-cols-4` grid, each with icon + label + count.

---

#### `<CollectionsGrid />`

No props. Reads `collections` and `getItemsByCollection` from mock data.

Renders: section header ("Collections" + "View all" button), then a responsive grid of up to 6 `CollectionCard` sub-components.

**CollectionCard** internal props:
```ts
interface CollectionCardProps {
  collection: Collection
  itemCount: number
  typeIcons: ItemType[]
}
```

---

#### `<PinnedItems />`

No props. Reads `getPinnedItems()` from mock data.

Renders: section header ("Pinned"), then one card per pinned item. If no pinned items, renders an empty-state message.

**PinnedItemCard** internal props:
```ts
interface PinnedItemCardProps {
  item: Item
  type: ItemType
  tags: Tag[]
}
```

---

#### `<RecentItems />`

No props. Reads `items` from mock data, sorts by `updatedAt` desc, takes first 10.

Renders: section header ("Recent"), then a list of rows. Each row: type icon + title + description snippet + formatted date.

**RecentItemRow** internal props:
```ts
interface RecentItemRowProps {
  item: Item
  type: ItemType
}
```

---

#### `<DashboardMain />`

No props. Composes all four sections with a page header.

```tsx
<div className="flex-1 overflow-y-auto p-6 space-y-8">
  <header>  {/* "Dashboard" title + subtitle */}
  <StatsCards />
  <CollectionsGrid />
  <PinnedItems />
  <RecentItems />
</div>
```

---

### Icons to add to `src/components/icons.tsx`

| Export Name | Lucide Source   | Used In               |
|-------------|----------------|-----------------------|
| `Pin`       | `Pin`           | PinnedItems header    |
| `ChevronRight` | `ChevronRight` | CollectionsGrid "View all" |
| `Clock`     | `Clock`         | RecentItems header    |
| `Layers`    | `Layers`        | StatsCards (items)    |
| `FolderOpen`| `FolderOpen`    | StatsCards (collections) |

### Agent context update

The plan reference in `AGENTS.md` between `<!-- SPECKIT START -->` and `<!-- SPECKIT END -->` should be updated to point to `specs/001-dashboard-main-content/plan.md`.
