import ClientVisaCountriesTable from './ClientVisaCountriesTable';
import { type Country } from '@/lib/countries';
import { headers } from 'next/headers';

async function getVisaCountries() {
  // Get the host from headers
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  
  const response = await fetch(`${protocol}://${host}/api/countries`, {
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