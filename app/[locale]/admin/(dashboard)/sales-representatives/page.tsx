'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlusCircle, Pencil, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCountries, type Country } from '@/lib/countries';
import Image from 'next/image';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithEmailLink, UserCredential } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { Switch } from "@/components/ui/switch";
import { getUserWithoutPassword } from '@/lib/data/users';
import { Pagination } from '@/components/ui/pagination';

interface SalesRepresentative {
  uId: string;
  name: string;
  email: string;
  password?: string;
  companyName: string;
  companyEmail: string;
  phoneNumber: string;
  country: string;
  countryKey: string;
  state: string;
  address: string;
  visaPrice: string;
  dateOfRegister: string;
}

const ITEMS_PER_PAGE = 10;

export default function SalesRepresentativesPage() {
  const [salesReps, setSalesReps] = useState<SalesRepresentative[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRep, setEditingRep] = useState<SalesRepresentative | null>(null);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [enablePasswordUpdate, setEnablePasswordUpdate] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    companyEmail: '',
    phoneNumber: '',
    country: '',
    countryKey: '',
    state: '',
    address: '',
    visaPrice: '',
  });

  useEffect(() => {
    fetchSalesReps();
    fetch('/api/countries')
      .then(res => res.json())
      .then(setCountries);
  }, []);

  const fetchSalesReps = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('isAdmin', '==', false));
      const querySnapshot = await getDocs(q);
      
      const reps = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        uId: doc.id,
      })) as SalesRepresentative[];
      
      setSalesReps(reps);
    } catch (error) {
      console.error('Error fetching sales representatives:', error);
      toast({
        title: "Error",
        description: "Failed to fetch sales representatives",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateLocalSalesReps = (updatedRep: SalesRepresentative) => {
    setSalesReps(currentReps => 
      currentReps.map(rep => 
        rep.uId === updatedRep.uId ? updatedRep : rep
      )
    );
  };

  const addLocalSalesRep = (newRep: SalesRepresentative) => {
    setSalesReps(currentReps => [...currentReps, newRep]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const currentDate = new Date().toLocaleString();
      const userData = {
        ...formData,
        isAdmin: false,
        dateOfRegister: currentDate,
        image: null,
        location: null,
      };

      const { password, ...userDataWithoutPassword } = userData;

      if (editingRep) {
        try {
          // First, delete the user from authentication if they exist
          const deleteResponse = await fetch('/api/admin/delete-auth-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              uid: editingRep.uId,
            }),
          });

          if (!deleteResponse.ok) {
            throw new Error('Failed to delete user from authentication');
          }

          // Create new auth user using Admin SDK
          const createResponse = await fetch('/api/admin/create-auth-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              // If enablePasswordUpdate is true, use new password, otherwise use a default password
              password: enablePasswordUpdate ? password : ''
            }),
          });

          if (!createResponse.ok) {
            throw new Error('Failed to create user in authentication');
          }

          const { uid } = await createResponse.json();

          // Update the user data with new auth UID
          const updatedUserData = {
            ...userDataWithoutPassword,
            uId: uid,
          };

          // Update in Firestore
          await updateDoc(doc(db, 'users', editingRep.uId), updatedUserData);
          
          // Update local state
          updateLocalSalesReps(updatedUserData as SalesRepresentative);
          
          toast({
            title: "Success",
            description: "Representative updated successfully",
          });
        } catch (error) {
          console.error('Error updating user:', error);
          toast({
            title: "Error",
            description: "Failed to update user information",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      } else {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            password
          );

          const newUserData = {
            ...userDataWithoutPassword,
            uId: userCredential.user.uid,
          };

          await addDoc(collection(db, 'users'), newUserData);
          addLocalSalesRep(newUserData as SalesRepresentative);

          toast({
            title: "Success",
            description: "New representative added successfully",
          });
        } catch (authError) {
          console.error('Auth error:', authError);
          toast({
            title: "Error",
            description: "Failed to create user account",
            variant: "destructive",
          });
          return;
        }
      }

      setIsModalOpen(false);
      setEditingRep(null);
      resetForm();
    } catch (error) {
      console.error('Error saving representative:', error);
      toast({
        title: "Error",
        description: "Failed to save representative",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (rep: SalesRepresentative) => {
    setEditingRep(rep);
    setFormData({
      name: rep.name,
      email: rep.email,
      password: rep.password || '',
      companyName: rep.companyName,
      companyEmail: rep.companyEmail,
      phoneNumber: rep.phoneNumber,
      country: rep.country,
      countryKey: rep.countryKey,
      state: rep.state,
      address: rep.address,
      visaPrice: rep.visaPrice,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      companyName: '',
      companyEmail: '',
      phoneNumber: '',
      country: '',
      countryKey: '',
      state: '',
      address: '',
      visaPrice: '',
    });
    setCountrySearch('');
    setEnablePasswordUpdate(false);
  };

  const handleCountryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      country: value,
      countryKey: value,
    }));
  };

  const filteredReps = salesReps.filter((rep) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      rep.name.toLowerCase().includes(searchLower) ||
      rep.email.toLowerCase().includes(searchLower) ||
      rep.companyName.toLowerCase().includes(searchLower) ||
      rep.country.toLowerCase().includes(searchLower)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredReps.length / ITEMS_PER_PAGE);
  const paginatedReps = filteredReps.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales Representatives</h1>
        <Button 
          className="flex items-center gap-2"
          onClick={() => {
            setEditingRep(null);
            resetForm();
            setIsModalOpen(true);
          }}
        >
          <PlusCircle className="w-4 h-4" />
          Add New Representative
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, company or country..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page when searching
          }}
          className="pl-8"
        />
      </div>

      <div className="rounded-md border">
        <Table className="min-w-full bg-white border rounded-lg">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visa Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {paginatedReps.map((rep) => (
              <TableRow key={rep.uId}>
                <TableCell className="px-6 py-4 whitespace-nowrap">{rep.name}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">{rep.companyName}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">{rep.email}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">{rep.phoneNumber}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">{rep.country}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">{rep.state}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">${rep.visaPrice}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => handleEdit(rep)}
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredReps.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingRep ? 'Edit Representative' : 'Add New Representative'}
            </DialogTitle>
          </DialogHeader>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }} 
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={handleCountryChange}
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
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="visaPrice">Visa Price</Label>
                <Input
                  id="visaPrice"
                  name="visaPrice"
                  value={formData.visaPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {editingRep ? 'Update' : 'Add'} Representative
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}