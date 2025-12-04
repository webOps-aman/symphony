import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { getAllProducts } from '../api/productApi';

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Data states
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI / filter states
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Fetch products from API once on mount
  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllProducts();
        // Support both response shapes: { products: [...] } or direct array
        const productsArr = Array.isArray(data) ? data : data.products || [];
        console.log(productsArr)
        if (mounted) setAllProducts(productsArr);
      } catch (err) {
        console.error('Error fetching products:', err);
        if (mounted) setError('Failed to load products. Please try again later.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  // Helper: format URL category slug -> readable name
  const formatCategoryName = (name) => {
    if (!name) return '';
    return name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Filter products by category slug (client-side)
  const categoryProducts = allProducts.filter((p) => {
    if (!p.category) return false;
    return p.category.toLowerCase().replace(/\s+/g, '-') === categoryName;
  });

  // Get unique brands for filter UI
  const getBrands = () => {
    const brands = [...new Set(categoryProducts.map((p) => (p.name ? p.name.split(' ')[0] : 'Unknown')))];
    return brands.slice(0, 8);
  };

  // Get image src (supports array or string)
  const getImageSrc = (image) => {
    if (!image) return ''; // fallback if missing
    return Array.isArray(image) ? image[0] : image;
  };

  // Calculate discount percent if originalPrice present
  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= 0) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // Sort + filter pipeline
  const getSortedProducts = () => {
    let filtered = [...categoryProducts];

    // Price filter
    filtered = filtered.filter((p) => {
      const price = Number(p.price || 0);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => {
        const brand = p.name ? p.name.split(' ')[0] : '';
        return selectedBrands.includes(brand);
      });
    }

    // Sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (sortBy === 'newest') {
      // If `date` is a timestamp or ISO string
      filtered.sort((a, b) => {
        const da = new Date(a.date || 0).getTime();
        const db = new Date(b.date || 0).getTime();
        return db - da;
      });
    }

    return filtered;
  };

  const sortedProducts = getSortedProducts();

  // Brand toggle
  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Toast helper
  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Add to cart
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
    showToastNotification(`${product.name} added to cart!`);
  };

  // Buy now (adds to cart then navigates to product page / checkout)
  const handleBuyNow = (e, product) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
    showToastNotification(`${product.name} added to cart! Redirecting...`);
    // short delay to show toast
    setTimeout(() => {
      // change below to '/checkout' if you have that route
      navigate(`/product/${product._id}`);
    }, 800);
  };

  // Product card click
  const handleProductClick = (product) => {
    if (product._id) navigate(`/product/${product._id}`);
    else console.error('Product _id missing', product);
  };

  // Clear filters
  const clearAllFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 25000]);
  };

  // Loading / error UI
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center p-8">
        <div className="text-center text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center p-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white mt-8">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
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

            {/* Category info */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3 uppercase text-gray-700">Categories</h3>
              <div className="text-sm">
                <button onClick={() => navigate('/')} className="text-blue-600 hover:underline mb-2 block">
                  ← Home &amp; Kitchen
                </button>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">{formatCategoryName(categoryName)}</p>
                  <p className="text-xs text-gray-500 mt-1">{categoryProducts.length} products</p>
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
                onChange={(e) => setPriceRange([0, parseInt(e.target.value, 10)])}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Brand */}
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

            {/* Clear */}
            {(selectedBrands.length > 0 || priceRange[1] < 25000) && (
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
          {/* Breadcrumb & Header */}
          <div className="bg-white p-4 border-b border-gray-200">
            <div className="text-xs text-gray-600 mb-2">
              <span onClick={() => navigate('/')} className="cursor-pointer hover:text-blue-600">
                Home
              </span>
              {' › '}
              <span className="cursor-pointer hover:text-blue-600">Home &amp; Kitchen</span>
              {' › '}
              <span className="font-medium text-gray-800">{formatCategoryName(categoryName)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-medium">Best Of {formatCategoryName(categoryName)}</h1>
                <p className="text-xs text-gray-500 mt-1">
                  (Showing {sortedProducts.length} products of {categoryProducts.length})
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
              sortedProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                >
                  {/* Clickable area */}
                  <div onClick={() => handleProductClick(product)} className="cursor-pointer">
                    {/* Discount Badge */}
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                        {calculateDiscount(product.price, product.originalPrice)}% OFF
                      </div>
                    )}

                    {/* Image */}
                    <div className="relative bg-gray-50 p-4 h-56 flex items-center justify-center overflow-hidden">
                      <img
                        src={getImageSrc(product.image)}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Details */}
                    <div className="p-4">
                      <h3 className="font-medium text-sm text-gray-800 line-clamp-2 h-10 mb-2">{product.name}</h3>

                      {/* Rating (static placeholder) */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-green-600 text-white text-xs rounded">
                          <span className="font-semibold">4.4</span>
                          <span>★</span>
                        </div>
                        <span className="text-xs text-gray-500">(8,234)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-bold text-lg text-gray-900">₹{Number(product.price || 0).toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">₹{Number(product.originalPrice).toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
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
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
                <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
