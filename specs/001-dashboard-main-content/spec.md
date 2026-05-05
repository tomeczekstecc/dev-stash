# Feature Specification: Dashboard Main Content Area (Phase 3)

**Feature Branch**: `005-dashboard-main-content`  
**Created**: 2026-05-05  
**Status**: Draft  
**Input**: User description: "Dashboard UI Phase 3 — main content area with stats cards, recent collections, pinned items, and recent items"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Dashboard Overview (Priority: P1)

A developer opens the dashboard and immediately sees a snapshot of their knowledge hub: four stat cards summarising total items, total collections, favorited items, and favorited collections. This gives them an at-a-glance health check of their stash without drilling into any section.

**Why this priority**: This is the first thing visible in the main content area and sets the context for everything below it. Without it the dashboard has no summary value.

**Independent Test**: Navigate to `/dashboard`; four stat cards are visible at the top of the main content area, each displaying the correct aggregated count derived from mock data.

**Acceptance Scenarios**:

1. **Given** the dashboard is open, **When** the main content loads, **Then** four stat cards appear: "Items" (total item count), "Collections" (total collection count), "Favorites" (count of items where `isFavorite` is true), and "Favorite Collections" (count of collections where `isFavorite` is true).
2. **Given** mock data is in use, **When** counts are rendered, **Then** the numbers match the values derived from `src/lib/mock-data.ts` without requiring a database.

---

### User Story 2 - Browse Recent Collections (Priority: P2)

A developer scans the "Collections" section to quickly navigate to a collection they recently worked with. Each collection card shows the collection name, item count, a short description, and a visual indicator of its type composition. A "View all" link lets them access the full collections list.

**Why this priority**: Collections are the primary organisational unit in DevStash. Surfacing them on the dashboard reduces navigation friction for the most common workflow.

**Independent Test**: The Collections section renders a grid of collection cards using mock collection data, and each card displays name, item count, description, and type icons. The "View all" link is present.

**Acceptance Scenarios**:

1. **Given** the dashboard is open, **When** the Collections section loads, **Then** up to 6 collection cards are displayed in a responsive grid.
2. **Given** a collection card is visible, **When** the user reads it, **Then** it shows the collection name, number of items in that collection, description text, a favorite star if `isFavorite` is true, and icon badges representing the item types contained.
3. **Given** the Collections section header, **When** the user sees it, **Then** a "View all" link is present alongside the section title.

---

### User Story 3 - Review Pinned Items (Priority: P3)

A developer looks at the "Pinned" section to access items they have marked as high-priority for quick retrieval. Each pinned item card shows the item type icon (color-coded), title, favorite indicator, description preview, language/type tags, and the date it was last updated.

**Why this priority**: Pinned items represent the user's curated quick-access list. Surfacing them prominently on the dashboard is a core UX pattern from the design reference.

**Independent Test**: The Pinned section renders cards for all items where `isPinned` is true in mock data, each showing the correct metadata.

**Acceptance Scenarios**:

1. **Given** the dashboard is open, **When** the Pinned section loads, **Then** one card appears per item where `isPinned === true` in mock data.
2. **Given** a pinned item card, **When** displayed, **Then** it shows the type icon (color-coded by item type), title, description preview, tags, and formatted date.
3. **Given** a pinned item with `isFavorite === true`, **When** displayed, **Then** a favorite star indicator is visible on the card.

---

### User Story 4 - See Recent Items (Priority: P4)

A developer scrolls to the "Recent Items" section to find the last 10 items they added or modified. This list gives them a chronological trail of their work without any filtering.

**Why this priority**: Recency is a fundamental discoverability pattern. The section is not shown in the design screenshot but is an explicit product requirement.

**Independent Test**: A list of up to 10 items sorted by `updatedAt` descending is rendered below the Pinned section, each row showing item type, title, description, and relative date.

**Acceptance Scenarios**:

1. **Given** the dashboard loads, **When** the Recent Items section renders, **Then** up to 10 items are shown, sorted by `updatedAt` descending.
2. **Given** a recent item row, **When** displayed, **Then** it shows the item type icon, title, description snippet, and a formatted date.
3. **Given** fewer than 10 items exist in mock data, **When** the section renders, **Then** all available items are shown without errors.

---

### Edge Cases

- What happens when there are no pinned items? The Pinned section should either be hidden or display an empty state message.
- What happens when there are no items at all? All sections should handle empty arrays gracefully without runtime errors.
- What if item count changes in mock data? Stats and lists should dynamically derive values from the imported data, not hard-coded numbers.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The main content area MUST display a header with the text "Dashboard" and a subtitle "Your developer knowledge hub".
- **FR-002**: The main content area MUST show four stat cards: total items, total collections, favorite items, and favorite collections — all derived from `src/lib/mock-data.ts`.
- **FR-003**: The Collections section MUST display up to 6 collection cards in a responsive grid layout.
- **FR-004**: Each collection card MUST show: collection name, item count, description, favorite indicator, and icon badges for the item types contained in that collection.
- **FR-005**: The Collections section MUST include a "View all" link in the section header.
- **FR-006**: The Pinned section MUST render one card for each item where `isPinned === true` in mock data.
- **FR-007**: Each pinned item card MUST show: color-coded type icon, title, favorite star (if applicable), description preview, tags, and formatted date.
- **FR-008**: The Recent Items section MUST list up to 10 items sorted by `updatedAt` descending.
- **FR-009**: Each recent item row MUST show: type icon, title, description snippet, and formatted date.
- **FR-010**: All data MUST be imported directly from `src/lib/mock-data.ts` — no database calls.
- **FR-011**: The layout MUST be a server component by default; no client-side state is required for static display.
- **FR-012**: If no pinned items exist, the Pinned section MUST display a non-breaking empty state.

### Key Entities *(include if feature involves data)*

- **Stat Card**: Aggregated count derived from items or collections with a label and icon.
- **Collection Card**: A visual tile representing a collection with name, item count, description, and type composition indicators.
- **Pinned Item Card**: A card representing a single item marked `isPinned`, showing rich metadata including type, tags, and date.
- **Recent Item Row**: A compact row representing a recently updated item with type icon, title, description, and date.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All four stat cards display correct counts within 1 second of page load, matching the values derivable from mock data.
- **SC-002**: The Collections grid renders without layout overflow on viewports ≥ 1024 px wide.
- **SC-003**: Pinned item cards display all required metadata fields with no missing or undefined values when mock data is used.
- **SC-004**: The Recent Items list shows exactly min(10, total items) entries, sorted newest-first, with no duplicates.
- **SC-005**: The dashboard main content area renders without JavaScript errors in the browser console.
- **SC-006**: The `pnpm build` command completes successfully with no TypeScript or lint errors introduced by this feature.

## Assumptions

- Mock data from `src/lib/mock-data.ts` is the sole data source; no API calls or database queries are made.
- The sidebar (Phase 1 & 2) and top bar are already implemented and will not be modified.
- The dashboard page at `src/app/dashboard/page.tsx` is the integration point; new components will be placed under `src/components/dashboard/`.
- Mobile layout is not a primary target for this phase; the design is optimised for desktop (≥ 1024 px) following the existing sidebar layout.
- The "View all" links in section headers are non-functional placeholders for this phase — routing will be wired in a later phase.
- Item type icons and colors follow the definitions already present in `src/lib/mock-data.ts` (`itemTypes` array with `icon` and `color` fields).
- The screenshot at `context/screenshots/dashboard-ui-main.png` is a design reference; exact pixel-level fidelity is not required, but layout structure and component hierarchy should be followed closely.
