import { HeroBackground } from "./hero/HeroBackground";
import { HeroContent } from "./hero/HeroContent";

export default function Hero() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center">
      <HeroBackground />
      <HeroContent />
    </div>
  );
}