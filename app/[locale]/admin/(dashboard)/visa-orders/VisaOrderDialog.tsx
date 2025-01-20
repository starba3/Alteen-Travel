'use client';

import { useState } from 'react';
import { Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from 'date-fns';
import { VisaApplication } from '@/lib/types/VisaApplication';
import { PersonsTable } from './PersonsTable';
import { PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import { VisaOrderPDF } from './VisaOrderPDF';
import { useParams } from 'next/navigation';

interface Props {
  order: VisaApplication;
}

export function VisaOrderDialog({ order }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { locale } = useParams();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Visa Application Details - {order.id}</DialogTitle>
            <PDFDownloadLink
              document={<VisaOrderPDF order={order} locale={locale as string} />}
              fileName={`visa-application-${order.id}.pdf`}
            >
              {/* {({ loading }: { loading: boolean }) => ( */}
                <Button 
                  variant="outline" 
                  size="sm"
                  // disabled={loading}
                  type="button"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
               {/* )} */}
            </PDFDownloadLink>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-medium">Email:</span> {order.email}</div>
            <div><span className="font-medium">Phone:</span> {order.phoneNumber}</div>
            <div><span className="font-medium">Country:</span> {locale === 'ar' ? order.countryArabic : order.country}</div>
            <div><span className="font-medium">Date:</span> {order.createdAt && format(new Date(order.createdAt), 'PPP')}</div>
          </div>

          <PersonsTable persons={order.persons} />
        </div>
      </DialogContent>
    </Dialog>
  );
} 