import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { getAllProducts } from '../api/productApi'; // Import your API function

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const productsPerPage = 8;

  // Fetch Products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        console.log('Fetched products:', data);
        
        // Handle different API response structures
        let productsData = [];
        
        if (data && data.data && Array.isArray(data.data)) {
          // If response is { data: [...] }
          productsData = data.data;
        } else if (data && data.products && Array.isArray(data.products)) {
          // If response is { products: [...] }
          productsData = data.products;
        } else if (Array.isArray(data)) {
          // If response is directly an array
          productsData = data;
        } else if (data && typeof data === 'object') {
          // Check all object keys for array
          const arrayKey = Object.keys(data).find(key => Array.isArray(data[key]));
          if (arrayKey) {
            productsData = data[arrayKey];
          }
        }
        
        console.log('Products array:', productsData);
        setProducts(productsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique brands from all products
  const getBrands = () => {
    if (!Array.isArray(products) || products.length === 0) return [];
    const brands = [...new Set(products.map((p) => p.name?.split(' ')[0]).filter(Boolean))];
    return brands.slice(0, 10);
  };

  // Get unique categories from all products
  const getCategories = () => {
    if (!Array.isArray(products) || products.length === 0) return [];
    const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
    return categories;
  };

  // Sort and filter products
  const getSortedProducts = () => {
    if (!Array.isArray(products)) return [];
    
    let filtered = [...products];

    // Filter by price range
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by selected brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.name.split(' ')[0]));
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
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

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getImageSrc = (image) => {
    return Array.isArray(image) ? image[0] : image;
  };

  const calculateDiscount = (price, originalPrice) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    setCurrentPage(1);
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
    
    setTimeout(() => {
      navigate(`/product/${product._id}`);
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

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([0, 25000]);
    setCurrentPage(1);
  };

  // Loading State
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white mt-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="w-full min-h-screen bg-white mt-8 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-24 h-24 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-600 text-lg font-medium mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
        {/* Left Sidebar - Filters (Fixed) */}
        <div className="w-64 border-r border-gray-200 bg-white h-screen sticky top-0 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-6">Filters</h2>

            {/* Categories Section */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-semibold text-sm mb-3 uppercase text-gray-700">Categories</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {getCategories().map((category, idx) => (
                  <label key={idx} className="flex items-center text-sm cursor-pointer hover:text-blue-600">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2 accent-blue-600"
                    />
                    <span>{category}</span>
                  </label>
                ))}
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
                onChange={(e) => {
                  setPriceRange([0, parseInt(e.target.value)]);
                  setCurrentPage(1);
                }}
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
              <div className="space-y-2 max-h-48 overflow-y-auto">
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
            {(selectedBrands.length > 0 || selectedCategories.length > 0 || priceRange[1] < 25000) && (
              <button
                onClick={clearAllFilters}
                className="w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>

        {/* Right Side - Products */}
        <div className="flex-1 bg-gray-50">
          {/* Header */}
          <div className="bg-white p-4 border-b border-gray-200">
            <div className="text-xs text-gray-600 mb-2">
              <span 
                onClick={() => navigate('/')}
                className="cursor-pointer hover:text-blue-600"
              >
                Home
              </span>
              {' › '}
              <span className="font-medium text-gray-800">All Products</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-medium">All Products</h1>
                <p className="text-xs text-gray-500 mt-1">
                  (Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, sortedProducts.length)} products of {sortedProducts.length} products)
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
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <div
                    key={product._id || index}
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
                          src={`http://localhost:5000/${product.image[0]}`}
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

                    {/* Action Buttons */}
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

            {/* Pagination */}
            {sortedProducts.length > productsPerPage && (
              <div className="flex justify-center items-center gap-2 mt-8 pb-8">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md font-medium ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 rounded-md font-medium ${
                          currentPage === pageNumber
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <span key={pageNumber} className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md font-medium ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;