import { TopBar } from "@/components/dashboard/top-bar";

export default function DashboardPage() {
  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-border p-4">
          <h2 className="font-semibold text-foreground">Sidebar</h2>
        </aside>
        <main className="flex-1 p-4">
          <h2 className="font-semibold text-foreground">Main</h2>
        </main>
      </div>
    </div>
  );
}
