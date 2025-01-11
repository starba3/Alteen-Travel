"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "../auth/LoginDialog";
import { useAuth } from "../auth/AuthProvider";
import { UserProfile } from "./UserProfile";
import { MobileMenu } from "./MobileMenu";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useTranslations } from "@/lib/i18n/hooks";
import { useParams } from "next/navigation";

export function HeaderActions() {
  const params = useParams();
  const locale = params.locale as string;
  const { t } = useTranslations(params.locale as string);
  const { isAuthenticated, logout } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleSignIn = () => setShowLoginDialog(true);
  const handleLoginSuccess = () => setShowLoginDialog(false);

  return (
    <>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        {isAuthenticated ? (
          <div className="hidden md:block">
            <UserProfile onSignOut={logout} />
          </div>
        ) : (
          <Button
            onClick={handleSignIn}
            className="hidden md:inline-flex px-6"
          >
            {t('header.signin')}
          </Button>
        )}
        
        <MobileMenu
          isLoggedIn={isAuthenticated}
          onSignIn={handleSignIn}
          onSignOut={logout}
        />
      </div>

      <LoginDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
} 