import React from 'react';
import { Calendar, Users, Clock, TrendingUp, DollarSign } from 'lucide-react';
import { useBusinessType } from '../../contexts/BusinessTypeContext';

const AppointmentAnalytics = () => {
  const { appointmentTypes } = useBusinessType();

  const metrics = [
    {
      title: 'Total Appointments',
      value: '0',
      change: '0%',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Clients',
      value: '0',
      change: '0%',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Average Duration',
      value: `${Math.round(appointmentTypes.reduce((acc, type) => acc + type.duration, 0) / appointmentTypes.length)} min`,
      change: '0%',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Booking Rate',
      value: '0%',
      change: '0%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{metric.title}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">$0</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Popular Services</h3>
          <div className="space-y-4">
            {appointmentTypes.map((type) => (
              <div key={type.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{type.name}</p>
                  <p className="text-sm text-gray-500">{type.duration} minutes</p>
                </div>
                <p className="font-medium">${type.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentAnalytics;