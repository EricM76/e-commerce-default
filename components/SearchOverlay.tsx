import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import CloseIcon from './icons/CloseIcon';
import SearchIcon from './icons/SearchIcon';
import SearchResultItem from './SearchResultItem';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  allProducts: Product[];
  onProductSelect: (product: Product) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, allProducts, onProductSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Reset search term when overlay is closed
  useEffect(() => {
    if (!isOpen) {
      // Delay reset to allow fade-out animation
      setTimeout(() => setSearchTerm(''), 300);
    }
  }, [isOpen]);
  
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 10); // Limit results for performance and usability
  }, [allProducts, searchTerm]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Search Panel */}
      <div
        className={`fixed inset-0 z-50 flex justify-center items-start pt-20 sm:pt-24 md:pt-32 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full max-w-2xl px-4" onClick={(e) => e.stopPropagation()}>
           <div className="relative">
             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
               <SearchIcon />
             </div>
             <input
               type="text"
               placeholder="Search for products..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="block w-full rounded-md border-0 bg-white py-4 pl-12 pr-12 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
             />
             <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <button onClick={onClose} aria-label="Close search" className="text-gray-500 hover:text-gray-800">
                    <CloseIcon/>
                </button>
             </div>
           </div>
            
           {searchTerm && (
             <div className="mt-4 max-h-[60vh] overflow-y-auto bg-white rounded-md shadow-lg">
                {filteredProducts.length > 0 ? (
                    <ul>
                        {filteredProducts.map(product => (
                           <SearchResultItem 
                             key={product.id}
                             product={product}
                             onProductSelect={onProductSelect}
                           />
                        ))}
                    </ul>
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        <p>No products found for "{searchTerm}"</p>
                    </div>
                )}
             </div>
           )}
        </div>
      </div>
    </>
  );
};

export default SearchOverlay;
