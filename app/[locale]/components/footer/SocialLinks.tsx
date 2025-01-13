import { Facebook, Instagram, Twitter } from "lucide-react";
import { getTranslations } from "@/lib/i18n/server";
import { cookies } from "next/headers";

export async function SocialLinks() {
  const locale = cookies().get("locale")?.value || "en";
  const { t } = await getTranslations(locale);

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <h3 className="text-xl font-semibold mb-4">{t("footer.followUs")}</h3>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-primary transition-colors">
          <Facebook className="h-6 w-6" />
        </a>
        <a href="#" className="hover:text-primary transition-colors">
          <Instagram className="h-6 w-6" />
        </a>
        <a href="#" className="hover:text-primary transition-colors">
          <Twitter className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}