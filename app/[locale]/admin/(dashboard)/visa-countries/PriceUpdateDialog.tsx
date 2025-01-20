import { Edit2, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PriceUpdateDialogProps {
  countryCode: string;
  countryName: string;
  currentPrice: number;
  isOpen: boolean;
  isUpdating: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdatePrice: (code: string, price: number) => Promise<void>;
  onPriceChange: (price: { id: string; price: number }) => void;
}

export function PriceUpdateDialog({
  countryCode,
  countryName,
  currentPrice,
  isOpen,
  isUpdating,
  onOpenChange,
  onUpdatePrice,
  onPriceChange,
}: PriceUpdateDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="ml-2">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Price for {countryName}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            type="number"
            placeholder="Enter new price"
            defaultValue={currentPrice}
            onChange={(e) => onPriceChange({ 
              id: countryCode, 
              price: parseFloat(e.target.value) 
            })}
          />
          <div className="mt-4 flex justify-end space-x-2">
            <Button
              onClick={() => onUpdatePrice(countryCode, currentPrice)}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 