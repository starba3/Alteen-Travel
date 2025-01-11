'use client';

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthProvider";
import { useParams } from "next/navigation";
import { useTranslations } from "@/lib/i18n/hooks";

interface NavigationProps {
  variant?: "mobile" | "desktop";
}

const getNavItems = (isAuthenticated: boolean, isAdmin: boolean) => {
  
  const baseItems = [
    {
      title: "home",
      link: "/"
    },
    {
      title: "destinations", 
      link: "/"
    },
    {
      title: "offers",
      link: "/"
    },
    {
      title: "trips",
      link: "/"
    },
    {
      title: "visaServices",
      link: "/visa-services"
    },
    {
      title: "contact",
      link: "#contact"
    }
  ];

  if (isAuthenticated && isAdmin) {
    baseItems.push({
      title: "dashboard",
      link: "/admin"
    });
  }

  return baseItems;
};

export function Navigation({ variant = "desktop" }: NavigationProps) {
  const params = useParams();
  const locale = params.locale as string;
  const { t } = useTranslations(params.locale as string);
  
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
          {t(`header.${item.title}`)}
        </Link>
      ))}
    </nav>
  );
}