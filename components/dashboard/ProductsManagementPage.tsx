import React, { useState } from 'react';
import { Page } from '../../App';
import { Product } from '../../types';
import DashboardHeader from './DashboardHeader';
import ProductFormModal from './ProductFormModal';
import EditIcon from '../icons/EditIcon';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';

interface ProductsManagementPageProps {
  products: Product[];
  onAdd: (product: Omit<Product, 'id' | 'reviews'>) => void;
  onUpdate: (product: Product) => void;
  onDelete: (productId: number) => void;
  onNavigate: (page: Page) => void;
}

const ProductsManagementPage: React.FC<ProductsManagementPageProps> = ({ products, onAdd, onUpdate, onDelete, onNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      onDelete(productId);
    }
  };
  
  const handleFormSubmit = (productData: Product | Omit<Product, 'id' | 'reviews'>) => {
    if ('id' in productData) {
      onUpdate(productData as Product);
    } else {
      onAdd(productData);
    }
    setIsModalOpen(false);
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DashboardHeader title="Manage Products" onNavigate={onNavigate}>
            <button
                onClick={handleOpenAddModal}
                className="flex items-center justify-center gap-x-2 rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors"
            >
                <PlusIcon />
                Add Product
            </button>
        </DashboardHeader>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 responsive-table">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td data-label="Product" className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img className="h-10 w-10 rounded-md object-cover" src={product.imageUrl} alt={product.name} />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td data-label="Category" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                            <td data-label="Price" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                            <td data-label="Actions" className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center justify-end md:justify-start space-x-4">
                                    <button onClick={() => handleOpenEditModal(product)} className="text-indigo-600 hover:text-indigo-900"><EditIcon /></button>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900"><TrashIcon /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
      
      {isModalOpen && (
        <ProductFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleFormSubmit}
            productToEdit={editingProduct}
        />
      )}
    </div>
  );
};

export default ProductsManagementPage;
