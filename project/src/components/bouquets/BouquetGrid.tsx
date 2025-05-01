import React from 'react';
import BouquetCard from './BouquetCard';
import { Bouquet } from '../../types/bouquet';

interface BouquetGridProps {
  bouquets: Bouquet[];
  title?: string;
  subtitle?: string;
  onAddToCart: (bouquet: Bouquet) => void;
  onAddToWishlist: (bouquet: Bouquet) => void;
}

const BouquetGrid: React.FC<BouquetGridProps> = ({ 
  bouquets, 
  title, 
  subtitle,
  onAddToCart,
  onAddToWishlist
}) => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#37474F] mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[#78909C] max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bouquets.map((bouquet) => (
            <BouquetCard 
              key={bouquet.id}
              bouquet={bouquet}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BouquetGrid;