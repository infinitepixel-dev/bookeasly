import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BusinessTypeSelection from './BusinessTypeSelection';
import PropertySetup from './PropertySetup';
import AppointmentSetup from './AppointmentSetup';
import { useBusinessType } from '../../../contexts/BusinessTypeContext';

const Signup = () => {
  const navigate = useNavigate();
  const { businessType } = useBusinessType();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Routes>
            <Route path="/" element={<BusinessTypeSelection />} />
            <Route
              path="/setup"
              element={
                businessType === 'property_rentals' ? (
                  <PropertySetup />
                ) : businessType === 'appointments' ? (
                  <AppointmentSetup />
                ) : (
                  <BusinessTypeSelection />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Signup;