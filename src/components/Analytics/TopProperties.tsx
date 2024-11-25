import React from 'react';
import { Star } from 'lucide-react';

const properties = [
  {
    name: 'Sunset Villa',
    location: 'Malibu, CA',
    revenue: '$24,500',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Ocean View Resort',
    location: 'Miami Beach, FL',
    revenue: '$21,800',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Mountain Lodge',
    location: 'Aspen, CO',
    revenue: '$19,200',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80'
  }
];

const TopProperties = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Top Performing Properties</h3>
      <div className="space-y-4">
        {properties.map((property, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <img
              src={property.image}
              alt={property.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium">{property.name}</h4>
              <p className="text-sm text-gray-500">{property.location}</p>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{property.rating}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Monthly Revenue</p>
              <p className="font-bold text-green-600">{property.revenue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProperties;