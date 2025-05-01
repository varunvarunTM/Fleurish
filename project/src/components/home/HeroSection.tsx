import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Beautiful Bouquets Delivered in Express Time",
    subtitle: "Send love and joy with our handcrafted flower arrangements delivered right to your doorstep.",
    image: "https://images.pexels.com/photos/1158682/pexels-photo-1158682.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ctaText: "Shop Now",
    ctaLink: "/shop"
  },
  {
    id: 2,
    title: "Create Your Perfect Custom Bouquet",
    subtitle: "Choose your flowers, colors, and style for a truly personalized floral arrangement.",
    image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ctaText: "Customize Now",
    ctaLink: "/custom"
  },
  {
    id: 3,
    title: "Special Occasion? We've Got You Covered",
    subtitle: "From birthdays to anniversaries, find the perfect bouquet for every celebration.",
    image: "https://images.pexels.com/photos/1073078/pexels-photo-1073078.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ctaText: "Explore Collections",
    ctaLink: "/shop"
  }
];

const HeroSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prevSlide => (prevSlide + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-1000 ${
                  index === activeSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8 absolute'
                }`}
              >
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-white/90 text-lg md:text-xl mb-8 max-w-xl">
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.ctaLink}
                  className="inline-flex items-center bg-white text-[#F8BBD0] hover:bg-[#F8BBD0] hover:text-white px-6 py-3 rounded-full font-medium transition-colors duration-300 shadow-md"
                >
                  {slide.ctaText}
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
          
          {/* Slide Navigation */}
          <div className="absolute bottom-10 left-0 right-0">
            <div className="flex justify-center space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeSlide
                      ? 'bg-white w-10'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;