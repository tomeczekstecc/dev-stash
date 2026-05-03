// ─── Types ───────────────────────────────────────────────────────────────────

export type ContentType = 'text' | 'file' | 'url'

export interface ItemType {
    id: string
    name: string
    slug: string
    icon: string
    color: string
    isSystem: boolean
}

export interface Tag {
    id: string
    name: string
}

export interface Collection {
    id: string
    name: string
    description: string
    isFavorite: boolean
    createdAt: string
    updatedAt: string
}

export interface Item {
    id: string
    title: string
    contentType: ContentType
    content: string | null
    fileUrl: string | null
    fileName: string | null
    fileSize: number | null
    url: string | null
    description: string
    isFavorite: boolean
    isPinned: boolean
    language: string | null
    typeId: string
    tagIds: string[]
    collectionIds: string[]
    createdAt: string
    updatedAt: string
}

export interface User {
    id: string
    name: string
    email: string
    isPro: boolean
    image: string | null
    createdAt: string
    updatedAt: string
}

// ─── Item Types ───────────────────────────────────────────────────────────────

export const itemTypes: ItemType[] = [
    {
        id: 'type-1',
        name: 'Snippet',
        slug: 'snippets',
        icon: 'Code',
        color: '#3b82f6',
        isSystem: true,
    },
    {
        id: 'type-2',
        name: 'Prompt',
        slug: 'prompts',
        icon: 'Sparkles',
        color: '#8b5cf6',
        isSystem: true,
    },
    {
        id: 'type-3',
        name: 'Command',
        slug: 'commands',
        icon: 'Terminal',
        color: '#f97316',
        isSystem: true,
    },
    {
        id: 'type-4',
        name: 'Note',
        slug: 'notes',
        icon: 'StickyNote',
        color: '#fde047',
        isSystem: true,
    },
    {
        id: 'type-5',
        name: 'File',
        slug: 'files',
        icon: 'File',
        color: '#6b7280',
        isSystem: true,
    },
    {
        id: 'type-6',
        name: 'Image',
        slug: 'images',
        icon: 'Image',
        color: '#ec4899',
        isSystem: true,
    },
    {
        id: 'type-7',
        name: 'Link',
        slug: 'links',
        icon: 'Link',
        color: '#10b981',
        isSystem: true,
    },
]

// ─── Tags ─────────────────────────────────────────────────────────────────────

export const tags: Tag[] = [
    { id: 'tag-1', name: 'react' },
    { id: 'tag-2', name: 'auth' },
    { id: 'tag-3', name: 'hooks' },
    { id: 'tag-4', name: 'typescript' },
    { id: 'tag-5', name: 'python' },
    { id: 'tag-6', name: 'git' },
    { id: 'tag-7', name: 'api' },
    { id: 'tag-8', name: 'nextjs' },
    { id: 'tag-9', name: 'tailwind' },
    { id: 'tag-10', name: 'ai' },
    { id: 'tag-11', name: 'interview' },
    { id: 'tag-12', name: 'performance' },
    { id: 'tag-13', name: 'error-handling' },
    { id: 'tag-14', name: 'css' },
    { id: 'tag-15', name: 'cli' },
]

// ─── Collections ──────────────────────────────────────────────────────────────

export const collections: Collection[] = [
    {
        id: 'col-1',
        name: 'React Patterns',
        description: 'Common React patterns and hooks',
        isFavorite: true,
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-15T12:00:00Z',
    },
    {
        id: 'col-2',
        name: 'Python Snippets',
        description: 'Useful Python code snippets',
        isFavorite: false,
        createdAt: '2024-01-08T10:00:00Z',
        updatedAt: '2024-01-14T09:00:00Z',
    },
    {
        id: 'col-3',
        name: 'Context Files',
        description: 'AI context files for projects',
        isFavorite: true,
        createdAt: '2024-01-05T10:00:00Z',
        updatedAt: '2024-01-13T11:00:00Z',
    },
    {
        id: 'col-4',
        name: 'Interview Prep',
        description: 'Technical interview preparation',
        isFavorite: false,
        createdAt: '2024-01-03T10:00:00Z',
        updatedAt: '2024-01-16T08:00:00Z',
    },
    {
        id: 'col-5',
        name: 'Git Commands',
        description: 'Frequently used git commands',
        isFavorite: true,
        createdAt: '2024-01-01T10:00:00Z',
        updatedAt: '2024-01-12T14:00:00Z',
    },
    {
        id: 'col-6',
        name: 'AI Prompts',
        description: 'Curated AI prompts for coding',
        isFavorite: false,
        createdAt: '2024-01-07T10:00:00Z',
        updatedAt: '2024-01-17T10:00:00Z',
    },
]

