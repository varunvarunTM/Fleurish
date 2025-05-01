import React, { useState, useEffect } from 'react';
import BouquetGrid from '../components/bouquets/BouquetGrid';
import BouquetFilter from '../components/bouquets/BouquetFilter';
import bouquets from '../data/bouquets';
import { Bouquet } from '../types/bouquet';

const Shop: React.FC = () => {
  const [filteredBouquets, setFilteredBouquets] = useState<Bouquet[]>(bouquets);
  const [sortOption, setSortOption] = useState<string>('popularity');
  const [cart, setCart] = useState<Bouquet[]>([]);
  const [wishlist, setWishlist] = useState<Bouquet[]>([]);
  
  const applyFilters = (filters: Record<string, string[]>) => {
    let result = [...bouquets];
    
    // Filter by occasion
    if (filters.occasions.length > 0) {
      result = result.filter(bouquet => 
        filters.occasions.some(occasion => 
          bouquet.tags.some(tag => tag.toLowerCase().includes(occasion))
        )
      );
    }
    
    // Filter by flower type
    if (filters.flowers.length > 0) {
      result = result.filter(bouquet => 
        filters.flowers.some(flower => 
          bouquet.tags.some(tag => tag.toLowerCase().includes(flower)) ||
          bouquet.description.toLowerCase().includes(flower)
        )
      );
    }
    
    // Filter by color
    if (filters.colors.length > 0) {
      result = result.filter(bouquet => 
        filters.colors.some(color => 
          bouquet.tags.some(tag => tag.toLowerCase().includes(color)) ||
          bouquet.description.toLowerCase().includes(color)
        )
      );
    }
    
    // Filter by price range
    if (filters.price.length > 0) {
      result = result.filter(bouquet => {
        const effectivePrice = bouquet.discountedPrice || bouquet.price;
        
        return filters.price.some(priceRange => {
          switch (priceRange) {
            case 'under-50':
              return effectivePrice < 50;
            case '50-100':
              return effectivePrice >= 50 && effectivePrice <= 100;
            case '100-150':
              return effectivePrice > 100 && effectivePrice <= 150;
            case 'over-150':
              return effectivePrice > 150;
            default:
              return true;
          }
        });
      });
    }
    
    setFilteredBouquets(result);
  };
  
  const applySorting = (sortBy: string) => {
    let sorted = [...filteredBouquets];
    
    switch (sortBy) {
      case 'popularity':
        // For this example, we'll use the rating as a proxy for popularity
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, you'd sort by date added - here we'll use isNew as a proxy
        sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-low':
        sorted.sort((a, b) => {
          const aPrice = a.discountedPrice || a.price;
          const bPrice = b.discountedPrice || b.price;
          return aPrice - bPrice;
        });
        break;
      case 'price-high':
        sorted.sort((a, b) => {
          const aPrice = a.discountedPrice || a.price;
          const bPrice = b.discountedPrice || b.price;
          return bPrice - aPrice;
        });
        break;
      default:
        break;
    }
    
    setFilteredBouquets(sorted);
  };
  
  useEffect(() => {
    applySorting(sortOption);
  }, [sortOption]);
  
  const handleSortChange = (option: string) => {
    setSortOption(option);
  };
  
  const handleAddToCart = (bouquet: Bouquet) => {
    setCart([...cart, bouquet]);
    // In a real app, you would likely use context or Redux to manage the cart state
    alert(`Added ${bouquet.name} to cart!`);
  };
  
  const handleAddToWishlist = (bouquet: Bouquet) => {
    setWishlist([...wishlist, bouquet]);
    // In a real app, you would likely use context or Redux to manage the wishlist state
    alert(`Added ${bouquet.name} to wishlist!`);
  };
  
  return (
    <div>
      {/* Shop Header */}
      <section className="bg-[#FFF1F8] py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#37474F] mb-4">
              Shop Our Bouquets
            </h1>
            <p className="text-[#78909C] text-lg max-w-2xl mx-auto">
              Browse our curated collection of beautiful bouquets for every occasion, 
              from romantic roses to cheerful sunflowers.
            </p>
          </div>
        </div>
      </section>
      
      {/* Shop Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <BouquetFilter 
                onFilterChange={applyFilters} 
                onSortChange={handleSortChange}
              />
            </div>
            
            {/* Main Content */}
            <div className="flex-grow">
              {/* Sort and Results Count (Desktop) */}
              <div className="hidden lg:flex justify-between items-center mb-6">
                <div className="text-[#37474F]">
                  Showing <span className="font-medium">{filteredBouquets.length}</span> bouquets
                </div>
                <div className="flex items-center">
                  <span className="text-[#37474F] mr-2">Sort by:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="border border-gray-200 rounded-md p-2 focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                  >
                    <option value="popularity">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
              
              {/* Bouquets Grid */}
              {filteredBouquets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBouquets.map((bouquet) => (
                    <div key={bouquet.id}>
                      <BouquetCard 
                        bouquet={bouquet}
                        onAddToCart={handleAddToCart}
                        onAddToWishlist={handleAddToWishlist}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-[#78909C] text-lg mb-4">No bouquets match your current filters.</p>
                  <button 
                    onClick={() => {
                      // Reset filters by applying empty filters
                      applyFilters({
                        occasions: [],
                        flowers: [],
                        colors: [],
                        price: []
                      });
                    }}
                    className="btn-outline"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Import BouquetCard component here for the Shop page
import BouquetCard from '../components/bouquets/BouquetCard';

export default Shop;