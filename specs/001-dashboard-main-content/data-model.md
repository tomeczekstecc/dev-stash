# Data Model: Dashboard Main Content Area (Phase 3)

> All data is sourced from `src/lib/mock-data.ts`. No schema changes or database operations are needed for this phase.

## Derived Data Shapes

### StatCard

Computed at render time from mock data.

| Field   | Type   | Source                                          |
|---------|--------|-------------------------------------------------|
| label   | string | Hardcoded: "Items", "Collections", etc.         |
| value   | number | `items.length`, `collections.length`, etc.      |
| icon    | LucideIcon | Chosen per card type                        |

**Computed values**:
- Total Items: `items.length`
- Total Collections: `collections.length`
- Favorite Items: `items.filter(i => i.isFavorite).length`
- Favorite Collections: `collections.filter(c => c.isFavorite).length`

---

### CollectionCardData

Derived per collection for the Collections grid.

| Field       | Type       | Source                                              |
|-------------|------------|-----------------------------------------------------|
| id          | string     | `Collection.id`                                     |
| name        | string     | `Collection.name`                                   |
| description | string     | `Collection.description`                            |
| isFavorite  | boolean    | `Collection.isFavorite`                             |
| itemCount   | number     | `getItemsByCollection(id).length`                   |
| typeIcons   | ItemType[] | Unique `ItemType`s from items in this collection    |

---

### PinnedItemCardData

Filtered from `items` where `isPinned === true`.

| Field       | Type      | Source                               |
|-------------|-----------|--------------------------------------|
| id          | string    | `Item.id`                            |
| title       | string    | `Item.title`                         |
| description | string    | `Item.description`                   |
| isFavorite  | boolean   | `Item.isFavorite`                    |
| type        | ItemType  | `getItemType(item.typeId)`           |
| tags        | Tag[]     | `getTagsForItem(item)`               |
| updatedAt   | string    | `Item.updatedAt`                     |

---

### RecentItemRowData

All items sorted by `updatedAt` descending, capped at 10.

| Field       | Type     | Source                       |
|-------------|----------|------------------------------|
| id          | string   | `Item.id`                    |
| title       | string   | `Item.title`                 |
| description | string   | `Item.description`           |
| type        | ItemType | `getItemType(item.typeId)`   |
| updatedAt   | string   | `Item.updatedAt`             |

---

## Helper Functions Used

All helpers already exist in `src/lib/mock-data.ts`:

| Helper                        | Returns                                    |
|-------------------------------|--------------------------------------------|
| `getPinnedItems()`            | `Item[]` where `isPinned === true`         |
| `getFavoriteCollections()`    | `Collection[]` where `isFavorite === true` |
| `getItemsByCollection(id)`    | `Item[]` in a given collection             |
| `getItemType(typeId)`         | `ItemType \| undefined`                    |
| `getTagsForItem(item)`        | `Tag[]`                                    |

No new helpers needed.
