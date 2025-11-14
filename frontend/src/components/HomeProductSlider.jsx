import React from 'react'

const HomeProductSlider = () => {
  return (
    <div className='categories_area w-full py-16 bg-gradient-to-b from-blue-50 to-white'>
      <div className='w-[90%] mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-800 mb-3'>
            Hot Deals
          </h2>
          <p className='text-gray-600 text-lg'>
            Find the best deals on top-rated coolers today!
          </p>
        </div>
        {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            
                <div
                  key=""
                  className="bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                >
                  {/* Product Card - Clickable Area */}
                  <div 
                    onClick=""
                    className="cursor-pointer"
                  >
                    {/* Discount Badge */}
                    
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                        % OFF
                      </div>
                    

                    {/* Product Image */}
                    <div className="relative bg-gray-50 p-4 h-56 flex items-center justify-center overflow-hidden">
                      <img
                        src=""
                        alt=""
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <h3 className="font-medium text-sm text-gray-800 line-clamp-2 h-10 mb-2">
                        name
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-green-600 text-white text-xs rounded">
                          <span className="font-semibold">4.4</span>
                          <span>★</span>
                        </div>
                        <span className="text-xs text-gray-500">(8,234)</span>
                      </div>

                      {/* Price Section */}
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-bold text-lg text-gray-900">
                          ₹
                        </span>
                        
                          <span className="text-sm text-gray-500 line-through">
                            ₹
                          </span>
                        
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Always Visible */}
                  <div className="px-4 pb-4 flex gap-2">
                    <button
                      onClick=""
                      className="flex-1 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-md hover:bg-yellow-600 transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick=""
                      className="flex-1 py-2 bg-orange-500 text-white text-sm font-semibold rounded-md hover:bg-orange-600 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                
             
            
          </div>
      </div>
    </div>
  )
}

export default HomeProductSlider