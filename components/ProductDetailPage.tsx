
import React, { useState } from 'react';
import { Product } from '../types';
import ProductInfo from './ProductInfo';
import RelatedProducts from './RelatedProducts';
import CustomerReviews from './CustomerReviews';

interface ProductDetailPageProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBack: () => void;
  allProducts: Product[];
  onProductSelect: (product: Product) => void;
  // FIX: Add favoritedIds and onToggleFavorite to props to pass them down.
  favoritedIds: number[];
  onToggleFavorite: (productId: number) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onAddToCart, onBack, allProducts, onProductSelect, favoritedIds, onToggleFavorite }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <button onClick={onBack} className="text-sm font-medium text-gray-600 hover:text-gray-900">
          &larr; Back to shop
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-16">
        {/* Left Column: Image gallery */}
        <div className="flex flex-col-reverse gap-y-4">
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="mx-auto w-full max-w-2xl lg:max-w-none">
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`relative flex aspect-square cursor-pointer items-center justify-center rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ${
                      activeIndex === index ? 'ring-2 ring-gray-900' : 'ring-1 ring-transparent hover:ring-gray-300'
                    } transition-all duration-200`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main Image */}
          <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden rounded-lg shadow-lg">
             <img
              src={product.images[activeIndex]}
              alt={`Product image ${activeIndex + 1}`}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        
        {/* Right Column: Product Info & Reviews */}
        <div className="mt-10 lg:mt-0">
          <ProductInfo product={product} onAddToCart={onAddToCart} />
          <div className="mt-12">
            <CustomerReviews reviews={product.reviews} />
          </div>
        </div>
      </div>

      {/* Full-width section below */}
      <div className="mt-16 lg:mt-24">
        <RelatedProducts 
          currentProductId={product.id}
          currentProductCategory={product.category}
          allProducts={allProducts}
          onAddToCart={(p) => onAddToCart(p, 1)}
          onProductClick={onProductSelect}
          // FIX: Pass favoritedIds and onToggleFavorite to RelatedProducts.
          favoritedIds={favoritedIds}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
