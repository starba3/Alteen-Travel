
import { getTranslations } from "@/lib/i18n/server";
import { cookies } from "next/headers";

export async function VisaServicesTitle() {
  const locale = cookies().get("locale")?.value || "en";
  const { t } = await getTranslations(locale);

  return (
    <h2 className="text-4xl font-bold" dir={locale === "ar" ? "rtl" : "ltr"}>
      {t('visaServices.title')}
    </h2>
  );
} 