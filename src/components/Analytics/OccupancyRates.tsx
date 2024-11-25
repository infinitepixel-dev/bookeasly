import React from 'react';
import { Building } from 'lucide-react';

const propertyTypes = [
  { name: 'Luxury Villas', rate: 85 },
  { name: 'Beach Houses', rate: 78 },
  { name: 'City Apartments', rate: 92 },
  { name: 'Mountain Cabins', rate: 65 }
];

const OccupancyRates = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Occupancy Rates</h3>
          <p className="text-sm text-gray-500">By property type</p>
        </div>
        <div className="p-2 bg-purple-100 rounded-lg">
          <Building className="w-5 h-5 text-purple-600" />
        </div>
      </div>

      <div className="space-y-4">
        {propertyTypes.map((property, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span>{property.name}</span>
              <span className="font-medium">{property.rate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${property.rate}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OccupancyRates;