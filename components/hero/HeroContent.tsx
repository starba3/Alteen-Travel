import { HeroSearch } from "./HeroSearch";

export function HeroContent() {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
        Choose a Country For Your<br />Next Adventure?
      </h1>
      <p className="text-xl md:text-2xl mb-12 text-white/90">
        From local escapes to far-flung adventures
      </p>
      <HeroSearch />
    </div>
  );
}