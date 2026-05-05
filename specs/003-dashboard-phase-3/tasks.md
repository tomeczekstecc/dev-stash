# Tasks: Dashboard UI Phase 3

**Input**: Design documents from `specs/003-dashboard-phase-3/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ui-components.md ✅, quickstart.md ✅

**Tests**: Not requested — validation via `pnpm build` + visual browser check per quickstart.md.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Exact file paths included in every task description

## Path Conventions

Single Next.js project: `src/` at repository root.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install ShadCN components required by all user stories.

- [ ] T001 [P] Install ShadCN Badge component via `pnpm dlx shadcn@latest add badge` (creates `src/components/ui/badge.tsx`)
- [ ] T002 [P] Install ShadCN Card component via `pnpm dlx shadcn@latest add card` (creates `src/components/ui/card.tsx`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Icon exports and file skeleton that every user story section depends on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T003 Add 8 new icon re-exports (MoreHorizontal, Pin, Clock, Package, Folder, Heart, Bookmark, ChevronRight) from `lucide-react` to `src/components/icons.tsx`
- [ ] T004 Create `src/components/dashboard/main-content.tsx` with skeleton `DashboardMain` named export, all mock-data imports (`items`, `collections`, `getPinnedItems`, `getItemsByCollection`, `getItemType`, `getTagsForItem`), and module-scope derivations: `pinnedItems` via `getPinnedItems()`, `recentItems` via sort-by-updatedAt-desc + slice(10), and `collectionsWithData` via `collections.map` with `itemCount` and unique `types` per collection

**Checkpoint**: Foundation ready — user story phases can begin sequentially.

---

## Phase 3: User Story 1 — View Stats Overview (Priority: P1) 🎯 MVP

**Goal**: Render 4 stat cards (Items, Collections, Favorites, Fav Collections) derived from mock data at the top of the main content area.

**Independent Test**: Visit `/dashboard` and verify 4 stat cards appear with counts: Items 17, Collections 6, Favorites 7, Fav Collections 3. Cards display in a 2-col grid on mobile and 4-col at the `md` breakpoint.

### Implementation for User Story 1

- [ ] T005 [US1] Define `StatCardProps` interface (`label: string`, `value: number`, `icon: React.ComponentType<React.SVGProps<SVGSVGElement>>`) and `stats` array using Package, Folder, Heart, Bookmark icons at module scope in `src/components/dashboard/main-content.tsx`
- [ ] T006 [US1] Implement internal `StatCard` component using ShadCN `Card`: icon in a small muted rounded container, `value` as large bold text, `label` as small muted text in `src/components/dashboard/main-content.tsx`
- [ ] T007 [US1] Add stats section to `DashboardMain` render: `<section>` with `grid grid-cols-2 md:grid-cols-4 gap-4` wrapping 4 `StatCard` instances mapped from `stats` array in `src/components/dashboard/main-content.tsx`

**Checkpoint**: Stats row renders with correct counts and 2→4 col responsive layout. User Story 1 complete.

---

## Phase 4: User Story 2 — Browse Recent Collections (Priority: P1)

**Goal**: Render all 6 collections in a responsive card grid with per-collection item count, unique type icons, filled star for favorites, and a "View all" link to `/collections`.

**Independent Test**: The Collections section shows 6 cards. Favorited collections (React Patterns, Context Files, Git Commands) show a filled amber star. Each card shows name, item count, description (line-clamp-2), and unique type icons. A "View all" link is present.

### Implementation for User Story 2

- [ ] T008 [US2] Define `CollectionCardProps` interface (`id`, `name`, `description`, `itemCount: number`, `isFavorite: boolean`, `types: ItemType[]`) in `src/components/dashboard/main-content.tsx`
- [ ] T009 [US2] Implement internal `SectionHeader` component: title text, optional icon prop, optional "View all" `Link` with `ChevronRight` icon in `src/components/dashboard/main-content.tsx`
- [ ] T010 [US2] Implement internal `CollectionCard` component: ShadCN `Card` wrapped in `Link href="/collections/[id]"`, filled `Star` (`fill-current text-amber-500`) when `isFavorite`, type icons via `style={{ color: type.color }}`, `{itemCount} items` count, inert `MoreHorizontal` button, `name` with `truncate`, `description` with `line-clamp-2` in `src/components/dashboard/main-content.tsx`
- [ ] T011 [US2] Add Collections section to `DashboardMain`: `SectionHeader` with "View all" → `/collections`, followed by `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4` mapping `collectionsWithData` through `CollectionCard` in `src/components/dashboard/main-content.tsx`

**Checkpoint**: Collections section renders all 6 cards with correct metadata and responsive 1→2→3 col layout. User Story 2 complete.

---

## Phase 5: User Story 3 — View Pinned Items (Priority: P2)

**Goal**: Render pinned items in a list layout using colored type icon, title, description, Badge tag chips, and formatted date. Show an empty state when no items are pinned.

**Independent Test**: The Pinned section shows exactly 2 items (useAuth Hook, API Error Handling Pattern). Each entry shows type icon, title, description, tag Badges, and a formatted date. Removing all pinned items from mock data reveals the empty state message.

### Implementation for User Story 3

- [ ] T012 [US3] Define `ItemRowProps` interface (`id: string`, `title: string`, `description: string`, `type: ItemType`, `tags: Tag[]`, `date: string`) in `src/components/dashboard/main-content.tsx`
- [ ] T013 [US3] Implement internal `ItemRow` component: `Link href="/items/[id]"` wrapping a flex row with type icon (`style={{ color: type.color }}`), `title` with `truncate`, `description` with `line-clamp-1`, ShadCN `Badge variant="secondary"` for each tag, and date formatted via `new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })` in `src/components/dashboard/main-content.tsx`
- [ ] T014 [US3] Implement internal `EmptyState` component: centered `Pin` icon above "No pinned items yet" muted text in `src/components/dashboard/main-content.tsx`
- [ ] T015 [US3] Add Pinned section to `DashboardMain`: `SectionHeader` with `Pin` icon (no "View all"), conditional render of `EmptyState` when `pinnedItems.length === 0` else `pinnedItems.map(item => <ItemRow ... />)` in `src/components/dashboard/main-content.tsx`

**Checkpoint**: Pinned section renders 2 items with all metadata; empty state displays when list is empty. User Story 3 complete.

---

## Phase 6: User Story 4 — Browse 10 Most Recent Items (Priority: P2)

**Goal**: Render the 10 most recently updated items sorted by `updatedAt` descending in the same `ItemRow` layout, with a "View all" link to `/items`.

**Independent Test**: The Recent section shows exactly 10 items. The first item is the most recently updated (item-6, Jan 17). A "View all" link targets `/items`. Each entry matches the `ItemRow` layout from US3.

### Implementation for User Story 4

- [ ] T016 [US4] Add Recent section to `DashboardMain`: `SectionHeader` with `Clock` icon and "View all" → `/items`, followed by `recentItems` (derived in T004) mapped through `ItemRow` in `src/components/dashboard/main-content.tsx`

**Checkpoint**: Recent section renders 10 items in `updatedAt` descending order with "View all" link. User Story 4 complete.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Wire the component into the page, verify responsive and overflow behavior, confirm the build passes.

- [ ] T017 Update `src/app/dashboard/page.tsx`: add `import { DashboardMain } from "@/components/dashboard/main-content"` and replace `<main className="flex-1 p-4"><h2 className="font-semibold text-foreground">Main</h2></main>` with `<main className="flex-1 overflow-y-auto"><DashboardMain /></main>`
- [ ] T018 Audit `src/components/dashboard/main-content.tsx` for text overflow: verify all titles use `truncate`, all descriptions use `line-clamp-1` or `line-clamp-2`, and no horizontal scrollbar appears at 320px viewport width
- [ ] T019 Run `pnpm build` and resolve any TypeScript or ESLint errors in `src/components/dashboard/main-content.tsx` and `src/app/dashboard/page.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately; T001 and T002 are parallel
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **User Story Phases (3–6)**: All depend on Phase 2 completion; execute sequentially (US3 and US4 share `ItemRow` defined in US3; US4 shares `SectionHeader` defined in US2)
- **Polish (Phase 7)**: Depends on all user story phases completing

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2 — no other story dependencies
- **US2 (P1)**: Starts after Phase 2 — no other story dependencies; `SectionHeader` (T009) is reused by US3 and US4
- **US3 (P2)**: Starts after Phase 2 — uses `SectionHeader` already created in US2; `ItemRow` (T013) is reused by US4
- **US4 (P2)**: Starts after US3 — depends on `ItemRow` (T013); adds only one task (T016)

