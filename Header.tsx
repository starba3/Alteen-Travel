import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./header/MobileMenu";

const navItems = [
  "Home",
  "Destinations",
  "Offers",
  "Trips",
  "Visa Services",
  "About Us",
  "Contact",
];

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Plane className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold">TravelPro</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <Button size="lg" className="hidden md:block">
            Book Now
          </Button>

          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
};

export default Header;