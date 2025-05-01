import React from 'react';
import { Truck, Clock, Palette, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: <Truck className="w-10 h-10 text-[#F8BBD0]" />,
    title: "Express Delivery",
    description: "Get your bouquets delivered on the same day when you order before 2 PM."
  },
  {
    icon: <Clock className="w-10 h-10 text-[#F8BBD0]" />,
    title: "Fresh Flowers",
    description: "All our flowers are freshly cut and guaranteed to stay beautiful for at least 7 days."
  },
  {
    icon: <Palette className="w-10 h-10 text-[#F8BBD0]" />,
    title: "Custom Designs",
    description: "Create your own bouquet by selecting flowers, colors, and arrangement style."
  },
  {
    icon: <RefreshCw className="w-10 h-10 text-[#F8BBD0]" />,
    title: "Subscription Options",
    description: "Regular flower deliveries with our flexible subscription plans at special rates."
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#37474F] mb-3">
            Why Choose Bloom & Deliver?
          </h2>
          <p className="text-[#78909C] max-w-2xl mx-auto">
            We're committed to providing beautiful flowers, exceptional service, and a seamless experience from selection to delivery.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-[#F8BBD0]/30 text-center"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl font-medium text-[#37474F] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#78909C]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;