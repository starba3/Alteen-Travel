import { Phone, Mail, MapPin } from "lucide-react";
import { contactInfo } from "@/lib/footer";
import { getTranslations } from "@/lib/i18n/server";
import { cookies } from "next/headers";

export async function ContactInfo() {
  const locale = cookies().get("locale")?.value || "en";
  const { t } = await getTranslations(locale);

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <h3 className="text-xl font-semibold mb-4">{t("footer.contactInfo")}</h3>
      <div className="space-y-4">
        <div className="flex items-center">
          <Phone className="h-5 w-5 mr-2" />
          <span>{contactInfo.phone}</span>
        </div>
        <div className="flex items-center">
          <Mail className="h-5 w-5 mr-2" />
          <span>{contactInfo.email}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          <span>{contactInfo.address}</span>
        </div>
      </div>
    </div>
  );
}