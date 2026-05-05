# Feature Specification: Dashboard UI Phase 3

**Feature Branch**: `003-dashboard-phase-3`
**Created**: 2026-05-04
**Status**: Draft
**Input**: User description: "Dashboard UI Phase 3 — main content area with stats cards, recent collections, pinned items, and 10 recent items"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Stats Overview (Priority: P1)

A developer lands on the dashboard and immediately sees 4 stat cards at the top of the main content area showing: total items count, total collections count, favorite items count, and favorite collections count. The numbers are derived from mock data and give the user an instant sense of their stash size.

**Why this priority**: The stat cards provide immediate quantitative feedback about the user's knowledge base — they are the first element visible in the main area and signal the value of what is stored.

**Independent Test**: The main content area renders 4 stat cards. Each card shows the correct count from mock data: 17 total items, 6 total collections, 7 favorite items, 3 favorite collections.

**Acceptance Scenarios**:

1. **Given** the dashboard loads, **When** the main area renders, **Then** 4 stat cards appear at the top of the content area, each showing a label, icon, and numeric count.
2. **Given** the stat cards, **When** rendered, **Then** the counts match mock data: Items (17), Collections (6), Favorites (7), Fav Collections (3).
3. **Given** the stat cards, **When** viewed on desktop, **Then** they display in a 4-column row; on mobile they wrap to a 2-column grid.

---

### User Story 2 - Browse Recent Collections (Priority: P1)

A developer sees a "Collections" section below the stat cards showing all collections in a card grid. Each card shows the collection name, item count, description, a set of unique content-type icons found in that collection's items, and a star icon for favorited collections. A "View all" link in the section header lets the user navigate to the full collections list.

**Why this priority**: Collections are the primary organizational layer of the app — surfacing them on the dashboard is essential for quick navigation and orienting the user to what they have stored.

**Independent Test**: The Collections section renders all 6 collections from mock data in a responsive card grid. Each card shows name, item count, description, and type icons. Favorited collections (React Patterns, Context Files, Git Commands) show a filled star. A "View all" link is present.

**Acceptance Scenarios**:

1. **Given** the dashboard loads, **When** the Collections section renders, **Then** all 6 collections from mock data appear in a responsive grid.
2. **Given** a collection card, **When** rendered, **Then** it shows the collection name, item count, description, unique content-type icons for items in that collection, and an overflow menu icon.
3. **Given** a collection with `isFavorite: true`, **When** the card renders, **Then** a filled star icon is visible; unfavorited collections do not show a filled star.
4. **Given** a collection card, **When** a user clicks it, **Then** they are navigated to `/collections/[id]`.
5. **Given** the Collections section header, **When** rendered, **Then** a "View all" link is present and links to `/collections`.

---

### User Story 3 - View Pinned Items (Priority: P2)

A developer sees a "Pinned" section listing every item marked as pinned. Each list entry shows the item's colored type icon, title, description, tag chips, and creation date. The section uses a list layout rather than a card grid.

**Why this priority**: Pinned items are the user's highest-priority resources — surfacing them prominently on the dashboard is a core productivity feature.

**Independent Test**: The Pinned section renders the 2 items where `isPinned: true` from mock data ("useAuth Hook" and "API Error Handling Pattern"). Each shows type icon, title, description, tags, and date. An empty state message appears if no items are pinned.

**Acceptance Scenarios**:

1. **Given** the dashboard loads, **When** the Pinned section renders, **Then** only items with `isPinned: true` from mock data are shown.
2. **Given** a pinned item entry, **When** rendered, **Then** it shows: a colored type icon, item title, description, tag chips, and a formatted creation date.
3. **Given** a pinned item entry, **When** a user clicks it, **Then** they are navigated to `/items/[id]`.
4. **Given** no items are pinned, **When** the Pinned section renders, **Then** an empty state message is displayed.

---

### User Story 4 - Browse 10 Most Recent Items (Priority: P2)

A developer sees a "Recent" section listing the 10 most recently updated items, sorted by `updatedAt` descending. Each entry mirrors the Pinned item layout: colored type icon, title, description, tag chips, and date. A "View all" link in the section header leads to the full items list.

**Why this priority**: The recent items list lets developers quickly resume work or reference what was last added — a critical workflow for any knowledge hub.

**Independent Test**: The Recent section renders exactly 10 items from mock data sorted by `updatedAt` descending. Each entry shows type icon, title, description, tags, and date. A "View all" link is present.

**Acceptance Scenarios**:

1. **Given** the dashboard loads, **When** the Recent section renders, **Then** up to 10 items are shown sorted by `updatedAt` descending.
2. **Given** mock data has 17 items, **When** the Recent section renders, **Then** exactly 10 items are displayed.
3. **Given** a recent item entry, **When** rendered, **Then** it shows: colored type icon, title, description, tag chips, and formatted date.
4. **Given** the Recent section header, **When** rendered, **Then** a "View all" link is present and links to `/items`.
5. **Given** a recent item entry, **When** a user clicks it, **Then** they are navigated to `/items/[id]`.

---

### Edge Cases

