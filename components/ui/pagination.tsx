'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from '@/lib/i18n/hooks';
import { useParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const params = useParams();
  const locale = params.locale as string;
  const { t } = useTranslations(params.locale as string);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const handlePrevPage = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNextPage = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  if (totalItems === 0) return null;

  return (
    <div className={`flex flex-row${locale === 'ar' ? '-reverse' : ''} items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6`}>
      <div className="flex items-center">
        <p className="text-sm text-gray-700">
          Showing{' '}
          <span className="font-medium">{startIndex + 1}</span>
          {' '}-{' '}
          <span className="font-medium">{endIndex}</span>
          {' '}of{' '}
          <span className="font-medium">{totalItems}</span>
          {' '}results
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => {
              return (
                page === 1 ||
                page === totalPages ||
                Math.abs(currentPage - page) <= 1
              );
            })
            .map((page, index, array) => (
              <div key={page} className="flex items-center">
                {index > 0 && array[index - 1] !== page - 1 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className="min-w-[2.5rem]"
                >
                  {page}
                </Button>
              </div>
            ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
