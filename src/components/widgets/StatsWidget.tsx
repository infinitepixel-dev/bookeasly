import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsWidgetProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

const StatsWidget = ({ title, value, change, icon, bgColor, iconColor }: StatsWidgetProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`p-3 ${bgColor} rounded-lg`}>
          {React.cloneElement(icon as React.ReactElement, { className: `w-6 h-6 ${iconColor}` })}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500">{title}</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">{value}</p>
            <div className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              <span>{Math.abs(change)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsWidget;