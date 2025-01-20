import { Suspense } from 'react';
import { getVisaOrders } from '@/lib/firebase-admin/visa-orders';
import { ClientVisaOrdersTable } from './ClientVisaOrdersTable';
import { VisaOrdersFilters, VisaOrderStatus } from '@/lib/types/visaOrders';
import { Metadata } from 'next';
import { getTranslations } from "@/lib/i18n/server";
import { cookies } from "next/headers";
import { VisaApplication } from '@/lib/types/VisaApplication';

export const metadata: Metadata = {
  title: 'Visa Orders Management',
  description: 'Manage visa applications and orders',
};

interface PageProps {
  searchParams: {
    page?: string;
    search?: string;
    status?: string;
  };
}

export default async function VisaOrdersPage({ searchParams }: PageProps) {

  const locale = cookies().get("locale")?.value || "en";
  const { t } = await getTranslations(locale);

  const page = Number(searchParams.page) || 1;
  const filters: VisaOrdersFilters = {
    search: searchParams.search,
    status: searchParams.status as VisaOrderStatus,
  };

  const result = await getVisaOrders(page, 10, filters);
  // console.log('Page component data:', result);
  // console.log('Page number:', page);
  // console.log('Filters:', filters);
  // dir={locale === 'ar' ? 'rtl' : 'ltr'}
  return (
    <div className="h-full flex-1  flex-col space-y-8 p-8 md:flex " >
      <div className="flex items-center justify-between space-y-2" >
        <div>
          <h2 className="text-2xl font-bold tracking-tight" >{t('visaOrders.title')}</h2>
        </div>
      </div>

      <Suspense fallback={<div>{t('loading')}</div>}>
        <ClientVisaOrdersTable
          data={result.data as VisaApplication[]}
          pageCount={result.pageCount}
          currentPage={page}
        />
      </Suspense>
      
    </div>
  );
}