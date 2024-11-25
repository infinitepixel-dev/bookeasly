import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { addDays, isWithinInterval, format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

interface Booking {
  id: number;
  propertyId: string;
  startDate: Date;
  endDate: Date;
}

// Simulated existing bookings
const existingBookings: Booking[] = [
  {
    id: 1,
    propertyId: 'villa-1',
    startDate: addDays(new Date(), 2),
    endDate: addDays(new Date(), 5),
  },
  {
    id: 2,
    propertyId: 'villa-1',
    startDate: addDays(new Date(), 10),
    endDate: addDays(new Date(), 15),
  },
];

const properties = [
  { id: 'villa-1', name: 'Luxury Villa' },
  { id: 'beach-1', name: 'Beach House' },
  { id: 'cabin-1', name: 'Mountain Cabin' },
];

const BookingCalendar = () => {
  const [selectedProperty, setSelectedProperty] = useState(properties[0].id);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  const isDateBooked = (date: Date) => {
    return existingBookings.some(booking => 
      booking.propertyId === selectedProperty &&
      isWithinInterval(date, { start: booking.startDate, end: booking.endDate })
    );
  };

  const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProperty(e.target.value);
    setDateRange([null, null]);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Booking Calendar</h3>
        <select
          value={selectedProperty}
          onChange={handlePropertyChange}
          className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {properties.map(property => (
            <option key={property.id} value={property.id}>
              {property.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setDateRange([date, endDate])}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              excludeDates={existingBookings
                .filter(b => b.propertyId === selectedProperty)
                .flatMap(booking => 
                  Array.from({ length: (booking.endDate.getTime() - booking.startDate.getTime()) / (24 * 60 * 60 * 1000) + 1 },
                    (_, i) => addDays(booking.startDate, i)
                  )
                )}
              placeholderText="Select check-in date"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setDateRange([startDate, date])}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()}
              excludeDates={existingBookings
                .filter(b => b.propertyId === selectedProperty)
                .flatMap(booking => 
                  Array.from({ length: (booking.endDate.getTime() - booking.startDate.getTime()) / (24 * 60 * 60 * 1000) + 1 },
                    (_, i) => addDays(booking.startDate, i)
                  )
                )}
              placeholderText="Select check-out date"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Existing Bookings</h4>
        <div className="space-y-2">
          {existingBookings
            .filter(booking => booking.propertyId === selectedProperty)
            .map(booking => (
              <div key={booking.id} className="p-3 bg-gray-50 rounded-lg text-sm">
                <p className="text-gray-600">
                  {format(booking.startDate, 'MMM dd, yyyy')} - {format(booking.endDate, 'MMM dd, yyyy')}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;