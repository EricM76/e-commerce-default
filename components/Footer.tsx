
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">POLO</h3>
            <p className="text-sm">
              The multi-purpose, responsive, and high-performance ecommerce experience for the modern web.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-300 uppercase mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Men</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Women</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-300 uppercase mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-300 uppercase mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Sign up for 10% off your first order.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-3 py-2 text-gray-900 rounded-l-md focus:outline-none"
              />
              <button 
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
              >
                Go
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Polo, Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social media icons would go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
