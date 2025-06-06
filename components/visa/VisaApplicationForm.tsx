"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TravelerFields } from "./TravelerFields";
import { PaymentModal } from "../payment/PaymentModal";
import { getVisaPrice } from "@/lib/auth";
import { travelerSchema, type TravelerFormData, defaultTraveler } from "@/lib/validations/traveler";
import type { Country } from "@/lib/countries";
import { PaymentService } from "@/lib/payment/paymentService";
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from "@/lib/i18n/hooks";
import { CountrySelect } from "@/components/visa/form/inputs/CountrySelect";
import { VisaApplicationResponse } from "@/lib/types/VisaApplication";
import { uploadTravelerImages } from "@/lib/utils/image-upload";
import { useToast } from "@/hooks/use-toast";



interface VisaApplicationFormProps {
  selectedCountry: Country;
  preview?: boolean;
}

export function VisaApplicationForm({ selectedCountry: initialCountry, preview }: VisaApplicationFormProps) {
  const params = useParams();
  const router = useRouter()
  const locale = params.locale as string;
  const { t } = useTranslations(params.locale as string);
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState<TravelerFormData | null>(null);
  const { toast } = useToast();
  
  const form = useForm<TravelerFormData>({
    resolver: zodResolver(travelerSchema),
    defaultValues: {
      email: '',
      phoneNumber: '',
      country: initialCountry,
      travelers: [defaultTraveler] // Cast to any to allow initial empty gender
    },
    mode: "onChange"
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "travelers"
  });

  const selectedCountry = form.watch("country");
  const totalPrice = selectedCountry ? selectedCountry.price * fields.length - getVisaPrice() * fields.length : 0;

  const onSubmit = async (data: TravelerFormData) => {
    setFormData(data);
    // setShowPayment(true);

    // 1. Upload Images (Optional step, as shown in your code)
    const updatedTravelers = await uploadTravelerImages(data.travelers, 'visa');
    const updatedFormData = { ...data, travelers: updatedTravelers };
    console.log('updatedFormData for visa:', updatedFormData);

    // 2. Create Visa Application
    const createVisaResponse = await handleVisaApplication(updatedFormData);

    // Check if Visa creation failed
    if (!createVisaResponse.success || !createVisaResponse.visaId) {
        toast({
            title: "Transcation Failed",
            description: createVisaResponse.error || "Could not create visa application.",
            variant: "destructive",
        });
        return; // Exit the function if visa creation fails
    }

    // Visa creation successful, proceed to payment
    console.log('Visa application successful:', createVisaResponse.visaId);

    // 3. Initiate Payment
    // Ensure 'totalPrice' is correctly calculated and available here
    // Pass 'updatedFormData' if the payment API requires traveler details,
    // otherwise, adjust the signature/call of makePaymentAndRedirectPage
    const createPaymentResponse = await PaymentService.getInstance().makePaymentRequest(createVisaResponse.visaId, totalPrice);

    // console.log('Response: ', createPaymentResponse)

    //   const { result } = createPaymentResponse; // First, destructure the 'result' object


      const { status, redirectUrl, error } = createPaymentResponse; // Destructure properties
      if (status === 'success' && redirectUrl) {
        // console.log('Success: ', response);
          // Payment initiation successful, show success and redirect
          toast({
              title: "Success",
              description: `Visa application created (ID: ${createVisaResponse.visaId}). Redirecting to payment...`,
          });

          // Perform the redirection to the external payment page
          router.push(redirectUrl);

          // Note: Code execution effectively stops here for the user as the browser navigates away.
          // The setIsLoading(false) in the finally block might not be visually relevant if redirection is immediate.

      } else {
          toast({
              title: "Payment Initiation Failed",
              description: error || "Could not initiate the payment process.",
              variant: "destructive",
          });
      }
    
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    form.reset(); // Reset form after successful payment
  };

  async function handleVisaApplication(formData: TravelerFormData) {
      const response = await fetch('/api/create-visa-Test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });
      
      const result: VisaApplicationResponse = await response.json();
      
      return result;
    }

  return (
    <div className={`bg-white p-4 sm:p-8 rounded-lg shadow-lg `} dir={locale === 'ar' ? "rtl" : "ltr"}>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">
        {t('form.title')}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir={locale === 'ar' ? "rtl" : "ltr"}>
          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('form.contact.title')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t('form.contact.email')}
                </label>
                <input
                  {...form.register("email")}
                  type="email"
                  id="email"
                  className={`w-full p-2 border rounded-md ${
                    form.formState.errors.email ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder={t('form.contact.emailPlaceholder')}
                />
                {form.formState.errors.email && (
                  <p className="text-sm font-medium text-red-500">
                    {t('form.contact.emailError')}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-medium">
                  {t('form.contact.phone')}
                </label>
                <input
                  {...form.register("phoneNumber")}
                  type="tel"
                  maxLength={11}
                  id="phoneNumber"
                  className={`w-full p-2 border rounded-md ${
                    form.formState.errors.phoneNumber ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder={t('form.contact.phonePlaceholder')}
                />
                {form.formState.errors.phoneNumber && (
                  <p className="text-sm font-medium text-red-500">
                    {t('form.contact.phoneError')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('form.contact.country')}
                </label>
                <CountrySelect
                  value={selectedCountry as Country} // Cast to Country type expected by component
                  onChange={(country) => form.setValue("country", country)}
                  placeholder={t('form.contact.countryPlaceholder')}
                  className="w-full"
                />
                {form.formState.errors.country && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Travelers Section */}
          <div className="space-y-4" dir={locale === "ar" ? "rtl" : "ltr"}>
            <h3 className="text-lg font-medium">
              {locale === 'ar' ? 'معلومات المسافرين' : 'Travelers Information'}
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {fields.map((field: any, index: number) => (
                <TravelerFields
                  key={field.id}
                  index={index}
                  showRemove={fields.length > 1}
                  onRemove={() => remove(index)}
                  form={form}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => append(defaultTraveler)} // Cast to any for append
              className="w-full sm:w-auto"
            >
              {t('form.buttons.addTraveler')}
            </Button>

            <div className="text-left sm:text-right w-full sm:w-auto">
              <p className="text-sm text-gray-600">{t('form.buttons.totalDiscount')}</p>
              <p className="text-xl sm:text-2xl font-bold">{getVisaPrice() * fields.length} {t('currency')}</p>
            </div>

            <div className="text-left sm:text-right w-full sm:w-auto">
              <p className="text-sm text-gray-600">{t('form.buttons.totalPrice')}</p>
              <p className="text-xl sm:text-2xl font-bold">{totalPrice} {t('currency')}</p>
            </div>
          </div>

          <Button type="submit" className="w-full mt-6">
            {t('form.buttons.continue')}
          </Button>
        </form>
      </Form>

      <PaymentModal 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
        totalAmount={totalPrice}
        formData={formData!}
      />
    </div>
  );
}