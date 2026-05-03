# DecStash

Developer knowledge base hub for snippets, commansds, notes, files, images, links and custom types, build with Next.js 16, React 19, Tailwind CSS 4 and TypeScript 5. See AGENTS.md for agent integration details.

## Context Files

Read the following to get the full context of the project:

- @context/project-obverview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

```bash
pnpm dev       # start dev server (http://localhost:3000)
pnpm build     # production build
pnpm start     # start production server
pnpm lint      # run ESLint
```

## Stack

- **Next.js 16** (App Router) — see AGENTS.md warning; always check `node_modules/next/dist/docs/` before writing Next.js code
- **React 19**
- **Tailwind CSS 4** — configured via `@tailwindcss/postcss`; no `tailwind.config.*` file, configuration goes in CSS or `@theme` blocks
- **TypeScript 5** — strict mode, path alias `@/*` → `src/*`

## Project structure

```
src/app/                    # App Router root
  layout.tsx                # Root layout — dark mode, Geist fonts
  page.tsx                  # Home page
  dashboard/
    page.tsx                # Dashboard page (/dashboard)
src/components/
  icons.tsx                 # Centralized Lucide icon re-exports — import from here, not lucide-react
  ui/                       # shadcn/ui components (button, input)
  dashboard/
    top-bar.tsx             # Dashboard top bar
src/lib/
  utils.ts                  # shadcn cn() utility
  mock-data.ts              # Mock data for development
public/                     # Static assets
```

All new pages go under `src/app/`. When adding a page, update this file's project structure section per the global CLAUDE.md instruction.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
at specs/001-dashboard-phase-1/plan.md
<!-- SPECKIT END -->
