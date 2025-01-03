import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  photo: string;
  rating: number;
  text: string;
}

export const ReviewCard = ({ name, photo, rating, text }: ReviewCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={photo}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <div className="flex">
            {Array.from({ length: rating }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 text-yellow-400 fill-current"
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600">{text}</p>
    </div>
  );
};