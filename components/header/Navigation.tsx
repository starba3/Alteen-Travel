'use client';

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthProvider";

interface NavigationProps {
  variant?: "mobile" | "desktop";
}

const getNavItems = (isAuthenticated: boolean, isAdmin: boolean) => {
  
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

  if (isAuthenticated && isAdmin) {
    baseItems.push({
      title: "Dashboard",
      link: "/admin"
    });
  }

  return baseItems;
};

export function Navigation({ variant = "desktop" }: NavigationProps) {
  const { isAuthenticated, isAdmin } = useAuth();
  const navItems = getNavItems(isAuthenticated, isAdmin);

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