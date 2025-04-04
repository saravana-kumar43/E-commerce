import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function ShippingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], subtotal = 0 } = location.state || {};
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/confirmation', { 
      state: { 
        cartItems, 
        subtotal,
        shippingDetails: formData 
      } 
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-purple-600 mb-6 hover:underline"
      >
        <FaArrowLeft className="mr-2" /> Back to Cart
      </button>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-purple-800">Shipping Details</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                 <div>
                   <label className="block text-gray-700 mb-2" htmlFor="firstName">                     First Name
                   </label>
                   <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="state">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="zipCode">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="country">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  >
                    <option value="India">India</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      value="credit"
                      className="form-radio text-purple-600"
                      defaultChecked
                    />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      className="form-radio text-purple-600"
                    />
                    <span>PayPal</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      className="form-radio text-purple-600"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full mt-8 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Pay ₹{subtotal.toFixed(0)}
              </button>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map(item => {
                const discountedPrice = item.price * (1 - item.discount / 100);
                return (
                  <div key={item.id} className="flex items-start gap-4 pb-4 border-b">
                    <div className="flex-shrink-0">
                      <img 
                        src={item.img} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex justify-between mt-1">
                        <span className="text-gray-600">Qty: {item.quantity}</span>
                        <span className="font-medium">₹{(discountedPrice * item.quantity).toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between font-bold text-lg pt-3 border-t">
                <span>Total</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}