import { db } from "@/lib/db";

export interface CollectionSummary {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  types: Array<{
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
  }>;
  dominantTypeColor: string | null;
}

export interface SidebarCollection {
  id: string;
  name: string;
  isFavorite: boolean;
  dominantTypeColor: string | null;
}

function dominantColor(items: Array<{ typeId: string; type: { color: string | null } }>): string | null {
  const counts = new Map<string, { count: number; color: string | null }>();
  for (const item of items) {
    const entry = counts.get(item.typeId);
    entry ? entry.count++ : counts.set(item.typeId, { count: 1, color: item.type.color });
  }
  let best: string | null = null;
  let max = 0;
  for (const { count, color } of counts.values()) {
    if (count > max) {
      max = count;
      best = color;
    }
  }
  return best;
}

export async function getRecentCollections(limit = 6): Promise<CollectionSummary[]> {
  const rows = await db.collection.findMany({
    take: limit,
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { items: true } },
      items: {
        select: {
          typeId: true,
          type: { select: { id: true, name: true, icon: true, color: true } },
        },
      },
    },
  });

  return rows.map((col) => {
    const typeMap = new Map<string, { count: number; type: { id: string; name: string; icon: string | null; color: string | null } }>();
    for (const item of col.items) {
      const entry = typeMap.get(item.typeId);
      entry ? entry.count++ : typeMap.set(item.typeId, { count: 1, type: item.type });
    }

    return {
      id: col.id,
      name: col.name,
      description: col.description,
      isFavorite: col.isFavorite,
      itemCount: col._count.items,
      types: [...typeMap.values()].map(({ type }) => type),
      dominantTypeColor: dominantColor(col.items),
    };
  });
}

export async function getSidebarCollections(): Promise<SidebarCollection[]> {
  const rows = await db.collection.findMany({
    orderBy: { name: "asc" },
    include: {
      items: {
        select: {
          typeId: true,
          type: { select: { color: true } },
        },
      },
    },
  });

  return rows.map((col) => ({
    id: col.id,
    name: col.name,
    isFavorite: col.isFavorite,
    dominantTypeColor: dominantColor(col.items),
  }));
}
