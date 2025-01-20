import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Country } from '@/lib/countries';
import { SalesRepresentative } from '@/lib/types/salesRepresentitives';

interface SalesRepFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingRep: SalesRepresentative | null;
  formData: {
    name: string;
    email: string;
    password: string;
    companyName: string;
    companyEmail: string;
    phoneNumber: string;
    country: string;
    countryKey: string;
    state: string;
    address: string;
    visaPrice: string;
  };
  loading: boolean;
  enablePasswordUpdate: boolean;
  countrySearch: string;
  countries: Country[];
  filteredCountries: Country[];
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCountryChange: (value: string) => void;
  setEnablePasswordUpdate: (enabled: boolean) => void;
  setCountrySearch: (search: string) => void;
}

export function SalesRepFormDialog({
  isOpen,
  onOpenChange,
  editingRep,
  formData,
  loading,
  enablePasswordUpdate,
  countrySearch,
  countries,
  filteredCountries,
  onSubmit,
  onInputChange,
  onCountryChange,
  setEnablePasswordUpdate,
  setCountrySearch,
}: SalesRepFormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingRep ? 'Edit Representative' : 'Add New Representative'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              {editingRep ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enablePassword" className="text-sm text-muted-foreground">
                      Update Password
                    </Label>
                    <Switch
                      id="enablePassword"
                      checked={enablePasswordUpdate}
                      onCheckedChange={setEnablePasswordUpdate}
                    />
                  </div>
                  {enablePasswordUpdate && (
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={onInputChange}
                      required
                      placeholder="Enter new password"
                    />
                  )}
                </div>
              ) : (
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={onInputChange}
                  required
                  placeholder="Enter password"
                />
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="companyEmail">Company Email</Label>
              <Input
                id="companyEmail"
                name="companyEmail"
                type="email"
                value={formData.companyEmail}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={onCountryChange}
                required
              >
                <SelectTrigger id="country" className="flex items-center gap-2">
                  <SelectValue placeholder="Select a country">
                    {formData.country && (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center text-base leading-none">
                          {countries.find(c => c.name === formData.country)?.flag}
                        </span>
                        <span>{formData.country}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <div className="sticky top-0 p-2 bg-background">
                    <Input
                      placeholder="Search countries..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {filteredCountries.map((country) => (
                      <SelectItem 
                        key={country.code} 
                        value={country.name}
                        className="flex items-center gap-2"
                      >
                        <div className="flex justify-start items-center gap-2">
                          <span className="inline-flex items-center text-base leading-none">
                            {country.flag}
                          </span>
                          <span>{country.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="visaPrice">Visa Price</Label>
              <Input
                id="visaPrice"
                name="visaPrice"
                value={formData.visaPrice}
                onChange={onInputChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {editingRep ? 'Update' : 'Add'} Representative
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 