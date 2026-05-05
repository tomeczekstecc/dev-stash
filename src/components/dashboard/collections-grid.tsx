import { type ComponentType, type SVGProps } from "react";

import {
  ChevronRight,
  Code,
  FileText,
  Image,
  Link,
  Sparkles,
  Star,
  StickyNote,
  Terminal,
} from "@/components/icons";
import { type CollectionSummary } from "@/lib/db/collections";

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

interface CollectionCardProps {
  collection: CollectionSummary;
}

function CollectionCard({ collection }: CollectionCardProps) {
  const { name, description, isFavorite, itemCount, types, dominantTypeColor } = collection;

  return (
    <div
      className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/50"
      style={dominantTypeColor ? { borderColor: dominantTypeColor } : undefined}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-medium text-foreground">{name}</h3>
            {isFavorite && (
              <Star className="h-3.5 w-3.5 shrink-0 fill-current text-amber-500" />
            )}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{itemCount} items</p>
        </div>
      </div>
      {description && (
        <p className="line-clamp-2 text-xs text-muted-foreground">{description}</p>
      )}
      {types.length > 0 && (
        <div className="flex items-center gap-2">
          {types.map((type) => {
            const Icon = ICON_MAP[type.icon ?? ""] ?? FileText;
            return (
              <Icon
                key={type.id}
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: type.color ?? undefined }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

interface CollectionsGridProps {
  collections: CollectionSummary[];
}

export function CollectionsGrid({ collections }: CollectionsGridProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Collections</h2>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
      {collections.length === 0 ? (
        <p className="text-sm text-muted-foreground">No collections yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </section>
  );
}
