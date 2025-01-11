"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { useParams } from 'next/navigation';
import { useTranslations } from "@/lib/i18n/hooks";

interface PaymentSuccessProps {
  onClose: () => void;
}

export function PaymentSuccess({ onClose }: PaymentSuccessProps) {
  const params = useParams();
  const locale = params.locale as string;
  const { t } = useTranslations(params.locale as string);

  return (
    <div className="p-6 text-center" dir={locale === "ar" ? "rtl" : "ltr"}>
      <DialogTitle className="mb-4">{t('payment.success.title')}</DialogTitle>
      <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
      <p className="text-muted-foreground mb-6">
        {t('payment.success.description')}
      </p>
      <Button onClick={onClose}>{t('payment.success.close')}</Button>
    </div>
  );
}