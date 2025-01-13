import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTranslations } from "@/lib/i18n/server";
import { cookies } from "next/headers";

export async function Newsletter() {
  const locale = cookies().get("locale")?.value || "en";
  const { t } = await getTranslations(locale);

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <h3 className="text-xl font-semibold mb-4">{t("footer.newsletter")}</h3>
      <p className="mb-4">{t("footer.subscribeForLatestDealsAndUpdates")}</p>
      <div className="space-y-2">
        <Input
          placeholder={t("footer.enterYourEmail")}
          className="bg-gray-800 border-gray-700"
        />
        <Button className="w-full">{t("footer.subscribe")}</Button>
      </div>
    </div>
  );
}