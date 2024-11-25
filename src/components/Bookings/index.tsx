import React, { useState } from 'react';
import BookingCalendar from './BookingCalendar';
import BookingList from './BookingList';
import NewBookingModal from './NewBookingModal';
import { Plus } from 'lucide-react';

const Bookings = () => {
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Bookings</h2>
          <button
            onClick={() => setIsNewBookingOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Booking
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BookingCalendar />
          </div>
          <div>
            <BookingList />
          </div>
        </div>

        <NewBookingModal
          isOpen={isNewBookingOpen}
          onClose={() => setIsNewBookingOpen(false)}
        />
      </div>
    </div>
  );
};

export default Bookings;