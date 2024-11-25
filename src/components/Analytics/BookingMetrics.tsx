import React from 'react';
import { Calendar, Users, Clock, TrendingUp } from 'lucide-react';

const metrics = [
  {
    title: 'Total Bookings',
    value: '1,284',
    change: '+8.2%',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    title: 'New Customers',
    value: '847',
    change: '+12.5%',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    title: 'Avg. Stay Duration',
    value: '4.2 days',
    change: '+3.1%',
    icon: Clock,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    title: 'Booking Rate',
    value: '84%',
    change: '+5.1%',
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
];

const BookingMetrics = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Booking Metrics</h3>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <span className="text-sm text-gray-500">{metric.title}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">{metric.value}</span>
              <span className="text-sm text-green-600">{metric.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingMetrics;