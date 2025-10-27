import React, { useMemo } from 'react';
import { Product } from '../types';
import ProductList from './ProductList';

interface ProductsPageProps {
  allProducts: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  favoritedIds: number[];
  onToggleFavorite: (productId: number) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = (props) => {
  
  const favoriteProducts = useMemo(() => 
    props.allProducts.filter(p => props.favoritedIds.includes(p.id)),
    [props.allProducts, props.favoritedIds]
  );
  
  const saleProducts = useMemo(() => 
    props.allProducts
      .filter(p => p.originalPrice && p.originalPrice > p.price)
      .slice(0, 8), 
    [props.allProducts]
  );

  const featuredProducts = useMemo(() => 
    props.allProducts
      .filter(p => !p.originalPrice || p.originalPrice <= p.price)
      .slice(0, 8), 
    [props.allProducts]
  );

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Our Products</h1>
            <p className="mt-4 text-xl text-gray-600">Explore our collections, find your favorites, and enjoy our special offers.</p>
        </div>
      </div>

      <ProductList 
        title="Your Wishlist"
        subtitle="Products you love, saved just for you."
        products={favoriteProducts}
        {...props}
      />

      <ProductList 
        title="Featured Products"
        subtitle="Our finest selection of products, curated just for you."
        products={featuredProducts}
        {...props}
      />
      
      {saleProducts.length > 0 && (
        <ProductList 
          title="Weekly Offers"
          subtitle="Don't miss out on these limited-time deals."
          products={saleProducts}
          {...props}
        />
      )}
    </>
  );
};

export default ProductsPage;