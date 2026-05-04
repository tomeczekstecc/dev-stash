import { Search, Plus, FolderPlus, Menu } from "@/components/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TopBar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <header className="flex items-center gap-4 border-b border-border bg-background px-6 py-3">
      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
            DS
          </AvatarFallback>
        </Avatar>
        <span className="text-lg font-semibold tracking-tight">DevStash</span>
      </div>
      <div className="flex flex-1 justify-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search items..."
            readOnly
          />
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button variant="outline" size="sm">
          <FolderPlus className="mr-2 h-4 w-4" />
          New Collection
        </Button>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Item
        </Button>
      </div>
    </header>
  );
}
