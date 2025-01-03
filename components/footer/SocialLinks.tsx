import { Facebook, Instagram, Twitter } from "lucide-react";

export const SocialLinks = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
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
};