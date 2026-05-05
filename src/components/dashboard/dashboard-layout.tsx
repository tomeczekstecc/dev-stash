"use client";

import { useState } from "react";

import { Sidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/top-bar";
import { type SidebarCollection } from "@/lib/db/collections";
import { type ItemTypeWithCount } from "@/lib/db/items";

interface DashboardLayoutProps {
  children: React.ReactNode;
  itemTypes: ItemTypeWithCount[];
  sidebarCollections: SidebarCollection[];
}

export function DashboardLayout({ children, itemTypes, sidebarCollections }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      <TopBar onOpenSidebar={() => setIsSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          itemTypes={itemTypes}
          collections={sidebarCollections}
        />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
