# UI Component Contracts: Dashboard UI Phase 1

## TopBar

**File**: `src/components/dashboard/top-bar.tsx`
**Type**: Server Component (no `'use client'`)

### Props

```typescript
// No props in Phase 1 — all content is static display
```

### Renders

| Slot | Element | Content |
|------|---------|---------|
| Left | Brand text | "DevStash" (or logo mark) |
| Center | `<Input>` (shadcn) | placeholder="Search items..." — display only |
| Right | `<Button>` (shadcn, variant="outline") | "New Collection" — display only |
| Right | `<Button>` (shadcn) | "New Item" — display only |

### Contract rules

- MUST render inside a full-width `<header>` element
- MUST NOT attach any event handlers or use `useState`/`useEffect`
- Search input MUST be read-only or have no `onChange` handler in this phase
- Buttons MUST render without `onClick` handlers in this phase

---

## DashboardPage

**File**: `src/app/dashboard/page.tsx`
**Type**: Server Component (no `'use client'`)

### Props

None (Next.js page component).

### Renders

```
<DashboardPage>
  <TopBar />
  <div class="flex">
    <aside>
      <h2>Sidebar</h2>
    </aside>
    <main>
      <h2>Main</h2>
    </main>
  </div>
</DashboardPage>
```

### Contract rules

- MUST import and render `<TopBar />`
- MUST render an `<h2>` with text "Sidebar" in the sidebar area
- MUST render an `<h2>` with text "Main" in the main content area
- MUST NOT import any client components
