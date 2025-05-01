import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, CreditCard, Check } from 'lucide-react';

const Checkout: React.FC = () => {
  // In a real app, cart items would be fetched from context or Redux
  // For this example, we'll use fake cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 'b1',
      name: 'Sunny Delight',
      image: 'https://images.pexels.com/photos/1179026/pexels-photo-1179026.jpeg?auto=compress&cs=tinysrgb&w=1600',
      price: 49.99,
      quantity: 1
    },
    {
      id: 'custom1',
      name: 'Custom Bouquet',
      image: 'https://images.pexels.com/photos/4273440/pexels-photo-4273440.jpeg?auto=compress&cs=tinysrgb&w=1600',
      price: 69.99,
      quantity: 1,
      isCustom: true
    }
  ]);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    recipientName: '',
    recipientPhone: '',
    deliveryDate: '',
    deliveryTime: '10:00-12:00',
    giftMessage: '',
    cardDetails: '',
    cardExpiry: '',
    cardCvc: ''
  });
  
  const [activeStep, setActiveStep] = useState(1);
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process the order here
    setActiveStep(activeStep + 1);
  };
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 9.99;
  const tax = subtotal * 0.08; // 8% tax rate for example
  const total = subtotal + deliveryFee + tax;
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#37474F] text-center mb-8">
          Checkout
        </h1>
        
        {/* Checkout Progress */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex justify-between items-center">
            <div className={`flex flex-col items-center ${activeStep >= 1 ? 'text-[#F8BBD0]' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                activeStep >= 1 ? 'bg-[#F8BBD0] text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {activeStep > 1 ? <Check size={20} /> : 1}
              </div>
              <span className="text-sm">Cart</span>
            </div>
            
            <div className={`flex-grow border-t-2 mx-2 ${activeStep >= 2 ? 'border-[#F8BBD0]' : 'border-gray-200'}`}></div>
            
            <div className={`flex flex-col items-center ${activeStep >= 2 ? 'text-[#F8BBD0]' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                activeStep >= 2 ? 'bg-[#F8BBD0] text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {activeStep > 2 ? <Check size={20} /> : 2}
              </div>
              <span className="text-sm">Delivery</span>
            </div>
            
            <div className={`flex-grow border-t-2 mx-2 ${activeStep >= 3 ? 'border-[#F8BBD0]' : 'border-gray-200'}`}></div>
            
            <div className={`flex flex-col items-center ${activeStep >= 3 ? 'text-[#F8BBD0]' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                activeStep >= 3 ? 'bg-[#F8BBD0] text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {activeStep > 3 ? <Check size={20} /> : 3}
              </div>
              <span className="text-sm">Payment</span>
            </div>
            
            <div className={`flex-grow border-t-2 mx-2 ${activeStep >= 4 ? 'border-[#F8BBD0]' : 'border-gray-200'}`}></div>
            
            <div className={`flex flex-col items-center ${activeStep >= 4 ? 'text-[#F8BBD0]' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                activeStep >= 4 ? 'bg-[#F8BBD0] text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                4
              </div>
              <span className="text-sm">Confirmation</span>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items and Form */}
            <div className="lg:col-span-2">
              {activeStep === 1 && (
                <>
                  <h2 className="font-serif text-2xl font-bold text-[#37474F] mb-4">
                    Your Cart
                  </h2>
                  
                  {cartItems.length > 0 ? (
                    <div className="space-y-4 mb-6">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex border border-gray-100 rounded-xl p-4 shadow-sm">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-24 h-24 object-cover rounded-lg mr-4"
                          />
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h3 className="font-medium text-[#37474F]">
                                {item.name} {item.isCustom && <span className="text-[#F8BBD0]">(Custom)</span>}
                              </h3>
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-[#EF9A9A] hover:text-red-500 transition-colors duration-300"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-l-md hover:bg-gray-50"
                                >
                                  -
                                </button>
                                <input 
                                  type="number" 
                                  value={item.quantity} 
                                  min="1"
                                  readOnly
                                  className="w-10 h-8 text-center border-t border-b border-gray-200"
                                />
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-r-md hover:bg-gray-50"
                                >
                                  +
                                </button>
                              </div>
                              <div className="font-medium text-[#37474F]">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-gray-200 rounded-xl">
                      <p className="text-[#78909C] mb-4">Your cart is empty</p>
                      <Link to="/shop" className="btn-primary">
                        Continue Shopping
                      </Link>
                    </div>
                  )}
                  
                  {cartItems.length > 0 && (
                    <div className="flex justify-between mt-8">
                      <Link to="/shop" className="btn-outline">
                        Continue Shopping
                      </Link>
                      <button 
                        onClick={() => setActiveStep(2)}
                        className="btn-primary"
                      >
                        Proceed to Delivery
                      </button>
                    </div>
                  )}
                </>
              )}
              
              {activeStep === 2 && (
                <form onSubmit={(e) => { e.preventDefault(); setActiveStep(3); }}>
                  <h2 className="font-serif text-2xl font-bold text-[#37474F] mb-4">
                    Delivery Details
                  </h2>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                    <h3 className="font-medium text-[#37474F] mb-4">Sender Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="firstName">
                          First Name*
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="lastName">
                          Last Name*
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="email">
                          Email*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="phone">
                          Phone*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                    <h3 className="font-medium text-[#37474F] mb-4">Recipient Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="recipientName">
                          Recipient Name*
                        </label>
                        <input
                          type="text"
                          id="recipientName"
                          name="recipientName"
                          value={formData.recipientName}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="recipientPhone">
                          Recipient Phone*
                        </label>
                        <input
                          type="tel"
                          id="recipientPhone"
                          name="recipientPhone"
                          value={formData.recipientPhone}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="address">
                        Delivery Address*
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="city">
                          City*
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="state">
                          State*
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="zipCode">
                          ZIP Code*
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                    <h3 className="font-medium text-[#37474F] mb-4">Delivery Options</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="deliveryDate">
                          Delivery Date*
                        </label>
                        <input
                          type="date"
                          id="deliveryDate"
                          name="deliveryDate"
                          value={formData.deliveryDate}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="deliveryTime">
                          Preferred Time
                        </label>
                        <select
                          id="deliveryTime"
                          name="deliveryTime"
                          value={formData.deliveryTime}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                        >
                          <option value="10:00-12:00">Morning (10:00 AM - 12:00 PM)</option>
                          <option value="12:00-15:00">Afternoon (12:00 PM - 3:00 PM)</option>
                          <option value="15:00-18:00">Evening (3:00 PM - 6:00 PM)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="giftMessage">
                        Gift Message (Optional)
                      </label>
                      <textarea
                        id="giftMessage"
                        name="giftMessage"
                        value={formData.giftMessage}
                        onChange={handleChange}
                        rows={3}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                        placeholder="Add a personal message to be included with your gift..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button 
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="btn-outline"
                    >
                      Back to Cart
                    </button>
                    <button 
                      type="submit"
                      className="btn-primary"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              )}
              
              {activeStep === 3 && (
                <form onSubmit={handleSubmit}>
                  <h2 className="font-serif text-2xl font-bold text-[#37474F] mb-4">
                    Payment
                  </h2>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                    <div className="flex items-center mb-6">
                      <CreditCard size={24} className="text-[#F8BBD0] mr-2" />
                      <h3 className="font-medium text-[#37474F]">Card Details</h3>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="cardDetails">
                        Card Number*
                      </label>
                      <input
                        type="text"
                        id="cardDetails"
                        name="cardDetails"
                        value={formData.cardDetails}
                        onChange={handleChange}
                        required
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="cardExpiry">
                          Expiry Date*
                        </label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          required
                          placeholder="MM/YY"
                          className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="cardCvc">
                          CVC*
                        </label>
                        <input
                          type="text"
                          id="cardCvc"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleChange}
                          required
                          placeholder="123"
                          className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button 
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="btn-outline"
                    >
                      Back to Delivery
                    </button>
                    <button 
                      type="submit"
                      className="btn-primary"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              )}
              
              {activeStep === 4 && (
                <div className="text-center bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                  <div className="w-16 h-16 bg-[#C5E1A5] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-white" />
                  </div>
                  
                  <h2 className="font-serif text-2xl font-bold text-[#37474F] mb-2">
                    Thank You for Your Order!
                  </h2>
                  
                  <p className="text-[#78909C] mb-6">
                    Your order has been received and is being processed. A confirmation email has been sent to {formData.email}.
                  </p>
                  
                  <div className="bg-[#FFF1F8] p-4 rounded-lg inline-block mb-6">
                    <p className="font-medium text-[#37474F]">Order Number: #BD{Math.floor(100000 + Math.random() * 900000)}</p>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-medium text-[#37474F] mb-2">Order Summary</h3>
                    <ul className="space-y-2">
                      {cartItems.map(item => (
                        <li key={item.id} className="flex justify-between">
                          <span>{item.name} x{item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                      <li className="flex justify-between border-t border-gray-200 pt-2 font-medium">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-[#78909C] mb-6">
                    Your flowers will be delivered to {formData.recipientName} on {formData.deliveryDate}.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/tracking" className="btn-primary">
                      Track Order
                    </Link>
                    <Link to="/" className="btn-outline">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            {activeStep < 4 && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                  <h2 className="font-serif text-xl font-bold text-[#37474F] mb-4">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-3 mb-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <div className="flex items-center">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-12 h-12 object-cover rounded-md mr-3"
                          />
                          <div>
                            <p className="font-medium text-[#37474F]">{item.name}</p>
                            <p className="text-sm text-[#78909C]">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-medium text-[#37474F]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#78909C]">Subtotal</span>
                      <span className="text-[#37474F]">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#78909C]">Delivery</span>
                      <span className="text-[#37474F]">${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#78909C]">Tax</span>
                      <span className="text-[#37474F]">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-lg">
                      <span className="text-[#37474F]">Total</span>
                      <span className="text-[#F8BBD0]">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;