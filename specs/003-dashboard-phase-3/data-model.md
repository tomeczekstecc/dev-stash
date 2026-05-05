# Data Model: Dashboard UI Phase 3

> All data in this phase is sourced from `src/lib/mock-data.ts`. No database schema changes.

## Derived View Models

### StatCardData

| Field | Type | Source | Value (current mock) |
|-------|------|--------|----------------------|
| label | string | Static | "Items" / "Collections" / "Favorites" / "Fav Collections" |
| value | number | Derived | 17 / 6 / 7 / 3 |
| icon | LucideIcon | Static | Package / Folder / Heart / Bookmark |

**Derivation**:
```
totalItems         = items.length                             // 17
totalCollections   = collections.length                      // 6
favoriteItems      = items.filter(i => i.isFavorite).length  // 7
favoriteCollections = collections.filter(c => c.isFavorite).length  // 3
```

---

### CollectionCardData

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| id | string | `Collection.id` | Used in `/collections/[id]` href |
| name | string | `Collection.name` | Truncate with `truncate` if overflows |
| description | string | `Collection.description` | Clamp at 2 lines with `line-clamp-2` |
| itemCount | number | Derived | `getItemsByCollection(col.id).length` |
| isFavorite | boolean | `Collection.isFavorite` | Controls star icon fill state |
| types | `ItemType[]` | Derived | Unique types from collection's items — see derivation below |

**Type icon derivation per collection**:
```
const colItems = getItemsByCollection(col.id)
const uniqueTypeIds = [...new Set(colItems.map(i => i.typeId))]
const types = uniqueTypeIds.map(tid => getItemType(tid)).filter(Boolean) as ItemType[]
```

---

### ItemRowData

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| id | string | `Item.id` | Used in `/items/[id]` href |
| title | string | `Item.title` | Truncate with `truncate` |
| description | string | `Item.description` | Clamp at 1–2 lines |
| type | `ItemType` | Derived | `getItemType(item.typeId)!` |
| tags | `Tag[]` | Derived | `getTagsForItem(item)` |
| date | string | `Item.updatedAt` | Formatted as "Jan 15" |

---

## Mock Data Summary

| Entity | Count | Notes |
|--------|-------|-------|
| Total items | 17 | `items` array |
| Total collections | 6 | `collections` array |
| Favorite items | 7 | item-1, item-5, item-6, item-8, item-12, item-13, item-17 |
| Favorite collections | 3 | col-1 (React Patterns), col-3 (Context Files), col-5 (Git Commands) |
| Pinned items | 2 | item-1 (useAuth Hook), item-2 (API Error Handling Pattern) |
| Recent items (top 10) | 10 | Sorted by `updatedAt` desc; item-6 (Jan 17) is most recent |

## Derivation Helpers Used (from mock-data.ts)

| Helper | Signature | Used for |
|--------|-----------|----------|
| `getItemsByCollection` | `(collectionId: string) => Item[]` | Collection item count + type icons |
| `getPinnedItems` | `() => Item[]` | Pinned section list |
| `getItemType` | `(typeId: string) => ItemType \| undefined` | Resolving type name/icon/color per item |
| `getTagsForItem` | `(item: Item) => Tag[]` | Resolving tag names per item |

Inline derivation (not in mock-data helpers):
```typescript
const recentItems = [...items]
  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  .slice(0, 10)
```
