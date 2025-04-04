// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Navbar from './Pages/Navbar';
// import Home from './Pages/Home';
// import About from './Pages/About';
// import Collection from './Pages/Collection';
// import Contact from './Pages/Contact';
// import Cart from './Pages/Cart';
// import Login from './Pages/Login';
// import Register from './Pages/Register';
// import Orders from './Pages/Orders';
// import Profile from './Pages/Profile';
// import AdminPage from './Pages/AdminPage';


// function Layout() {
//   const location = useLocation();  
//   const hideNavbarRoutes = ['/login', '/register']; 
//   return (
//     <>
//       {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
//       <div className="">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/collection" element={<Collection />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/profile" element ={<Profile/>}/>
//           <Route path='/admin' element={<AdminPage/>}/>
          
//         </Routes>
//       </div>
//     </>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// }



import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Collection from './Pages/Collection';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Orders from './Pages/Orders';
import Profile from './Pages/Profile';
import AdminPage from './Pages/AdminPage';

function Layout({ cartItems, setCartItems }) {
  const location = useLocation();  
  const hideNavbarRoutes = ['/login', '/register']; 
  
  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar cartItems={cartItems} />}
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/collection" 
            element={<Collection cartItems={cartItems} setCartItems={setCartItems} />} 
          />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/cart" 
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem('fashionCart');
    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fashionCart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Router>
      <Layout cartItems={cartItems} setCartItems={setCartItems} />
    </Router>
  );
}