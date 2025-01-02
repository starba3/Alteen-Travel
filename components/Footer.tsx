"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Destinations", "Offers", "Visa Services", "About Us", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@travelpro.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 Travel Street, NY 10001</span>
              </div>
            </div>
          </div>

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

          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe for the latest deals and updates.</p>
            <div className="space-y-2">
              <Input
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TravelPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;