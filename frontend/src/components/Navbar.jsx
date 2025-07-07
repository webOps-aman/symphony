import React, { useState } from 'react'
import {assets} from '../assets/assets.js';

const Navbar = () => {

    const [sideBar, setSideBar] = useState(false);

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

                    <div onClick={() => setSideBar(true)} className='w-11 lg:w-13 h-8 my-2 md:hidden'><img src={assets.hamburgerIcon} alt="support" className='w-full h-full object-contain'/></div>

                    <div className='logo w-32 py-1'>
                        <img src={assets.logo1} alt="" />
                    </div>

                    <div className='middlePart hidden md:flex justify-between md:justify-evenly lg:justify-between w-[60%]'>
                        <div className='category w-[30%] py-1'>
                            <form class="mx-auto">
                                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>All Category</option>
                                    <option value="PremiumCoolers">Premium Coolers</option>
                                    <option value="BLDCCoolers">BLDC Coolers</option>
                                    <option value="TowerCoolers">Tower Coolers</option>
                                    <option value="DesertCoolers">Desert Coolers</option>
                                    <option value="IndustrialCoolers">Industrial Coolers</option>
                                    <option value="SilentCoolers">Silent Coolers</option>
                                    <option value="TowerKitchenCoolingFans">Tower & Kitchen Cooling Fans</option>
                                    <option value="WaterHeaters">Water Heaters</option>
                                </select>
                            </form>
                        </div>

                        <div className='searchBarArea w-[60%]'>
                            <form class=""> 
                                <div class="relative py-1">
                                    <input type="search" id="default-search" class="block w-full p-3  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                                    <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='iconsPart flex justify-around w-52 lg:w-[20%]'>
                        <div className='w-11 lg:w-13 h-8 my-2'><img src={assets.trackingIcon} alt="tracking" className='w-full h-full object-contain'/></div>

                        <div className='w-11 lg:w-13 h-8 my-2'><img src={assets.supportIcon} alt="support" className='w-full h-full object-contain'/></div>

                        <div className='w-11 lg:w-13 h-8 my-2'><img src={assets.cartIcon} alt="cart" className='w-full h-full object-contain'/></div>

                        <div className='w-11 lg:w-13 h-8 my-2'><img src={assets.accountIcon} alt="account" className='w-full h-full object-contain'/></div>
                    </div>

                </div>
            </div>
{/* ----------menubar end here---------- */}
        </div>

<div
  className={`sidebarPart fixed z-50 top-0 left-0 w-full h-screen bg-white transform transition-transform duration-700 ease-in-out md:hidden ${
    sideBar ? 'translate-x-0' : '-translate-x-full'
  }`}
>
  <div className="sidebarHeader flex py-5">
    <div className="logoArea mx-auto">
      <img src={assets.logo1} alt="" className="w-32 mx-auto" />
    </div>
    <div className="crossIconArea">
      <img
        onClick={() => setSideBar(false)}
        src={assets.closeIcon}
        alt=""
        className="w-11 pr-[20px] mt-[-10px]"
      />
    </div>
  </div>
</div>
     
    </section>
  )
}

export default Navbar