### Within Each User Story

- Define interfaces before implementing components that use them
- Implement sub-components before adding them to `DashboardMain`
- All tasks within a user story target the same file — execute sequentially

### Parallel Opportunities

- **Phase 1 only**: T001 and T002 install different ShadCN packages into different files and can run in parallel

---

## Parallel Example: Phase 1

```bash
# Launch both ShadCN installs simultaneously:
Task T001: pnpm dlx shadcn@latest add badge
Task T002: pnpm dlx shadcn@latest add card
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (stat cards only)
4. **STOP and VALIDATE**: 4 stat cards render at `/dashboard` with correct counts
5. Wire into page.tsx (T017) and run `pnpm build` (T019)
6. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → skeleton ready
2. US1 → stat cards → validate counts → demo
3. US2 → collections grid → validate 6 cards → demo
4. US3 → pinned list + empty state → validate 2 items → demo
5. US4 → recent list → validate 10 items sorted → demo
6. Polish → wire page, overflow audit, build pass

---

## Notes

- [P] tasks target different files with no mutual dependencies
- [Story] labels map tasks to user stories for traceability
- No test tasks — not requested in spec; validation is `pnpm build` + visual browser check
- `SectionHeader` is created in US2 (T009) and reused in US3 + US4 — no duplication
- `ItemRow` is created in US3 (T013) and reused in US4 — no duplication
- Module-scope derivations (`recentItems`, `collectionsWithData`, `pinnedItems`) belong in T004 per quickstart.md pattern
- Type icon color uses `style={{ color: type.color }}` — inline hex is correct for runtime data-driven colors (research D-003)
- `Star` icon should already be in `src/components/icons.tsx` from a prior phase; verify before adding again
