'use client';

import { useState } from 'react';
import { Search, Edit2, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { type Country } from '@/lib/countries';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';

interface Props {
  initialCountries: Country[];
}

export default function ClientVisaCountriesTable({ initialCountries }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState(initialCountries);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can make this adjustable if needed
  const [editingPrice, setEditingPrice] = useState<{ id: string; price: number } | null>(null);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [dialogStates, setDialogStates] = useState<{ [key: string]: boolean }>({});
  const [updatingPrice, setUpdatingPrice] = useState(false);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCountries = filteredCountries.slice(startIndex, endIndex);

  // Pagination controls
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleToggleActive = async (code: string, currentStatus: boolean) => {
    setLoadingStates(prev => ({ ...prev, [code]: true }));
    try {
      const response = await fetch(`/api/countries/${code}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serviceAvailable: !currentStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      setCountries(prevCountries =>
        prevCountries.map(country =>
          country.code === code
            ? { ...country, serviceAvailable: !currentStatus }
            : country
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      // Add your error handling here (e.g., toast notification)
    } finally {
      setLoadingStates(prev => ({ ...prev, [code]: false }));
    }
  };

  const handleUpdatePrice = async (code: string, newPrice: number) => {
    setUpdatingPrice(true);
    try {
      const response = await fetch(`/api/countries/${code}/update-price`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price: newPrice }),
      });

      if (!response.ok) throw new Error('Failed to update price');

      setCountries(prevCountries =>
        prevCountries.map(country =>
          country.code === code
            ? { ...country, price: newPrice }
            : country
        )
      );
      setDialogStates(prev => ({ ...prev, [code]: false }));
      setEditingPrice(null);
    } catch (error) {
      console.error('Error updating price:', error);
      // Add your error handling here (e.g., toast notification)
    } finally {
      setUpdatingPrice(false);
    }
  };

  const handleOpenDialog = (code: string) => {
    setDialogStates(prev => ({ ...prev, [code]: true }));
  };

  const handleCloseDialog = (code: string) => {
    setDialogStates(prev => ({ ...prev, [code]: false }));
    setEditingPrice(null);
  };

  return (
    <>
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search countries..."
          className="pl-10 pr-4 py-2 border rounded-lg w-full max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service Available
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentCountries.map((country) => (
              <tr key={country.code} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{country.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{country.code}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${country.price}
                  <Dialog 
                    open={dialogStates[country.code]} 
                    onOpenChange={(open) => open ? handleOpenDialog(country.code) : handleCloseDialog(country.code)}
                  >
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="ml-2">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Price for {country.name}</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <Input
                          type="number"
                          placeholder="Enter new price"
                          defaultValue={country.price}
                          onChange={(e) => setEditingPrice({ 
                            id: country.code, 
                            price: parseFloat(e.target.value) 
                          })}
                        />
                        <div className="mt-4 flex justify-end space-x-2">
                          <Button
                            onClick={() => handleUpdatePrice(
                              country.code,
                              editingPrice?.price || country.price
                            )}
                            disabled={updatingPrice}
                          >
                            {updatingPrice ? (
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
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Switch
                    checked={country.serviceAvailable || false}
                    onCheckedChange={() => handleToggleActive(country.code, country.serviceAvailable || false)}
                    disabled={loadingStates[country.code]}
                    className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200"
                  />
                  {loadingStates[country.code] && (
                    <Loader2 className="ml-2 h-4 w-4 inline animate-spin text-blue-600" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      country.serviceAvailable
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {country.serviceAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCountries.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No countries found
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalItems={filteredCountries.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
} 