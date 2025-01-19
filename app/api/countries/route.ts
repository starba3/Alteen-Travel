import { getAllCountries } from '@/lib/countries';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const countries = await getAllCountries();
    // Add serviceAvailable field to each country
    const countriesWithService = countries.map(country => ({
      ...country,
      serviceAvailable: true // or set based on your business logic
    }));
    return NextResponse.json(countriesWithService);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 500 });
  }
} 