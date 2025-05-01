import React, { useState } from 'react';
import { CheckCircle2, Clock, Truck, PackageCheck, Flower } from 'lucide-react';

const OrderTracking: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  
  // In a real app, this would be fetched from an API
  const orderStatus = {
    orderNumber: 'BD123456',
    placedDate: '2025-05-25T10:30:00',
    estimatedDelivery: '2025-05-27T12:00:00',
    status: 'preparing', // 'confirmed', 'preparing', 'en-route', 'delivered'
    items: [
      {
        name: 'Sunny Delight',
        image: 'https://images.pexels.com/photos/1179026/pexels-photo-1179026.jpeg?auto=compress&cs=tinysrgb&w=1600',
        quantity: 1
      },
      {
        name: 'Custom Bouquet',
        image: 'https://images.pexels.com/photos/4273440/pexels-photo-4273440.jpeg?auto=compress&cs=tinysrgb&w=1600',
        quantity: 1
      }
    ],
    recipient: {
      name: 'Jane Doe',
      address: '123 Flower Street, Bloom City, BC 12345',
      phone: '(555) 123-4567'
    },
    updates: [
      {
        status: 'Order Confirmed',
        date: '2025-05-25T10:35:00',
        message: 'Your order has been received and confirmed.'
      },
      {
        status: 'Processing',
        date: '2025-05-25T14:20:00',
        message: 'Our florists are preparing your bouquet with care.'
      },
      {
        status: 'Preparing for Delivery',
        date: '2025-05-26T09:15:00',
        message: 'Your order has been prepared and is being packaged for delivery.'
      }
    ]
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
  };
  
  const getStatusStep = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 1;
      case 'preparing':
        return 2;
      case 'en-route':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 1;
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#37474F] text-center mb-8">
            Track Your Order
          </h1>
          
          {!isTracking ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="orderNumber">
                    Order Number*
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g. BD123456"
                    required
                    className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="email">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter the email used for your order"
                    required
                    className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full btn-primary"
                >
                  Track Order
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Order Status Progress */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#37474F]">
                      Order #{orderStatus.orderNumber}
                    </h2>
                    <p className="text-[#78909C]">Placed on {formatDate(orderStatus.placedDate)}</p>
                  </div>
                  <div className="px-4 py-2 bg-[#F4F0FA] rounded-full text-[#9F94B7] font-medium">
                    Estimated Delivery: {formatDate(orderStatus.estimatedDelivery)}
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className="absolute top-0 left-0 h-2 bg-[#F8BBD0] rounded-full"
                        style={{ width: `${(getStatusStep(orderStatus.status) / 4) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between mt-6 pt-4">
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          getStatusStep(orderStatus.status) >= 1 
                            ? 'bg-[#F8BBD0] text-white' 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          <Clock size={20} />
                        </div>
                        <span className={`text-sm font-medium ${
                          getStatusStep(orderStatus.status) >= 1 
                            ? 'text-[#37474F]' 
                            : 'text-gray-400'
                        }`}>
                          Confirmed
                        </span>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          getStatusStep(orderStatus.status) >= 2 
                            ? 'bg-[#F8BBD0] text-white' 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          <Flower size={20} />
                        </div>
                        <span className={`text-sm font-medium ${
                          getStatusStep(orderStatus.status) >= 2 
                            ? 'text-[#37474F]' 
                            : 'text-gray-400'
                        }`}>
                          Preparing
                        </span>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          getStatusStep(orderStatus.status) >= 3 
                            ? 'bg-[#F8BBD0] text-white' 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          <Truck size={20} />
                        </div>
                        <span className={`text-sm font-medium ${
                          getStatusStep(orderStatus.status) >= 3 
                            ? 'text-[#37474F]' 
                            : 'text-gray-400'
                        }`}>
                          En Route
                        </span>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          getStatusStep(orderStatus.status) >= 4 
                            ? 'bg-[#F8BBD0] text-white' 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          <PackageCheck size={20} />
                        </div>
                        <span className={`text-sm font-medium ${
                          getStatusStep(orderStatus.status) >= 4 
                            ? 'text-[#37474F]' 
                            : 'text-gray-400'
                        }`}>
                          Delivered
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-[#37474F] mb-2">Order Updates</h3>
                    <div className="space-y-3">
                      {orderStatus.updates.map((update, index) => (
                        <div key={index} className="flex">
                          <div className="mr-3">
                            <div className="w-6 h-6 rounded-full bg-[#F8BBD0] flex items-center justify-center">
                              <CheckCircle2 size={14} className="text-white" />
                            </div>
                            {index !== orderStatus.updates.length - 1 && (
                              <div className="w-0.5 h-8 bg-[#F8BBD0] mx-auto"></div>
                            )}
                          </div>
                          <div className="pb-4">
                            <p className="text-sm font-medium text-[#37474F]">{update.status}</p>
                            <p className="text-xs text-[#78909C]">{formatDate(update.date)}</p>
                            <p className="text-sm text-[#37474F] mt-1">{update.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-[#37474F] mb-2">Delivery Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-[#37474F] font-medium">{orderStatus.recipient.name}</p>
                      <p className="text-[#78909C]">{orderStatus.recipient.address}</p>
                      <p className="text-[#78909C]">Phone: {orderStatus.recipient.phone}</p>
                    </div>
                    
                    <h3 className="font-medium text-[#37474F] mb-2">Order Items</h3>
                    <div className="space-y-3">
                      {orderStatus.items.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded-md mr-3"
                          />
                          <div>
                            <p className="font-medium text-[#37474F]">{item.name}</p>
                            <p className="text-sm text-[#78909C]">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#FFF1F8] rounded-xl p-6 text-center">
                <h3 className="font-serif text-xl font-medium text-[#37474F] mb-2">
                  Need Assistance?
                </h3>
                <p className="text-[#78909C] mb-4">
                  If you have any questions about your order, our customer service team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button className="btn-primary">
                    Contact Support
                  </button>
                  <button className="btn-outline">
                    Email Us
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;