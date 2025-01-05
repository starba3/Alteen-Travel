"use client";

export interface CountryCodeProps {
  code: string;
  flag: string;
}

export default function CountryCode({ code, flag }: CountryCodeProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-4xl" suppressHydrationWarning>
        {flag}
      </div>
      <span className="text-lg font-semibold text-gray-600">{code}</span>
    </div>
  );
}