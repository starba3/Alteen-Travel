import { Phone, Mail, MapPin } from "lucide-react";
import { contactInfo } from "@/lib/footer";

export function ContactInfo() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
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