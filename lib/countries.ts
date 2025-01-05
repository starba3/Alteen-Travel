export interface Country {
  name: string;
  flag: string;
  processingTime: string;
  price: number;
  code: string;
}

export const ALL_COUNTRIES: Country[] = [
  {
    name: "United States",
    flag: "🇺🇸",
    processingTime: "3-5 business days",
    price: 160,
    code: "US"
  },
  {
    name: "Schengen Area",
    flag: "🇪🇺",
    processingTime: "10-15 business days",
    price: 80,
    code: "EU"
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    processingTime: "5-7 business days",
    price: 120,
    code: "GB"
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    processingTime: "5-10 business days",
    price: 140,
    code: "AU"
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    processingTime: "7-10 business days",
    price: 100,
    code: "CA"
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    processingTime: "5-7 business days",
    price: 40,
    code: "JP"
  }
];