// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiSearch, FiMenu, FiX, FiShoppingCart, FiUser, FiMail, FiLock, FiLoader } from "react-icons/fi";
// import axios from "axios";
// import Logo from "../assets/Logo1.png";

// export default function Navbar({ cartItems = [] }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

//   useEffect(() => {
//     const closeDropdown = (event) => {
//       if (!event.target.closest(".profile-menu")) {
//         setProfileOpen(false);
//       }
//     };
//     document.addEventListener("click", closeDropdown);
//     return () => document.removeEventListener("click", closeDropdown);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axios.post("http://localhost:5000/api/login", formData);
//       localStorage.setItem("user", JSON.stringify(data));
//       setUser(data);
//       setMessage("Login Successful!");
//       setTimeout(() => navigate("/profile"), 1500);
//     } catch (error) {
//       setMessage(error.response?.data?.error || "Invalid Credentials");
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <nav className="shadow-md fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-100 to-purple-200">
//       <div className="max-w-screen-xl mx-auto flex justify-between items-center py-4 px-6">
//         <Link to="/" className="flex items-center gap-2">
//           <img src={Logo} alt="logo" className="w-10 h-10 rounded-full" />
//           <span className="text-xl font-bold text-black tracking-wide">Lehenga Zone</span>
//         </Link>

//         <ul className="hidden md:flex space-x-8 text-black font-medium">
//           <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
//           <li><Link to="/collection" className="hover:text-blue-500">Collection</Link></li>
//           <li><Link to="/about" className="hover:text-blue-500">About</Link></li>
//           <li><Link to="/contact" className="hover:text-blue-500">Contact</Link></li>
//         </ul>

//         <div className="flex items-center space-x-4">
//           <div className="relative text-gray-600 hover:text-blue-500">
//             <Link to="/cart" className="relative">
//               <FiShoppingCart className="w-6 h-6" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
//           </div>

//           <div className="relative profile-menu">
//             <button className="p-2 bg-gray-100 rounded-full" onClick={() => setProfileOpen(!profileOpen)}>
//               <FiUser className="text-gray-600 w-5 h-5" />
//             </button>
//             {profileOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
//                 {user ? (
//                   <>
//                     <Link to="/profile" className="block px-4 py-2 hover:bg-blue-400 hover:text-white">Profile</Link>
//                     <Link to="/orders" className="block px-4 py-2 hover:bg-blue-400 hover:text-white">Orders</Link>
//                     <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-blue-400 hover:text-white">Logout</button>
//                   </>
//                 ) : (
//                   <>
//                     <form onSubmit={handleSubmit} className="p-4">
//                       <div className="relative mb-3">
//                         <FiMail className="absolute left-3 top-3 text-gray-500" />
//                         <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="pl-10 border p-2 w-full rounded-md" />
//                       </div>
//                       <div className="relative mb-3">
//                         <FiLock className="absolute left-3 top-3 text-gray-500" />
//                         <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="pl-10 border p-2 w-full rounded-md" />
//                       </div>
//                       <button type="submit" className="bg-green-500 text-white p-2 rounded-md w-full hover:bg-green-600">Login</button>
//                       {message && <p className={`mt-2 text-center ${message.includes("Success") ? "text-green-500" : "text-red-500"}`}>{message} {loading && <FiLoader className="ml-2 animate-spin" />}</p>}
//                     </form>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//           <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }




import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";
import Logo from "../assets/Logo1.png";

export default function Navbar({ cartItems = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null); // Store user state
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  // Check if user is logged in on page load
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Set user state
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data
    setUser(null); // Reset user state
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="shadow-md fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-3.5 px-6" >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="logo"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full"
          />
          <span className="text-base sm:text-lg md:text-xl font-bold text-black tracking-wide">
            Lehenga Zone
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-black font-medium">
          <li>
            <Link to="/" className="hover:text-blue-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/collection" className="hover:text-blue-500 transition">
              Collection
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-500 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-500 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Icons Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1">
            <FiSearch className="text-gray-600 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-48"
            />
          </div>

          {/* Cart Icon */}
          <div className="relative flex flex-col items-center justify-center">
            <Link
              to="/cart"
              className="p-1.5 text-gray-600 hover:text-blue-500 transition"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative profile-menu flex flex-col items-center">
            {/* Profile Icon */}
            <button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <FiUser className="text-gray-600 w-5 h-5 cursor-pointer" />
            </button>

            {/* Display "Hi, Username!" below icon if logged in */}
            {user && (
              <p className="text-sm text-gray-700 font-semibold mt-1">
                Hi, {user.user.name}!
              </p>
            )}

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute text-center right-0 mt-2 w-40 bg-white shadow-lg rounded-md"onClick={() => setProfileOpen(false)}>
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-blue-400 hover:text-white"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 hover:bg-blue-400 hover:text-white"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-center"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2.5 hover:bg-blue-400 hover:text-white"
                    onClick={() => setProfileOpen(false)}>
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <div className="px-6">
            {/* Mobile Search Bar */}
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 mb-4">
              <FiSearch className="text-gray-600 w-5 h-5 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none w-full"
              />
            </div>

            {/* Mobile Navigation Links */}
            <ul
              className="space-y-4 text-center text-gray-700 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              <li>
                <Link to="/" className="block py-2 hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/collection"
                  className="block py-2 hover:text-blue-500"
                >
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/about" className="block py-2 hover:text-blue-500">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="block py-2 hover:text-blue-500">
                  Contact
                </Link>
              </li>
              {!user && (
                <li>
                  <Link to="/login" className="block py-2 hover:text-blue-500">
                    Login
                  </Link>
                </li>
              )}
              {user && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