// ─── Items ────────────────────────────────────────────────────────────────────

export const items: Item[] = [
    // ── Snippets ──
    {
        id: 'item-1',
        title: 'useAuth Hook',
        contentType: 'text',
        content: `import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}`,
        fileUrl: null,
        fileName: null,
        fileSize: null,
        url: null,
        description: 'Custom authentication hook for React applications',
        isFavorite: true,
        isPinned: true,
        language: 'typescript',
        typeId: 'type-1',
        tagIds: ['tag-1', 'tag-2', 'tag-3', 'tag-4'],
        collectionIds: ['col-1'],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
    },
    {
        id: 'item-2',
        title: 'API Error Handling Pattern',
        contentType: 'text',
        content: `async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
      return res
    } catch (err) {
      if (i === retries - 1) throw err
      await new Promise(r => setTimeout(r, 2 ** i * 1000))
    }
  }
  throw new Error('Max retries reached')
}`,
        fileUrl: null,
        fileName: null,
        fileSize: null,
        url: null,
        description: 'Fetch wrapper with exponential backoff retry logic',
        isFavorite: false,
        isPinned: true,
        language: 'typescript',
        typeId: 'type-1',
        tagIds: ['tag-7', 'tag-13', 'tag-4'],
        collectionIds: ['col-1', 'col-4'],
        createdAt: '2024-01-12T10:00:00Z',
        updatedAt: '2024-01-12T10:00:00Z',
    },
    {
        id: 'item-3',
        title: 'useDebouncedValue',
        contentType: 'text',
        content: `import { useEffect, useState } from 'react'

export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}`,
        fileUrl: null,
        fileName: null,
        fileSize: null,
        url: null,
        description: 'Debounce any value with a configurable delay',
        isFavorite: false,
        isPinned: false,
        language: 'typescript',
        typeId: 'type-1',
        tagIds: ['tag-1', 'tag-3', 'tag-4'],
        collectionIds: ['col-1'],
        createdAt: '2024-01-11T10:00:00Z',
        updatedAt: '2024-01-11T10:00:00Z',
    },
    {
        id: 'item-4',
        title: 'Python List Comprehension Patterns',
        contentType: 'text',
        content: `# Filter and transform
evens = [x * 2 for x in range(10) if x % 2 == 0]

# Nested list comprehension
matrix = [[i * j for j in range(1, 4)] for i in range(1, 4)]

# Dict comprehension
word_lengths = {word: len(word) for word in ['hello', 'world']}

# Set comprehension
unique_chars = {char.lower() for char in 'Hello World' if char.isalpha()}`,
        fileUrl: null,
        fileName: null,
        fileSize: null,
        url: null,
        description: 'Common Python list, dict and set comprehension patterns',
        isFavorite: false,
        isPinned: false,
        language: 'python',
        typeId: 'type-1',
        tagIds: ['tag-5'],
        collectionIds: ['col-2'],
        createdAt: '2024-01-14T10:00:00Z',
        updatedAt: '2024-01-14T10:00:00Z',
    },
    {
        id: 'item-5',
        title: 'Next.js Server Action Pattern',
        contentType: 'text',
        content: `'use server'

import { z } from 'zod'

const schema = z.object({ title: z.string().min(1) })

export async function createItem(formData: FormData) {
  const parsed = schema.safeParse({ title: formData.get('title') })
  if (!parsed.success) return { success: false, error: parsed.error.message }
  // db call here
  return { success: true, data: parsed.data }
}`,
        fileUrl: null,
        fileName: null,
        fileSize: null,
        url: null,
        description: 'Type-safe server action with Zod validation',
        isFavorite: true,
        isPinned: false,
        language: 'typescript',
        typeId: 'type-1',
        tagIds: ['tag-8', 'tag-4'],
        collectionIds: ['col-1', 'col-4'],
        createdAt: '2024-01-13T10:00:00Z',
        updatedAt: '2024-01-13T10:00:00Z',
    },

    // ── Prompts ──
    {
        id: 'item-6',
        title: 'Code Review Prompt',
        contentType: 'text',
        content: `Review the following code for:
1. Security vulnerabilities (injection, XSS, auth bypass)
2. Performance issues (N+1 queries, unnecessary re-renders)
3. Logic errors and edge cases
4. Adherence to SOLID principles
5. Missing error handling

Provide specific line-level feedback with suggested fixes.`,
        fileUrl: null,
        fileName: null,
        fileSize: null,
        url: null,
        description: 'Structured prompt for thorough AI code reviews',
        isFavorite: true,
        isPinned: false,
        language: null,
        typeId: 'type-2',
        tagIds: ['tag-10'],
        collectionIds: ['col-6'],
        createdAt: '2024-01-17T10:00:00Z',
        updatedAt: '2024-01-17T10:00:00Z',
    },
    {
        id: 'item-7',
        title: 'SQL Query Optimizer Prompt',
        contentType: 'text',
        content: `Analyze this SQL query and suggest optimizations:
- Identify missing indexes
- Rewrite subqueries as JOINs where beneficial
- Flag N+1 patterns
- Suggest query plan improvements

Query: [PASTE QUERY HERE]
Table schemas: [PASTE SCHEMAS HERE]`,
        fileUrl: null,
        fileName: null,
        fileSize: null,
        url: null,
        description: 'Prompt for AI-assisted SQL query optimization',
        isFavorite: false,
        isPinned: false,
        language: null,
        typeId: 'type-2',
        tagIds: ['tag-10', 'tag-12'],
        collectionIds: ['col-6'],
        createdAt: '2024-01-16T10:00:00Z',
        updatedAt: '2024-01-16T10:00:00Z',
    },

    // ── Commands ──
    {
        id: 'item-8',
        title: 'Git Interactive Rebase Last N Commits',
        contentType: 'text',
        content: 'git rebase -i HEAD~[n]',
        fileUrl: null,
        fileName: null,
        fileSize: null,
        url: null,
        description:
            'Interactively squash, reorder, or edit the last N commits',
        isFavorite: true,
        isPinned: false,
        language: 'bash',
        typeId: 'type-3',
        tagIds: ['tag-6'],
        collectionIds: ['col-5'],
        createdAt: '2024-01-12T10:00:00Z',
        updatedAt: '2024-01-12T10:00:00Z',
    },
    {
        id: 'item-9',
        title: 'Git Undo Last Commit (Keep Changes)',
        contentType: 'text',
        content: 'git reset --soft HEAD~1',
        fileUrl: null,
        fileName: null,
        fileSize: null,
        url: null,
        description: 'Undo the last commit while keeping all changes staged',
        isFavorite: false,
        isPinned: false,
        language: 'bash',
        typeId: 'type-3',
        tagIds: ['tag-6'],
        collectionIds: ['col-5'],
        createdAt: '2024-01-11T10:00:00Z',
        updatedAt: '2024-01-11T10:00:00Z',
    },
    {
        id: 'item-10',
        title: 'Find and Kill Process on Port',
        contentType: 'text',
        content: `# macOS / Linux
lsof -ti tcp:3000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F`,
        fileUrl: null,
        fileName: null,
        fileSize: null,
        url: null,
        description: 'Kill whatever is running on a given port',
        isFavorite: false,
        isPinned: false,
        language: 'bash',
        typeId: 'type-3',
        tagIds: ['tag-15'],
        collectionIds: ['col-5'],
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-10T10:00:00Z',
    },

    // ── Notes ──
    {
        id: 'item-11',
        title: 'React 19 Key Changes',
        contentType: 'text',
        content: `## React 19 Notable Changes

- **Actions**: async functions in transitions — replaces manual isPending state
- **useOptimistic**: built-in optimistic UI updates
- **use()**: read context or promises during render
- **Server Components**: stable in Next.js App Router
- **ref as prop**: no more forwardRef wrapper needed
- **Document Metadata**: \`<title>\`, \`<meta>\` renderable anywhere`,
        fileUrl: null,
        fileName: null,
        fileSize: null,
        url: null,
        description: 'Summary of the most important React 19 features',
        isFavorite: false,
        isPinned: false,
        language: null,
        typeId: 'type-4',
        tagIds: ['tag-1', 'tag-8'],
        collectionIds: ['col-1', 'col-4'],
        createdAt: '2024-01-09T10:00:00Z',
        updatedAt: '2024-01-09T10:00:00Z',
    },
    {
        id: 'item-12',
        title: 'Big O Cheat Sheet',
        contentType: 'text',
        content: `| Operation       | Array  | Linked List | Hash Map | BST (avg) |
|----------------|--------|-------------|----------|-----------|
| Access         | O(1)   | O(n)        | O(1)     | O(log n)  |
| Search         | O(n)   | O(n)        | O(1)     | O(log n)  |
| Insert         | O(n)   | O(1)        | O(1)     | O(log n)  |
| Delete         | O(n)   | O(1)        | O(1)     | O(log n)  |`,
        fileUrl: null,
        fileName: null,
        fileSize: null,
        url: null,
        description: 'Quick reference for common data structure complexities',
        isFavorite: true,
        isPinned: false,
        language: null,
        typeId: 'type-4',
        tagIds: ['tag-11'],
        collectionIds: ['col-4'],
        createdAt: '2024-01-08T10:00:00Z',
        updatedAt: '2024-01-08T10:00:00Z',
    },

    // ── Files ──
    {
        id: 'item-13',
        title: 'Next.js Project CLAUDE.md',
        contentType: 'file',
        content: null,
        fileUrl: '/uploads/claude-nextjs.md',
        fileName: 'CLAUDE.md',
        fileSize: 4200,
        url: null,
        description: 'Claude Code context file for Next.js projects',
        isFavorite: true,
        isPinned: false,
        language: null,
        typeId: 'type-5',
        tagIds: ['tag-8', 'tag-10'],
        collectionIds: ['col-3'],
        createdAt: '2024-01-06T10:00:00Z',
        updatedAt: '2024-01-06T10:00:00Z',
    },
    {
        id: 'item-14',
        title: 'Prisma Schema Template',
        contentType: 'file',
        content: null,
        fileUrl: '/uploads/schema.prisma',
        fileName: 'schema.prisma',
        fileSize: 3100,
        url: null,
        description:
            'Reusable Prisma schema with auth and soft-delete patterns',
        isFavorite: false,
        isPinned: false,
        language: null,
        typeId: 'type-5',
        tagIds: ['tag-4'],
        collectionIds: ['col-3'],
        createdAt: '2024-01-05T10:00:00Z',
        updatedAt: '2024-01-05T10:00:00Z',
    },

    // ── Images ──
    {
        id: 'item-15',
        title: 'System Design Diagram',
        contentType: 'file',
        content: null,
        fileUrl: '/uploads/system-design.png',
        fileName: 'system-design.png',
        fileSize: 245000,
        url: null,
        description: 'High-level architecture diagram for microservices setup',
        isFavorite: false,
        isPinned: false,
        language: null,
        typeId: 'type-6',
        tagIds: ['tag-11'],
        collectionIds: ['col-4'],
        createdAt: '2024-01-07T10:00:00Z',
        updatedAt: '2024-01-07T10:00:00Z',
    },

    // ── Links ──
    {
        id: 'item-16',
        title: 'Next.js App Router Docs',
        contentType: 'url',
        content: null,
        fileUrl: null,
        fileName: null,
        fileSize: null,
        url: 'https://nextjs.org/docs/app',
        description: 'Official Next.js App Router documentation',
        isFavorite: false,
        isPinned: false,
        language: null,
        typeId: 'type-7',
        tagIds: ['tag-8'],
        collectionIds: ['col-1'],
        createdAt: '2024-01-04T10:00:00Z',
        updatedAt: '2024-01-04T10:00:00Z',
    },
    {
        id: 'item-17',
        title: 'Tailwind CSS v4 Migration Guide',
        contentType: 'url',
        content: null,
        fileUrl: null,
        fileName: null,
        fileSize: null,
        url: 'https://tailwindcss.com/docs/v4-beta',
        description: 'Official guide for migrating from Tailwind v3 to v4',
        isFavorite: true,
        isPinned: false,
        language: null,
        typeId: 'type-7',
        tagIds: ['tag-9', 'tag-14'],
        collectionIds: ['col-1'],
        createdAt: '2024-01-03T10:00:00Z',
        updatedAt: '2024-01-03T10:00:00Z',
    },
]

// ─── Mock User ────────────────────────────────────────────────────────────────

export const mockUser: User = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@devstash.io',
    isPro: true,
    image: null,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
}

// ─── Derived Helpers ──────────────────────────────────────────────────────────

export function getItemsByType(typeId: string): Item[] {
    return items.filter((item) => item.typeId === typeId)
}

export function getItemsByCollection(collectionId: string): Item[] {
    return items.filter((item) => item.collectionIds.includes(collectionId))
}

export function getPinnedItems(): Item[] {
    return items.filter((item) => item.isPinned)
}

export function getFavoriteCollections(): Collection[] {
    return collections.filter((col) => col.isFavorite)
}

export function getItemType(typeId: string): ItemType | undefined {
    return itemTypes.find((t) => t.id === typeId)
}

export function getTagsForItem(item: Item): Tag[] {
    return tags.filter((tag) => item.tagIds.includes(tag.id))
}

export function getCollectionsForItem(item: Item): Collection[] {
    return collections.filter((col) => item.collectionIds.includes(col.id))
}

export function getTypeCounts(): Record<string, number> {
    return itemTypes.reduce(
        (acc, type) => {
            acc[type.id] = getItemsByType(type.id).length
            return acc
        },
        {} as Record<string, number>,
    )
}
