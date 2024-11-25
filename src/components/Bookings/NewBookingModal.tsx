import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { addDays, isWithinInterval } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const propertyTypes = [
  { id: 'villa-1', name: 'Luxury Villa' },
  { id: 'beach-1', name: 'Beach House' },
  { id: 'cabin-1', name: 'Mountain Cabin' },
  { id: 'apartment-1', name: 'City Apartment' }
];

// Simulated existing bookings
const existingBookings = [
  {
    propertyId: 'villa-1',
    startDate: addDays(new Date(), 2),
    endDate: addDays(new Date(), 5),
  },
  {
    propertyId: 'villa-1',
    startDate: addDays(new Date(), 10),
    endDate: addDays(new Date(), 15),
  },
];

const NewBookingModal = ({ isOpen, onClose }: NewBookingModalProps) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState(1);
  const [propertyType, setPropertyType] = useState(propertyTypes[0].id);

  const isDateBooked = (date: Date) => {
    return existingBookings.some(booking => 
      booking.propertyId === propertyType &&
      isWithinInterval(date, { start: booking.startDate, end: booking.endDate })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-semibold">
                    New Booking
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Type
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => {
                        setPropertyType(e.target.value);
                        setDateRange([null, null]);
                      }}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      {propertyTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

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
                          .filter(b => b.propertyId === propertyType)
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
                          .filter(b => b.propertyId === propertyType)
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                      disabled={!startDate || !endDate}
                    >
                      Create Booking
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewBookingModal;