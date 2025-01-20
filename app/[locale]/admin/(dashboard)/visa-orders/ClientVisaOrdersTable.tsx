'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { VisaApplication } from "@/lib/types/VisaApplication";
import { useTranslations } from '@/lib/i18n/hooks';
import { useParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VisaOrderDialog } from './VisaOrderDialog';

interface Props {
  data: VisaApplication[];
  pageCount: number;
  currentPage: number;
}

export function ClientVisaOrdersTable({ data, pageCount, currentPage }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useParams();
  const { t } = useTranslations(locale as string);
  const itemsPerPage = 10;

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('search', value);
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('status', status);
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };
  // dir={locale === 'ar' ? 'rtl' : 'ltr'}
  return (
    <>
      <div className="flex gap-4 mb-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className="relative flex-1" >
          <Search className={`absolute ${locale === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={20} />
          <Input
            type="text"
            placeholder={t('visaOrders.searchPlaceholder')}
            className="pl-10 pr-4 py-2 w-full max-w-md"
            value={searchQuery}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>
        <Select
          defaultValue="all"
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className={`min-w-full bg-white border rounded-lg ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
          <thead className="bg-gray-50">
            <tr>
              <th className={`px-6 py-3 text-${locale === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {t('visaOrders.orderID')}
              </th>
              <th className={`px-6 py-3 text-${locale === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {t('visaOrders.applicantName')}
              </th>
              <th className={`px-6 py-3 text-${locale === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {t('visaOrders.email')}
              </th>
              <th className={`px-6 py-3 text-${locale === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {t('visaOrders.phone')}
              </th>
              <th className={`px-6 py-3 text-${locale === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {t('visaOrders.country')}
              </th>
              <th className={`px-6 py-3 text-${locale === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {t('visaOrders.persons')}
              </th>
              <th className={`px-6 py-3 text-${locale === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {t('visaOrders.status')}
              </th>
              <th className={`px-6 py-3 text-${locale === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {t('visaOrders.date')}
              </th>
              <th className={`px-6 py-3 text-${locale === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {t('visaOrders.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{order.id}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{order.nameOnHeader}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{order.email}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{order.phoneNumber}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{order.country}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{order.persons.length}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'approved' ? 'bg-green-100 text-green-800' :
                    order.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status || 'pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {order.createdAt && format(new Date(order.createdAt), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <VisaOrderDialog order={order} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            {t("noOrdersFound")}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
} 