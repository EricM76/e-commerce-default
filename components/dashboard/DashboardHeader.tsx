import React from 'react';
import { Page } from '../../App';
import BackIcon from '../icons/BackIcon';

interface DashboardHeaderProps {
  title: string;
  onNavigate: (page: Page) => void;
  children?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, onNavigate, children }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
      <div>
        <button onClick={() => onNavigate('dashboard')} className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-2">
          <BackIcon /> Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default DashboardHeader;
