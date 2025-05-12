import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X, Flower } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Custom Bouquets', path: '/custom' },
    { name: 'About Us', path: '/about' },
    //{ name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Flower className={`mr-2 ${isScrolled ? 'text-[#F8BBD0]' : 'text-[#F8BBD0]'}`} size={28} />
            <span className={`font-serif text-xl md:text-2xl font-bold ${isScrolled ? 'text-[#37474F]' : 'text-[#37474F]'}`}>
              Fleurish
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`font-medium transition-colors duration-300 ${
                  location.pathname === link.path 
                    ? 'text-[#F8BBD0]' 
                    : isScrolled ? 'text-[#37474F] hover:text-[#F8BBD0]' : 'text-[#37474F] hover:text-[#F8BBD0]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className={`p-2 rounded-full ${isScrolled ? 'hover:bg-[#FFF1F8]' : 'hover:bg-white/10'}`}>
              <Search size={20} className={`${isScrolled ? 'text-[#37474F]' : 'text-[#37474F]'}`} />
            </button>
            <button className={`p-2 rounded-full ${isScrolled ? 'hover:bg-[#FFF1F8]' : 'hover:bg-white/10'}`}>
              <Heart size={20} className={`${isScrolled ? 'text-[#37474F]' : 'text-[#37474F]'}`} />
            </button>
            <Link 
              to="/checkout" 
              className={`p-2 rounded-full ${isScrolled ? 'hover:bg-[#FFF1F8]' : 'hover:bg-white/10'}`}
            >
              <ShoppingCart size={20} className={`${isScrolled ? 'text-[#37474F]' : 'text-[#37474F]'}`} />
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X size={24} className={`${isScrolled ? 'text-[#37474F]' : 'text-[#37474F]'}`} />
              ) : (
                <Menu size={24} className={`${isScrolled ? 'text-[#37474F]' : 'text-[#37474F]'}`} />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg py-4 px-6 transition-all duration-300">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-medium py-2 ${
                    location.pathname === link.path ? 'text-[#F8BBD0]' : 'text-[#37474F]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;