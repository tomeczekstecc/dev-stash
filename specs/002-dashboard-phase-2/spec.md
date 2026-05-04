# Feature Specification: Dashboard UI Phase 2

**Feature Branch**: `002-dashboard-phase-2`
**Created**: 2026-05-03
**Status**: Draft
**Input**: User description: "Dashboard UI Phase 2 — collapsible sidebar with item types, favorite and recent collections, user avatar, mobile drawer"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Item Types via Sidebar (Priority: P1)

A developer opens the dashboard and sees the sidebar listing all item types (Snippets,
Prompts, Commands, Notes, Files, Images, Links) with their item counts. They click a type
and are taken to the filtered items route (e.g., `/items/snippets`). The item count badge
updates to reflect the number of items in each type.

**Why this priority**: The sidebar type navigation is the primary way users filter and
reach their items — it is the core interaction model for the entire app.

**Independent Test**: The sidebar renders all 7 item types from mock data with correct
counts and clickable links. Clicking "Snippets" navigates to `/items/snippets`.

**Acceptance Scenarios**:

1. **Given** the dashboard loads, **When** the sidebar is visible, **Then** all 7 system
   item types are listed with their names, icons, and item counts.
2. **Given** the sidebar, **When** a user clicks an item type, **Then** they are navigated
   to `/items/[slug]` (e.g., `/items/snippets`).
3. **Given** the sidebar, **When** it first renders, **Then** item counts are derived from
   mock data and displayed next to each type name.
4. **Given** the user is on `/items/snippets`, **When** the sidebar renders, **Then** the
   Snippets item type entry is highlighted as active.

---

### User Story 2 - View Favorite and Recent Collections (Priority: P2)

A developer sees a "Collections" section in the sidebar split into two groups: favorited
collections (starred) and all remaining collections in recency order. Favorited collections
show a filled star icon; unfavorited show no star. Collections are clickable links.

**Why this priority**: Collections are the second-most-important navigation entry point —
users browse their curated groups of items through this list.

**Independent Test**: Sidebar Collections section shows favorites (React Patterns, Context
Files, Git Commands from mock data) under "Favorites" and the 3 non-favorited collections
under "All Collections". Links are present.

**Acceptance Scenarios**:

1. **Given** the sidebar, **When** the Collections section is visible, **Then** favorite
   collections appear first under a "Favorites" sub-heading, each with a filled star icon.
2. **Given** the sidebar, **When** the Collections section is visible, **Then** ONLY
   non-favorited collections appear under the "All Collections" sub-heading (no duplicates).
3. **Given** a collection entry, **When** a user clicks it, **Then** they are navigated
   to `/collections/[id]`.

---

### User Story 3 - Collapse and Expand Sidebar (Priority: P2)

A developer can toggle the sidebar open or closed using a collapse icon at the top of the
sidebar. When collapsed, the sidebar shows only item type icons, plus the user avatar and
settings icon at the bottom. Section headings and item counts are hidden in the collapsed
state. The toggle state is maintained for the session.

**Why this priority**: Collapsibility is essential for giving developers more screen
real estate when working in the main content area.

**Independent Test**: Clicking the toggle icon at the top of the sidebar collapses it to
a `w-16` icon rail. Item type icons remain clickable. Avatar and settings icon visible at
bottom. Clicking again restores the full `w-64` sidebar with labels, counts, and collections.

**Acceptance Scenarios**:

1. **Given** the sidebar is open, **When** a user clicks the collapse icon (top of sidebar),
   **Then** the sidebar collapses to `w-16` and the main content area expands.
2. **Given** the sidebar is collapsed, **When** a user clicks the expand icon,
   **Then** the sidebar reopens to `w-64` with all labels, counts, and collections visible.
3. **Given** any viewport, **When** the sidebar state changes, **Then** the transition
   completes in ≤200ms using `transition-all duration-200` with `overflow-hidden`.
4. **Given** the sidebar is collapsed, **When** it renders, **Then** section headings
   ("Item Types", "Favorites", "All Collections") and item counts are hidden; item type
   icons, avatar, and settings icon remain visible.

---

### User Story 4 - Mobile Drawer Sidebar (Priority: P3)

On mobile viewports, the sidebar is hidden by default and opens as an overlay drawer
from the left when triggered by a hamburger icon in the top bar. It overlays the main
content rather than pushing it. Tapping outside the drawer closes it.

**Why this priority**: Mobile usability is explicitly required — the sidebar must behave
as a standard mobile drawer on small screens.

**Independent Test**: At a viewport width below 768px, the sidebar is hidden. The hamburger
icon in the top bar opens a `w-64` Sheet drawer from the left. Tapping the backdrop closes it.

**Acceptance Scenarios**:

1. **Given** a mobile viewport (<768px), **When** the page loads, **Then** the sidebar
   is hidden and not visible in the layout.
