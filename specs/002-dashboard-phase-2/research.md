# Research: Dashboard UI Phase 2

## Decision 1: Sidebar as Client Component

**Decision**: `src/components/dashboard/sidebar.tsx` MUST use `'use client'`

**Rationale**: The sidebar requires two pieces of interactive state:
1. `isCollapsed` — desktop collapse/expand toggle
2. `isOpen` — mobile drawer open/close

Both require `useState` and event handlers, which are only available in Client Components.
This is a justified exception to Constitution Principle I (Server-First Architecture).
The sidebar children (type links, collection links) are plain `<a>` / `<Link>` elements
that do not independently need client APIs — they are rendered inside the client boundary.

**Alternatives considered**:
- URL-param driven collapse state (server-friendly): rejected — causes full page reload on
  every toggle, poor UX for a navigation panel
- `next-themes` or external state library: rejected per Principle VI (minimal change);
  local useState is sufficient for this phase

---

## Decision 2: Mobile Drawer Strategy

**Decision**: Use shadcn `Sheet` component for the mobile sidebar drawer

**Rationale**: The project preference is to use ShadCN components over custom HTML/CSS
whenever a suitable component exists. `Sheet` provides a fully accessible, animated slide-in
panel with built-in backdrop, focus trap, and close-on-outside-click — all requirements
from the spec — with zero custom CSS needed.

Implementation:
- `Sheet`, `SheetContent`, `SheetHeader`, `SheetTitle` imported from `@/components/ui/sheet`
- `isOpen` state (`useState<boolean>`) controls `open` prop on `<Sheet>`
- `SheetContent side="left"` produces the left-side slide-in behaviour
- The menu icon button (visible only on mobile via `md:hidden`) sets `isOpen(true)`

**Alternatives considered**:
- Custom `translate-x` + backdrop div: rejected — ShadCN Sheet handles this better with
  accessibility and animation built in; using custom CSS when Sheet exists contradicts
  the project's ShadCN-first preference

---

## Decision 3: Icon Expansion in icons.tsx

**Decision**: Expand `src/components/icons.tsx` to export all icons needed by the sidebar

**Icons to add**:
- Item type icons (from mock-data icon names): `Code`, `Sparkles`, `Terminal`,
  `StickyNote`, `FileText` (using FileText instead of File to avoid name clash), `ImageIcon`
  (using ImageIcon alias), `Link`
- UI controls: `Star`, `Settings`, `PanelLeft` (collapse toggle), `X`, `Menu`

**Rationale**: Constitution FR-013 requires all Lucide imports to go through `icons.tsx`.
The mock-data `icon` field stores the Lucide component name as a string — a lookup map in
the sidebar maps string → icon component.

---

## Decision 4: Item Count Calculation

**Decision**: Compute `getTypeCounts()` from `src/lib/mock-data.ts` directly in the sidebar

**Rationale**: `mock-data.ts` already exports `getTypeCounts()` which returns a
`Record<string, number>` keyed by typeId. The sidebar uses this to show counts beside
each type. When the database is added in a future phase, this helper is replaced with a
server fetch.

---

## Resolved NEEDS CLARIFICATION

None — all aspects of the feature were well-defined in the specification.
