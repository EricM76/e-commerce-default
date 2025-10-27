import React from 'react';
import { User } from '../types';
import { Page } from '../App';
import LogoutIcon from './icons/LogoutIcon';
import BackIcon from './icons/BackIcon';

interface ProfilePageProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout, onNavigate }) => {
  return (
    <div className="max-w-2xl mx-auto">
       <div className="mb-6">
        <button onClick={() => onNavigate('shop')} className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2">
          <BackIcon /> Back to shop
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-8">
        <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-gray-600">{user.name.charAt(0)}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-md text-gray-500 mt-1">{user.email}</p>
        </div>

        <div className="mt-8 border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-800">Account Details</h2>
            <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Username:</span>
                    <span className="font-medium text-gray-800">{user.name}</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-gray-800">{user.email}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Password:</span>
                    <button className="font-medium text-blue-600 hover:text-blue-500 text-sm">Change password</button>
                </div>
            </div>
        </div>
        
        <div className="mt-8">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-x-2 rounded-md border border-red-600 bg-transparent py-2 px-4 text-sm font-medium text-red-600 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
