import { CollectionsGrid } from "@/components/dashboard/collections-grid";
import { PinnedItems } from "@/components/dashboard/pinned-items";
import { RecentItems } from "@/components/dashboard/recent-items";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { getRecentCollections } from "@/lib/db/collections";
import { getPinnedItems, getRecentItems } from "@/lib/db/items";

export async function DashboardMain() {
  const [collections, pinnedItems, recentItems] = await Promise.all([
    getRecentCollections(),
    getPinnedItems(),
    getRecentItems(),
  ]);

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your developer knowledge hub</p>
        </header>
        <StatsCards />
        <CollectionsGrid collections={collections} />
        <PinnedItems items={pinnedItems} />
        <RecentItems items={recentItems} />
      </div>
    </div>
  );
}
