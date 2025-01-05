'use client';

import Link from "next/link";
import { cn } from "@/lib/utils";
import { getStoredAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import type { User } from "@/lib/types/user";

interface NavigationProps {
  variant?: "mobile" | "desktop";
}

const getNavItems = (isAdmin: boolean) => {
  const baseItems = [
    {
      title: "Home",
      link: "/"
    },
    {
      title: "Destinations", 
      link: "/"
    },
    {
      title: "Offers",
      link: "/"
    },
    {
      title: "Trips",
      link: "/"
    },
    {
      title: "Visa Services",
      link: "/visa-services"
    },
    {
      title: "Contact",
      link: "#contact"
    }
  ];

  if (isAdmin) {
    baseItems.push({
      title: "Dashboard",
      link: "/admin/dashboard"
    });
  }

  return baseItems;
};

export function Navigation({ variant = "desktop" }: NavigationProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { user } = getStoredAuth();
    setUser(user);
  }, []);

  const isAdmin = user?.role === 'admin';
  const navItems = getNavItems(isAdmin);

  return (
    <nav className={cn(
      variant === "desktop" && "hidden md:flex space-x-8",
      variant === "mobile" && "flex flex-col space-y-4"
    )}>
      {navItems.map((item) => (
        <Link
          key={item.title}
          href={item.link}
          className={cn(
            "text-primary hover:text-primary-light transition-colors",
            variant === "mobile" && "text-lg"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}