import React from 'react';
import RevenueChart from './RevenueChart';
import BookingMetrics from './BookingMetrics';
import OccupancyRates from './OccupancyRates';
import TopProperties from './TopProperties';

const PropertyAnalytics = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RevenueChart />
        <BookingMetrics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OccupancyRates />
        <TopProperties />
      </div>
    </>
  );
};

export default PropertyAnalytics;