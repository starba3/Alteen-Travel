"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { cookies } from 'next/headers';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  const handleLanguageChange = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    document.cookie = `locale=${newLocale};path=/`;
    router.push(pathname.replace(`/${locale}`, `/${newLocale}`));
  };

  return (
    <Button
      onClick={handleLanguageChange}
      variant="ghost"
    >
      {locale === "en" ? "العربية" : "English"}
    </Button>
  );
} 
