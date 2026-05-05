import { type ComponentType, type SVGProps } from "react";

import { FolderOpen, Layers, Star } from "@/components/icons";
import { collections, items } from "@/lib/mock-data";

type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>;

interface StatCardProps {
  label: string;
  value: number;
  Icon: LucideIcon;
}

function StatCard({ label, value, Icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

export function StatsCards() {
  const totalItems = items.length;
  const totalCollections = collections.length;
  const favoriteItems = items.filter((item) => item.isFavorite).length;
  const favoriteCollections = collections.filter((col) => col.isFavorite).length;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatCard label="Items" value={totalItems} Icon={Layers} />
      <StatCard label="Collections" value={totalCollections} Icon={FolderOpen} />
      <StatCard label="Favorite Items" value={favoriteItems} Icon={Star} />
      <StatCard label="Favorite Collections" value={favoriteCollections} Icon={Star} />
    </div>
  );
}
