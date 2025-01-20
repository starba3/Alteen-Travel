'use client';

import { useState } from 'react';
import { Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from 'next/image';
import { format } from 'date-fns';
import { VisaApplication } from '@/lib/types/VisaApplication';
import { PersonsTable } from './PersonsTable';

interface Props {
  order: VisaApplication;
}

export function VisaOrderDialog({ order }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Visa Application Details - {order.id}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-medium">Email:</span> {order.email}</div>
            <div><span className="font-medium">Phone:</span> {order.phoneNumber}</div>
            <div><span className="font-medium">Country:</span> {order.country}</div>
            <div><span className="font-medium">Date:</span> {order.createdAt && format(new Date(order.createdAt), 'PPP')}</div>
          </div>

          <PersonsTable persons={order.persons} />
        </div>
      </DialogContent>
    </Dialog>
  );
} 