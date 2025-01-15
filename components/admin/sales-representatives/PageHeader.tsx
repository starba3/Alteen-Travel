import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function PageHeader({ 
  onAddClick 
}: { 
  onAddClick: () => void 
}) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Sales Representatives</h1>
      <Button 
        className="flex items-center gap-2"
        onClick={onAddClick}
      >
        <PlusCircle className="w-4 h-4" />
        Add New Representative
      </Button>
    </div>
  );
} 