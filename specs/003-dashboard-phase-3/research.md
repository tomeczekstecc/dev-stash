# Research: Dashboard UI Phase 3

## Decision Log

### D-001: ShadCN Card for Collection and Stat Cards

**Decision**: Install `shadcn/ui` Card component (`src/components/ui/card.tsx`) via `pnpm dlx shadcn@latest add card`

**Rationale**: FR-018 requires preferring ShadCN components. Card is the natural primitive for the collection grid cards and stat cards. The existing codebase already uses shadcn/ui (Button, Input, Avatar, Sheet) so Card fits the established design language and provides consistent `bg-card`, `border`, and `rounded-xl` styling matching the dark theme.

**Alternatives considered**:
- Plain `<div>` with Tailwind — rejected: ShadCN preference applies and Card provides consistent dark-mode styling without manual duplication.

---

### D-002: ShadCN Badge for Tag Chips

**Decision**: Install `shadcn/ui` Badge component (`src/components/ui/badge.tsx`) via `pnpm dlx shadcn@latest add badge`

**Rationale**: FR-018 + spec specifies tag chips. Badge is the standard ShadCN primitive for inline labels. Using it ensures visual consistency with other ShadCN components in the project.

**Alternatives considered**:
- Plain `<span>` with manual Tailwind classes — rejected for the same ShadCN preference reason.

---

### D-003: Type Icon Color via Inline Style

**Decision**: Render type icons with `style={{ color: type.color }}` using the hex value from `ItemType.color`

**Rationale**: Type colors are dynamic data values (e.g., `#3b82f6`, `#8b5cf6`) from mock-data.ts. Tailwind v4 cannot generate arbitrary color classes for runtime values. Inline style is the correct approach for data-driven colors. CSS custom properties would add complexity without benefit here.

**Alternatives considered**:
- Static Tailwind color map — rejected: colors are arbitrary hex values defined in data, not Tailwind palette tokens.
- CSS custom property + `text-[--icon-color]` — rejected: adds complexity without benefit for this simple use case.

---

### D-004: Date Formatting

**Decision**: Use `new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })` inline in the component (produces "Jan 15" style output).

**Rationale**: No date formatting library (date-fns, dayjs) is in the project. The native `Intl.DateTimeFormat` API via `toLocaleDateString` produces clean output matching the screenshot's date style. Installing a library for this single use violates Principle VI.

**Alternatives considered**:
- Installing date-fns — rejected: exceeds minimal change requirement for a simple display-only date.
- Manual template literal formatting — rejected: `toLocaleDateString` is cleaner and handles locale edge cases.

---

### D-005: New Icons Required

**Decision**: Add the following exports to `src/components/icons.tsx`:

| Export alias | Lucide source | Used for |
|---|---|---|
| `MoreHorizontal` | `MoreHorizontal` | Collection card overflow button |
| `Pin` | `Pin` | Pinned section header icon |
| `Clock` | `Clock` | Recent section header icon |
| `Package` | `Package` | "Items" stat card icon |
| `Folder` | `Folder` | "Collections" stat card icon |
| `Heart` | `Heart` | "Favorites" stat card icon |
| `Bookmark` | `Bookmark` | "Fav Collections" stat card icon |
| `ChevronRight` | `ChevronRight` | "View all" section header links |

**Rationale**: FR-017 mandates that all icons come from `src/components/icons.tsx`. All 8 are available in `lucide-react` which is already installed.

---

### D-006: Component Structure

**Decision**: Single new file `src/components/dashboard/main-content.tsx` exporting `DashboardMain`. Section sub-components (`StatCard`, `CollectionCard`, `ItemRow`) are defined in the same file as non-exported internal components.

**Rationale**: The main content area has 4 sections but the tree is shallow and all data is inline from mock-data. One file keeps the change diff minimal (Principle VI) and avoids premature file fragmentation at the mock-data stage.

**Alternatives considered**:
- Separate file per section — rejected: premature abstraction; overkill for a mock-data phase.

---

### D-007: Derivation Helpers

**Decision**: Use the existing exported helpers from `mock-data.ts` directly (`getItemsByCollection`, `getPinnedItems`, `getItemType`, `getTagsForItem`). Do not add new functions to `mock-data.ts`.

**Rationale**: All needed derivations are already covered by the exported helpers. Adding new helpers would require modifying `mock-data.ts` which is a shared read-only data source.

**Alternatives considered**:
- Adding a `getRecentItems(n)` helper to mock-data.ts — rejected: the sort + slice is a single inline expression that doesn't warrant a helper.

---

### D-008: Collection Type Icons Derivation

**Decision**: For each collection, derive unique `ItemType[]` by: `getItemsByCollection(col.id)` → extract unique `typeId`s → map each via `getItemType(typeId)` → filter out undefined.

**Rationale**: This uses only the existing mock-data helpers (D-007) and produces the correct unique-types-per-collection result required by FR-005.
