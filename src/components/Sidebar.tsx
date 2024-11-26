import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, PieChart, Settings, LogOut, Key } from 'lucide-react';
import { useBusinessType } from '../contexts/BusinessTypeContext';

const Sidebar = () => {
  const { businessType } = useBusinessType();
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-colors ${
      isActive ? 'bg-indigo-500/10 text-indigo-400' : 'hover:bg-indigo-500/10'
    }`;

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-10">
        <Key className="w-8 h-8 text-indigo-400" />
        <h1 className="text-xl font-bold">BookEase</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <NavLink to="/" className={navLinkClass}>
              <Home className="w-5 h-5" />
              Dashboard
            </NavLink>
          </li>
          {businessType === 'property_rentals' ? (
            <li>
              <NavLink to="/bookings" className={navLinkClass}>
                <Calendar className="w-5 h-5" />
                Bookings
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/appointments" className={navLinkClass}>
                <Calendar className="w-5 h-5" />
                Appointments
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/analytics" className={navLinkClass}>
              <PieChart className="w-5 h-5" />
              Analytics
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={navLinkClass}>
              <Settings className="w-5 h-5" />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>

      <button className="flex items-center gap-3 p-3 text-gray-400 hover:text-white transition-colors">
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;