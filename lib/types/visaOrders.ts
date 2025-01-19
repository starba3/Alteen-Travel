import { VisaApplication } from './VisaApplication';

export type VisaOrderStatus = 'all' | 'pending' | 'approved' | 'rejected';

// For table display and data fetching
export interface VisaOrdersTableProps {
    data: VisaApplication[];
    pageSize: number;
    pageCount: number;
    currentPage: number;
  }
  
  // For filtering and searching
  export interface VisaOrdersFilters {
    search?: string;
    status?: VisaOrderStatus;
    dateRange?: {
      from: Date;
      to: Date;
    };
    country?: string;
  } 