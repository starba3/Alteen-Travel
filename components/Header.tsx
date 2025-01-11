import { Logo } from "./header/Logo";
import { Navigation } from "./header/Navigation";
import { HeaderActions } from "./header/HeaderActions";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <Navigation />
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}