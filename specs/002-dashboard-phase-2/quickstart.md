# Quickstart: Dashboard UI Phase 2

## Prerequisites

- Phase 1 implementation complete (top bar, dark mode, shadcn initialized)
- Dev server not running on port 3000

## Validate the Feature

```bash
pnpm dev
# open http://localhost:3000/dashboard
```

## Acceptance Checklist

### Desktop (viewport ≥ 768px)

- [ ] Sidebar is visible on the left side of the dashboard
- [ ] All 7 item types appear with correct icon, name, and item count
- [ ] Clicking "Snippets" navigates to `/items/snippets` (or renders the link href correctly)
- [ ] Collections section shows "Favorites" group (React Patterns, Context Files, Git Commands)
- [ ] Collections section shows "All Collections" group (Python Snippets, Interview Prep, AI Prompts)
- [ ] Favorite collections have a filled star indicator
- [ ] Clicking the collapse icon hides the sidebar text (icon-only or hidden)
- [ ] Clicking the expand icon restores the full sidebar
- [ ] User profile area at bottom shows "John Doe", "john@devstash.io", "JD" avatar, settings icon

### Mobile (viewport < 768px — resize browser or DevTools)

- [ ] Sidebar is NOT visible on page load
- [ ] A menu/hamburger icon is visible (in top bar or page area)
- [ ] Clicking the menu icon opens the sidebar as a left overlay drawer
- [ ] A semi-transparent backdrop appears behind the drawer
- [ ] Clicking the backdrop closes the drawer

## Build Verification

```bash
pnpm build
# Must complete with zero TypeScript errors
```
