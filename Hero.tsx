import { Button } from "@/components/ui/button";
import { SearchForm } from "@/components/hero/SearchForm";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-16">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1682687220742-aba13b6e50ba')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Discover Your Next Adventure with TravelPro
        </h1>
        <p className="text-xl md:text-2xl mb-12">
          Explore stunning destinations, unbeatable offers, and seamless booking.
        </p>

        <SearchForm />

        <Button
          size="lg"
          variant="outline"
          className="mt-8 text-white border-white hover:bg-white hover:text-black"
        >
          Explore Destinations
        </Button>
      </div>
    </div>
  );
};

export default Hero;