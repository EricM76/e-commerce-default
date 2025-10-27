import React, { useMemo } from 'react';
import { Product } from '../types';

interface Filters {
  searchTerm: string;
  categories: string[];
  maxPrice: number;
  onSaleOnly: boolean;
}

interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  allProducts: Product[];
  maxPriceInitial: number;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, allProducts, maxPriceInitial }) => {
  const categories = useMemo(() => [...new Set(allProducts.map(p => p.category))], [allProducts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };
  
  const handleCategoryChange = (category: string) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: newCategories };
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }));
  };

  const handleSaleToggle = () => {
    setFilters(prev => ({ ...prev, onSaleOnly: !prev.onSaleOnly }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      categories: [],
      maxPrice: maxPriceInitial,
      onSaleOnly: false,
    });
  };

  return (
    <div className="space-y-8">
      {/* Search Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Search Product</h3>
        <input
          type="text"
          placeholder="e.g. Trench Coat"
          value={filters.searchTerm}
          onChange={handleSearchChange}
          className="w-full px-3.5 py-2 border border-gray-300 rounded-md focus:ring-gray-900 focus:border-gray-900"
        />
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <span className="ml-3 text-gray-600">{category}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Price Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <input
          type="range"
          min="0"
          max={maxPriceInitial}
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>$0</span>
          <span>${filters.maxPrice}</span>
        </div>
      </div>
      
      {/* Sale Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Deals</h3>
         <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.onSaleOnly}
              onChange={handleSaleToggle}
              className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <span className="ml-3 text-gray-600">Show only sale items</span>
        </label>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
