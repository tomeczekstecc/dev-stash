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
  layout.tsx                # Root layout — dark mode, Inter font
  page.tsx                  # Home page
  dashboard/
    page.tsx                # Dashboard page (/dashboard)
src/components/
  icons.tsx                 # Centralized Lucide icon re-exports — import from here, not lucide-react
  ui/                       # shadcn/ui components (button, input)
  dashboard/
    top-bar.tsx             # Dashboard top bar
    sidebar.tsx             # Collapsible sidebar (Client Component)
src/lib/
  utils.ts                  # shadcn cn() utility
  mock-data.ts              # Mock data for development
  db.ts                     # Prisma singleton (PrismaPg adapter, hot-reload safe)
src/generated/
  prisma/                   # Generated Prisma client — do not edit, gitignored
prisma/
  schema.prisma             # Database schema — all models + enums
  seed.ts                   # Seeds 7 system ItemTypes
  migrations/               # Migration history — committed to source control
prisma.config.ts            # Prisma 7 CLI config — schema path, seed, DIRECT_URL
public/                     # Static assets
```

All new pages go under `src/app/`. When adding a page, update this file's project structure section per the global CLAUDE.md instruction.
