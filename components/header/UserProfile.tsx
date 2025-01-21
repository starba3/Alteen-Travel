"use client";

import { ChevronDown, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { useTranslations } from "@/lib/i18n/hooks";
import { useParams } from "next/navigation";
import Cookies from 'js-cookie';

interface UserProfileProps {
  variant?: "desktop" | "mobile";
  onSignOut: () => void;
}

export function UserProfile({ variant = "desktop", onSignOut }: UserProfileProps) {
  const { userData, isAuthenticated, logout } = useAuth();
  const params = useParams();
  const locale = params.locale as string;
  const { t } = useTranslations(params.locale as string);
  
  
  if (!isAuthenticated) return null;

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
        onClick={logout}
        className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-left"
      >
        {t('header.signOut')}
      </button>
    </div>
  );

  if (variant === "mobile") {
    return (
      <div className="px-4 py-3 border-b">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img 
              src={userData?.image || '/default-avatar.png'} 
              alt={userData?.name || 'User avatar'}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="font-medium">{userData?.name}</p>
            <p className="text-sm text-gray-500">{userData?.email}</p>
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
            <span className="mr-2 text-sm font-medium">{userData?.name}</span>
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <img 
                src={userData?.image || '/default-avatar.png'} 
                alt={userData?.name || 'User avatar'}
                className="h-full w-full object-cover"
              />
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