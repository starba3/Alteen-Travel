"use client";

import { useState } from "react";
import { SidebarHeader } from "./SidebarHeader";
import { UserProfile } from "./UserProfile";
import { NavigationTabs } from "./NavigationTabs";
import { cn } from "@/lib/utils";
import { MenuIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsCollapsed(false)}
        />
      )}

      {/* Toggle button for mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <X className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </Button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r shadow-lg transition-transform duration-200 md:translate-x-0 md:relative",
        isCollapsed ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          <SidebarHeader />
          <UserProfile />
          <NavigationTabs />
        </div>
      </aside>
    </>
  );
}