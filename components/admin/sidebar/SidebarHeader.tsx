import { Plane } from "lucide-react";

export function SidebarHeader() {
  return (
    <div className="p-6 border-b">
      <div className="flex items-center justify-center gap-2">
        <Plane className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">TravelPro</span>
      </div>
    </div>
  );
}