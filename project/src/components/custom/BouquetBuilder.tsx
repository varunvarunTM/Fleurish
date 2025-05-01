import React, { useState } from 'react';
import { Flower, Palette, PlusCircle, Minus, Plus, CircleDollarSign, ShoppingBag } from 'lucide-react';
import { Flower as FlowerType } from '../../types/flower';

interface BouquetBuilderProps {
  flowers: FlowerType[];
  onSaveBouquet: (bouquet: any) => void;
}

const BouquetBuilder: React.FC<BouquetBuilderProps> = ({ flowers, onSaveBouquet }) => {
  const [selectedFlowers, setSelectedFlowers] = useState<Record<string, number>>({});
  const [style, setStyle] = useState<string>('classic');
  const [size, setSize] = useState<string>('medium');
  const [vase, setVase] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  
  const styles = [
    { id: 'classic', name: 'Classic Round', price: 0 },
    { id: 'modern', name: 'Modern Asymmetric', price: 5 },
    { id: 'rustic', name: 'Rustic Garden', price: 7 },
    { id: 'cascade', name: 'Cascading', price: 10 }
  ];
  
  const sizes = [
    { id: 'small', name: 'Small', price: 0, multiplier: 0.7 },
    { id: 'medium', name: 'Medium', price: 10, multiplier: 1 },
    { id: 'large', name: 'Large', price: 20, multiplier: 1.5 }
  ];
  
  const vasePrice = 15;
  
  const getFlowerById = (id: string): FlowerType | undefined => {
    return flowers.find(flower => flower.id === id);
  };
  
  const addFlower = (flowerId: string) => {
    setSelectedFlowers({
      ...selectedFlowers,
      [flowerId]: (selectedFlowers[flowerId] || 0) + 1
    });
  };
  
  const removeFlower = (flowerId: string) => {
    if (!selectedFlowers[flowerId] || selectedFlowers[flowerId] <= 0) return;
    
    const newCount = selectedFlowers[flowerId] - 1;
    const newSelectedFlowers = { ...selectedFlowers };
    
    if (newCount === 0) {
      delete newSelectedFlowers[flowerId];
    } else {
      newSelectedFlowers[flowerId] = newCount;
    }
    
    setSelectedFlowers(newSelectedFlowers);
  };
  
  const getTotalPrice = (): number => {
    const selectedSize = sizes.find(s => s.id === size) || sizes[1]; // Default to medium if not found
    const selectedStyle = styles.find(s => s.id === style) || styles[0]; // Default to classic if not found
    
    // Calculate base price from selected flowers
    const flowersPrice = Object.entries(selectedFlowers).reduce((sum, [id, count]) => {
      const flower = getFlowerById(id);
      return sum + (flower ? flower.price * count : 0);
    }, 0);
    
    // Apply size multiplier to flowers price
    const sizedFlowersPrice = flowersPrice * selectedSize.multiplier;
    
    // Add style price
    const stylePrice = selectedStyle.price;
    
    // Add size base price
    const sizeBasePrice = selectedSize.price;
    
    // Add vase price if selected
    const vaseAdditional = vase ? vasePrice : 0;
    
    return sizedFlowersPrice + stylePrice + sizeBasePrice + vaseAdditional;
  };
  
  const getDiscountedPrice = (): number => {
    const totalPrice = getTotalPrice();
    // Apply discount if total is above certain thresholds
    if (totalPrice >= 150) {
      return totalPrice * 0.85; // 15% discount
    } else if (totalPrice >= 100) {
      return totalPrice * 0.9; // 10% discount
    } else if (totalPrice >= 50) {
      return totalPrice * 0.95; // 5% discount
    }
    return totalPrice;
  };
  
  const getFlowerCount = (): number => {
    return Object.values(selectedFlowers).reduce((sum, count) => sum + count, 0);
  };
  
  const handleSaveBouquet = () => {
    if (getFlowerCount() === 0) return;
    
    const bouquet = {
      flowers: selectedFlowers,
      style,
      size,
      vase,
      message,
      totalPrice: getTotalPrice(),
      discountedPrice: getDiscountedPrice()
    };
    
    onSaveBouquet(bouquet);
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-6 md:p-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#37474F] mb-6">
          Create Your Custom Bouquet
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Flower Selection */}
          <div>
            <h3 className="flex items-center font-serif text-xl font-medium text-[#37474F] mb-4">
              <Flower className="mr-2 text-[#F8BBD0]" size={20} />
              Choose Your Flowers
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {flowers.map(flower => (
                <div 
                  key={flower.id} 
                  className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-40">
                    <img 
                      src={flower.image} 
                      alt={flower.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <h4 className="text-white font-medium">{flower.name}</h4>
                      <p className="text-white/90 text-sm">${flower.price.toFixed(2)} per stem</p>
                    </div>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <button 
                        onClick={() => removeFlower(flower.id)}
                        className="p-1 rounded-full bg-[#FFF1F8] text-[#F8BBD0] hover:bg-[#F8BBD0] hover:text-white transition-colors duration-300"
                        disabled={!selectedFlowers[flower.id]}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {selectedFlowers[flower.id] || 0}
                      </span>
                      <button 
                        onClick={() => addFlower(flower.id)}
                        className="p-1 rounded-full bg-[#FFF1F8] text-[#F8BBD0] hover:bg-[#F8BBD0] hover:text-white transition-colors duration-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => addFlower(flower.id)}
                      className="text-sm text-[#F8BBD0] hover:text-[#C48B9F] transition-colors duration-300 flex items-center"
                    >
                      <PlusCircle size={14} className="mr-1" />
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Arrangement Style */}
            <h3 className="flex items-center font-serif text-xl font-medium text-[#37474F] mb-4">
              <Palette className="mr-2 text-[#F8BBD0]" size={20} />
              Arrangement Style
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {styles.map(styleOption => (
                <button
                  key={styleOption.id}
                  onClick={() => setStyle(styleOption.id)}
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    style === styleOption.id 
                      ? 'border-[#F8BBD0] bg-[#FFF1F8]' 
                      : 'border-gray-200 hover:border-[#F8BBD0]/50'
                  }`}
                >
                  <div className="font-medium text-[#37474F]">{styleOption.name}</div>
                  {styleOption.price > 0 && (
                    <div className="text-sm text-[#78909C]">+${styleOption.price.toFixed(2)}</div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Bouquet Size */}
            <h3 className="font-serif text-xl font-medium text-[#37474F] mb-4">
              Bouquet Size
            </h3>
            
            <div className="flex space-x-3 mb-6">
              {sizes.map(sizeOption => (
                <button
                  key={sizeOption.id}
                  onClick={() => setSize(sizeOption.id)}
                  className={`flex-1 p-3 rounded-xl border transition-all duration-300 ${
                    size === sizeOption.id 
                      ? 'border-[#F8BBD0] bg-[#FFF1F8]' 
                      : 'border-gray-200 hover:border-[#F8BBD0]/50'
                  }`}
                >
                  <div className="font-medium text-[#37474F]">{sizeOption.name}</div>
                  <div className="text-sm text-[#78909C]">
                    {sizeOption.multiplier !== 1 && `${sizeOption.multiplier}x flowers`}
                    {sizeOption.price > 0 && ` +$${sizeOption.price.toFixed(2)}`}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Include Vase */}
            <div className="mb-6">
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
                <div>
                  <h4 className="font-medium text-[#37474F]">Include a Vase</h4>
                  <p className="text-sm text-[#78909C]">Add a complementary glass vase</p>
                </div>
                <div className="flex items-center">
                  <span className="mr-3 text-[#78909C]">+${vasePrice.toFixed(2)}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={vase} 
                      onChange={() => setVase(!vase)} 
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F8BBD0]"></div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Gift Message */}
            <div className="mb-6">
              <label className="block font-medium text-[#37474F] mb-2">
                Add a Gift Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                placeholder="Write your message here..."
                rows={3}
              ></textarea>
            </div>
          </div>
          
          {/* Right Column - Preview & Summary */}
          <div>
            <div className="bg-[#F4F0FA]/50 rounded-xl p-6 sticky top-6">
              <h3 className="font-serif text-xl font-medium text-[#37474F] mb-4">
                Your Bouquet Summary
              </h3>
              
              <div className="space-y-4 mb-6">
                {/* Selected Flowers */}
                <div>
                  <h4 className="text-[#37474F] font-medium mb-2">Selected Flowers</h4>
                  {getFlowerCount() > 0 ? (
                    <ul className="space-y-2">
                      {Object.entries(selectedFlowers).map(([id, count]) => {
                        const flower = getFlowerById(id);
                        if (!flower || count === 0) return null;
                        
                        return (
                          <li key={id} className="flex justify-between text-[#37474F]">
                            <span>{flower.name} × {count}</span>
                            <span>${(flower.price * count).toFixed(2)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-[#78909C] italic">No flowers selected yet</p>
                  )}
                </div>
                
                {/* Style & Size */}
                <div className="pt-4 border-t border-[#F8BBD0]/20">
                  <h4 className="text-[#37474F] font-medium mb-2">Arrangement Details</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-[#37474F]">
                      <span>Style: {styles.find(s => s.id === style)?.name}</span>
                      <span>
                        {styles.find(s => s.id === style)?.price ? `+$${styles.find(s => s.id === style)?.price.toFixed(2)}` : '--'}
                      </span>
                    </li>
                    <li className="flex justify-between text-[#37474F]">
                      <span>Size: {sizes.find(s => s.id === size)?.name}</span>
                      <span>
                        {sizes.find(s => s.id === size)?.price ? `+$${sizes.find(s => s.id === size)?.price.toFixed(2)}` : '--'}
                      </span>
                    </li>
                    {vase && (
                      <li className="flex justify-between text-[#37474F]">
                        <span>Glass Vase</span>
                        <span>+${vasePrice.toFixed(2)}</span>
                      </li>
                    )}
                  </ul>
                </div>
                
                {/* Price Summary */}
                <div className="pt-4 border-t border-[#F8BBD0]/20">
                  <div className="flex justify-between text-[#37474F] mb-1">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  {getTotalPrice() !== getDiscountedPrice() && (
                    <div className="flex justify-between text-[#EF9A9A] mb-1">
                      <span>Discount</span>
                      <span>-${(getTotalPrice() - getDiscountedPrice()).toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-[#37474F] font-bold text-lg mt-2">
                    <span>Total</span>
                    <span>${getDiscountedPrice().toFixed(2)}</span>
                  </div>
                  
                  {getTotalPrice() >= 50 && (
                    <div className="bg-[#C5E1A5]/30 text-[#558B2F] text-sm rounded-lg p-2 mt-2 flex items-center">
                      <CircleDollarSign size={16} className="mr-1" />
                      Discount applied: {getTotalPrice() >= 150 ? '15%' : getTotalPrice() >= 100 ? '10%' : '5%'} off
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={handleSaveBouquet}
                disabled={getFlowerCount() === 0}
                className={`w-full flex items-center justify-center py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                  getFlowerCount() === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#F8BBD0] hover:bg-[#C48B9F] text-white shadow-md hover:shadow-lg'
                }`}
              >
                <ShoppingBag size={18} className="mr-2" />
                Add to Cart
              </button>
              
              {getFlowerCount() === 0 && (
                <p className="text-center text-[#78909C] text-sm mt-2">
                  Please select at least one flower
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BouquetBuilder;