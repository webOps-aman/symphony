import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';

const Navbar = () => {
  const [sideBar, setSideBar] = useState(false);

  const categories = [
    "Desert Coolers",
    "Tower Coolers",
    "Industrial Coolers",
    "BLDC Coolers",
  ];

  const supportLinks = [
        { name: "Contact Us", path: "/pages/contactus" },
        { name: "Warranty & Service", path: null },
        { name: "About Us", path: "/pages/aboutus" },
        { name: "Tracking", path: null },
        { name: "Login/Sign Up", path: "/account/login" },
    ];

    const location = useLocation();
    const currentPath = location.pathname;

  return (
    <section>
      <div className='nav-part w-full'>

        {/* ----------announcement start here---------- */}
        <div className='announcement-area py-1 bg-[#538ae9] overflow-hidden whitespace-nowrap'>
          <div className="animate-marquee inline-block text-white">
            <span className="mx-40">3% Off On UPI Payments</span>
            <span className="mx-40">Assured Same Day Dispatch</span>
            <span className="mx-40">6 Months No Cost EMI From 16+ Bank Cards</span>
            <span className="mx-40">No Cost Cardless EMI Options</span>
            <span className="mx-40">Lifetime Symphony Support</span>
          </div>
        </div>
        {/* ----------announcement end here---------- */}

        {/* ----------menubar start here---------- */}
        <div className='menuSection w-full bg-[#f2f4f5]'>
          <div className='menuArea flex justify-between lg:mx-4 py-2'>

            <div onClick={() => setSideBar(true)} className='w-11 lg:w-13 h-8 my-2 md:hidden'>
              <img src={assets.hamburgerIcon} alt="menu" className='w-full h-full object-contain' />
            </div>

            <div className='logo w-32 py-1'>
              <img src={assets.logo1} alt="logo" />
            </div>

            <div className='middlePart hidden md:flex justify-between md:justify-evenly lg:justify-between w-[60%]'>
              <div className='category w-[30%] py-1'>
                <form className="mx-auto">
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option selected>All Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat.replace(/\s+/g, '')}>{cat}</option>
                    ))}
                  </select>
                </form>
              </div>

              <div className='searchBarArea w-[60%]'>
                <form>
                  <div className="relative py-1">
                    <input
                      type="search"
                      className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search..."
                      required
                    />
                    <button
                      type="submit"
                      className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className='iconsPart flex justify-around w-52 lg:w-[20%]'>
              <div className='w-11 lg:w-13 h-8 my-2'><img src={assets.trackingIcon} alt="tracking" className='w-full h-full object-contain' /></div>

              <div className='w-11 lg:w-13 h-8 my-2'><img src={assets.supportIcon} alt="support" className='w-full h-full object-contain' /></div>

              <div className='w-11 lg:w-13 h-8 my-2'><img src={assets.cartIcon} alt="cart" className='w-full h-full object-contain' /></div>

              <div className='w-11 lg:w-13 h-8 my-2'><img src={assets.accountIcon} alt="account" className='w-full h-full object-contain' /></div>
              
            </div>
          </div>
        </div>
        {/* ----------menubar end here---------- */}
      </div>

      {/* ----------sidebar start here---------- */}
      <div className={`sidebarPart fixed z-50 top-0 left-0 w-full h-screen bg-white transform transition-transform duration-700 ease-in-out md:hidden ${sideBar ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="sidebarHeader flex py-5 shadow-md">
          <div className="logoArea mx-auto">
            <img src={assets.logo1} alt="logo" className="w-32 mx-auto" />
          </div>
          <div className="crossIconArea">
            <img
              onClick={() => setSideBar(false)}
              src={assets.closeIcon}
              alt="close"
              className="w-11 pr-[20px] mt-[-10px]"
            />
          </div>
        </div>

        {/* ----------sidebar menu start---------- */}
        <div className='sidebarMenuArea h-[calc(100vh-100px)] overflow-y-auto mt-4'>

          <div className='AllCategory mx-4'>
            <p className='font-semibold text-black text-xl'>All Category</p>

            {categories.map((cat) => {
              const slug = cat.toLowerCase().replace(/ & /g, "-and-").replace(/\s+/g, "-");
              const isActive = location.pathname === `/collections/${slug}`;

              return (
                <Link
                  key={cat}
                  to={`/collections/${slug}`}
                  onClick={() => setSideBar(false)}
                  className={`block py-2 my-3 rounded-full pl-5 ${
                    isActive ? 'bg-blue-800 text-white' : 'bg-[#f2f4f5] text-black'
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          <div className='Support mx-4 mt-6'>
    <p className='font-semibold text-black text-xl'>Support</p>

    {supportLinks.map((item) =>
      item.path ? (
        <Link
          key={item.name}
          to={item.path}
          onClick={() => setSideBar(false)}
          className={`block py-2 my-3 rounded-full pl-5 
            ${currentPath === item.path ? 'bg-[#1e40af] text-white' : 'bg-[#f2f4f5] text-black'}`}
        >
          {item.name}
        </Link>
      ) : (
        <div key={item.name} className='py-2 my-3 rounded-full bg-[#f2f4f5]'>
          <p className='pl-5'>{item.name}</p>
        </div>
      )
    )}
  </div>

        </div>
        {/* ----------sidebar menu end---------- */}
      </div>
      {/* ----------sidebar end here---------- */}
    </section>
  );
};

export default Navbar;