2. **Given** a mobile viewport, **When** a user taps the hamburger icon in the top bar,
   **Then** the sidebar slides in from the left as a `w-64` overlay drawer (ShadCN Sheet,
   `side="left"`).
3. **Given** the mobile drawer is open, **When** a user taps outside it,
   **Then** the drawer closes (Sheet built-in backdrop handling).
4. **Given** the hamburger icon in the top bar, **When** rendered on desktop (≥768px),
   **Then** it is hidden (`md:hidden`).

---

### User Story 5 - User Profile Area (Priority: P3)

At the bottom of the sidebar, the user's avatar, name, and email are displayed. The avatar
shows the user's initials as a fallback. A settings gear icon is also present but inert.
When the sidebar is collapsed, only the avatar and settings icon are visible.

**Why this priority**: The user profile area provides visual identity and a future entry
point for account settings — present in the spec screenshot.

**Independent Test**: The bottom of the sidebar shows "John Doe", "john@devstash.io",
an avatar with "JD" initials, and a settings icon (from mock data). When collapsed, only
avatar and settings icon remain; name and email are hidden.

**Acceptance Scenarios**:

1. **Given** the sidebar is expanded, **When** it renders, **Then** the bottom area shows
   the user's avatar, full name, and email from mock data.
2. **Given** the user has no profile image, **When** the avatar renders, **Then** it
   displays the user's initials (e.g., "JD" for "John Doe") using ShadCN Avatar.
3. **Given** the sidebar is collapsed, **When** it renders, **Then** only the avatar
   and settings icon are visible at the bottom (name and email hidden).
4. **Given** the settings icon, **When** rendered, **Then** it is inert — no href, no
   onClick — a visual placeholder for a future route.

---

### Edge Cases

- When the sidebar is collapsed on desktop, item type icons still serve as navigation links.
- The sidebar collapse state persists for the current session but resets on page reload.
- On mobile, the sidebar always opens as a drawer regardless of the desktop collapse state.
- Collections section may be empty — the UI must handle zero favorites and zero collections gracefully.
- Item type counts of zero are still shown (e.g., "Files 0").
- `/items/[slug]` and `/collections/[id]` routes do not yet exist — links will 404 in this phase; this is acceptable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The sidebar MUST display all 7 system item types with their name, icon, and item count.
- **FR-002**: Each item type entry MUST be a real Next.js `<Link href="/items/[slug]">` navigating to the intended final route (will 404 until the route is implemented).
- **FR-003**: The sidebar MUST display a Collections section with two sub-groups: favorited collections
  (labeled "Favorites") and ONLY non-favorited collections (labeled "All Collections") — no duplicate display.
- **FR-004**: Favorited collections MUST display a filled star indicator; unfavorited collections MUST NOT.
- **FR-005**: Collection entries MUST be real Next.js `<Link href="/collections/[id]">` links (will 404 until the route is implemented).
- **FR-006**: The sidebar MUST include a toggle control (collapse/expand icon) positioned at the TOP of the sidebar.
- **FR-007**: On desktop, the sidebar MUST:
  - Default to **expanded** state on first load.
  - Expand to `w-64` (256px); collapse to `w-16` (64px).
  - In the collapsed state: show item type icons (no labels, no counts), avatar, and settings icon at bottom; hide section headings ("Item Types", "Favorites", "All Collections") and the Collections section entirely.
  - Animate the transition using `transition-all duration-200` with `overflow-hidden` (≤200ms).
  - Show a `border-r` separator on the right edge of the sidebar.
- **FR-008**: On mobile viewports (<768px):
  - The sidebar MUST be hidden by default.
  - A hamburger/menu icon in `TopBar` (hidden on desktop with `md:hidden`) MUST trigger the drawer.
  - The drawer MUST use ShadCN Sheet with `side="left"` and a content width of `w-64`.
  - The `isOpen` state MUST be owned by `dashboard/page.tsx` (a Client Component); `onOpen` passed to `TopBar`, `isOpen`/`onClose` passed to `Sidebar`.
- **FR-009**: The mobile drawer MUST close when the user taps/clicks outside the Sheet; Sheet's
  built-in backdrop and close handling MUST be used.
- **FR-010**: The bottom of the sidebar MUST display the user's avatar, full name, and email (expanded) or avatar and settings icon only (collapsed). The settings icon MUST be inert (no href, no onClick) in this phase.
- **FR-011**: The user avatar MUST display initials as a fallback when no profile image is available, using the **ShadCN Avatar component** (already installed).
- **FR-012**: All data (item types, collections, user) MUST be sourced from `src/lib/mock-data.ts`
  until a database is implemented.
- **FR-013**: All icons used in the sidebar MUST be imported from `src/components/icons.tsx`.
- **FR-014**: ShadCN components MUST be preferred over custom HTML/CSS implementations whenever
  a suitable ShadCN component exists (e.g., Sheet for drawers, Avatar for user display).
