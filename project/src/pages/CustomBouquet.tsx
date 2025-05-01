import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BouquetBuilder from '../components/custom/BouquetBuilder';
import flowers from '../data/flowers';

const CustomBouquet: React.FC = () => {
  const [customBouquet, setCustomBouquet] = useState<any>(null);
  
  const handleSaveBouquet = (bouquet: any) => {
    setCustomBouquet(bouquet);
    // In a real app, you would likely use context or Redux to add this to the cart
    alert('Custom bouquet added to cart!');
  };
  
  return (
    <div>
      {/* Custom Bouquet Header */}
      <section className="bg-[#FFF1F8] py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#37474F] mb-4">
              Create Your Custom Bouquet
            </h1>
            <p className="text-[#78909C] text-lg max-w-2xl mx-auto">
              Choose your favorite flowers, colors, and arrangement style to create a bouquet 
              that's uniquely yours. Our expert florists will handcraft it with care.
            </p>
          </div>
        </div>
      </section>
      
      {/* Custom Bouquet Builder */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <BouquetBuilder 
            flowers={flowers}
            onSaveBouquet={handleSaveBouquet}
          />
          
          {/* How It Works */}
          <div className="mt-16">
            <h2 className="font-serif text-3xl font-bold text-[#37474F] text-center mb-10">
              How Custom Bouquets Work
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#FFF1F8] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-serif text-2xl font-bold text-[#F8BBD0]">1</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-[#37474F] mb-2">
                  Choose Your Flowers
                </h3>
                <p className="text-[#78909C]">
                  Select from our wide variety of fresh, seasonal flowers to create your perfect bouquet.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#FFF1F8] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-serif text-2xl font-bold text-[#F8BBD0]">2</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-[#37474F] mb-2">
                  Customize Style & Size
                </h3>
                <p className="text-[#78909C]">
                  Pick your preferred arrangement style, size, and optional additions like vases.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#FFF1F8] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-serif text-2xl font-bold text-[#F8BBD0]">3</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-[#37474F] mb-2">
                  We Create & Deliver
                </h3>
                <p className="text-[#78909C]">
                  Our expert florists handcraft your custom bouquet and deliver it fresh to your specified location.
                </p>
              </div>
            </div>
          </div>
          
          {/* FAQs */}
          <div className="mt-16">
            <h2 className="font-serif text-3xl font-bold text-[#37474F] text-center mb-8">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-3xl mx-auto divide-y divide-gray-200">
              <div className="py-5">
                <h3 className="text-lg font-medium text-[#37474F]">
                  How far in advance should I order my custom bouquet?
                </h3>
                <p className="mt-2 text-[#78909C]">
                  For custom bouquets, we recommend ordering at least 24 hours in advance to ensure we have all your selected flowers available. For same-day delivery, please order before 12 PM.
                </p>
              </div>
              
              <div className="py-5">
                <h3 className="text-lg font-medium text-[#37474F]">
                  Can I include flowers not shown in the builder?
                </h3>
                <p className="mt-2 text-[#78909C]">
                  Absolutely! If you have specific flowers in mind that aren't shown in our builder, please add them in the special instructions at checkout, and we'll do our best to accommodate your request.
                </p>
              </div>
              
              <div className="py-5">
                <h3 className="text-lg font-medium text-[#37474F]">
                  What if the flowers I selected aren't available?
                </h3>
                <p className="mt-2 text-[#78909C]">
                  If any of your selected flowers aren't available due to seasonality or supply, our florists will contact you with alternative suggestions of similar color and style.
                </p>
              </div>
              
              <div className="py-5">
                <h3 className="text-lg font-medium text-[#37474F]">
                  Can I add a gift card or chocolates to my order?
                </h3>
                <p className="mt-2 text-[#78909C]">
                  Yes! During the checkout process, you can add gift cards, chocolates, or other complementary items to your order from our selection of gift add-ons.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link to="/shop" className="btn-outline">
                Browse Pre-designed Bouquets
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomBouquet;