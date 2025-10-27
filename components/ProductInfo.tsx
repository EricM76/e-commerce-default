import React, { useState } from 'react';
import { Product } from '../types';

interface ProductInfoProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const isSale = product.originalPrice && product.originalPrice > product.price;

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
  };
  
  const discountPercentage = isSale ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{product.category}</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{product.name}</h1>
      <div className="flex items-baseline space-x-3">
        <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
        {isSale && (
          <>
            <p className="text-xl text-gray-500 line-through">${product.originalPrice?.toFixed(2)}</p>
            <span className="text-sm font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">{discountPercentage}% OFF</span>
          </>
        )}
      </div>
      <p className="text-base text-gray-600 leading-relaxed">{product.description}</p>
      
      <div className="flex items-center space-x-4 pt-4">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-5 py-2 font-medium">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCartClick}
          className="flex-1 bg-gray-900 text-white font-bold py-3 px-6 rounded-md uppercase tracking-wider hover:bg-gray-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
