import React from 'react';
import { Product } from '../types';

interface SearchResultItemProps {
  product: Product;
  onProductSelect: (product: Product) => void;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ product, onProductSelect }) => {
  return (
    <li className="border-b last:border-b-0">
      <button 
        onClick={() => onProductSelect(product)}
        className="flex items-center w-full p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="ml-4 flex-1">
          <p className="font-medium text-gray-900 truncate">{product.name}</p>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
      </button>
    </li>
  );
};

export default SearchResultItem;
