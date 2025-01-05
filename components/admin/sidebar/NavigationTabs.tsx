"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Globe, BookOpen, Plane, FileText, Users } from "lucide-react";

const navigationItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: Globe,
  },
  {
    label: "Destinations",
    href: "/admin/destinations",
    icon: Globe,
  },
  {
    label: "Visa Countries",
    href: "/admin/visa-countries",
    icon: BookOpen,
  },
  {
    label: "Trips",
    href: "/admin/trips",
    icon: Plane,
  },
  {
    label: "Visa Orders",
    href: "/admin/visa-orders",
    icon: FileText,
  },
  {
    label: "Sales Representatives",
    href: "/admin/sales-representatives",
    icon: Users,
  },
];

export function NavigationTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-4">
      <ul className="space-y-2">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors",
                pathname === item.href && "bg-primary/10 text-primary font-medium"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}