import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import FilterSidebar from './FilterSidebar';
import ProductGrid from './ProductGrid';
import FilterIcon from './icons/FilterIcon';
import CloseIcon from './icons/CloseIcon';

interface ShopPageProps {
  allProducts: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  favoritedIds: number[];
  onToggleFavorite: (productId: number) => void;
}

interface Filters {
  searchTerm: string;
  categories: string[];
  maxPrice: number;
  onSaleOnly: boolean;
}

const ShopPage: React.FC<ShopPageProps> = ({ allProducts, onAddToCart, onProductClick, favoritedIds, onToggleFavorite }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const maxPriceInitial = useMemo(() => Math.ceil(Math.max(...allProducts.map(p => p.price))), [allProducts]);

  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    categories: [],
    maxPrice: maxPriceInitial,
    onSaleOnly: false,
  });
  
  // Reset max price if initial value changes
  useEffect(() => {
    setFilters(f => ({ ...f, maxPrice: maxPriceInitial }));
  }, [maxPriceInitial]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Search term filter
      if (filters.searchTerm && !product.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }
      // Price filter
      if (product.price > filters.maxPrice) {
        return false;
      }
      // Sale filter
      if (filters.onSaleOnly && (!product.originalPrice || product.originalPrice <= product.price)) {
        return false;
      }
      return true;
    });
  }, [allProducts, filters]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Shop All Products</h1>
        <p className="mt-4 text-xl text-gray-600">Find your next favorite item from our collection.</p>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
        {/* --- Filter Sidebar (Desktop) --- */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
             <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                allProducts={allProducts}
                maxPriceInitial={maxPriceInitial}
             />
          </div>
        </aside>

        {/* --- Product Grid --- */}
        <div className="lg:col-span-3">
          <ProductGrid
            products={filteredProducts}
            onAddToCart={onAddToCart}
            onProductClick={onProductClick}
            favoritedIds={favoritedIds}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      </div>
      
      {/* --- Mobile Filter Button --- */}
      <div className="lg:hidden fixed bottom-4 right-4 z-30">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="bg-gray-900 text-white p-4 rounded-full shadow-lg flex items-center gap-x-2"
        >
          <FilterIcon />
          <span className="font-semibold">Filters</span>
        </button>
      </div>

      {/* --- Mobile Filter Sidebar --- */}
      {/* Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      ></div>
      {/* Panel */}
       <div
        className={`lg:hidden fixed top-0 left-0 h-full w-full max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setIsSidebarOpen(false)} aria-label="Close filters">
                <CloseIcon />
            </button>
        </div>
        <div className="p-4 overflow-y-auto">
             <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                allProducts={allProducts}
                maxPriceInitial={maxPriceInitial}
             />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;