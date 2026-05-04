# UI Component Contracts: Dashboard UI Phase 2

## Sidebar

**File**: `src/components/dashboard/sidebar.tsx`
**Type**: Client Component (`'use client'`)

### Props

```typescript
// No external props — data sourced internally from mock-data
```

### Internal State

| State       | Type    | Default | Triggers                          |
|-------------|---------|---------|-----------------------------------|
| isCollapsed | boolean | false   | Desktop toggle button click       |
| isOpen      | boolean | false   | Mobile menu icon / backdrop click |

### Renders (desktop, expanded)

```
<aside>
  ┌─ [PanelLeft icon]                       ← collapse toggle
  │
  ├─ TYPES section
  │  └─ [icon] TypeName  [count]  ← Link to /items/[slug]
  │     (× 7 item types)
  │
  ├─ COLLECTIONS section
  │  ├─ FAVORITES
  │  │  └─ [★] CollectionName    ← Link (isFavorite === true)
  │  └─ ALL COLLECTIONS
  │     └─ CollectionName         ← Link (isFavorite === false)
  │
  └─ USER area (bottom)
     ├─ Avatar (initials fallback)
     ├─ name + email
     └─ [Settings icon]
</aside>
```

### Contract Rules

- On mobile (<768px), aside MUST be `fixed left-0 top-0 h-full z-40` with `translate-x`
  transition
- A backdrop div (semi-transparent) MUST render behind the drawer when `isOpen` is true
- When `isCollapsed` is true on desktop, only icons MUST be visible (text hidden)
- Item type links MUST use Next.js `<Link>` to `/items/[slug]`
- All icon components MUST be imported from `@/components/icons`

---

## DashboardPage (updated)

**File**: `src/app/dashboard/page.tsx`
**Type**: Server Component (no change)

### Change

Replace `<aside><h2>Sidebar</h2></aside>` placeholder with `<Sidebar />`.
The `<Sidebar />` import introduces a client boundary; the page itself remains a
Server Component.

### Contract Rules

- Page layout: `flex h-screen flex-col` with TopBar at top, `flex flex-1` below
- `<Sidebar />` renders as the left panel; `<main>` takes remaining space
- `<main>` MUST retain `<h2>Main</h2>` placeholder for now (phase 3 scope)
