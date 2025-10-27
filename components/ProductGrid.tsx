import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  favoritedIds: number[];
  onToggleFavorite: (productId: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, onProductClick, favoritedIds, onToggleFavorite }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-semibold text-gray-900">No Products Found</h3>
        <p className="mt-2 text-gray-600">Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
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
  );
};

export default ProductGrid;