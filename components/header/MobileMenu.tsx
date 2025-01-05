"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetHeader,
  SheetTitle 
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Navigation } from "./Navigation";
import { UserProfile } from "./UserProfile";

interface MobileMenuProps {
  isLoggedIn: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
}

export function MobileMenu({ isLoggedIn, onSignIn, onSignOut }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <nav className="flex flex-col space-y-4 py-4">
            {isLoggedIn ? (
              <UserProfile variant="mobile" onSignOut={onSignOut} />
            ) : (
              <Button onClick={onSignIn} className="w-full">
                Sign In
              </Button>
            )}
            <Navigation variant="mobile" />
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}