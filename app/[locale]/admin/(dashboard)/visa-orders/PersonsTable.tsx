'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';
import { VisaApplication } from '@/lib/types/VisaApplication';

interface Props {
  persons: VisaApplication['persons'];
}

export function PersonsTable({ persons }: Props) {
  const [expandedPersons, setExpandedPersons] = useState<{ [key: string]: boolean }>({});

  const togglePerson = (personId: string) => {
    setExpandedPersons(prev => ({
      ...prev,
      [personId]: !prev[personId]
    }));
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-10 px-4 py-3"></th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">DOB</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nationality</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {persons.map((person) => (
            <>
              <tr 
                key={person.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => togglePerson(person.id)}
              >
                <td className="px-4 py-3">
                  {expandedPersons[person.id] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  {person.firstName} {person.midName} {person.lastName}
                </td>
                <td className="px-4 py-3 text-sm">
                  {format(new Date(person.dob), 'PP')}
                </td>
                <td className="px-4 py-3 text-sm">
                  {person.nationality}
                </td>
              </tr>
              {expandedPersons[person.id] && (
                <tr>
                  <td colSpan={4} className="px-4 py-4 bg-gray-50">
                    <div className="grid grid-cols-2 gap-4">
                      {person.imageUrlNationality && (
                        <div>
                          <p className="text-sm font-medium mb-2">National ID</p>
                          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border">
                            <Image
                              src={person.imageUrlNationality}
                              alt="National ID"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      )}
                      {person.imageUrlPassport && (
                        <div>
                          <p className="text-sm font-medium mb-2">Passport</p>
                          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border">
                            <Image
                              src={person.imageUrlPassport}
                              alt="Passport"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div><span className="font-medium">Passport No:</span> {person.passportNo}</div>
                      <div><span className="font-medium">ID:</span> {person.id}</div>
                      <div><span className="font-medium">Nationality (Arabic):</span> {person.nationalityArabic}</div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
} 