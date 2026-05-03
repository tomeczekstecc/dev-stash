# Research: Dashboard UI Phase 1

## Decision 1: ShadCN + Tailwind v4 Initialization

**Decision**: Use `pnpm dlx shadcn@latest init -t next`

**Rationale**: The `-t next` flag configures shadcn for Next.js App Router. When Tailwind v4 is
already installed, shadcn's latest CLI detects it and generates a CSS-based setup:
- `components.json` is created with `tailwind.config: ""` (empty — intentional for v4)
- `globals.css` is extended with `@import "tw-animate-css"`, `@import "shadcn/tailwind.css"`,
  `@custom-variant dark (&:is(.dark *))`, and `@theme inline { ... }` CSS variable mappings
- `src/lib/utils.ts` (cn helper) is created
- No `tailwind.config.ts` or `tailwind.config.js` is generated — fully compliant with
  Constitution Principle IV

**Alternatives considered**:
- Manual shadcn setup: more error-prone, not recommended when CLI handles v4 detection correctly
- Tailwind v3 + shadcn: rejected — project already uses v4

---

## Decision 2: Dark Mode Strategy

**Decision**: Add `dark` class directly to `<html>` element in `src/app/layout.tsx`

**Rationale**: Phase 1 requires dark mode by default with no user toggle. The simplest
approach is to add `className="dark"` (merged with existing font vars) on the `<html>` tag.
ShadCN's `@custom-variant dark (&:is(.dark *))` declaration enables all `dark:` utilities
to activate when the `dark` class is present on any ancestor.

No `next-themes` provider is needed in this phase — it will be added in a future phase
when the light/dark toggle is introduced.

**Alternatives considered**:
- CSS `prefers-color-scheme` media query: rejected — requires dark mode always on regardless
  of OS preference, and shadcn's class strategy is the documented approach
- `next-themes` ThemeProvider: deferred to a future phase; adds unnecessary client-side
  overhead for a static phase

---

## Decision 3: ShadCN Components for Phase 1

**Decision**: Install `button` and `input` components only

**Rationale**: The top bar requires:
- `Button` — for "New Collection" and "New Item" action buttons
- `Input` — for the search field

No other shadcn components are needed in this display-only phase. Lucide React icons
(installed as a shadcn dependency) provide the search icon.

**Alternatives considered**:
- Installing all components upfront: rejected per Constitution Principle VI (minimal change)

---

## Decision 4: Dashboard Page & TopBar as Server Components

**Decision**: `src/app/dashboard/page.tsx` and `src/components/dashboard/top-bar.tsx` are
both Server Components (no `'use client'` directive)

**Rationale**: Phase 1 is display-only — no browser APIs, no event handlers, no hooks needed.
Server Components are the correct default per Constitution Principle I.

---

## Resolved NEEDS CLARIFICATION

None — all aspects of the feature were well-defined in the specification.
