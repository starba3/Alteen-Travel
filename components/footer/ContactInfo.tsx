import { Phone, Mail, MapPin } from "lucide-react";

export const ContactInfo = () => {
  return (
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
  );
};