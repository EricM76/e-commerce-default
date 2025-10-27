import React, { useMemo } from 'react';
import { Product, CartItem, User } from '../types';
import { Page } from '../App';
import StatCard from './dashboard/StatCard';
import DollarSignIcon from './icons/DollarSignIcon';
import BoxIcon from './icons/BoxIcon';
import UsersIcon from './icons/UsersIcon';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import CategoryChart from './dashboard/CategoryChart';
import RecentActivityTable from './dashboard/RecentActivityTable';

interface DashboardPageProps {
  allProducts: Product[];
  cartItems: CartItem[];
  users: User[];
  onNavigate: (page: Page) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ allProducts, cartItems, users, onNavigate }) => {
  const totalPotentialRevenue = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalProducts = allProducts.length;
  const itemsInCarts = useMemo(() => {
     return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const totalUsers = users.length;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div onClick={() => onNavigate('dashboard-revenue')} className="cursor-pointer transition-transform transform hover:scale-105">
            <StatCard 
              title="Potential Revenue" 
              value={`$${totalPotentialRevenue.toFixed(2)}`}
              icon={<DollarSignIcon />}
              color="green"
            />
          </div>
          <div onClick={() => onNavigate('dashboard-products')} className="cursor-pointer transition-transform transform hover:scale-105">
            <StatCard 
              title="Manage Products" 
              value={totalProducts}
              icon={<BoxIcon />}
              color="blue"
            />
          </div>
          <div onClick={() => onNavigate('dashboard-activity')} className="cursor-pointer transition-transform transform hover:scale-105">
            <StatCard 
              title="Carts Activity" 
              value={itemsInCarts}
              icon={<ShoppingCartIcon />}
              color="indigo"
            />
          </div>
          <div onClick={() => onNavigate('dashboard-users')} className="cursor-pointer transition-transform transform hover:scale-105">
            <StatCard 
              title="Manage Users" 
              value={totalUsers}
              icon={<UsersIcon />}
              color="purple"
            />
          </div>
        </div>

        {/* Charts and Tables */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
             <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity (Cart Additions)</h2>
             <RecentActivityTable cartItems={cartItems} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
             <h2 className="text-lg font-semibold text-gray-900 mb-4">Products by Category</h2>
            <CategoryChart products={allProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;