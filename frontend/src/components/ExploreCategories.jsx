import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../api/productApi'; // Import your API function

const ExploreCategories = () => {
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products and extract categories
  useEffect(() => {
    const fetchCategories = async () => {
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
        
        console.log('Products Data:', productsData);
        
        // Extract unique categories from products
        const uniqueCategories = getUniqueCategories(productsData);
        console.log('Unique Categories:', uniqueCategories);
        
        setCategories(uniqueCategories);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Extract unique categories from products array
  const getUniqueCategories = (products) => {
    if (!Array.isArray(products) || products.length === 0) return [];
    
    const categoryMap = new Map();
    const BASE_URL = 'http://localhost:5000';
    
    products.forEach(product => {
      if (product.category && !categoryMap.has(product.category)) {
        // Get first product's first image for each category
        let imageUrl = '';
        if (Array.isArray(product.image) && product.image.length > 0) {
          imageUrl = `${BASE_URL}/${product.image[0]}`;
        } else if (product.image) {
          imageUrl = `${BASE_URL}/${product.image}`;
        } else {
          imageUrl = '/placeholder-image.jpg';
        }
        
        categoryMap.set(product.category, {
          name: product.category,
          image: imageUrl,
          count: 1
        });
      } else if (product.category) {
        const existing = categoryMap.get(product.category);
        if (existing) {
          existing.count++;
        }
      }
    });
    
    return Array.from(categoryMap.values());
  };

  // This function handles the category click event
  const handleCategoryClick = (categoryName) => {
    // Navigate to the category products page dynamically
    navigate(`/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  // Format category name for display
  const formatCategoryName = (name) => {
    return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Loading State
  if (loading) {
    return (
      <div className='categories_area w-full py-16 bg-gradient-to-b from-blue-50 to-white'>
        <div className='w-[90%] mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-gray-800 mb-3'>
              Explore Our Categories
            </h2>
            <p className='text-gray-600 text-lg'>
              Choose the perfect cooler for your needs
            </p>
          </div>
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600'></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className='categories_area w-full py-16 bg-gradient-to-b from-blue-50 to-white'>
        <div className='w-[90%] mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-gray-800 mb-3'>
              Explore Our Categories
            </h2>
          </div>
          <div className='flex flex-col items-center justify-center py-20'>
            <svg
              className='w-16 h-16 text-red-500 mb-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <p className='text-red-600 text-lg font-medium mb-4'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (categories.length === 0) {
    return (
      <div className='categories_area w-full py-16 bg-gradient-to-b from-blue-50 to-white'>
        <div className='w-[90%] mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-gray-800 mb-3'>
              Explore Our Categories
            </h2>
          </div>
          <div className='flex flex-col items-center justify-center py-20'>
            <p className='text-gray-600 text-lg'>No categories available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='categories_area w-full py-16 bg-gradient-to-b from-blue-50 to-white'>
      <div className='w-[90%] mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-800 mb-3'>
            Explore Our Categories
          </h2>
          <p className='text-gray-600 text-lg'>
            Choose the perfect cooler for your needs
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className='category-card group cursor-pointer'
            >
              <div className='relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-blue-600'>
                <div className='flex justify-center items-center pt-8 pb-4'>
                  <div className='w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300'>
                    <img
                      src={category.image}
                      alt={formatCategoryName(category.name)}
                      className='w-32 h-32 object-contain'
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg'; // Fallback for broken images
                      }}
                    />
                  </div>
                </div>
                <div className='text-center pb-6 px-4'>
                  <h3 className='text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300'>
                    {formatCategoryName(category.name)}
                  </h3>
                  <p className='text-sm text-gray-500 mt-2'>
                    {category.count} Products
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreCategories;