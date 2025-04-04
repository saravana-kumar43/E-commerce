// import React, { useState } from "react";
// import img from "../assets/Logo1.png"

// const Cart = () => {
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState("M");
//   const pricePerItem = "product price"; 
//   const discount = 40;
//   const platformFee =20;

//   const increaseQuantity = () => {
//     setQuantity(prev => prev + 1);
//   };

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(prev => prev - 1);
//     }
//   };

//   const handleSizeChange = (size) => {
//     setSelectedSize(size);
//   };

//   const subtotal = quantity * pricePerItem;
//   const total = subtotal - discount + platformFee;

//   return (
//     <div className="min-h-screen bg-[#f8fbea] flex flex-col items-center justify-center p-6">
//       <h1 className="text-2xl md:text-3xl font-bold mb-6">My Cart</h1>

//       <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
       
//         <div className="flex-1 bg-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row items-center gap-6 border border-green-200 w-full min-h-[200px]">
//           <img
//             src={img} 
//             alt="Product img"
//             className="w-40 h-50 sm:w-40 sm:h-40 object-contain border-2 border-green-300 rounded-xl"
//           />
//           <div className="flex-1 text-center sm:text-left">
//             <h2 className="text-lg font-semibold">Product name</h2>
//             <div className="mt-2">
//               <span className="text-gray-600 text-sm font-medium">Select Size:</span>
//               <div className="flex gap-2 mt-1 justify-center sm:justify-start">
//                 {["S", "M", "L", "XL", "XXL"].map((size) => (
//                   <button
//                     key={size}
//                     className={`px-3 py-1 border rounded-md ${selectedSize === size ? "bg-green-600 text-white" : "bg-gray-200 cursor-pointer"}`}
//                     onClick={() => handleSizeChange(size)}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <p className="text-yellow-500 font-bold mt-2">★★★★☆ <span className="text-gray-600 text-sm">4.9/5</span></p>
//             <div className="flex justify-center sm:justify-start items-center gap-2 mt-2">
//               <span className="text-gray-400 line-through">₹200.00</span>
//               <span className="text-green-600 font-bold">₹{pricePerItem}</span>
//             </div>
//             <div className="flex justify-center sm:justify-start items-center gap-3 mt-3">
//               <button onClick={decreaseQuantity} className="px-3 py-1 border rounded-md cursor-pointer">-</button>
//               <span className="font-semibold">{quantity}</span>
//               <button onClick={increaseQuantity} className="px-3 py-1 border rounded-md cursor-pointer">+</button>
//               <button className="text-red-500 ml-4 cursor-pointer">🗑 Delete</button>
//             </div>
//           </div>
//         </div>

       
//         <div className="w-full md:w-96 bg-white p-4 rounded-2xl shadow-md border border-green-200">
//           <h2 className="text-lg font-semibold mb-4 text-center md:text-left">Order Details</h2>
//           <div className="space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between text-green-600">
//               <span>Discount</span>
//               <span>-₹{discount.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Platform Fee</span>
//               <span>₹{platformFee.toFixed(2)}</span>
//             </div>
//             <hr className="my-2" />
//             <div className="flex justify-between font-bold">
//               <span>Order Total</span>
//               <span>₹{total.toFixed(2)}</span>
//             </div>
//           </div>
//           <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 cursor-pointer">
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import React from "react";
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CartPage({ cartItems = [], setCartItems }) {
  const removeItem = (id) => {
    const newCart = cartItems.filter(item => item.id !== id);
    setCartItems(newCart);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    const newCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(newCart);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * (1 - item.discount / 100)) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-purple-800">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link 
            to="/collection" 
            className="inline-flex items-center bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 font-bold text-gray-700">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              {cartItems.map((item) => {
                const discountedPrice = item.price * (1 - item.discount / 100);
                return (
                  <div key={item.id} className="grid grid-cols-12 p-4 border-b items-center">
                    <div className="col-span-12 md:col-span-5 flex items-center mb-3 md:mb-0">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 text-sm flex items-center mt-1"
                        >
                          <FaTrash className="mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-4 md:col-span-2 text-center mb-3 md:mb-0">
                      <span className="text-gray-500 line-through text-sm mr-1">
                        ₹{item.price}
                      </span>
                      <span className="font-medium">₹{discountedPrice.toFixed(0)}</span>
                    </div>
                    
                    <div className="col-span-4 md:col-span-3 flex justify-center mb-3 md:mb-0">
                      <div className="flex items-center border rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <FaMinus />
                        </button>
                        <span className="px-3 py-1 border-x">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-4 md:col-span-2 text-right font-medium">
                      ₹{(discountedPrice * item.quantity).toFixed(0)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t">
                  <span>Total</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
              </div>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                Proceed to Checkout
              </button>
              <Link 
                to="/collection" 
                className="block text-center mt-4 text-purple-600 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}