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
import {
  type Collection,
  type ItemType,
  collections,
  getItemsByCollection,
  itemTypes,
} from "@/lib/mock-data";

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

function getUniqueTypesForCollection(collectionId: string): ItemType[] {
  const collectionItems = getItemsByCollection(collectionId);
  const typeIds = [...new Set(collectionItems.map((item) => item.typeId))];
  return typeIds
    .map((id) => itemTypes.find((t) => t.id === id))
    .filter((t): t is ItemType => t !== undefined);
}

interface CollectionCardProps {
  collection: Collection;
  itemCount: number;
  typeIcons: ItemType[];
}

function CollectionCard({ collection, itemCount, typeIcons }: CollectionCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/50">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-medium text-foreground">{collection.name}</h3>
            {collection.isFavorite && (
              <Star className="h-3.5 w-3.5 shrink-0 fill-current text-amber-500" />
            )}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{itemCount} items</p>
        </div>
      </div>
      {collection.description && (
        <p className="line-clamp-2 text-xs text-muted-foreground">{collection.description}</p>
      )}
      {typeIcons.length > 0 && (
        <div className="flex items-center gap-2">
          {typeIcons.map((type) => {
            const Icon = ICON_MAP[type.icon] ?? FileText;
            return (
              <Icon
                key={type.id}
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: type.color }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export function CollectionsGrid() {
  const displayCollections = collections.slice(0, 6);

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayCollections.map((collection) => {
          const itemCount = getItemsByCollection(collection.id).length;
          const typeIcons = getUniqueTypesForCollection(collection.id);
          return (
            <CollectionCard
              key={collection.id}
              collection={collection}
              itemCount={itemCount}
              typeIcons={typeIcons}
            />
          );
        })}
      </div>
    </section>
  );
}
