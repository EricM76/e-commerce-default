import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ShoppingCart from './components/ShoppingCart';
import ProductDetailPage from './components/ProductDetailPage';
import ShopPage from './components/ShopPage';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import SearchOverlay from './components/SearchOverlay';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import { Product, CartItem } from './types';
import { mockProducts } from './mockData';

export type Page = 'home' | 'shop' | 'products' | 'about' | 'contact';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [favoritedIds, setFavoritedIds] = useState<number[]>([]);

  const handleToggleFavorite = (productId: number) => {
    setFavoritedIds(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsSearchOpen(false); // Close search when a product is selected
    window.scrollTo(0, 0);
  };

  const handleBackFromDetail = () => {
    setSelectedProduct(null);
  };
  
  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setSelectedProduct(null); 
    window.scrollTo(0, 0);
  }

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const renderPage = () => {
    if (selectedProduct) {
      return (
        <ProductDetailPage 
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onBack={handleBackFromDetail}
          allProducts={mockProducts}
          onProductSelect={handleSelectProduct}
          favoritedIds={favoritedIds}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }
    
    switch (currentPage) {
      case 'shop':
        return (
          <ShopPage
            allProducts={mockProducts}
            onAddToCart={(product) => handleAddToCart(product)}
            onProductClick={handleSelectProduct}
            favoritedIds={favoritedIds}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      case 'products':
        return (
          <ProductsPage
            allProducts={mockProducts}
            onAddToCart={(product) => handleAddToCart(product)}
            onProductClick={handleSelectProduct}
            favoritedIds={favoritedIds}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return (
          <HomePage 
            onNavigate={handleNavigate}
          />
        );
    }
  }

  return (
    <div className="bg-white text-gray-800">
      <Header 
        cartCount={cartCount} 
        onCartClick={toggleCart}
        onSearchClick={toggleSearch}
        onNavigate={handleNavigate}
        currentPage={currentPage}
       />
      <main>
        {renderPage()}
      </main>
      <Footer />
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={toggleCart}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={toggleSearch}
        allProducts={mockProducts}
        onProductSelect={handleSelectProduct}
      />
    </div>
  );
};

export default App;