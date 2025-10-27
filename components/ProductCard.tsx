import React from 'react';
import { Product } from '../types';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import HeartIcon from './icons/HeartIcon';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  isFavorited: boolean;
  onToggleFavorite: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onProductClick, isFavorited, onToggleFavorite }) => {
  const isSale = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-w-3 aspect-h-4 bg-gray-200 sm:aspect-none sm:h-80">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(product.id);
              }}
              className={`p-2 rounded-full transition-colors duration-200 ${isFavorited ? 'bg-red-500 text-white' : 'bg-white/70 text-gray-700 hover:bg-white'}`}
              aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            >
              <HeartIcon filled={isFavorited} />
            </button>
        </div>
        {(product.isNew || isSale) && (
          <div className="absolute top-4 left-4">
            {product.isNew && <span className="bg-blue-600 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">NEW</span>}
            {isSale && <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">SALE</span>}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <a href="#" onClick={(e) => { e.preventDefault(); onProductClick(product); }}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </a>
        </h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="flex flex-1 flex-col justify-end">
          <div className="flex items-baseline space-x-2">
            <p className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
            {isSale && (
              <p className="text-sm text-gray-500 line-through">${product.originalPrice?.toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>
       <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCartIcon />
          </button>
        </div>
    </div>
  );
};

export default ProductCard;