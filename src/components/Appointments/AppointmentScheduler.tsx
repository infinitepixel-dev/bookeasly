import React, { useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import { useBusinessType } from '../../contexts/BusinessTypeContext';
import { Trash2, Edit, Calendar, Clock, User } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';

interface Appointment {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  appointmentTypeId: string;
  date: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const AppointmentScheduler = () => {
  const { appointmentTypes } = useBusinessType();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    appointmentTypeId: appointmentTypes[0]?.id || '',
    date: new Date(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAppointment) {
      setAppointments(appointments.map(apt => 
        apt.id === editingAppointment.id 
          ? { ...formData, id: apt.id, status: apt.status }
          : apt
      ));
    } else {
      const newAppointment: Appointment = {
        ...formData,
        id: `apt-${Date.now()}`,
        status: 'scheduled',
      };
      setAppointments([...appointments, newAppointment]);
    }
    closeModal();
  };

  const openModal = (appointment?: Appointment) => {
    if (appointment) {
      setEditingAppointment(appointment);
      setFormData({
        clientName: appointment.clientName,
        email: appointment.email,
        phone: appointment.phone,
        appointmentTypeId: appointment.appointmentTypeId,
        date: appointment.date,
      });
    } else {
      setEditingAppointment(null);
      setFormData({
        clientName: '',
        email: '',
        phone: '',
        appointmentTypeId: appointmentTypes[0]?.id || '',
        date: new Date(),
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAppointment(null);
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Appointment Scheduler</h2>
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Schedule New Appointment
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
              {appointments.map(appointment => {
                const appointmentType = appointmentTypes.find(
                  type => type.id === appointment.appointmentTypeId
                );

                return (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{appointment.clientName}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{format(appointment.date, 'MMM dd, yyyy h:mm a')}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {appointmentType?.duration} min
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal(appointment)}
                        className="p-2 text-gray-600 hover:text-indigo-600"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteAppointment(appointment.id)}
                        className="p-2 text-gray-600 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
              {appointments.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  No appointments scheduled
                </div>
              )}
            </div>
          </div>
        </div>

        <Transition show={isModalOpen} as={React.Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {editingAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}
                  </Dialog.Title>

                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Client Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => {
                          const formatted = formatPhoneNumber(e.target.value);
                          setFormData({ ...formData, phone: formatted });
                        }}
                        placeholder="123-456-7890"
                        maxLength={12}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Appointment Type
                      </label>
                      <select
                        required
                        value={formData.appointmentTypeId}
                        onChange={(e) =>
                          setFormData({ ...formData, appointmentTypeId: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        {appointmentTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name} ({type.duration} min) - ${type.price}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date and Time
                      </label>
                      <DatePicker
                        selected={formData.date}
                        onChange={(date: Date) => setFormData({ ...formData, date })}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                      >
                        {editingAppointment ? 'Update' : 'Schedule'}
                      </button>
                    </div>
                  </form>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default AppointmentScheduler;