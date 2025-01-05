"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User, Hash, Calendar, MapPin } from "lucide-react";
import { NationalitySelect } from "../inputs/NationalitySelect";
import { DatePicker } from "../inputs/DatePicker";
import type { VisaApplicationData } from "@/lib/types/visa";

interface PersonalDetailsProps {
  form: UseFormReturn<VisaApplicationData>;
}

export function PersonalDetails({ form }: PersonalDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    {...field} 
                    placeholder="GIVEN NAME"
                    className="pl-10 h-12 rounded-lg border-gray-200"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    {...field} 
                    placeholder="FATHER NAME"
                    className="pl-10 h-12 rounded-lg border-gray-200"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    {...field} 
                    placeholder="SURNAME"
                    className="pl-10 h-12 rounded-lg border-gray-200"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passportNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    {...field} 
                    placeholder="PASSPORT NUMBER"
                    className="pl-10 h-12 rounded-lg border-gray-200"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <NationalitySelect 
                    {...field}
                    className="pl-10 h-12 rounded-lg border-gray-200"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <DatePicker 
                    {...field}
                    className="pl-10 h-12 rounded-lg border-gray-200"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}