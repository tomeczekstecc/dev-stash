# Quickstart: Dashboard UI Phase 1

## Prerequisites

- Node.js installed
- `pnpm` available (`npm i -g pnpm` if not)
- Dev server not already running on port 3000

## Validate the Feature

```bash
# 1. Install dependencies (if not done)
pnpm install

# 2. Start the dev server
pnpm dev

# 3. Open the dashboard in your browser
#    → http://localhost:3000/dashboard
```

## Acceptance Checklist

Verify each item visually in the browser:

- [ ] Page loads at `/dashboard` with no console errors
- [ ] Background is dark (not white)
- [ ] Top bar spans the full width of the viewport
- [ ] Top bar shows "DevStash" brand name on the left
- [ ] Top bar has a search input field in the center/middle area
- [ ] Top bar has "New Collection" and "New Item" buttons on the right
- [ ] Below the top bar, an `h2` reading "Sidebar" is visible on the left
- [ ] Below the top bar, an `h2` reading "Main" is visible in the main area

## Build Verification

```bash
pnpm build
```

Build MUST complete with zero errors before committing.
