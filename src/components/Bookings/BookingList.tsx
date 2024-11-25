import React from 'react';
import { Calendar, Users } from 'lucide-react';

const bookings = [
  {
    id: 1,
    property: 'Luxury Villa',
    guest: 'John Doe',
    checkIn: '2024-03-15',
    checkOut: '2024-03-18',
    guests: 3,
    status: 'confirmed'
  },
  {
    id: 2,
    property: 'Beach House',
    guest: 'Jane Smith',
    checkIn: '2024-03-20',
    checkOut: '2024-03-25',
    guests: 4,
    status: 'pending'
  },
  {
    id: 3,
    property: 'Mountain Cabin',
    guest: 'Mike Johnson',
    checkIn: '2024-03-22',
    checkOut: '2024-03-24',
    guests: 2,
    status: 'confirmed'
  }
];

const BookingList = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Upcoming Bookings</h3>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{booking.property}</h4>
              <span className={`px-2 py-1 text-xs rounded-full ${
                booking.status === 'confirmed' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {booking.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{booking.guest}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {booking.checkIn} - {booking.checkOut}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {booking.guests} guests
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;