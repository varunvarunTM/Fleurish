import React from 'react';
import { Link } from 'react-router-dom';
import { Flower, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFF1F8] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <Flower className="text-[#F8BBD0] mr-2" size={24} />
              <span className="font-serif text-xl font-bold text-[#37474F]">Bloom & Deliver</span>
            </div>
            <p className="text-[#78909C] mb-6">
              Bringing joy and beauty with every bouquet delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#78909C] hover:text-[#F8BBD0] transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-[#78909C] hover:text-[#F8BBD0] transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-[#78909C] hover:text-[#F8BBD0] transition-colors duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-serif text-lg font-medium text-[#37474F] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-[#78909C] hover:text-[#F8BBD0] transition-colors duration-300">Shop All</Link></li>
              <li><Link to="/custom" className="text-[#78909C] hover:text-[#F8BBD0] transition-colors duration-300">Custom Bouquets</Link></li>
              <li><Link to="/occasions" className="text-[#78909C] hover:text-[#F8BBD0] transition-colors duration-300">Occasions</Link></li>
              <li><Link to="/subscriptions" className="text-[#78909C] hover:text-[#F8BBD0] transition-colors duration-300">Flower Subscriptions</Link></li>
              <li><Link to="/tracking" className="text-[#78909C] hover:text-[#F8BBD0] transition-colors duration-300">Track Order</Link></li>
            </ul>
          </div>
          
          {/* Information */}
          <div className="col-span-1">
            <h3 className="font-serif text-lg font-medium text-[#37474F] mb-4">Information</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-[#78909C] hover:text-[#F8BBD0] transition-colors duration-300">About Us</Link></li>
              <li><Link to="/delivery" className="text-[#78909C] hover:text-[#F8BBD0] transition-colors duration-300">Delivery Information</Link></li>
              <li><Link to="/faq" className="text-[#78909C] hover:text-[#F8BBD0] transition-colors duration-300">FAQ</Link></li>
              <li><Link to="/blog" className="text-[#78909C] hover:text-[#F8BBD0] transition-colors duration-300">Flower Care Tips</Link></li>
              <li><Link to="/terms" className="text-[#78909C] hover:text-[#F8BBD0] transition-colors duration-300">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="font-serif text-lg font-medium text-[#37474F] mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-[#F8BBD0] mr-2 mt-1 flex-shrink-0" />
                <span className="text-[#78909C]">123 Bloom Street, Floral City, FC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-[#F8BBD0] mr-2 flex-shrink-0" />
                <span className="text-[#78909C]">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-[#F8BBD0] mr-2 flex-shrink-0" />
                <span className="text-[#78909C]">hello@bloomanddeliver.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#F8BBD0]/20 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#78909C] text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Bloom & Deliver. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-[#78909C] text-sm hover:text-[#F8BBD0] transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-[#78909C] text-sm hover:text-[#F8BBD0] transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-[#78909C] text-sm hover:text-[#F8BBD0] transition-colors duration-300">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;