import { User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UserProfile() {
  return (
    <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
          <User className="h-6 w-6 text-gray-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">Admin Name</h3>
          <p className="text-sm text-muted-foreground">Administrator</p>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button variant="ghost" size="sm" className="flex-1">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        <Button variant="ghost" size="sm" className="flex-1">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}