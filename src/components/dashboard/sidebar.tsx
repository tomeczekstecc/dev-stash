"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ComponentType, type SVGProps } from "react";

import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  FileText,
  Image,
  Link as LinkIcon,
  Star,
  Settings,
  PanelLeft,
  X,
} from "@/components/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { collections, getTypeCounts, itemTypes, mockUser } from "@/lib/mock-data";

type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>;

const ICON_MAP: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File: FileText,
  Image,
  Link: LinkIcon,
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}

function SidebarContent({
  isCollapsed,
  onToggleCollapse,
  onCloseMobile,
  isMobile = false,
}: {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onCloseMobile?: () => void;
  isMobile?: boolean;
}) {
  const typeCounts = getTypeCounts();
  const favorites = collections.filter((collection) => collection.isFavorite);
  const otherCollections = collections.filter((collection) => !collection.isFavorite);
  const initials = getInitials(mockUser.name);
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex items-center justify-between border-b border-border px-3 py-3">
        <button
          type="button"
          onClick={isMobile ? onCloseMobile : onToggleCollapse}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={isMobile ? "Close sidebar" : "Toggle sidebar"}
        >
          {isMobile ? <X className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
        </button>
        <span
          className={cn(
            "text-sm font-semibold tracking-wide text-foreground transition-opacity",
            !isMobile && isCollapsed && "hidden",
          )}
        >
          Browse
        </span>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        <section className="space-y-2">
          <div
            className={cn(
              "px-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground",
              !isMobile && isCollapsed && "hidden",
            )}
          >
            Item Types
          </div>
          <div className="space-y-1">
            {itemTypes.map((type) => {
              const Icon = ICON_MAP[type.icon] ?? FileText;
              const href = `/items/${type.slug}`;
              const isActive = pathname === href;
              const label = `${type.name}${type.name.endsWith("s") ? "" : "s"}`;

              return (
                <Link
                  key={type.id}
                  href={href}
                  className={cn(
                    "flex items-center rounded-lg px-2 py-2 text-sm text-foreground transition-colors hover:bg-muted",
                    isActive && "bg-muted font-medium text-foreground",
                    !isMobile && isCollapsed ? "justify-center" : "gap-3",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground",
                      isActive && "text-foreground",
                    )}
                  />
                  <span className={cn("truncate", !isMobile && isCollapsed && "hidden")}>
                    {label}
                  </span>
                  <span
                    className={cn(
                      "ml-auto rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground",
                      !isMobile && isCollapsed && "hidden",
                    )}
                  >
                    {typeCounts[type.id] ?? 0}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className={cn("space-y-3", !isMobile && isCollapsed && "hidden")}>
          <div
            className="px-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            Collections
          </div>

          <div className="space-y-1">
            <div
              className="px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
            >
              Favorites
            </div>
            {favorites.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className={cn(
                  "flex items-center rounded-lg px-2 py-2 text-sm text-foreground transition-colors hover:bg-muted",
                  !isMobile && isCollapsed ? "justify-center" : "gap-3",
                )}
              >
                <Star className="h-4 w-4 shrink-0 fill-current text-amber-500" />
                <span className={cn("truncate", !isMobile && isCollapsed && "hidden")}>
                  {collection.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="space-y-1">
            <div
              className="px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
            >
              All Collections
            </div>
            {otherCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className={cn(
                  "flex items-center rounded-lg px-2 py-2 text-sm text-foreground transition-colors hover:bg-muted",
                  !isMobile && isCollapsed ? "justify-center" : "gap-3",
                )}
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-border" />
                <span className={cn("truncate", !isMobile && isCollapsed && "hidden")}>
                  {collection.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </nav>

      <div className="mt-auto border-t border-border p-3">
        <div
          className={cn(
            "flex items-center rounded-xl bg-muted/50 p-2",
            !isMobile && isCollapsed ? "justify-center" : "gap-3",
          )}
        >
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className={cn("min-w-0 flex-1", !isMobile && isCollapsed && "hidden")}>
            <p className="truncate text-sm font-medium text-foreground">{mockUser.name}</p>
            <p className="truncate text-xs text-muted-foreground">{mockUser.email}</p>
          </div>
          <span
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground",
              !isMobile && isCollapsed && "hidden",
            )}
            aria-label="Settings"
            role="img"
          >
            <Settings className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <aside
        className={cn(
          "hidden h-full shrink-0 overflow-hidden border-r border-border bg-card transition-all duration-200 md:flex md:flex-col",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed((value) => !value)}
        />
      </aside>

      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent side="left" className="w-64 p-0" showCloseButton={false}>
          <SidebarContent
            isCollapsed={false}
            isMobile
            onToggleCollapse={() => undefined}
            onCloseMobile={onClose}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
