import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { assets } from '../assets/assets.js';
import CartSidebar from './CartSidebar';

const Navbar = () => {
  const [sideBar, setSideBar] = useState(false);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  
  // Get cart items count from Redux store
  const cartItems = useSelector((state) => state.cart.cart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const mainMenuItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Track Order", path: "/track-order" },
  ];

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <section className="w-full">
      <div className="fixed top-0 left-0 w-full z-50">
        {/* ----------announcement start here---------- */}
        <div className='announcement-area py-1 bg-[#538ae9] overflow-hidden whitespace-nowrap'>
          <div className="animate-marquee inline-block text-white text-sm">
            <span className="mx-40">3% Off On UPI Payments</span>
            <span className="mx-40">Assured Same Day Dispatch</span>
            <span className="mx-40">6 Months No Cost EMI From 16+ Bank Cards</span>
            <span className="mx-40">No Cost Cardless EMI Options</span>
            <span className="mx-40">Lifetime Symphony Support</span>
          </div>
        </div>
        {/* ----------announcement end here---------- */}

        {/* ----------menubar start here---------- */}
        <div className='menuSection bg-white w-full shadow-md border-b border-gray-200'>
          <div className='menuArea flex justify-between items-center px-4 lg:px-8 py-3'>

            {/* Mobile Hamburger */}
            <div onClick={() => setSideBar(true)} className='w-8 h-8 cursor-pointer lg:hidden flex items-center justify-center'>
              <img src={assets.hamburgerIcon} alt="menu" className='w-6 h-6 object-contain' />
            </div>

            {/* Logo */}
            <Link to="/" className='logo w-32 lg:w-40'>
              <img src={assets.logo1} alt="Symphony Logo" className='w-full h-auto' />
            </Link>

            {/* Desktop Navigation Menu */}
            <nav className='hidden lg:flex items-center space-x-8'>
              {mainMenuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-[#538ae9] ${
                    currentPath === item.path 
                      ? 'text-[#538ae9] border-b-2 border-[#538ae9] pb-1' 
                      : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className='iconsPart flex items-center space-x-4 lg:space-x-6'>
              {/* Support Icon */}
              <Link to="/pages/contactus" className='w-9 h-9 cursor-pointer hover:opacity-70 transition-opacity hidden sm:block'>
                <img src={assets.supportIcon} alt="Customer Support" className='w-full h-full object-contain' />
              </Link>
              
              {/* Cart Icon with Badge */}
              <div 
                className='w-9 h-9 relative cursor-pointer hover:opacity-70 transition-opacity'
                onClick={() => setCartSidebarOpen(true)}
              >
                <img src={assets.cartIcon} alt="Shopping Cart" className='w-full h-full object-contain' />
                {cartCount > 0 && (
                  <div className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse'>
                    {cartCount > 99 ? '99+' : cartCount}
                  </div>
                )}
              </div>
              
              {/* Account Icon */}
              <Link to="/account/login" className='w-9 h-9 cursor-pointer hover:opacity-70 transition-opacity'>
                <img src={assets.accountIcon} alt="My Account" className='w-full h-full object-contain' />
              </Link>
            </div>
          </div>
        </div>
        {/* ----------menubar end here---------- */}
      </div>

      {/* ----------spacing div to push content down---------- */}
      <div className="pt-[88px]"></div>

      {/* ----------sidebar start here (Mobile)---------- */}
      <div className={`sidebarPart fixed z-50 top-0 left-0 w-[85%] max-w-sm h-screen bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${sideBar ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar Header */}
        <div className="sidebarHeader flex justify-between items-center px-5 py-4 shadow-md bg-[#f8f9fa]">
          <Link to="/" onClick={() => setSideBar(false)}>
            <img src={assets.logo1} alt="Symphony Logo" className="w-28" />
          </Link>
          <button
            onClick={() => setSideBar(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          >
            <img src={assets.closeIcon} alt="Close Menu" className="w-5 h-5" />
          </button>
        </div>

        {/* ----------sidebar menu start---------- */}
        <div className='sidebarMenuArea h-[calc(100vh-80px)] overflow-y-auto'>
          {/* Main Menu Items */}
          <div className='mainMenu px-5 py-4'>
            <h3 className='font-semibold text-gray-800 text-lg mb-3'>Menu</h3>
            {mainMenuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSideBar(false)}
                className={`block py-3 px-4 my-2 rounded-lg transition-all ${
                  currentPath === item.path 
                    ? 'bg-[#538ae9] text-white shadow-md' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Additional Links */}
          <div className='extraLinks px-5 py-4 border-t border-gray-200'>
            <h3 className='font-semibold text-gray-800 text-lg mb-3'>Quick Links</h3>
            <Link
              to="/pages/warranty"
              onClick={() => setSideBar(false)}
              className='block py-3 px-4 my-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all'
            >
              Warranty & Service
            </Link>
          </div>
        </div>
        {/* ----------sidebar menu end---------- */}
      </div>

      {/* Sidebar Overlay */}
      {sideBar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSideBar(false)}
        />
      )}
      {/* ----------sidebar end here---------- */}

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={cartSidebarOpen} 
        onClose={() => setCartSidebarOpen(false)} 
      />
    </section>
  );
};

export default Navbar;