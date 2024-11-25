import React, { createContext, useContext, useState } from 'react';

export type BusinessType = 'property_rentals' | 'appointments' | null;

export type AppointmentType = {
  id: string;
  name: string;
  duration: number;
  price: number;
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

interface BusinessTypeContextType {
  businessType: BusinessType;
  setBusinessType: (type: BusinessType) => void;
  appointmentTypes: AppointmentType[];
  setAppointmentTypes: (types: AppointmentType[]) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
}

const BusinessTypeContext = createContext<BusinessTypeContextType | undefined>(undefined);

export function BusinessTypeProvider({ children }: { children: React.ReactNode }) {
  const [businessType, setBusinessType] = useState<BusinessType>(null);
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  return (
    <BusinessTypeContext.Provider
      value={{
        businessType,
        setBusinessType,
        appointmentTypes,
        setAppointmentTypes,
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </BusinessTypeContext.Provider>
  );
}

export function useBusinessType() {
  const context = useContext(BusinessTypeContext);
  if (context === undefined) {
    throw new Error('useBusinessType must be used within a BusinessTypeProvider');
  }
  return context;
}