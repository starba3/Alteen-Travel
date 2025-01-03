import { Button } from "@/components/ui/button";
import { NewsletterForm } from "./footer/NewsletterForm";
import { SocialLinks } from "./footer/SocialLinks";
import { ContactInfo } from "./footer/ContactInfo";
import { QuickLinks } from "./footer/QuickLinks";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <QuickLinks />
          <ContactInfo />
          <SocialLinks />
          <NewsletterForm />
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TravelPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;