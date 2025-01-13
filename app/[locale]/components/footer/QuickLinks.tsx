import { quickLinks } from "@/lib/footer";
import { getTranslations } from "@/lib/i18n/server";
import { cookies } from "next/headers";

export async function QuickLinks() {
  const locale = cookies().get("locale")?.value || "en";
  const { t } = await getTranslations(locale);

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <h3 className="text-xl font-semibold mb-4">{t("footer.quickLinks.title")}</h3>
      <ul className="space-y-2">
        {quickLinks.map((link) => (
          <li key={link.key}>
            <a href="#" className="hover:text-primary transition-colors">
              {t(`footer.quickLinks.${link.name}`)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}