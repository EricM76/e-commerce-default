import React, { useState } from 'react';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import SearchIcon from './icons/SearchIcon';
import MenuIcon from './icons/MenuIcon';
import UserIcon from './icons/UserIcon';
import UserLoggedInIcon from './icons/UserLoggedInIcon';
import { Page } from '../App';


interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
  onNavigate: (page: Page) => void;
  currentPage: Page;
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onSearchClick, onNavigate, currentPage, isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinkClasses = (page: Page) => 
    `font-medium transition-colors ${
      currentPage === page 
      ? 'text-gray-900' 
      : 'text-gray-600 hover:text-gray-900'
    }`;
    
  const mobileNavLinkClasses = (page: Page) => 
    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
      currentPage === page 
      ? 'bg-gray-100 text-gray-900' 
      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
    }`;


  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home');}} className="text-2xl font-bold text-gray-900 tracking-wider">POLO</a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-8">
            <button onClick={() => onNavigate('home')} className={navLinkClasses('home')}>Home</button>
            <button onClick={() => onNavigate('shop')} className={navLinkClasses('shop')}>Shop</button>
            <button onClick={() => onNavigate('products')} className={navLinkClasses('products')}>Products</button>
            <button onClick={() => onNavigate('about')} className={navLinkClasses('about')}>About</button>
            <button onClick={() => onNavigate('contact')} className={navLinkClasses('contact')}>Contact</button>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button onClick={onSearchClick} className="text-gray-600 hover:text-gray-900 transition-colors" aria-label="Search">
              <SearchIcon />
            </button>
             <button onClick={() => onNavigate('auth')} className="text-gray-600 hover:text-gray-900 transition-colors" aria-label={isLoggedIn ? "My Account" : "Login"}>
              {isLoggedIn ? <UserLoggedInIcon /> : <UserIcon />}
            </button>
            <div className="relative">
              <button
                onClick={onCartClick}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <ShoppingCartIcon />
              </button>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center pointer-events-none">
                  {cartCount}
                </span>
              )}
            </div>
            <button
              className="md:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col space-y-1 px-2 py-3">
            <button onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} className={mobileNavLinkClasses('home')}>Home</button>
            <button onClick={() => { onNavigate('shop'); setIsMenuOpen(false); }} className={mobileNavLinkClasses('shop')}>Shop</button>
            <button onClick={() => { onNavigate('products'); setIsMenuOpen(false); }} className={mobileNavLinkClasses('products')}>Products</button>
            <button onClick={() => { onNavigate('about'); setIsMenuOpen(false); }} className={mobileNavLinkClasses('about')}>About</button>
            <button onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }} className={mobileNavLinkClasses('contact')}>Contact</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;