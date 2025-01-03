import { SalesRepCard } from "./sales/SalesRepCard";

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
            <SalesRepCard key={rep.name} {...rep} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalesRepresentatives;