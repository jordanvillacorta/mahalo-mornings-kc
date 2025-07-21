import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/menu', label: 'Menu' },
    { path: '/location', label: 'Location' },
    { path: '/connect', label: 'Connect' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 flex-shrink min-w-0">
            <img 
              src="https://00a7c639c65ed95d3e4c.cdn6.editmysite.com/uploads/b/00a7c639c65ed95d3e4ce3d12d319434fc63767556c5c50cf2af23fdcac41739/Untitled%20design.png_1742504035.png?width=2400&optimize=medium"
              alt="Mahalo Mornings Logo"
              className="h-10 sm:h-12 w-auto flex-shrink-0"
            />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Mahalo Mornings</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8 items-center flex-shrink-0">
            {/* Left Navigation Items */}
            <div className="flex space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors duration-200 whitespace-nowrap ${
                  isActive(item.path)
                    ? 'text-coral-500 font-semibold'
                    : 'text-gray-700 hover:text-coral-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
            </div>
            
            {/* Order Now Button */}
            <a
              href="https://mahalomorningskc.square.site"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 lg:px-4 py-1.5 bg-coral-500 hover:bg-coral-600 text-white rounded-full text-xs lg:text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md whitespace-nowrap"
            >
              Order Now
            </a>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 lg:space-x-4 ml-2 lg:ml-4 pl-2 lg:pl-4 border-l border-gray-200">
              <a
                href="https://www.instagram.com/mahalomorningskc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-500 transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} className="lg:w-5 lg:h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61570248065109"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={18} className="lg:w-5 lg:h-5" />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`transition-colors duration-200 text-left ${
                    isActive(item.path)
                      ? 'text-coral-500 font-semibold'
                      : 'text-gray-700 hover:text-coral-500'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Order Now Button */}
              <a
                href="https://mahalomorningskc.square.site"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-center mt-4"
              >
                Order Now
              </a>
              
              {/* Mobile Social Media Icons */}
              <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
                <a
                  href="https://www.instagram.com/mahalomorningskc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-500 transition-colors duration-200"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61570248065109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook size={24} />
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;