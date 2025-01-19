import ClientVisaCountriesTable from './ClientVisaCountriesTable';
import { type Country } from '@/lib/countries';

async function getVisaCountries() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/countries`, {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }

  return response.json();
}

export default async function VisaCountriesPage() {
  const countries = await getVisaCountries();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Visa Countries</h1>
      <ClientVisaCountriesTable initialCountries={countries} />
    </div>
  );
}