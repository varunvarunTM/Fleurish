import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import BouquetGrid from '../components/bouquets/BouquetGrid';
import BouquetFilter from '../components/bouquets/BouquetFilter';
import BouquetCard from '../components/bouquets/BouquetCard';
import { Bouquet } from '../types/bouquet';

const Shop: React.FC = () => {
  const [allBouquets, setAllBouquets] = useState<Bouquet[]>([]);
  const [filteredBouquets, setFilteredBouquets] = useState<Bouquet[]>([]);
  const [sortOption, setSortOption] = useState<string>('alphabetical');
  const [cart, setCart] = useState<Bouquet[]>([]);
  const [wishlist, setWishlist] = useState<Bouquet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBouquets = async () => {
      try {
        const response = await axios.get<Bouquet[]>('http://localhost:8080/get-products');
        setAllBouquets(response.data);
        setFilteredBouquets(response.data);
        setError(null);
      } catch (err: any) {
        setError('Failed to fetch bouquets. Please check if backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchBouquets();
  }, []);

  const applyFilters = (filters: Record<string, string[]>) => {
    let result = [...allBouquets];

    if (filters.occasions.length > 0) {
      result = result.filter(b =>
        filters.occasions.some(o =>
          b.tags.some(tag => tag.toLowerCase().includes(o))
        )
      );
    }

    if (filters.flowers.length > 0) {
      result = result.filter(b =>
        filters.flowers.some(f =>
          b.tags.some(tag => tag.toLowerCase().includes(f)) ||
          b.description.toLowerCase().includes(f)
        )
      );
    }

    if (filters.colors.length > 0) {
      result = result.filter(b =>
        filters.colors.some(c =>
          b.tags.some(tag => tag.toLowerCase().includes(c)) ||
          b.description.toLowerCase().includes(c)
        )
      );
    }

    if (filters.price.length > 0) {
      result = result.filter(b => {
        const price = b.discountedPrice || b.price;
        return filters.price.some(range => {
          switch (range) {
            case 'under-50': return price < 50;
            case '50-100': return price >= 50 && price <= 100;
            case '100-150': return price > 100 && price <= 150;
            case 'over-150': return price > 150;
            default: return true;
          }
        });
      });
    }

    setFilteredBouquets(result);
  };

  const applySorting = (sortBy: string) => {
    let sorted = [...filteredBouquets];

    switch (sortBy) {
      case 'alphabetical':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-low':
        sorted.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
        break;
      case 'price-high':
        sorted.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
        break;
    }

    setFilteredBouquets(sorted);
  };

  useEffect(() => {
    applySorting(sortOption);
  }, [sortOption, filteredBouquets]);

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleAddToCart = (bouquet: Bouquet) => {
    setCart([...cart, bouquet]);
    alert(`Added ${bouquet.name} to cart!`);
  };

  const handleAddToWishlist = (bouquet: Bouquet) => {
    setWishlist([...wishlist, bouquet]);
    alert(`Added ${bouquet.name} to wishlist!`);
  };

  return (
    <div>
      <section className="bg-[#FFF1F8] py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#37474F] mb-4">
            Shop Our Bouquets
          </h1>
          <p className="text-[#78909C] text-lg max-w-2xl mx-auto">
            Browse our curated collection of beautiful bouquets for every occasion.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-64">
              <BouquetFilter onFilterChange={applyFilters} onSortChange={handleSortChange} />
            </div>

            <div className="flex-grow">
              <div className="hidden lg:flex justify-between items-center mb-6">
                <div className="text-[#37474F]">
                  Showing <span className="font-medium">{filteredBouquets.length}</span> bouquets
                </div>
                <div className="flex items-center">
                  <span className="text-[#37474F] mr-2">Sort by:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="border border-gray-200 rounded-md p-2"
                  >
                    <option value="alphabetical">Alphabetical</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <p className="text-center text-lg text-[#37474F]">Loading bouquets...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : filteredBouquets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBouquets.map(bouquet => (
                    <BouquetCard
                      key={bouquet.id}
                      bouquet={bouquet}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-[#78909C] text-lg mb-4">No bouquets match your current filters.</p>
                  <button
                    onClick={() => applyFilters({ occasions: [], flowers: [], colors: [], price: [] })}
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

export default Shop;
