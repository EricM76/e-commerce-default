import React, { useMemo } from 'react';
import { Product } from '../../types';

interface CategoryChartProps {
  products: Product[];
}

const barColors = [
  'bg-blue-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-500',
];

const CategoryChart: React.FC<CategoryChartProps> = ({ products }) => {
  const categoryData = useMemo(() => {
    // FIX: Use generic parameter on `reduce` to properly type the accumulator.
    // This resolves incorrect type inference for `counts` which caused downstream type errors.
    const counts = products.reduce<Record<string, number>>((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    const sortedCategories = Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8); // Show top 8 categories

    // FIX: Handle empty array case for `Math.max` to prevent it from returning -Infinity.
    const maxCount = sortedCategories.length > 0 ? Math.max(...sortedCategories.map(([, count]) => count)) : 0;

    return {
      labels: sortedCategories.map(([category]) => category),
      datasets: sortedCategories.map(([, count]) => ({
        count,
        percentage: maxCount > 0 ? (count / maxCount) * 100 : 0,
      })),
    };
  }, [products]);

  if (categoryData.labels.length === 0) {
    return <p className="text-center text-gray-500">No product data to display.</p>;
  }

  return (
    <div className="space-y-4">
      {categoryData.labels.map((label, index) => (
        <div key={label}>
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="font-medium text-gray-700">{label}</span>
            <span className="text-gray-500">{categoryData.datasets[index].count}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`${barColors[index % barColors.length]} h-2.5 rounded-full`}
              style={{ width: `${categoryData.datasets[index].percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryChart;
