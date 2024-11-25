import React from 'react';
import { useBusinessType } from '../../contexts/BusinessTypeContext';
import PropertyAnalytics from './PropertyAnalytics';
import AppointmentAnalytics from './AppointmentAnalytics';

const Analytics = () => {
  const { businessType } = useBusinessType();

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Analytics</h2>
        {businessType === 'property_rentals' ? (
          <PropertyAnalytics />
        ) : (
          <AppointmentAnalytics />
        )}
      </div>
    </div>
  );
};

export default Analytics;