import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { getAllProducts } from '../api/productApi';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeProductSlider = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const BASE_URL = 'http://localhost:5000';

  // Fetch Products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        console.log('API Response:', response);
        
        // Extract products array from response
        let productsData = [];
        if (response && response.data && Array.isArray(response.data)) {
          productsData = response.data;
        } else if (Array.isArray(response)) {
          productsData = response;
        }
        
        setProducts(productsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter only products having rating >= 4.2
  const topRatedProducts = products
    .filter((item) => item.seller?.rating >= 4.2)
    .sort((a, b) => b.seller.rating - a.seller.rating) // Sort by highest rating
    .slice(0, 10); // Only top 10

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
    showToastNotification(`${product.name} added to cart! Redirecting...`);
    
    setTimeout(() => {
      navigate(`/product/${product._id}`);
    }, 1500);
  };

  // Handle Product Card Click
  const handleProductClick = (product) => {
    if (product._id) {
      navigate(`/product/${product._id}`);
    }
  };

  // Get image URL with base path
  const getImageUrl = (image) => {
    if (Array.isArray(image) && image.length > 0) {
      return `${BASE_URL}/${image[0]}`;
    }
    return image ? `${BASE_URL}/${image}` : '/placeholder-image.jpg';
  };

  // Loading State
  if (loading) {
    return (
      <div className="categories_area w-full py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="w-[90%] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Top 10 Rated Coolers
            </h2>
            <p className="text-gray-600 text-lg">
              Explore the best-performing coolers with ratings above 4.2★.
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="categories_area w-full py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="w-[90%] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Top 10 Rated Coolers
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center py-20">
            <svg
              className="w-16 h-16 text-red-500 mb-4"
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
            <p className="text-red-600 text-lg font-medium mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (topRatedProducts.length === 0) {
    return (
      <div className="categories_area w-full py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="w-[90%] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Top 10 Rated Coolers
            </h2>
            <p className="text-gray-600 text-lg">
              Explore the best-performing coolers with ratings above 4.2★.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-600 text-lg">No top-rated products available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="categories_area w-full py-16 bg-gradient-to-b from-blue-50 to-white">
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

      <div className="w-[90%] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Top 10 Rated Coolers
          </h2>
          <p className="text-gray-600 text-lg">
            Explore the best-performing coolers with ratings above 4.2★.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ 
            clickable: true,
            dynamicBullets: true
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="p-4 pb-16"
          style={{
            '--swiper-pagination-bottom': '0px',
            '--swiper-pagination-bullet-inactive-color': '#999',
            '--swiper-pagination-bullet-inactive-opacity': '0.4',
            '--swiper-pagination-color': '#3b82f6',
            '--swiper-pagination-bullet-size': '10px',
            '--swiper-pagination-bullet-horizontal-gap': '6px'
          }}
        >

          {/* ------------------ MAP PRODUCTS HERE ------------------ */}
          {topRatedProducts.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden group">

                <div 
                  className="cursor-pointer"
                  onClick={() => handleProductClick(item)}
                >

                  {/* Discount Badge */}
                  {item.originalPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                      {Math.round(
                        ((item.originalPrice - item.price) / item.originalPrice) * 100
                      )}% OFF
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="relative bg-gray-50 p-4 h-56 flex items-center justify-center overflow-hidden">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-medium text-sm text-gray-800 line-clamp-2 h-10 mb-2">
                      {item.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-green-600 text-white text-xs rounded">
                        <span className="font-semibold">{item.seller?.rating || '4.2'}</span>
                        <span>★</span>
                      </div>
                      <span className="text-xs text-gray-500">(Top Rated)</span>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-bold text-lg text-gray-900">
                        ₹{item.price.toLocaleString()}
                      </span>

                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="px-4 pb-4 flex gap-2">
                  <button 
                    onClick={(e) => handleAddToCart(e, item)}
                    className="flex-1 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={(e) => handleBuyNow(e, item)}
                    className="flex-1 py-2 bg-orange-500 text-white text-sm font-semibold rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>

              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>

      {/* Custom CSS for better pagination spacing */}
      <style jsx>{`
        .swiper-pagination {
          margin-top: 20px !important;
        }
        
        .swiper-pagination-bullet {
          margin: 0 6px !important;
        }
      `}</style>
    </div>
  );
};

export default HomeProductSlider;