import React from 'react';
import { Product } from '../types';
import { Page } from '../App';

interface FeaturedProductSectionProps {
  product: Product;
  title: string;
  subtitle: string;
  description: string;
  onNavigate: (page: Page) => void;
  layout?: 'left' | 'right';
}

const FeaturedProductSection: React.FC<FeaturedProductSectionProps> = ({
  product,
  title,
  subtitle,
  description,
  onNavigate,
  layout = 'left',
}) => {
  const isImageLeft = layout === 'left';

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${!isImageLeft ? 'md:flex-row-reverse' : ''}`}>
          {/* Image Column */}
          <div className="md:w-1/2">
            <img 
              src={product.images[1] || product.imageUrl} 
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg shadow-2xl"
            />
          </div>

          {/* Text Column */}
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">{subtitle}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">{title}</h2>
            <p className="mt-4 text-lg text-gray-600">
              {description}
            </p>
            <button
              onClick={() => onNavigate('products')}
              className="mt-8 bg-gray-900 text-white font-bold py-3 px-8 rounded-full uppercase tracking-wider hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              Shop Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductSection;