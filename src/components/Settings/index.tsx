import React from 'react';
import ProfileSettings from './ProfileSettings';
import NotificationSettings from './NotificationSettings';
import AccountSettings from './AccountSettings';

const Settings = () => {
  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        
        <div className="space-y-6">
          <ProfileSettings />
          <NotificationSettings />
          <AccountSettings />
        </div>
      </div>
    </div>
  );
};

export default Settings;