- **FR-015**: ShadCN Sheet MUST be used for any slide-over drawer or overlay panel at any
  screen size — not only on mobile. A sidebar collapse that *pushes* content (not overlays) is
  a collapse pattern and may use CSS; a panel that *slides over* content MUST use Sheet.
- **FR-016**: The active item type link MUST be visually highlighted using `usePathname()` to compare the current route against each item type's `/items/[slug]` path.

### Key Entities

- **ItemType**: Name, icon name, color hex, slug, item count (derived from items).
- **Collection**: Name, isFavorite flag, item count (derived from items).
- **User**: Name, email, image (null → initials fallback via ShadCN Avatar).
- **Sidebar**: Collapsible container; desktop = push layout (`w-64` / `w-16`), mobile = overlay Sheet drawer.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 7 item types render in the sidebar with correct item counts on first load.
- **SC-002**: Clicking any item type navigates to its route within one interaction.
- **SC-003**: The sidebar collapses and expands within a single click; transition completes in ≤200ms (`transition-all duration-200` + `overflow-hidden`).
- **SC-004**: On a viewport narrower than 768px, the sidebar is not visible on page load.
- **SC-005**: The mobile drawer opens and closes reliably in response to the hamburger icon (top bar) and backdrop tap.
- **SC-006**: The user profile area renders correctly using mock data with initials fallback (ShadCN Avatar).
- **SC-007**: The active item type is visually distinguished when the current route matches `/items/[slug]`.

## Assumptions

- This is phase 2 of 3; the main content area grid (collections, pinned items) is out of scope.
- Data is sourced from mock data — no server fetch, no database, no authentication in this phase.
- The `/items/[slug]` and `/collections/[id]` routes are not yet implemented; links will 404 in this phase.
- Desktop collapse state uses React state (client component) — no persistence to localStorage in this phase.
- The sidebar is the left panel introduced as a placeholder in phase 1 — it is now fully implemented.
- Item counts per type are computed client-side from the mock items array.
- Mobile breakpoint is 768px (md in Tailwind).
- ShadCN Avatar is already installed in the project (`src/components/ui/avatar.tsx`).
- `dashboard/page.tsx` must become a Client Component (`'use client'`) to own `isOpen` state for the mobile drawer.

## Clarifications

### Session 2026-05-03

- Q: Should the mobile drawer use a ShadCN component or custom CSS? → A: Use ShadCN Sheet component; prefer ShadCN components over native HTML/CSS whenever a suitable component exists.
- Q: Does the Sheet preference apply only to mobile, or all drawers? → A: Sheet MUST be used for any drawer/overlay/panel pattern regardless of screen size. The desktop sidebar *collapse* (icon-only shrink that pushes content) is a collapse pattern, not a drawer — CSS applies there. Any slide-over overlay at any breakpoint uses Sheet.

### Session 2026-05-03 (grill-me decisions)

- Q: Desktop initial collapse state? → A: Expanded.
- Q: Collapsed desktop sidebar content? → A: Item type icons + avatar + settings icon at bottom; collections and section headings hidden.
- Q: Toggle button placement? → A: Top of sidebar.
- Q: Collapsed sidebar width? → A: `w-16` (64px).
- Q: Expanded sidebar width? → A: `w-64` (256px).
- Q: Mobile drawer trigger location? → A: Hamburger/menu icon in the top bar (`md:hidden`).
- Q: State ownership for mobile `isOpen`? → A: Lifted to `dashboard/page.tsx` (Client Component); `onOpen` to TopBar, `isOpen`/`onClose` to Sidebar.
- Q: Item type link behavior? → A: Real `<Link href="/items/[slug]">` — will 404 until route implemented.
- Q: Active state on item type links? → A: Yes — `usePathname()` highlights current route.
- Q: "All Collections" content? → A: Only non-favorited collections (no duplicates with Favorites).
- Q: Collection link behavior? → A: Real `<Link href="/collections/[id]">` — will 404 until route implemented.
- Q: Avatar component source? → A: ShadCN Avatar (already installed).
- Q: Collapsed user profile content? → A: Avatar + settings icon visible; name and email hidden.
- Q: Settings icon behavior? → A: Inert — no href, no onClick — visual placeholder.
- Q: Collapse animation? → A: `transition-all duration-200` + `overflow-hidden` (≤200ms).
- Q: Section headings in collapsed state? → A: Hidden entirely.
- Q: Item type counts in collapsed state? → A: Hidden entirely.
- Q: Mobile Sheet side? → A: `side="left"`.
- Q: Mobile Sheet width? → A: `w-64` (256px).
- Q: Sidebar separator from main content? → A: `border-r` on the sidebar's right edge.
