import React from 'react';
import { useBusinessType } from '../../contexts/BusinessTypeContext';
import { Calendar, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const AppointmentDashboard = () => {
  const { userProfile, appointmentTypes } = useBusinessType();

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Welcome, {userProfile?.firstName}!</h2>
            <p className="text-gray-600">{userProfile?.companyName}</p>
          </div>
          <Link
            to="/appointments"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Schedule Appointment
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Today's Appointments</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Clients</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Available Services</p>
                <p className="text-2xl font-bold">{appointmentTypes.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Your Services</h3>
          <div className="divide-y">
            {appointmentTypes.map((type) => (
              <div key={type.id} className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{type.name}</h4>
                    <p className="text-sm text-gray-500">{type.duration} minutes</p>
                  </div>
                  <p className="font-medium">${type.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDashboard;