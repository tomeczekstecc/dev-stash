# Research: Dashboard Main Content Area (Phase 3)

## Decision 1: Component client/server boundary

**Decision**: New main content components will have no `'use client'` directive; they are stateless display components.  
**Rationale**: The dashboard `page.tsx` is already `'use client'` (required for `useState` sidebar toggle). Components imported from a client module run on the client regardless — omitting `'use client'` in the children is the correct pattern; it keeps them portable and signals no interactivity is intended.  
**Alternatives considered**: Refactoring `page.tsx` to lift sidebar state out so the page becomes a server component — rejected because it requires modifying Phase 1/2 work, violating Minimal Change Discipline (Principle VI).

## Decision 2: Data access pattern

**Decision**: All four sections (stats, collections, pinned, recent) import directly from `src/lib/mock-data.ts`.  
**Rationale**: The spec explicitly states "import directly for now until we implement a database." All required helpers already exist (`getPinnedItems`, `getFavoriteCollections`, `getTypeCounts`).  
**Alternatives considered**: Fetching via Server Actions — unnecessary overhead for mock data; ruled out.

## Decision 3: Icon mapping strategy

**Decision**: Reuse the `ICON_MAP` pattern established in `sidebar.tsx` inside a local map within the new components. Export any new Lucide icons needed through `src/components/icons.tsx` (centralised re-export file).  
**Rationale**: `icons.tsx` is the established single source for Lucide icons per `CLAUDE.md`. Currently missing: `Pin`, `ChevronRight`, `Clock`, `Layers`, `FolderOpen`.  
**Alternatives considered**: Importing directly from `lucide-react` in components — violates project convention.

## Decision 4: Collection card type-icon badges

**Decision**: Derive unique item types per collection at render time using `getItemsByCollection(col.id)` → map to `typeId` → deduplicate → look up in `itemTypes`.  
**Rationale**: Mock data already has `collectionIds` on each item, so the join is trivial. No additional data structure needed.  
**Alternatives considered**: Pre-computing in mock-data.ts — unnecessary; mock data file should stay as authored.

## Decision 5: "View all" links

**Decision**: Render as `<button>` elements styled as links (or `<span>`) with no `href` — visually present but non-functional.  
**Rationale**: The spec and assumption both state "View all links are non-functional placeholders for this phase." Using `<a>` with an empty href or `#` causes accessibility warnings. A styled button or span is cleaner.  
**Alternatives considered**: `<Link href="#">` — produces a11y lint warnings; rejected.

## Decision 6: Recent items sort

**Decision**: Sort all items by `updatedAt` string descending (ISO 8601 string comparison is lexicographically correct) and take the first 10.  
**Rationale**: All `updatedAt` values in mock data are ISO 8601 strings; string comparison sorts them correctly without `Date` parsing overhead.  
**Alternatives considered**: `new Date(a.updatedAt).getTime()` — equally correct but adds unnecessary parsing for mock data.

## Decision 7: Stats card layout

**Decision**: Four cards in a responsive CSS grid: 2 columns on mobile, 4 columns on desktop (`grid-cols-2 md:grid-cols-4`).  
**Rationale**: Standard responsive stats grid pattern; fits the existing dark-mode card style established in Phase 1/2.  
**Alternatives considered**: Flex row — less predictable wrapping at intermediate breakpoints.
