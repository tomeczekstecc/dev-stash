import { hash } from "bcryptjs";

import { db } from "../src/lib/db";

const ITEM_TYPE_IDS = {
  snippet: "itemtype_snippet",
  prompt: "itemtype_prompt",
  command: "itemtype_command",
  note: "itemtype_note",
  file: "itemtype_file",
  image: "itemtype_image",
  link: "itemtype_link",
} as const;

const systemTypes = [
  { id: ITEM_TYPE_IDS.snippet, name: "Snippet", icon: "Code", color: "#3b82f6" },
  { id: ITEM_TYPE_IDS.prompt, name: "Prompt", icon: "Sparkles", color: "#8b5cf6" },
  { id: ITEM_TYPE_IDS.command, name: "Command", icon: "Terminal", color: "#f97316" },
  { id: ITEM_TYPE_IDS.note, name: "Note", icon: "StickyNote", color: "#fde047" },
  { id: ITEM_TYPE_IDS.file, name: "File", icon: "File", color: "#6b7280" },
  { id: ITEM_TYPE_IDS.image, name: "Image", icon: "Image", color: "#ec4899" },
  { id: ITEM_TYPE_IDS.link, name: "Link", icon: "Link", color: "#10b981" },
];

async function main() {
  console.log("Seeding database…");

  for (const type of systemTypes) {
    await db.itemType.upsert({
      where: { id: type.id },
      update: { name: type.name, icon: type.icon, color: type.color, isSystem: true },
      create: { ...type, isSystem: true },
    });
  }
  console.log(`✓ ${systemTypes.length} system item types`);

  const passwordHash = await hash("12345678", 12);

  const user = await db.user.upsert({
    where: { email: "demo@devstash.io" },
    update: {},
    create: {
      email: "demo@devstash.io",
      name: "Demo User",
      password: passwordHash,
      isPro: false,
      emailVerified: new Date(),
    },
  });
  console.log(`✓ User: ${user.email}`);

  const existingCollections = await db.collection.count({ where: { userId: user.id } });
  if (existingCollections > 0) {
    console.log("Collections already seeded — skipping items.");
    return;
  }

  const reactPatterns = await db.collection.create({
    data: { name: "React Patterns", description: "Reusable React patterns and hooks", isFavorite: true, userId: user.id },
  });
  const aiWorkflows = await db.collection.create({
    data: { name: "AI Workflows", description: "AI prompts and workflow automations", isFavorite: false, userId: user.id },
  });
  const devops = await db.collection.create({
    data: { name: "DevOps", description: "Infrastructure and deployment resources", isFavorite: false, userId: user.id },
  });
  const terminalCommands = await db.collection.create({
    data: { name: "Terminal Commands", description: "Useful shell commands for everyday development", isFavorite: true, userId: user.id },
  });
  const designResources = await db.collection.create({
    data: { name: "Design Resources", description: "UI/UX resources and references", isFavorite: false, userId: user.id },
  });
  console.log("✓ 5 collections");

  await db.item.createMany({
    data: [
      {
        title: "useDebounce Hook",
        contentType: "TEXT",
        content: `import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}`,
        description: "Debounce any reactive value with a configurable delay",
        language: "typescript",
        isFavorite: true,
        isPinned: true,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.snippet,
        collectionId: reactPatterns.id,
      },
      {
        title: "Generic Context Provider",
        contentType: "TEXT",
        content: `import { createContext, useContext, type ReactNode } from 'react'

function createCtx<T>() {
  const ctx = createContext<T | undefined>(undefined)
  function useCtx() {
    const value = useContext(ctx)
    if (value === undefined) throw new Error('useCtx must be inside Provider')
    return value
  }
  return [useCtx, ctx.Provider] as const
}

export { createCtx }`,
        description: "Type-safe generic context factory — no undefined checks in consumers",
        language: "typescript",
        isFavorite: false,
        isPinned: false,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.snippet,
        collectionId: reactPatterns.id,
      },
      {
        title: "cn Utility (Tailwind + clsx)",
        contentType: "TEXT",
        content: `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
        description: "Merge Tailwind classes safely — resolves conflicts, accepts conditionals",
        language: "typescript",
        isFavorite: false,
        isPinned: false,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.snippet,
        collectionId: reactPatterns.id,
      },
      {
        title: "Code Review Prompt",
        contentType: "TEXT",
        content: `Review the following code and provide feedback on:

1. Security vulnerabilities (injection, XSS, auth bypass, data exposure)
2. Performance issues (N+1 queries, unnecessary re-renders, memory leaks)
3. Logic errors and uncovered edge cases
4. SOLID principle violations
5. Missing or insufficient error handling

For each issue: quote the relevant line(s), explain the problem, and suggest a concrete fix.`,
        description: "Structured prompt for deep AI-assisted code reviews",
        isFavorite: true,
        isPinned: false,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.prompt,
        collectionId: aiWorkflows.id,
      },
      {
        title: "Documentation Generator Prompt",
        contentType: "TEXT",
        content: `Generate comprehensive documentation for the following code:

- Purpose: what does this do and why does it exist?
- Parameters: name, type, description, whether required, default value
- Return value: type and description
- Throws: error types and when they occur
- Example usage: at least two realistic examples
- Edge cases: known limitations or gotchas

Format as JSDoc / TSDoc comments ready to paste above the function.`,
        description: "Generate TSDoc-ready documentation from a function signature",
        isFavorite: false,
        isPinned: false,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.prompt,
        collectionId: aiWorkflows.id,
      },
      {
        title: "Refactoring Assistance Prompt",
        contentType: "TEXT",
        content: `Refactor the following code to improve readability and maintainability:

Goals:
- Extract magic numbers and strings into named constants
- Break functions longer than 20 lines into smaller helpers
- Replace nested ternaries with early returns or guard clauses
- Eliminate duplicated logic
- Improve variable and function naming

Constraints:
- Do not change public interfaces or function signatures
- Do not introduce new dependencies
- All existing behaviour must be preserved`,
        description: "Opinionated refactoring prompt with explicit constraints",
        isFavorite: false,
        isPinned: false,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.prompt,
        collectionId: aiWorkflows.id,
      },
      {
        title: "Node.js Docker Multi-Stage Build",
        contentType: "TEXT",
        content: `FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`,
        description: "Production-ready multi-stage Dockerfile for Next.js with pnpm",
        language: "dockerfile",
        isFavorite: false,
        isPinned: false,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.snippet,
        collectionId: devops.id,
      },
      {
        title: "Docker Compose Deploy",
        contentType: "TEXT",
        content: "docker compose -f docker-compose.prod.yml up -d --build --remove-orphans",
        description: "Full production deploy: build, start detached, clean up orphan containers",
        language: "bash",
        isFavorite: false,
        isPinned: false,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.command,
        collectionId: devops.id,
      },
      {
        title: "Docker Documentation",
        contentType: "TEXT",
        url: "https://docs.docker.com",
        description: "Official Docker docs — engine, Compose, networking, volumes",
        isFavorite: false,
        isPinned: false,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.link,
        collectionId: devops.id,
      },
      {
        title: "GitHub Actions Docs",
        contentType: "TEXT",
        url: "https://docs.github.com/en/actions",
        description: "Workflow syntax, runners, secrets, and reusable workflows reference",
        isFavorite: false,
        isPinned: false,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.link,
        collectionId: devops.id,
      },
      {
        title: "Git Log Graph",
        contentType: "TEXT",
        content: "git log --oneline --graph --decorate --all",
        description: "Visual branch graph in the terminal — great for understanding history",
        language: "bash",
        isFavorite: true,
        isPinned: true,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.command,
        collectionId: terminalCommands.id,
      },
      {
        title: "Docker PS Formatted",
        contentType: "TEXT",
        content: 'docker ps -a --format "table {{.ID}}\\t{{.Names}}\\t{{.Status}}\\t{{.Ports}}"',
        description: "Clean tabular view of all containers including stopped ones",
        language: "bash",
        isFavorite: false,
        isPinned: false,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.command,
        collectionId: terminalCommands.id,
      },
      {
        title: "Kill Process on Port",
        contentType: "TEXT",
        content: `# macOS / Linux
lsof -ti tcp:3000 | xargs kill -9

# Windows (PowerShell)
$pid = (netstat -ano | Select-String ':3000').ToString().Split(' ')[-1]
taskkill /PID $pid /F`,
        description: "Free up a port by killing whatever process is listening on it",
        language: "bash",
        isFavorite: false,
        isPinned: false,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.command,
        collectionId: terminalCommands.id,
      },
      {
        title: "pnpm Why",
        contentType: "TEXT",
        content: "pnpm why <package-name>",
        description: "Find out why a package is installed and which packages depend on it",
        language: "bash",
        isFavorite: false,
        isPinned: false,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.command,
        collectionId: terminalCommands.id,
      },
      {
        title: "Tailwind CSS Docs",
        contentType: "TEXT",
        url: "https://tailwindcss.com/docs",
        description: "Utility class reference, configuration, and v4 migration guide",
        isFavorite: true,
        isPinned: false,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.link,
        collectionId: designResources.id,
      },
      {
        title: "shadcn/ui",
        contentType: "TEXT",
        url: "https://ui.shadcn.com",
        description: "Copy-paste accessible component library built on Radix UI and Tailwind",
        isFavorite: true,
        isPinned: false,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.link,
        collectionId: designResources.id,
      },
      {
        title: "Radix UI Primitives",
        contentType: "TEXT",
        url: "https://www.radix-ui.com",
        description: "Unstyled, accessible UI primitives for building design systems",
        isFavorite: false,
        isPinned: false,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.link,
        collectionId: designResources.id,
      },
      {
        title: "Lucide Icons",
        contentType: "TEXT",
        url: "https://lucide.dev",
        description: "Open-source icon library with 1000+ consistent SVG icons",
        isFavorite: false,
        isPinned: false,
        userId: user.id,
        typeId: ITEM_TYPE_IDS.link,
        collectionId: designResources.id,
      },
    ],
  });

  console.log("✓ 18 items across 5 collections");
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
