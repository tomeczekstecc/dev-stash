import { type ComponentType, type SVGProps } from "react";

import {
  Clock,
  Code,
  FileText,
  Image,
  Link,
  Sparkles,
  StickyNote,
  Terminal,
} from "@/components/icons";
import { type RecentItemSummary } from "@/lib/db/items";

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

function RecentItemRow({ item }: { item: RecentItemSummary }) {
  const { type } = item;
  const Icon = ICON_MAP[type.icon ?? ""] ?? FileText;

  return (
    <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50">
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
        style={{ color: type.color ?? undefined }}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
        {item.description && (
          <p className="truncate text-xs text-muted-foreground">{item.description}</p>
        )}
      </div>
      <span className="shrink-0 text-xs text-muted-foreground">{formatDate(item.updatedAt)}</span>
    </div>
  );
}

interface RecentItemsProps {
  items: RecentItemSummary[];
}

export function RecentItems({ items }: RecentItemsProps) {
  if (items.length === 0) return null;

  return (
    <section className="space-y-2">
      <div className="flex items-center gap-2 px-1">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-base font-semibold text-foreground">Recent</h2>
      </div>
      <div className="rounded-xl border border-border bg-card">
        {items.map((item) => (
          <RecentItemRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
