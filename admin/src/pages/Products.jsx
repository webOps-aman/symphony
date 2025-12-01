import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Search, Download, SlidersHorizontal, MoreVertical, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { getAllProducts } from '../api/productApi';


const Products = () => {
  const { isDark } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 7;

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts();
      console.log('Products Response:', response);
      
      // Adjust based on your API response structure
      const productsData = response.products || response.data || response;
      setProducts(productsData);
      setTotalProducts(productsData.length);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get stock status
  const getStockStatus = (product) => {
    // You can modify this based on your stock logic
    const randomStock = Math.random() > 0.5;
    return randomStock ? 'In Stock' : 'Out of Stock';
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Product List</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 cursor-pointer hover:text-blue-500">Home</span>
            <ChevronRight size={16} className="text-gray-400" />
            <span>Product List</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-xl font-semibold">Products List</h2>
                <p className="text-sm text-gray-500">Track your store's progress to boost your sales.</p>
              </div>
              <div className="flex gap-3">
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-300 hover:bg-gray-100'} transition-colors`}>
                  <Download size={18} />
                  Export
                </button>
                <button 
                  onClick={() => navigate('/add-product')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  + Add Product
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-96">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-300 hover:bg-gray-100'} transition-colors`}>
              <SlidersHorizontal size={18} />
              Filter
            </button>
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                      <th className="text-left py-4 px-4">
                        <input type="checkbox" className="rounded" />
                      </th>
                      <th className="text-left py-4 px-4 font-medium">
                        <div className="flex items-center gap-2">
                          Products
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-gray-400">
                            <path d="M8 3l3 3H5l3-3zm0 10l-3-3h6l-3 3z"/>
                          </svg>
                        </div>
                      </th>
                      <th className="text-left py-4 px-4 font-medium">
                        <div className="flex items-center gap-2">
                          Category
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-gray-400">
                            <path d="M8 3l3 3H5l3-3zm0 10l-3-3h6l-3 3z"/>
                          </svg>
                        </div>
                      </th>
                      <th className="text-left py-4 px-4 font-medium">
                        <div className="flex items-center gap-2">
                          Brand
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-gray-400">
                            <path d="M8 3l3 3H5l3-3zm0 10l-3-3h6l-3 3z"/>
                          </svg>
                        </div>
                      </th>
                      <th className="text-left py-4 px-4 font-medium">
                        <div className="flex items-center gap-2">
                          Price
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-gray-400">
                            <path d="M8 3l3 3H5l3-3zm0 10l-3-3h6l-3 3z"/>
                          </svg>
                        </div>
                      </th>
                      <th className="text-left py-4 px-4 font-medium">Stock</th>
                      <th className="text-left py-4 px-4 font-medium">Created At</th>
                      <th className="text-left py-4 px-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map((product) => {
                      const stockStatus = getStockStatus(product);
                      const isInStock = stockStatus === 'In Stock';
                      
                      return (
                        <tr 
                          key={product._id} 
                          className={`border-b ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}
                        >
                          <td className="py-4 px-4">
                            <input type="checkbox" className="rounded" />
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={`http://localhost:5000/${product.image[0]}`} 
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                                onError={(e) => {
                                  e.target.src = '';
                                }}
                              />
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-500 capitalize">
                            {product.category}
                          </td>
                          <td className="py-4 px-4 text-gray-500">
                            {product.seller?.name || 'N/A'}
                          </td>
                          <td className="py-4 px-4 font-medium">
                            ${product.price.toLocaleString()}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              isInStock 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {stockStatus}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-500">
                            {formatDate(product.createdAt)}
                          </td>
                          <td className="py-4 px-4">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <MoreVertical size={18} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-500">
                  Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length}
                </p>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                    }`}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : isDark
                              ? 'bg-gray-800 hover:bg-gray-700'
                              : 'bg-white hover:bg-gray-100'
                          } border ${isDark ? 'border-gray-700' : 'border-gray-300'}`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return <span key={page}>...</span>;
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} ${
                      currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                    }`}
                  >
                    <ChevronRightIcon size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;