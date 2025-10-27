import React from 'react';
import { Page } from '../../App';
import { CartItem } from '../../types';
import DashboardHeader from './DashboardHeader';
import RecentActivityTable from './RecentActivityTable';

interface CartsActivityPageProps {
  cartItems: CartItem[];
  onNavigate: (page: Page) => void;
}

const CartsActivityPage: React.FC<CartsActivityPageProps> = ({ cartItems, onNavigate }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DashboardHeader title="Carts Activity" onNavigate={onNavigate} />
        
        <div className="bg-white p-6 rounded-lg shadow-md">
            <RecentActivityTable cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default CartsActivityPage;
