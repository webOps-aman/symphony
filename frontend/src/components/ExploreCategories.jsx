import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { products } from '../assets/assets';  // Assuming you have this for your products data

const ExploreCategories = () => {
  const navigate = useNavigate();

  // This function handles the category click event
  const handleCategoryClick = (categoryName) => {
    // Navigate to the category products page dynamically
    navigate(`/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  // Extract unique categories from products array
  const getUniqueCategories = () => {
    const categoryMap = new Map();
    
    products.forEach(product => {
      if (!categoryMap.has(product.category)) {
        // Get first product's first image for each category
        const image = Array.isArray(product.image) ? product.image[0] : product.image;
        categoryMap.set(product.category, {
          name: product.category,
          image: image,
          count: 1
        });
      } else {
        categoryMap.get(product.category).count++;
      }
    });
    
    return Array.from(categoryMap.values());
  };

  const categories = getUniqueCategories();

  // Format category name for display
  const formatCategoryName = (name) => {
    return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

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
