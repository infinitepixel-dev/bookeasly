import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building } from 'lucide-react';

const propertySchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  propertyType: z.enum(['vacation_homes', 'apartments', 'hotels']),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(1, 'Description is required'),
});

type PropertyFormData = z.infer<typeof propertySchema>;

const PropertySetup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
  });

  const onSubmit = (data: PropertyFormData) => {
    // Handle property setup data
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Set up your rental business</h3>
        <p className="mt-1 text-sm text-gray-500">
          Tell us about your property rental business
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Business Name
        </label>
        <input
          type="text"
          {...register('businessName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Property Type
        </label>
        <select
          {...register('propertyType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="vacation_homes">Vacation Homes</option>
          <option value="apartments">Apartments</option>
          <option value="hotels">Hotels</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Primary Location
        </label>
        <input
          type="text"
          {...register('location')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="City, State"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Business Description
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Tell us about your rental business..."
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Complete Setup
        </button>
      </div>
    </form>
  );
};

export default PropertySetup;