# UI Component Contracts: Dashboard UI Phase 3

## DashboardMain

**File**: `src/components/dashboard/main-content.tsx`
**Export**: Named export `DashboardMain`
**Component type**: Client Component (rendered inside the already-client `dashboard/page.tsx`)

### Props

```typescript
// No external props — all data imported directly from '@/lib/mock-data'
interface DashboardMainProps {}
```

### Sections rendered (in DOM order)

1. **Stats row** — 4 `StatCard` components in a responsive grid
2. **Collections section** — heading + "View all" link + `CollectionCard` grid
3. **Pinned section** — heading + `ItemRow` list or empty state
4. **Recent section** — heading + "View all" link + `ItemRow` list

### Integration in dashboard/page.tsx

```tsx
// Replace:
<main className="flex-1 p-4">
  <h2 className="font-semibold text-foreground">Main</h2>
</main>

// With:
<main className="flex-1 overflow-y-auto">
  <DashboardMain />
</main>
```

---

## StatCard (internal)

```typescript
interface StatCardProps {
  label: string;
  value: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
```

- Renders inside a ShadCN `Card`
- Icon displayed in a small rounded container with muted background
- Value displayed as large bold number
- Label displayed as small muted text

---

## CollectionCard (internal)

```typescript
interface CollectionCardProps {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  isFavorite: boolean;
  types: ItemType[];
}
```

- Renders as a ShadCN `Card` wrapped in `Link href="/collections/[id]"`
- Star icon filled (`fill-current text-amber-500`) when `isFavorite`, absent otherwise
- Type icons rendered with `style={{ color: type.color }}` (inline hex from mock data)
- Item count shown as `{itemCount} items`
- `MoreHorizontal` icon button inert in this phase (no onClick)
- Name: `truncate`; description: `line-clamp-2`

---

## ItemRow (internal)

```typescript
interface ItemRowProps {
  id: string;
  title: string;
  description: string;
  type: ItemType;
  tags: Tag[];
  date: string;  // ISO string — formatted to "MMM D" in component
}
```

- Renders as `Link href="/items/[id]"` wrapping a row layout
- Type icon rendered with `style={{ color: type.color }}`
- Tags rendered as ShadCN `Badge` components (`variant="secondary"`)
- Date formatted via `new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })`
- Title: `truncate`; description: `line-clamp-1`

---

## Empty State (internal, Pinned section)

Rendered when `getPinnedItems().length === 0`.

```
"No pinned items yet"
```

Centered muted text with a `Pin` icon above it.
