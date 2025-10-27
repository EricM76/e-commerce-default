import React, { useMemo } from 'react';
import { Product, CartItem } from '../types';
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
}

const DashboardPage: React.FC<DashboardPageProps> = ({ allProducts, cartItems }) => {
  const totalPotentialRevenue = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalProducts = allProducts.length;
  const itemsInCarts = useMemo(() => {
     return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  // Mocked data as we don't have a user database
  const totalUsers = 1;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Potential Revenue" 
            value={`$${totalPotentialRevenue.toFixed(2)}`}
            icon={<DollarSignIcon />}
            color="green"
          />
          <StatCard 
            title="Total Products" 
            value={totalProducts}
            icon={<BoxIcon />}
            color="blue"
          />
          <StatCard 
            title="Items in Carts" 
            value={itemsInCarts}
            icon={<ShoppingCartIcon />}
            color="indigo"
          />
           <StatCard 
            title="Active Users" 
            value={totalUsers}
            icon={<UsersIcon />}
            color="purple"
          />
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