- When no items are pinned, the Pinned section shows an empty state message rather than an empty list.
- On mobile viewports, stat cards wrap to 2 columns and collection cards wrap to 1 column.
- Long titles or descriptions must truncate with ellipsis rather than overflow their containers.
- All item and collection links (`/items/[id]`, `/collections/[id]`, `/items`, `/collections`) will 404 until those routes are implemented — this is acceptable in this phase.
- A collection with zero items still renders a card with a count of 0.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The main content area MUST display 4 stat cards at the very top: total items, total collections, total favorite items, and total favorite collections.
- **FR-002**: Each stat card MUST show a label, a numeric count sourced from mock data, and a relevant icon.
- **FR-003**: Stat cards MUST use a 4-column grid on desktop and a 2-column grid on mobile/tablet.
- **FR-004**: The Collections section MUST display all collections from mock data in a responsive grid: 3 columns on desktop, 2 on tablet, 1 on mobile.
- **FR-005**: Each collection card MUST show: collection name, item count (derived by filtering mock items), description, unique content-type icons from that collection's items, and a star indicator for `isFavorite: true`.
- **FR-006**: Each collection card MUST be a Next.js `<Link href="/collections/[id]">` (will 404 until route is implemented).
- **FR-007**: The Collections section header MUST include a "View all" `<Link href="/collections">` (will 404 until route is implemented).
- **FR-008**: The Pinned section MUST display only items where `isPinned: true` from mock data.
- **FR-009**: Each pinned item entry MUST show: a colored type icon (using the `color` field from its `ItemType`), item title, description, tag chips (tag names), and formatted creation date.
- **FR-010**: Each pinned item entry MUST be a Next.js `<Link href="/items/[id]">` (will 404 until route is implemented).
- **FR-011**: When no items are pinned, the Pinned section MUST render a non-empty empty state message.
- **FR-012**: The Recent section MUST display the 10 most recently updated items from mock data, sorted by `updatedAt` descending.
- **FR-013**: Each recent item entry MUST show the same fields as a pinned item entry: colored type icon, title, description, tag chips, and formatted date.
- **FR-014**: Each recent item entry MUST be a Next.js `<Link href="/items/[id]">` (will 404 until route is implemented).
- **FR-015**: The Recent section header MUST include a "View all" `<Link href="/items">` (will 404 until route is implemented).
- **FR-016**: All data MUST be sourced from `src/lib/mock-data.ts` — no server fetch, no database calls.
- **FR-017**: All icons MUST be imported from `src/components/icons.tsx`.
- **FR-018**: ShadCN components MUST be preferred over custom HTML/CSS where a suitable component exists (e.g., Badge for tags, Card for collection cards).
- **FR-019**: Long titles and descriptions MUST truncate with `line-clamp` or `truncate` — no horizontal overflow permitted.

### Key Entities

- **StatCard**: Label, numeric count (derived), icon.
- **Collection**: Name, item count (derived), description, unique type icon set (derived from items in collection), isFavorite flag.
- **Item** (Pinned / Recent): Title, description, type name + color (from ItemType), tag names (from Tags), updatedAt/createdAt date.
- **ItemType**: Name, icon name, color hex — used to render colored type icons on item entries and collection type-icon sets.
- **Tag**: Name — rendered as small badge/chip on item entries.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 4 stat cards render with correct counts on first load matching mock data (17 items, 6 collections, 7 favorite items, 3 favorite collections).
- **SC-002**: All 6 collections appear in the Collections grid with correct per-collection item counts and metadata.
- **SC-003**: The Pinned section renders exactly 2 items (matching the 2 pinned items in current mock data).
- **SC-004**: The Recent section renders exactly 10 items, with the most recently updated item appearing first.
- **SC-005**: Every item entry and collection card is clickable and navigates to the correct route in one interaction.
- **SC-006**: The layout is responsive and does not overflow or break at mobile viewports (min 320px width).
- **SC-007**: Long titles and descriptions are visually truncated — no horizontal scrollbar appears in the main content area.

## Assumptions

- This is phase 3 of 3; the sidebar (phases 1 & 2) is already implemented and is not modified in this phase.
- Data is sourced from mock data — no server fetch, no database, no authentication in this phase.
- The `/items`, `/items/[id]`, `/collections`, and `/collections/[id]` routes are not yet implemented; links will 404 in this phase.
- Item counts per collection are computed by filtering the `items` array using `item.collectionIds.includes(collectionId)`.
- Stats are computed inline from mock data arrays (e.g., `items.length`, `items.filter(i => i.isFavorite).length`).
- "Recent" means sorted by `updatedAt` descending, capped at 10 entries.
- The dashboard header ("Dashboard" title + subtitle) was implemented in a previous phase and is not re-implemented here.
- Type icon colors are applied using the `color` hex field from the `ItemType` entity via inline style or a CSS custom property.
- Tag chips are simple badges showing the tag name with no click action in this phase.
- The main content area is implemented as new component(s) within `src/components/dashboard/` or directly in `dashboard/page.tsx` — the exact split is a planning decision.
