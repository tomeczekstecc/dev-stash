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
import { type Item, type ItemType, getItemType, items } from "@/lib/mock-data";

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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface RecentItemRowProps {
  item: Item;
  type: ItemType;
}

function RecentItemRow({ item, type }: RecentItemRowProps) {
  const Icon = ICON_MAP[type.icon] ?? FileText;
  return (
    <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50">
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
        style={{ color: type.color }}
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

export function RecentItems() {
  const recentItems = [...items]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 10);

  return (
    <section className="space-y-2">
      <div className="flex items-center gap-2 px-1">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-base font-semibold text-foreground">Recent</h2>
      </div>
      <div className="rounded-xl border border-border bg-card">
        {recentItems.map((item) => {
          const type = getItemType(item.typeId);
          if (!type) return null;
          return <RecentItemRow key={item.id} item={item} type={type} />;
        })}
      </div>
    </section>
  );
}
