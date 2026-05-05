import { type ComponentType, type SVGProps } from "react";

import {
  Code,
  FileText,
  Image,
  Link,
  Pin,
  Sparkles,
  Star,
  StickyNote,
  Terminal,
} from "@/components/icons";
import { type PinnedItemSummary } from "@/lib/db/items";

type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>;

const ICON_MAP: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File: FileText,
  Image,
  Link,
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function PinnedItemCard({ item }: { item: PinnedItemSummary }) {
  const { type, tags } = item;
  const Icon = ICON_MAP[type.icon ?? ""] ?? FileText;

  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/50">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
        style={{ color: type.color ?? undefined, borderColor: type.color ?? undefined }}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-medium text-foreground">{item.title}</h3>
          <div className="flex shrink-0 items-center gap-2">
            {item.isFavorite && (
              <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
            )}
            <span className="text-xs text-muted-foreground">{formatDate(item.updatedAt)}</span>
          </div>
        </div>
        {item.description && (
          <p className="line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface PinnedItemsProps {
  items: PinnedItemSummary[];
}

export function PinnedItems({ items }: PinnedItemsProps) {
  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Pin className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-base font-semibold text-foreground">Pinned</h2>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <PinnedItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
