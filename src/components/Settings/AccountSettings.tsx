import React from 'react';
import { Shield, CreditCard, Key } from 'lucide-react';

const AccountSettings = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Shield className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
            Enable
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CreditCard className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium">Payment Methods</p>
              <p className="text-sm text-gray-500">Manage your payment options</p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
            Manage
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Key className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="font-medium">Change Password</p>
              <p className="text-sm text-gray-500">Update your password</p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
            Update
          </button>
        </div>

        <div className="pt-4 border-t">
          <button className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;