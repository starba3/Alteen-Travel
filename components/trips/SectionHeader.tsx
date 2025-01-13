import { getTranslations } from "@/lib/i18n/server";
import { cookies } from "next/headers";

export async function SectionHeader() {
  const locale = cookies().get("locale")?.value || "en"; // Default to "en" if no cookie is set
  const { t } = await getTranslations(locale);

  return (
    <div className="flex justify-between items-center mb-12">
      <h2 className="text-4xl font-bold">{t("ourFeaturedTrips")}</h2>
    </div>
  );
}