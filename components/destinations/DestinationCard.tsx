import { Button } from "@/components/ui/button";

interface DestinationCardProps {
  name: string;
  image: string;
  description: string;
}

export function DestinationCard({ name, image, description }: DestinationCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button className="w-full">View Trips</Button>
      </div>
    </div>
  );
}