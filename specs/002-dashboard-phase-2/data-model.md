# Data Model: Dashboard UI Phase 2

All data is read from `src/lib/mock-data.ts`. No new database entities are introduced.
The sidebar consumes the following existing shapes:

## ItemType (read-only, from mock-data)

| Field     | Type      | Notes                                   |
|-----------|-----------|-----------------------------------------|
| id        | string    | e.g. "type-1"                           |
| name      | string    | e.g. "Snippets"                         |
| slug      | string    | URL segment e.g. "snippets"             |
| icon      | string    | Lucide component name e.g. "Code"       |
| color     | string    | Hex color for type badge                |
| isSystem  | boolean   | All system types shown in sidebar       |

Derived: `count` — number of items with matching `typeId` (via `getTypeCounts()`).

## Collection (read-only, from mock-data)

| Field       | Type    | Notes                              |
|-------------|---------|------------------------------------|
| id          | string  | Used for collection link route     |
| name        | string  | Displayed in sidebar list          |
| isFavorite  | boolean | Determines Favorites vs All group  |

## User (read-only, from mock-data — mockUser)

| Field  | Type          | Notes                                  |
|--------|---------------|----------------------------------------|
| name   | string        | Displayed below avatar                 |
| email  | string        | Displayed below name                   |
| image  | string \| null | null → initials fallback in Avatar     |

## Sidebar UI State (client-side only, not persisted)

| Field       | Type    | Default | Notes                              |
|-------------|---------|---------|-------------------------------------|
| isCollapsed | boolean | false   | Desktop collapse toggle             |
| isOpen      | boolean | false   | Mobile drawer open/close            |
