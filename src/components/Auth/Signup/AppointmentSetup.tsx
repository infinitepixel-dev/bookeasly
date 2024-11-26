import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';
import { useBusinessType } from '../../../contexts/BusinessTypeContext';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
const nameRegex = /^[A-Za-z\s-]+$/;

const appointmentSchema = z.object({
  profile: z.object({
    companyName: z.string().min(1, 'Company name is required'),
    firstName: z.string()
      .min(1, 'First name is required')
      .regex(nameRegex, 'First name can only contain letters'),
    lastName: z.string()
      .min(1, 'Last name is required')
      .regex(nameRegex, 'Last name can only contain letters'),
    email: z.string().email('Invalid email address'),
    phone: z.string()
      .regex(phoneRegex, 'Phone must be in format: 123-123-1234'),
    address: z.string().min(1, 'Address is required'),
    city: z.string()
      .min(1, 'City is required')
      .regex(nameRegex, 'City can only contain letters'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string()
      .min(5, 'ZIP code must be 5 digits')
      .regex(/^\d{5}$/, 'ZIP code must be exactly 5 digits'),
  }),
  appointmentTypes: z.array(
    z.object({
      name: z.string().min(1, 'Name is required'),
      duration: z.number().min(1, 'Duration must be at least 1 minute'),
      price: z.number().min(0, 'Price must be 0 or greater'),
    })
  ).min(1, 'At least one appointment type is required'),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const AppointmentSetup = () => {
  const navigate = useNavigate();
  const { setAppointmentTypes, setUserProfile } = useBusinessType();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      appointmentTypes: [{ name: '', duration: 30, price: 0 }],
      profile: {
        companyName: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'appointmentTypes',
  });

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue('profile.phone', formatted);
  };

  const onSubmit = (data: AppointmentFormData) => {
    setAppointmentTypes(
      data.appointmentTypes.map((type, index) => ({
        ...type,
        id: `type-${index}`,
      }))
    );
    setUserProfile(data.profile);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-6">Business Profile</h3>
        
        {/* Company Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Company Information</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                {...register('profile.companyName')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your company name"
              />
              {errors.profile?.companyName && (
                <p className="mt-1 text-sm text-red-600">{errors.profile.companyName.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Personal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                {...register('profile.firstName')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your first name"
              />
              {errors.profile?.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.profile.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                {...register('profile.lastName')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your last name"
              />
              {errors.profile?.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.profile.lastName.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register('profile.email')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
              {errors.profile?.email && (
                <p className="mt-1 text-sm text-red-600">{errors.profile.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                {...register('profile.phone')}
                onChange={handlePhoneChange}
                placeholder="123-456-7890"
                maxLength={12}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.profile?.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.profile.phone.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Business Address</h4>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Street Address</label>
              <input
                type="text"
                {...register('profile.address')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your street address"
              />
              {errors.profile?.address && (
                <p className="mt-1 text-sm text-red-600">{errors.profile.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  {...register('profile.city')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter your city"
                />
                {errors.profile?.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.profile.city.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <select
                  {...register('profile.state')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  {US_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.profile?.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.profile.state.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                <input
                  type="text"
                  {...register('profile.zipCode')}
                  maxLength={5}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="12345"
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.profile?.zipCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.profile.zipCode.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Services Offered</h3>
          <button
            type="button"
            onClick={() => append({ name: '', duration: 30, price: 0 })}
            className="flex items-center gap-2 px-3 py-2 text-sm text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start bg-white p-4 rounded-lg shadow-sm">
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service Name</label>
                  <input
                    type="text"
                    {...register(`appointmentTypes.${index}.name`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="e.g., Consultation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration (min)</label>
                  <input
                    type="number"
                    {...register(`appointmentTypes.${index}.duration`, { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    {...register(`appointmentTypes.${index}.price`, { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>
              </div>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="mt-7 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Complete Setup
        </button>
      </div>
    </form>
  );
};

export default AppointmentSetup;