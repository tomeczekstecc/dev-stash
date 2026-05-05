# Quickstart: Dashboard UI Phase 3

## Prerequisites

Install ShadCN Badge and Card:

```bash
pnpm dlx shadcn@latest add badge
pnpm dlx shadcn@latest add card
```

## Step 1 — Update icons.tsx

Add to `src/components/icons.tsx`:

```typescript
export {
  Search,
  Plus,
  FolderPlus,
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  FileText,
  ImageIcon as Image,
  Link2 as Link,
  Star,
  Settings,
  PanelLeft,
  X,
  Menu,
  // NEW in Phase 3:
  MoreHorizontal,
  Pin,
  Clock,
  Package,
  Folder,
  Heart,
  Bookmark,
  ChevronRight,
} from "lucide-react";
```

## Step 2 — Create main-content.tsx

Create `src/components/dashboard/main-content.tsx`.

### Data setup (at module scope)

```typescript
import { items, collections, getPinnedItems, getItemsByCollection, getItemType, getTagsForItem } from '@/lib/mock-data'

const stats = [
  { label: 'Items', value: items.length, icon: Package },
  { label: 'Collections', value: collections.length, icon: Folder },
  { label: 'Favorites', value: items.filter(i => i.isFavorite).length, icon: Heart },
  { label: 'Fav Collections', value: collections.filter(c => c.isFavorite).length, icon: Bookmark },
]

const pinnedItems = getPinnedItems()

const recentItems = [...items]
  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  .slice(0, 10)

const collectionsWithData = collections.map(col => {
  const colItems = getItemsByCollection(col.id)
  const uniqueTypeIds = [...new Set(colItems.map(i => i.typeId))]
  return {
    ...col,
    itemCount: colItems.length,
    types: uniqueTypeIds.map(tid => getItemType(tid)).filter(Boolean),
  }
})
```

### Layout structure

```
<div className="p-6 space-y-8">
  {/* Stats */}
  <section>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map(s => <StatCard key={s.label} {...s} />)}
    </div>
  </section>

  {/* Collections */}
  <section>
    <SectionHeader title="Collections" href="/collections" />
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {collectionsWithData.map(col => <CollectionCard key={col.id} {...col} />)}
    </div>
  </section>

  {/* Pinned */}
  <section>
    <SectionHeader title="Pinned" icon={Pin} />
    {pinnedItems.length === 0
      ? <EmptyState />
      : pinnedItems.map(item => <ItemRow key={item.id} item={item} />)
    }
  </section>

  {/* Recent */}
  <section>
    <SectionHeader title="Recent" icon={Clock} href="/items" />
    <div className="mt-4 space-y-2">
      {recentItems.map(item => <ItemRow key={item.id} item={item} />)}
    </div>
  </section>
</div>
```

## Step 3 — Update dashboard/page.tsx

```tsx
import { DashboardMain } from "@/components/dashboard/main-content";

// In the JSX, replace:
<main className="flex-1 p-4">
  <h2 className="font-semibold text-foreground">Main</h2>
</main>

// With:
<main className="flex-1 overflow-y-auto">
  <DashboardMain />
</main>
```

## Step 4 — Verify

```bash
pnpm build   # must pass — zero TypeScript/ESLint errors
pnpm dev     # visual check at http://localhost:3000/dashboard
```

### Visual checklist

- [ ] 4 stat cards at top with correct counts: Items 17, Collections 6, Favorites 7, Fav Collections 3
- [ ] 6 collection cards in a grid; favorited cards show filled star
- [ ] Pinned section shows 2 items (useAuth Hook, API Error Handling Pattern)
- [ ] Recent section shows 10 items, most recent (Code Review Prompt, Jan 17) first
- [ ] Tags render as Badge components
- [ ] No horizontal overflow on any viewport
- [ ] Layout is responsive (2-col stats on mobile, 1-col collections on mobile)
