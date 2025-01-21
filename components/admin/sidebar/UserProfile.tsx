"use client";

import { User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/i18n/hooks";
import { useRouter } from "next/navigation";

export function UserProfile() {
  const { userData, logout } = useAuth();
  const { t } = useTranslations();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleSettings = () => {
    router.push("/admin/#");
  };

  return (
    <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
          {userData?.image ? (
            <img 
              src={userData?.image || 'default-avatar.png'} 
              alt={userData?.name || 'User avatar'}
              className="h-full w-full object-cover rounded-full"
            />
          ) : (
            <User className="h-6 w-6 text-gray-600" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{userData?.name}</h3>
          <p className="text-sm text-muted-foreground">{userData?.email}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button variant="ghost" size="sm" className="flex-1" onClick={handleSettings}>
          <Settings className="h-4 w-4 mr-2" />
          {t("settings")}
        </Button>
        <Button variant="ghost" size="sm" className="flex-1" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          {t("logout")}
        </Button>
      </div>
    </div>
  );
}