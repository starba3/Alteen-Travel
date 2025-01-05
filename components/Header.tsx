"use client";

import { useState } from "react";
import { Logo } from "./header/Logo";
import { Navigation } from "./header/Navigation";
import { MobileMenu } from "./header/MobileMenu";
import { UserProfile } from "./header/UserProfile";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "./auth/LoginDialog";
import { useAuth } from "./auth/AuthProvider";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleSignIn = () => setShowLoginDialog(true);
  const handleLoginSuccess = () => setShowLoginDialog(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <Navigation />
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="hidden md:block">
                <UserProfile onSignOut={logout} />
              </div>
            ) : (
              <Button
                onClick={handleSignIn}
                className="hidden md:inline-flex px-6"
              >
                Sign In
              </Button>
            )}
            
            <MobileMenu
              isLoggedIn={isAuthenticated}
              onSignIn={handleSignIn}
              onSignOut={logout}
            />
          </div>
        </div>
      </div>

      <LoginDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onSuccess={handleLoginSuccess}
      />
    </header>
  );
}