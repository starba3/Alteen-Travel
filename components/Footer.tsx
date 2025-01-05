import { QuickLinks } from "./footer/QuickLinks";
import { ContactInfo } from "./footer/ContactInfo";
import { SocialLinks } from "./footer/SocialLinks";
import { Newsletter } from "./footer/Newsletter";
import { Copyright } from "./footer/Copyright";

export default function Footer() {
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