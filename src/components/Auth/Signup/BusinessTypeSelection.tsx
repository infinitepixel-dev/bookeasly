import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Calendar } from 'lucide-react';
import { useBusinessType } from '../../../contexts/BusinessTypeContext';

const BusinessTypeSelection = () => {
  const navigate = useNavigate();
  const { setBusinessType } = useBusinessType();

  const handleSelection = (type: 'property_rentals' | 'appointments') => {
    setBusinessType(type);
    navigate('/signup/setup');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Choose your business type</h3>
        <p className="mt-1 text-sm text-gray-500">
          Select the type of booking service you want to offer
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => handleSelection('property_rentals')}
          className="relative flex items-start p-4 border rounded-lg hover:border-indigo-500 transition-colors"
        >
          <div className="flex items-center h-5">
            <Building className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="ml-3 flex flex-col">
            <span className="text-sm font-medium text-gray-900">Property Rentals</span>
            <span className="text-sm text-gray-500">
              Vacation homes, apartments, or other rental properties
            </span>
          </div>
        </button>

        <button
          onClick={() => handleSelection('appointments')}
          className="relative flex items-start p-4 border rounded-lg hover:border-indigo-500 transition-colors"
        >
          <div className="flex items-center h-5">
            <Calendar className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="ml-3 flex flex-col">
            <span className="text-sm font-medium text-gray-900">Appointments</span>
            <span className="text-sm text-gray-500">
              Service-based appointments with customizable durations
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BusinessTypeSelection;