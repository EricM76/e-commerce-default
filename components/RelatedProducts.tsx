
import React, { useRef, useState, useEffect } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface RelatedProductsProps {
  currentProductId: number;
  currentProductCategory: string;
  allProducts: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  // FIX: Add missing props for favoriting functionality.
  favoritedIds: number[];
  onToggleFavorite: (productId: number) => void;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  currentProductId,
  currentProductCategory,
  allProducts,
  onAddToCart,
  onProductClick,
  favoritedIds,
  onToggleFavorite
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const related = allProducts
    .filter(p => p.category === currentProductCategory && p.id !== currentProductId)
    .slice(0, 8);

  const updateScrollState = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setIsScrollable(hasOverflow);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      updateScrollState();
      const resizeObserver = new ResizeObserver(updateScrollState);
      resizeObserver.observe(el);

      // Also re-check when the related products themselves change
      return () => resizeObserver.disconnect();
    }
  }, [related]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.8;
    // A small buffer is added to account for fractional pixel values
    const isAtEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
    const isAtStart = el.scrollLeft <= 0;

    if (direction === 'right') {
      if (isAtEnd) {
        // Loop to the beginning
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    } else { // direction === 'left'
      if (isAtStart) {
        // Loop to the end
        el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (related.length === 0) {
    return null;
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      {/* Container for the title, so it aligns with the rest of the page content */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">You might also like</h2>
      </div>

      {/* Full-width container for the carousel */}
      <div className="relative mt-6">
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 scroll-smooth scrollbar-hide"
        >
          {related.map(product => (
            <div key={product.id} className="w-64 flex-shrink-0 sm:w-72">
               <ProductCard 
                product={product} 
                onAddToCart={onAddToCart}
                onProductClick={onProductClick}
                // FIX: Pass missing props to ProductCard.
                isFavorited={favoritedIds.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          ))}
        </div>
        
        {isScrollable && (
          <>
            <button
              onClick={() => scroll('left')}
              className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity hidden sm:flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon />
            </button>

            <button
              onClick={() => scroll('right')}
              className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity hidden sm:flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
