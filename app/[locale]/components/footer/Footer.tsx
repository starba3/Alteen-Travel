import { QuickLinks } from "./QuickLinks";
import { ContactInfo } from "./ContactInfo";
import { SocialLinks } from "./SocialLinks";
import { Newsletter } from "./Newsletter";
import { Copyright } from "./Copyright";
import { cookies } from "next/headers";
export default function Footer() {
  const locale = cookies().get("locale")?.value || "en";

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <QuickLinks />
          <ContactInfo />
          <SocialLinks />
          <Newsletter />
        </div>
        <Copyright />
      </div>
    </footer>
  );
}