"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function LoginDialog({ isOpen, onClose, onSuccess }: LoginDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
        </DialogHeader>
        <LoginForm onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}