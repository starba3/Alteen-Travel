import { Button } from "@/components/ui/button";

interface Country {
  name: string;
  flag: string;
  processingTime: string;
}

interface CountryCardProps {
  country: Country;
}

export const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{country.flag}</div>
      <h3 className="text-xl font-semibold mb-2">{country.name}</h3>
      <p className="text-gray-600 mb-4">
        Processing time: {country.processingTime}
      </p>
      <Button variant="outline" className="w-full">
        Learn More
      </Button>
    </div>
  );
};