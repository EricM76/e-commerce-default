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
import AuthPage from './components/AuthPage';
import DashboardPage from './components/DashboardPage';
import RevenuePage from './components/dashboard/RevenuePage';
import ProductsManagementPage from './components/dashboard/ProductsManagementPage';
import CartsActivityPage from './components/dashboard/CartsActivityPage';
import UsersManagementPage from './components/dashboard/UsersManagementPage';
import { Product, CartItem, User } from './types';
import { mockProducts } from './mockData';

export type Page = 
  'home' | 'shop' | 'products' | 'about' | 'contact' | 'auth' | 
  'dashboard' | 'dashboard-revenue' | 'dashboard-products' | 'dashboard-activity' | 'dashboard-users';

const App: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>(mockProducts);
  const [users, setUsers] = useState<User[]>([{ id: 1, name: 'Test User', email: 'test@test.com' }]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [favoritedIds, setFavoritedIds] = useState<number[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // --- CRUD Handlers for Products ---
  const handleAddProduct = (product: Omit<Product, 'id' | 'reviews'>) => {
    setAllProducts(prev => {
      const newProduct: Product = {
        ...product,
        id: Date.now(), // Simple unique ID generation
        reviews: [],
        images: product.images.length > 0 ? product.images : [product.imageUrl],
      };
      return [...prev, newProduct];
    });
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setAllProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  
  const handleDeleteProduct = (productId: number) => {
    setAllProducts(prev => prev.filter(p => p.id !== productId));
    // Also remove from cart and favorites if it exists there
    setCartItems(prev => prev.filter(item => item.id !== productId));
    setFavoritedIds(prev => prev.filter(id => id !== productId));
  };

  // --- CRUD Handlers for Users ---
   const handleAddUser = (user: Omit<User, 'id'>) => {
    setUsers(prev => {
      const newUser: User = {
        ...user,
        id: Date.now(),
      };
      return [...prev, newUser];
    });
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    // If the currently logged-in user is the one being updated, update their session info too
    if (currentUser && currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };
  
  const handleDeleteUser = (userId: number) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    // If the currently logged-in user is deleted, log them out
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(null);
    }
  };


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
    setIsSearchOpen(false);
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

  const handleLogin = (email: string): boolean => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      handleNavigate('home');
      return true;
    }
    return false;
  };

  const handleRegister = (name: string, email: string): boolean => {
    if (users.some(u => u.email === email)) {
      return false; // User already exists
    }
    const newUser: User = { id: Date.now(), name, email };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    handleNavigate('home');
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    handleNavigate('home');
  };

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
          allProducts={allProducts}
          onProductSelect={handleSelectProduct}
          favoritedIds={favoritedIds}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }
    
    switch (currentPage) {
      case 'shop':
        return <ShopPage allProducts={allProducts} onAddToCart={(product) => handleAddToCart(product)} onProductClick={handleSelectProduct} favoritedIds={favoritedIds} onToggleFavorite={handleToggleFavorite} />;
      case 'products':
        return <ProductsPage allProducts={allProducts} onAddToCart={(product) => handleAddToCart(product)} onProductClick={handleSelectProduct} favoritedIds={favoritedIds} onToggleFavorite={handleToggleFavorite} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'auth':
        return <AuthPage currentUser={currentUser} onLogin={handleLogin} onRegister={handleRegister} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage allProducts={allProducts} cartItems={cartItems} users={users} onNavigate={handleNavigate} />;
      case 'dashboard-revenue':
        return <RevenuePage cartItems={cartItems} onNavigate={handleNavigate} />;
      case 'dashboard-products':
        return <ProductsManagementPage products={allProducts} onAdd={handleAddProduct} onUpdate={handleUpdateProduct} onDelete={handleDeleteProduct} onNavigate={handleNavigate} />;
      case 'dashboard-activity':
        return <CartsActivityPage cartItems={cartItems} onNavigate={handleNavigate} />;
      case 'dashboard-users':
        return <UsersManagementPage users={users} onAdd={handleAddUser} onUpdate={handleUpdateUser} onDelete={handleDeleteUser} onNavigate={handleNavigate} />;
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} />;
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
        isLoggedIn={!!currentUser}
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
        allProducts={allProducts}
        onProductSelect={handleSelectProduct}
      />
    </div>
  );
};

export default App;