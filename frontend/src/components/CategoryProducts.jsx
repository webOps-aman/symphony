import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { products } from '../assets/assets';

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Filter products by selected category (from URL)
  const categoryProducts = products.filter((p) => p.category.toLowerCase().replace(/\s+/g, '-') === categoryName);

  // Get unique brands from category products
  const getBrands = () => {
    const brands = [...new Set(categoryProducts.map((p) => p.name.split(' ')[0]))];
    return brands.slice(0, 8);
  };

  // Sort and filter products
  const getSortedProducts = () => {
    let filtered = [...categoryProducts];

    // Filter by price range
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by selected brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.name.split(' ')[0]));
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => b.date - a.date);
    }

    return filtered;
  };

  const sortedProducts = getSortedProducts();

  const getImageSrc = (image) => {
    return Array.isArray(image) ? image[0] : image;
  };

  const calculateDiscount = (price, originalPrice) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const formatCategoryName = (name) => {
    return name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Show toast notification
  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Handle Add to Cart
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    };
    
    dispatch(addToCart(cartItem));
    showToastNotification(`${product.name} added to cart!`);
  };

  // Handle Buy Now
  const handleBuyNow = (e, product) => {
    e.stopPropagation();
    
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    };
    
    dispatch(addToCart(cartItem));
    showToastNotification(`${product.name} added to cart! Redirecting to checkout...`);
    
    // Redirect to checkout page after a short delay
    setTimeout(() => {
      // navigate('/checkout'); // Uncomment when you have checkout page
      navigate(`/product/${product._id}`); // For now, go to product page
    }, 1500);
  };

  // Handle Product Card Click
  const handleProductClick = (product) => {
    if (product._id) {
      navigate(`/product/${product._id}`);
    } else {
      console.error('Product _id is missing!');
    }
  };

  return (
    <div className="w-full min-h-screen bg-white mt-8">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in-right">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Left Sidebar - Filters */}
        <div className="w-64 border-r border-gray-200 bg-white min-h-screen sticky top-0 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-6">Filters</h2>

            {/* Categories Section */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3 uppercase text-gray-700">Categories</h3>
              <div className="text-sm">
                <button 
                  onClick={() => navigate('/')}
                  className="text-blue-600 hover:underline mb-2 block"
                >
                  ← Home & Kitchen
                </button>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">{formatCategoryName(categoryName)}</p>
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-semibold text-sm mb-3 uppercase text-gray-700">Price</h3>
              <input
                type="range"
                min="0"
                max="25000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Brand Section */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-semibold text-sm mb-3 uppercase text-gray-700">Brand</h3>
              <div className="space-y-2">
                {getBrands().map((brand, idx) => (
                  <label key={idx} className="flex items-center text-sm cursor-pointer hover:text-blue-600">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="mr-2 accent-blue-600"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedBrands.length > 0 || priceRange[1] < 25000) && (
              <button
                onClick={() => {
                  setSelectedBrands([]);
                  setPriceRange([0, 25000]);
                }}
                className="w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>

        {/* Right Side - Products */}
        <div className="flex-1 bg-gray-50">
          {/* Breadcrumb & Title */}
          <div className="bg-white p-4 border-b border-gray-200">
            <div className="text-xs text-gray-600 mb-2">
              <span 
                onClick={() => navigate('/')}
                className="cursor-pointer hover:text-blue-600"
              >
                Home
              </span>
              {' › '}
              <span className="cursor-pointer hover:text-blue-600">Home & Kitchen</span>
              {' › '}
              <span className="font-medium text-gray-800">{formatCategoryName(categoryName)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-medium">Best Of {formatCategoryName(categoryName)}</h1>
                <p className="text-xs text-gray-500 mt-1">
                  (Showing 1 - {sortedProducts.length} products of {categoryProducts.length} products)
                </p>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="bg-white px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 px-3 py-1.5 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price - Low to High</option>
                <option value="price-high">Price - High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                >
                  {/* Product Card - Clickable Area */}
                  <div 
                    onClick={() => handleProductClick(product)}
                    className="cursor-pointer"
                  >
                    {/* Discount Badge */}
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                        {calculateDiscount(product.price, product.originalPrice)}% OFF
                      </div>
                    )}

                    {/* Product Image */}
                    <div className="relative bg-gray-50 p-4 h-56 flex items-center justify-center overflow-hidden">
                      <img
                        src={getImageSrc(product.image)}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <h3 className="font-medium text-sm text-gray-800 line-clamp-2 h-10 mb-2">
                        {product.name}
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
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Always Visible */}
                  <div className="px-4 pb-4 flex gap-2">
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="flex-1 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-md hover:bg-yellow-600 transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => handleBuyNow(e, product)}
                      className="flex-1 py-2 bg-orange-500 text-white text-sm font-semibold rounded-md hover:bg-orange-600 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              // Empty State
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
                <svg
                  className="w-24 h-24 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;