import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Bouquet } from '../../types/bouquet';

interface BouquetCardProps {
  bouquet: Bouquet;
  onAddToCart: (bouquet: Bouquet) => void;
  onAddToWishlist: (bouquet: Bouquet) => void;
}

const BouquetCard: React.FC<BouquetCardProps> = ({ 
  bouquet, 
  onAddToCart, 
  onAddToWishlist 
}) => {
  const { id, name, image, price, discountedPrice, tags, rating, isNew } = bouquet;
  
  const discount = discountedPrice ? Math.round((1 - discountedPrice / price) * 100) : 0;
  
  return (
    <div className="card card-hover-effect h-full flex flex-col">
      <div className="relative overflow-hidden">
        {/* Bouquet Image */}
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover bloom-animation"
        />
        
        {/* Discount Tag */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-[#EF9A9A] text-white text-xs font-medium px-2 py-1 rounded-full">
            {discount}% OFF
          </div>
        )}
        
        {/* New Tag */}
        {isNew && (
          <div className="absolute top-3 right-3 bg-[#C5E1A5] text-white text-xs font-medium px-2 py-1 rounded-full">
            NEW
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute bottom-3 right-3 flex flex-col space-y-2">
          <button 
            onClick={() => onAddToWishlist(bouquet)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-[#FFF1F8] transition-colors duration-300"
            title="Add to Wishlist"
          >
            <Heart size={18} className="text-[#F8BBD0]" />
          </button>
          <button 
            onClick={() => onAddToCart(bouquet)}
            className="p-2 bg-[#F8BBD0] rounded-full shadow-md hover:bg-[#C48B9F] transition-colors duration-300"
            title="Add to Cart"
          >
            <ShoppingCart size={18} className="text-white" />
          </button>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col justify-between">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs bg-[#F4F0FA] text-[#9F94B7] px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Bouquet Name */}
        <h3 className="font-serif text-lg font-medium text-[#37474F] mb-2">{name}</h3>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < rating ? 'text-[#FFE082]' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-1 text-xs text-[#78909C]">({Math.floor(Math.random() * 200) + 10})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center mt-auto">
          {discountedPrice ? (
            <>
              <span className="font-medium text-[#37474F]">${discountedPrice.toFixed(2)}</span>
              <span className="ml-2 text-sm text-[#78909C] line-through">${price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-medium text-[#37474F]">${price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BouquetCard;