---
description: "Task list for Dashboard UI Phase 2 - collapsible sidebar"
---

# Tasks: Dashboard UI Phase 2

**Input**: Design documents from `specs/002-dashboard-phase-2/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui-components.md`

**Tests**: Not requested - no test tasks included.

**Organization**: 5 user stories following Setup and Foundational phases.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[US1-US5]**: Map to user stories from `spec.md`

---

## Phase 1: Setup

**Purpose**: Install required shadcn components and expand icon exports

- [X] T001 Run `pnpm dlx shadcn@latest add sheet --yes` to install Sheet component at `src/components/ui/sheet.tsx` (already installed, verified file exists)
- [X] T002 Expand `src/components/icons.tsx` to export `Code`, `Sparkles`, `Terminal`, `StickyNote`, `FileText`, `Image` alias, `Link` alias, `Star`, `Settings`, `PanelLeft`, `X`, and `Menu`

---

## Phase 2: Foundational

**Purpose**: Shared data helpers needed by all sidebar sections

**CRITICAL**: All user story phases depend on `icons.tsx` being expanded (T002)

- [X] T003 Verify `src/lib/mock-data.ts` exports `getTypeCounts()`, `itemTypes`, `collections`, and `mockUser`

**Checkpoint**: Icons available and mock data confirmed - ready for sidebar implementation

---

## Phase 3: User Story 1 - Browse Item Types via Sidebar (Priority: P1) MVP

**Goal**: Sidebar renders all 7 item types with icons, names, counts, and `/items/[slug]` links.

**Independent Test**: Navigate to `/dashboard`, confirm sidebar shows 7 type rows each with icon + name + count. Click "Snippets" link and verify href is `/items/snippets`.

### Implementation for User Story 1

- [X] T004 [US1] Create `src/components/dashboard/sidebar.tsx` as a Client Component with item type navigation, icon mapping, counts, and item links

**Checkpoint**: Types section visible with all 7 types, counts correct, links work

---

## Phase 4: User Story 2 - View Favorite and Recent Collections (Priority: P2)

**Goal**: Collections section below types shows Favorites group then All Collections group with correct items and star indicators.

**Independent Test**: Sidebar shows "Favorites" with React Patterns, Context Files, Git Commands; "All Collections" with the remaining 3 collections.

### Implementation for User Story 2

- [X] T005 [US2] Add a Collections section in `src/components/dashboard/sidebar.tsx` that splits favorites from non-favorites and links each collection

**Checkpoint**: Collections section visible with correct grouping and star icons on favorites

---

## Phase 5: User Story 3 - Collapse and Expand Sidebar (Priority: P2)

**Goal**: A `PanelLeft` toggle button at the top of the sidebar collapses it to icon-only on desktop; clicking again restores full labels.

**Independent Test**: Click collapse icon -> sidebar narrows, labels hidden, type icons still visible. Click again -> sidebar full width with all text restored.

### Implementation for User Story 3

- [X] T006 [US3] Add desktop collapse behavior in `src/components/dashboard/sidebar.tsx` using `w-16` / `w-64` and `transition-all duration-200`

**Checkpoint**: Toggle button collapses and expands sidebar smoothly on desktop

---

## Phase 6: User Story 4 - Mobile Drawer Sidebar (Priority: P3)

**Goal**: On mobile (`<768px`) the sidebar is hidden; a `Menu` icon opens it as a shadcn Sheet drawer from the left.

**Independent Test**: Resize browser to `<768px` -> sidebar disappears. Click Menu icon -> Sheet slides in from left with full sidebar content. Click outside -> Sheet closes.

### Implementation for User Story 4

- [X] T007 [US4] Add mobile Sheet drawer behavior and wire the trigger through `TopBar` and `dashboard/page.tsx`

**Checkpoint**: At mobile viewport width, sidebar hidden. Menu icon opens Sheet. Tapping outside closes it.

---

## Phase 7: User Story 5 - User Profile Area (Priority: P3)

**Goal**: Bottom of sidebar shows Avatar with "JD" initials, user name, email, and Settings icon.

**Independent Test**: Sidebar bottom shows avatar, "John Doe", "john@devstash.io", and a settings gear icon sourced from `mockUser`.

### Implementation for User Story 5

- [X] T008 [US5] Add a bottom-pinned user profile area in `src/components/dashboard/sidebar.tsx` using `Avatar`, `AvatarFallback`, and `mockUser`

**Checkpoint**: User profile area renders at sidebar bottom with correct mock data; collapses appropriately on desktop

---

## Phase 8: Wire Up Dashboard Page + Polish

**Purpose**: Replace placeholder, verify build, minor cleanup

- [X] T009 Update `src/app/dashboard/page.tsx` to replace the sidebar placeholder with `<Sidebar />` and own mobile drawer state
- [X] T010 [P] Run a production build and resolve build errors
- [X] T011 [P] Verify `src/components/dashboard/` contains no direct `lucide-react` imports

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: T001 -> T002
- **Foundational (Phase 2)**: T003
- **US1 (Phase 3)**: Requires T002 -> T004
- **US2 (Phase 4)**: Requires T004 -> T005
- **US3 (Phase 5)**: Requires T004/T005 -> T006
- **US4 (Phase 6)**: Requires T004/T005 and T001 -> T007
- **US5 (Phase 7)**: Requires T004 -> T008
- **Polish (Phase 8)**: T009 requires all user story phases; T010/T011 after T009

### Parallel Opportunities

- T003 can run while T001/T002 are executing
- T010 and T011 can run in parallel after T009

### Same-File Coordination Note

T004-T008 all modify `src/components/dashboard/sidebar.tsx`, so they must run sequentially.

---

## Implementation Strategy

### MVP

1. Phase 1: T001 -> T002
2. Phase 3: T004
3. Phase 8: T009
4. Validate `/dashboard`
5. Continue with T005 -> T006 -> T007 -> T008 -> T010/T011

### Full Incremental Delivery

1. Setup -> Foundation
2. T004 -> validate US1
3. T005 -> validate US2
4. T006 -> validate US3
5. T007 -> validate US4
6. T008 -> validate US5
7. T010/T011 -> clean build

---

## Notes

- [P] tasks are independent operations
- T004-T008 are sequential because they all modify `sidebar.tsx`
- `Sheet` was already installed before implementation
- Desktop uses local collapse state; mobile always opens as a full drawer
- Build verification passed with `npm run build`
