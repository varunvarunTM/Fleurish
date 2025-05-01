import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import BouquetGrid from '../components/bouquets/BouquetGrid';
import { Bouquet } from '../types/bouquet';

const Home: React.FC = () => {
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Bouquet[]>([]);
  const [wishlist, setWishlist] = useState<Bouquet[]>([]);

  useEffect(() => {
    const fetchBouquets = async () => {
      try {
        console.log('Fetching bouquets from API...');

        const response = await axios.get<Bouquet[]>('http://localhost:8080/get-products');

        console.log('API Response:', response);
        setBouquets(response.data);
      } catch (error: any) {
        if (error.response) {
          // Server responded with a status code outside 2xx
          console.error('Backend responded with an error:', {
            status: error.response.status,
            data: error.response.data,
          });
          setError(`Server error: ${error.response.status}`);
        } else if (error.request) {
          // Request was made but no response received
          console.error('No response received from server:', error.request);
          setError('No response from server. Is the backend running?');
        } else {
          // Something happened in setting up the request
          console.error('Error setting up request:', error.message);
          setError('Error setting up request: ' + error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBouquets();
  }, []);

  const featuredBouquets = bouquets.filter(b => b.isBestseller).slice(0, 4);
  const newArrivals = bouquets.filter(b => b.isNew).slice(0, 4);

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
      <HeroSection />
      <FeaturesSection />

      {loading ? (
        <p className="text-center text-lg">Loading bouquets...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">Error: {error}</p>
      ) : (
        <>
          <BouquetGrid 
            bouquets={featuredBouquets}
            title="Bestselling Bouquets"
            subtitle="Our most popular arrangements loved by customers"
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />

          {/* Custom Bouquet CTA */}
          <section className="section-padding bg-[#F4F0FA]">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#37474F] mb-4">
                    Create Your Dream Bouquet
                  </h2>
                  <p className="text-[#78909C] mb-6">
                    Choose your favorite flowers, colors, and style to create a personalized arrangement that's uniquely yours. Our expert florists will handcraft your custom bouquet with care.
                  </p>
                  <Link 
                    to="/custom" 
                    className="inline-flex items-center bg-[#F8BBD0] hover:bg-[#C48B9F] text-white px-6 py-3 rounded-full font-medium transition-colors duration-300 shadow-md"
                  >
                    Design Your Bouquet
                  </Link>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.pexels.com/photos/4622226/pexels-photo-4622226.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                    alt="Custom Bouquet" 
                    className="rounded-2xl shadow-md w-full h-80 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm">
                    <div className="text-sm font-medium text-[#37474F]">From</div>
                    <div className="text-2xl font-bold text-[#F8BBD0]">$49.99</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <BouquetGrid 
            bouquets={newArrivals}
            title="New Arrivals"
            subtitle="Fresh and seasonal arrangements just added to our collection"
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        </>
      )}

      <TestimonialsSection />

      {/* Subscription CTA */}
      <section className="section-padding bg-[#FFF1F8]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#37474F] mb-4">
              Never Miss a Special Occasion
            </h2>
            <p className="text-[#78909C] mb-8 text-lg">
              Subscribe to our newsletter for exclusive offers, seasonal updates, and flower care tips.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-full border border-gray-200 focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
