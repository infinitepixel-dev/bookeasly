import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { UserPlus, CreditCard, Building, TrendingUp, Wallet } from 'lucide-react';
import StatsWidget from './widgets/StatsWidget';
import ChartWidget from './widgets/ChartWidget';

const Dashboard = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    gsap.from(statsRef.current?.children, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, []);

  const weeklyData = [42, 38, 55, 47, 58, 62, 65];
  const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const monthlyRevenue = [28000, 32000, 24000, 35000, 38000, 42000];
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
        
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsWidget
            title="New Customers"
            value="847"
            change={12.5}
            icon={<UserPlus />}
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatsWidget
            title="Total Revenue"
            value="$124.5k"
            change={8.2}
            icon={<Wallet />}
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatsWidget
            title="Active Listings"
            value="235"
            change={-3.8}
            icon={<Building />}
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatsWidget
            title="Booking Rate"
            value="84%"
            change={5.1}
            icon={<TrendingUp />}
            bgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartWidget
            title="Weekly Bookings"
            data={weeklyData}
            labels={weekLabels}
            color="bg-indigo-500"
          />
          <ChartWidget
            title="Monthly Revenue"
            data={monthlyRevenue}
            labels={monthLabels}
            color="bg-green-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((booking) => (
                <div key={booking} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Luxury Villa {booking}</p>
                    <p className="text-sm text-gray-500">2 nights · 3 guests</p>
                  </div>
                  <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Popular Properties</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((property) => (
                <div key={property} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={`https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=100&h=100&q=80`}
                    alt={`Property ${property}`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">Seaside Villa {property}</p>
                    <p className="text-sm text-gray-500">$299/night · 95% occupied</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;