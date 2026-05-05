# Tasks: Dashboard Main Content Area (Phase 3)

**Input**: Design documents from `specs/001-dashboard-main-content/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅

**Tests**: Not requested — browser verification via `pnpm dev` + `pnpm build`.

**Organization**: Tasks grouped by user story (US1–US4) to enable independent delivery of each dashboard section.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no blocking dependencies)
- **[Story]**: Maps to user story from spec.md (US1–US4)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Extend the icon re-export file — all components depend on these exports.

- [x] T001 Add icon exports (Pin, ChevronRight, Clock, Layers, FolderOpen) to `src/components/icons.tsx`

**Checkpoint**: T001 complete — all four user story phases can now begin in parallel.

---

## Phase 2: Foundational (Blocking Prerequisites)

No additional foundational work required. Mock data helpers in `src/lib/mock-data.ts` are already complete. Shared types (`Item`, `Collection`, `ItemType`, `Tag`) are already defined. Phase 1 (T001) is the only blocker.

---

## Phase 3: User Story 1 — View Dashboard Overview (Priority: P1) 🎯 MVP

**Goal**: Four stat cards showing total items, total collections, favorite items, and favorite collections — all derived from mock data.

**Independent Test**: Navigate to `/dashboard`; four stat cards are visible at the top of the main content area, each with the correct count from mock data.

### Implementation for User Story 1

- [x] T002 [US1] Create `src/components/dashboard/stats-cards.tsx` — StatsCards component with four cards (Items, Collections, Favorites, Favorite Collections) derived from `items` and `collections` arrays in mock-data.ts; use `grid-cols-2 md:grid-cols-4` layout; import `Layers`, `FolderOpen`, `Star` from `@/components/icons`

**Checkpoint**: StatsCards renders with correct counts visible in the browser.

---

## Phase 4: User Story 2 — Browse Recent Collections (Priority: P2)

**Goal**: Responsive grid of up to 6 collection cards, each showing name, item count, description, favorite indicator, and item-type icon badges. Includes a "View all" button placeholder.

**Independent Test**: CollectionsGrid section renders 6 collection cards with correct metadata; type-icon badges reflect the actual item types in each collection; "View all" button is present.

### Implementation for User Story 2

- [x] T003 [P] [US2] Create `src/components/dashboard/collections-grid.tsx` — CollectionsGrid component; derive item count per collection using `getItemsByCollection`; derive unique `ItemType` badges per collection; render section header with "View all" button (no href); use `ChevronRight` from `@/components/icons`; use `Star` for favorite indicator; use internal `ICON_MAP` mapping type icon strings to Lucide components

**Checkpoint**: Collections section renders in the browser with all 6 collection cards showing name, count, description, type badges, and favorite star where applicable.

---

## Phase 5: User Story 3 — Review Pinned Items (Priority: P3)

**Goal**: Cards for every item where `isPinned === true` in mock data, showing color-coded type icon, title, favorite star, description preview, tags, and formatted date. Empty state if no pinned items.

**Independent Test**: PinnedItems section renders cards for `item-1` (useAuth Hook) and `item-2` (API Error Handling Pattern) with all required metadata fields visible.

### Implementation for User Story 3

- [x] T004 [P] [US3] Create `src/components/dashboard/pinned-items.tsx` — PinnedItems component; call `getPinnedItems()` from mock-data.ts; for each item call `getItemType(item.typeId)` and `getTagsForItem(item)`; render section header with `Pin` icon; render one card per pinned item showing color-coded type icon (inline style for dynamic color), title, `Star` for isFavorite, description, tag badges, and formatted date; render empty state message when array is empty; use internal `ICON_MAP`

**Checkpoint**: Pinned section renders with useAuth Hook and API Error Handling Pattern cards, including tags and dates.

---

## Phase 6: User Story 4 — See Recent Items (Priority: P4)

**Goal**: A list of up to 10 items sorted by `updatedAt` descending, each row showing type icon, title, description snippet, and formatted date.

**Independent Test**: RecentItems section renders exactly 10 rows (all 17 mock items exist so cap applies), sorted newest-first by `updatedAt`.

### Implementation for User Story 4

- [x] T005 [P] [US4] Create `src/components/dashboard/recent-items.tsx` — RecentItems component; import `items` from mock-data.ts; sort by `updatedAt` descending using string comparison; slice to first 10; for each call `getItemType`; render section header with `Clock` icon; render one row per item with color-coded type icon, title, truncated description, and formatted date; use internal `ICON_MAP`

**Checkpoint**: Recent Items section renders 10 rows sorted newest-first in the browser.

---

## Phase 7: Polish & Integration

**Purpose**: Compose all four sections into a single component and wire it into the dashboard page.

- [x] T006 Create `src/components/dashboard/main-content.tsx` — DashboardMain component that renders a page header ("Dashboard" h1 + "Your developer knowledge hub" subtitle) followed by `<StatsCards />`, `<CollectionsGrid />`, `<PinnedItems />`, `<RecentItems />` in a scrollable container (`overflow-y-auto p-6 space-y-8`); import all four section components (depends on T002–T005)
- [x] T007 Modify `src/app/dashboard/page.tsx` — replace `<main className="flex-1 p-4"><h2 ...>Main</h2></main>` with `<main className="flex-1 overflow-hidden"><DashboardMain /></main>`; import DashboardMain from `@/components/dashboard/main-content` (depends on T006)
- [x] T008 Run `pnpm build` and fix any TypeScript or lint errors introduced by this feature

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Starts immediately — no blockers
- **Phases 3–6 (User Stories)**: All depend on T001 (icon exports); can run in parallel after T001
- **Phase 7 (Polish)**: T006 depends on T002–T005 all complete; T007 depends on T006; T008 depends on T007

### User Story Dependencies

- **US1 (P1)**: Depends on T001 only
- **US2 (P2)**: Depends on T001 only — independent of US1
- **US3 (P3)**: Depends on T001 only — independent of US1, US2
- **US4 (P4)**: Depends on T001 only — independent of US1, US2, US3

### Parallel Opportunities

After T001 completes, T002, T003, T004, T005 can all run simultaneously (different files, no shared mutable state).

---

## Parallel Example: After T001

```text
# All four can run in parallel:
Task T002: Create stats-cards.tsx          (US1)
Task T003: Create collections-grid.tsx     (US2)
Task T004: Create pinned-items.tsx         (US3)
Task T005: Create recent-items.tsx         (US4)

# Then sequentially:
Task T006: Create main-content.tsx         (depends on T002–T005)
Task T007: Update page.tsx                 (depends on T006)
Task T008: pnpm build                      (depends on T007)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001 (icon exports)
2. Complete T002 (StatsCards)
3. Temporarily add `<StatsCards />` directly to `page.tsx` to verify
4. **STOP and VALIDATE**: Four stat cards visible in browser

### Incremental Delivery

1. T001 → T002 (stats) → verify → T003 (collections) → verify → T004 (pinned) → verify → T005 (recent) → verify
2. T006 (compose) → T007 (wire to page) → T008 (build check)

### Single Developer (Recommended Order)

T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008

---

## Notes

- No test tasks — verified in browser per project workflow (`pnpm dev`)
- [P] tasks write to different files and have no shared mutable state
- Each user story section component is self-contained — no cross-imports between T002–T005
- `ICON_MAP` is defined locally in each component that needs it (research decision 3)
- "View all" buttons are non-functional placeholders (research decision 5)
- Dynamic type icon colors use inline `style={{ color: type.color }}` since Tailwind cannot generate arbitrary dynamic classes at build time
