import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Truck } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  // In a real app, this would fetch the order details from an API or context
  const orderNumber = `BD${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#C5E1A5] rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-white" />
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#37474F] mb-2">
              Order Confirmed!
            </h1>
            
            <p className="text-[#78909C] text-lg">
              Thank you for your order. We've received your request and are getting it ready.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#37474F]">
                  Order #{orderNumber}
                </h2>
                <p className="text-[#78909C]">Placed on {orderDate}</p>
              </div>
              <Link 
                to="/tracking" 
                className="flex items-center text-[#F8BBD0] hover:text-[#C48B9F] transition-colors duration-300"
              >
                <Truck size={18} className="mr-1" />
                Track Order
              </Link>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-[#37474F] mb-3">Order Details</h3>
              
              <div className="space-y-4">
                <div className="flex border border-gray-100 rounded-xl p-4 shadow-sm">
                  <img 
                    src="https://images.pexels.com/photos/1179026/pexels-photo-1179026.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                    alt="Sunny Delight" 
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-[#37474F]">Sunny Delight</h4>
                      <span className="font-medium text-[#37474F]">$49.99</span>
                    </div>
                    <p className="text-sm text-[#78909C]">Qty: 1</p>
                  </div>
                </div>
                
                <div className="flex border border-gray-100 rounded-xl p-4 shadow-sm">
                  <img 
                    src="https://images.pexels.com/photos/4273440/pexels-photo-4273440.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                    alt="Custom Bouquet" 
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-[#37474F]">
                        Custom Bouquet <span className="text-[#F8BBD0]">(Custom)</span>
                      </h4>
                      <span className="font-medium text-[#37474F]">$69.99</span>
                    </div>
                    <p className="text-sm text-[#78909C]">Qty: 1</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-[#37474F] mb-2">Delivery Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-[#37474F]">Jane Doe</p>
                  <p className="text-[#78909C]">123 Flower Street</p>
                  <p className="text-[#78909C]">Bloom City, BC 12345</p>
                  <p className="text-[#78909C]">Phone: (555) 123-4567</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-[#37474F] mb-2">Delivery Date</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-[#37474F]">
                    {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-[#78909C]">Between 10:00 AM - 12:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-[#78909C]">Subtotal</span>
                <span className="text-[#37474F]">$119.98</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#78909C]">Delivery</span>
                <span className="text-[#37474F]">$9.99</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-[#78909C]">Tax</span>
                <span className="text-[#37474F]">$10.40</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span className="text-[#37474F]">Total</span>
                <span className="text-[#F8BBD0]">$140.37</span>
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-6">
            <p className="text-[#78909C]">
              A confirmation email has been sent to your email address. If you have any questions about your order, please contact our customer service.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/tracking" className="btn-primary">
                Track Your Order
              </Link>
              <Link to="/" className="btn-outline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;