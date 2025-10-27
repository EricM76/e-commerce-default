import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  title: string;
  subtitle: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  favoritedIds: number[];
  onToggleFavorite: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ title, subtitle, products, onAddToCart, onProductClick, favoritedIds, onToggleFavorite }) => {
  if (products.length === 0) {
    return (
      <div className="bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">{subtitle}</p>
          </div>
          <div className="text-center py-10">
            <p className="text-gray-500">Your wishlist is currently empty.</p>
            <p className="mt-2 text-sm text-gray-500">Add products to your wishlist by clicking the heart icon.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              onProductClick={onProductClick}
              isFavorited={favoritedIds.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;