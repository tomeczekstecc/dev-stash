import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardMain } from "@/components/dashboard/main-content";
import { getSidebarCollections } from "@/lib/db/collections";
import { getSystemItemTypes } from "@/lib/db/items";

export default async function DashboardPage() {
  const [itemTypes, sidebarCollections] = await Promise.all([
    getSystemItemTypes(),
    getSidebarCollections(),
  ]);

  return (
    <DashboardLayout itemTypes={itemTypes} sidebarCollections={sidebarCollections}>
      <DashboardMain />
    </DashboardLayout>
  );
}
