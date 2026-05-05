import { db } from "@/lib/db";

export interface ItemType {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
}

export interface PinnedItemSummary {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  updatedAt: Date;
  type: ItemType;
  tags: Array<{ id: string; name: string }>;
}

export interface RecentItemSummary {
  id: string;
  title: string;
  description: string | null;
  updatedAt: Date;
  type: ItemType;
}

export interface ItemTypeWithCount {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  slug: string;
  count: number;
}

const typeSelect = { id: true, name: true, icon: true, color: true } as const;

const SYSTEM_TYPE_ORDER = [
  "itemtype_snippet",
  "itemtype_prompt",
  "itemtype_command",
  "itemtype_note",
  "itemtype_file",
  "itemtype_image",
  "itemtype_link",
];

export async function getSystemItemTypes(): Promise<ItemTypeWithCount[]> {
  const rows = await db.itemType.findMany({
    where: { isSystem: true },
    include: { _count: { select: { items: true } } },
  });

  return rows
    .map((t) => ({
      id: t.id,
      name: t.name,
      icon: t.icon,
      color: t.color,
      slug: `${t.name.toLowerCase()}s`,
      count: t._count.items,
    }))
    .sort((a, b) => {
      const ai = SYSTEM_TYPE_ORDER.indexOf(a.id);
      const bi = SYSTEM_TYPE_ORDER.indexOf(b.id);
      if (ai === -1 && bi === -1) return a.name.localeCompare(b.name);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
}

export async function getPinnedItems(): Promise<PinnedItemSummary[]> {
  const rows = await db.item.findMany({
    where: { isPinned: true },
    orderBy: { updatedAt: "desc" },
    include: {
      type: { select: typeSelect },
      tags: { include: { tag: { select: { id: true, name: true } } } },
    },
  });

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    isFavorite: row.isFavorite,
    updatedAt: row.updatedAt,
    type: row.type,
    tags: row.tags.map(({ tag }) => tag),
  }));
}

export async function getRecentItems(limit = 10): Promise<RecentItemSummary[]> {
  const rows = await db.item.findMany({
    take: limit,
    orderBy: { updatedAt: "desc" },
    include: { type: { select: typeSelect } },
  });

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    updatedAt: row.updatedAt,
    type: row.type,
  }));
}
