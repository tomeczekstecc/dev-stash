# DecStash

Developer knowledge base hub for snippets, commansds, notes, files, images, links and custom types, build with Next.js 16, React 19, Tailwind CSS 4 and TypeScript 5. See AGENTS.md for agent integration details.

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
src/app/          # App Router root — layout.tsx + page.tsx only so far
public/           # Static assets (currently empty)
```

All new pages go under `src/app/`. When adding a page, update this file's project structure section per the global CLAUDE.md instruction.
