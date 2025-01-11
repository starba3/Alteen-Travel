"use client";

import { translations, type Language } from "./translations";

export function useTranslations(locale: string = 'en') {
  const t = (path: string) => {
    const keys = path.split('.') as Array<string>;
    let current: any = translations[locale as Language];
    
    for (const key of keys) {
      if (current?.[key] === undefined) return path;
      current = current[key];
    }
    
    return current as string;
  };

  return { t };
} 