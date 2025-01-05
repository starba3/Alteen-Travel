import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const representatives = [
  {
    name: "John Smith",
    role: "Senior Travel Consultant",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    phone: "+1 (555) 123-4567",
    email: "john.smith@travelpro.com",
    location: "New York Office",
  },
  {
    name: "Lisa Wong",
    role: "Luxury Travel Specialist",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    phone: "+1 (555) 234-5678",
    email: "lisa.wong@travelpro.com",
    location: "Los Angeles Office",
  },
];

const SalesRepresentatives = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Connect with Our Sales Reps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {representatives.map((rep) => (
            <div
              key={rep.name}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6"
            >
              <img
                src={rep.photo}
                alt={rep.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold">{rep.name}</h3>
                <p className="text-primary mb-4">{rep.role}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center md:justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{rep.phone}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{rep.email}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{rep.location}</span>
                  </div>
                </div>
                <Button className="mt-4">Get in Touch</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalesRepresentatives;