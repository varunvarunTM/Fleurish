import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emma Thompson",
    location: "New York, NY",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5,
    text: "The flowers were absolutely stunning and arrived right on time for my sister's birthday. She was thrilled with the arrangement and the freshness of the blooms. Will definitely order again!"
  },
  {
    id: 2,
    name: "James Wilson",
    location: "Los Angeles, CA",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4,
    text: "I used the custom bouquet builder to create a special arrangement for my wife's anniversary. The process was intuitive and fun, and the final product looked even better than I imagined."
  },
  {
    id: 3,
    name: "Sophia Garcia",
    location: "Chicago, IL",
    avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5,
    text: "I've been using Bloom & Deliver's subscription service for my office, and it's been wonderful having fresh flowers every week. Their consistency in quality and service is impressive."
  },
  {
    id: 4,
    name: "Michael Chen",
    location: "Seattle, WA",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5,
    text: "I needed a last-minute gift and their same-day delivery saved me! Not only was it quick, but the bouquet was gorgeous and reasonably priced. My mom absolutely loved it!"
  },
  {
    id: 5,
    name: "Olivia Johnson",
    location: "Miami, FL",
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4,
    text: "The customer service is exceptional. When I had an issue with my delivery time, they were quick to respond and resolved it immediately. The flowers are always beautiful and long-lasting."
  }
];

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>('right');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const nextSlide = () => {
    setSlideDirection('right');
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevSlide = () => {
    setSlideDirection('left');
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < rating ? 'text-[#FFE082] fill-[#FFE082]' : 'text-gray-300'} mr-0.5`}
          />
        ))}
      </div>
    );
  };
  
  return (
    <section className="py-16 bg-[#FFF1F8]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#37474F] mb-3">
            What Our Customers Say
          </h2>
          <p className="text-[#78909C] max-w-2xl mx-auto">
            Don't just take our word for it – here are some reviews from our happy customers.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div 
            ref={containerRef}
            className="overflow-hidden"
          >
            <div className="flex">
              <div
                className={`w-full flex-shrink-0 transition-transform duration-700 transform ${
                  slideDirection === 'right' ? 'translate-x-0' : 'translate-x-0'
                }`}
              >
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
                    <img
                      src={testimonials[activeIndex].avatar}
                      alt={testimonials[activeIndex].name}
                      className="w-16 h-16 rounded-full object-cover mb-4 md:mb-0 md:mr-4"
                    />
                    <div className="text-center md:text-left">
                      <h3 className="font-serif text-lg font-medium text-[#37474F]">
                        {testimonials[activeIndex].name}
                      </h3>
                      <p className="text-sm text-[#78909C] mb-2">
                        {testimonials[activeIndex].location}
                      </p>
                      {renderStars(testimonials[activeIndex].rating)}
                    </div>
                  </div>
                  <p className="text-[#37474F] italic">
                    "{testimonials[activeIndex].text}"
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white rounded-full p-2 shadow-md hover:bg-[#FFF1F8] transition-colors duration-300 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} className="text-[#F8BBD0]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white rounded-full p-2 shadow-md hover:bg-[#FFF1F8] transition-colors duration-300 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} className="text-[#F8BBD0]" />
          </button>
          
          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setSlideDirection(index > activeIndex ? 'right' : 'left');
                  setActiveIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-[#F8BBD0] w-6'
                    : 'bg-[#F8BBD0]/30 hover:bg-[#F8BBD0]/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;