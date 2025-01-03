import { Shield, Clock, BadgeDollarSign, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "24/7 Customer Support",
    description: "Round-the-clock assistance for all your travel needs.",
  },
  {
    icon: Shield,
    title: "Easy Booking Process",
    description: "Simple and secure booking system with instant confirmation.",
  },
  {
    icon: BadgeDollarSign,
    title: "Best Price Guarantee",
    description: "We match or beat any comparable travel package price.",
  },
  {
    icon: HeartHandshake,
    title: "Expert Travel Advice",
    description: "Personalized recommendations from experienced travel experts.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Travelers Love TravelPro
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;