import React, { useMemo } from 'react';
import { Page } from '../../App';
import { CartItem } from '../../types';
import DashboardHeader from './DashboardHeader';

interface RevenuePageProps {
  cartItems: CartItem[];
  onNavigate: (page: Page) => void;
}

const RevenuePage: React.FC<RevenuePageProps> = ({ cartItems, onNavigate }) => {
  const totalRevenue = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DashboardHeader title="Potential Revenue" onNavigate={onNavigate} />
        
        <div className="bg-white p-6 rounded-lg shadow-md">
            {cartItems.length === 0 ? (
                 <div className="text-center py-8">
                    <p className="text-gray-500">No items in carts to calculate revenue.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 responsive-table">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td data-label="Product" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                <td data-label="Unit Price" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
                                <td data-label="Quantity" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                                <td data-label="Total" className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                         <tfoot>
                            <tr className="bg-gray-50">
                                <td colSpan={3} className="px-6 py-4 text-right text-sm font-bold text-gray-900 uppercase">Grand Total</td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-900">${totalRevenue.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;
