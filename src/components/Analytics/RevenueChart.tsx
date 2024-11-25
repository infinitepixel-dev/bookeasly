import React from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

const RevenueChart = () => {
  const monthlyRevenue = [42000, 38000, 55000, 47000, 58000, 62000];
  const maxRevenue = Math.max(...monthlyRevenue);
  const months = ['January', 'February', 'March', 'April', 'May', 'June'];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Revenue Overview</h3>
          <p className="text-sm text-gray-500">Monthly revenue performance</p>
        </div>
        <div className="flex items-center gap-2 text-green-600">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm font-medium">+12.5%</span>
        </div>
      </div>

      <div className="h-64">
        <div className="flex items-end h-48 gap-2">
          {monthlyRevenue.map((revenue, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-indigo-500 rounded-t-sm transition-all duration-300 hover:opacity-80"
                style={{ height: `${(revenue / maxRevenue) * 100}%` }}
              />
              <div className="mt-2 text-xs text-gray-500">{months[index].slice(0, 3)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <div>
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-xl font-bold">$302,000</p>
        </div>
        <div className="p-3 bg-green-100 rounded-lg">
          <DollarSign className="w-6 h-6 text-green-600" />
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;