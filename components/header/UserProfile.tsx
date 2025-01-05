"use client";

import { ChevronDown, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthProvider";

interface UserProfileProps {
  variant?: "desktop" | "mobile";
  onSignOut: () => void;
}

export function UserProfile({ variant = "desktop", onSignOut }: UserProfileProps) {
  const { user } = useAuth();
  
  const menuItems = [
    { label: "Profile", href: "#" },
    { label: "My Bookings", href: "#" },
  ];

  const content = (
    <div className="space-y-2">
      {menuItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="flex px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
        >
          {item.label}
        </a>
      ))}
      <button
        onClick={onSignOut}
        className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-left"
      >
        Sign Out
      </button>
    </div>
  );

  if (variant === "mobile") {
    return (
      <div className="px-4 py-3 border-b">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="h-6 w-6 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
        {content}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 hover:bg-gray-100"
        >
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium">{user?.name}</span>
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[200px] p-2"
        sideOffset={8}
      >
        {content}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}