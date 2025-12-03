import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Search, Download, SlidersHorizontal, MoreVertical, ChevronLeft, ChevronRight as ChevronRightIcon, Eye, Trash2 } from 'lucide-react';
import { getAllProducts, deleteProduct } from '../api/productApi';

const Products = () => {
  const { isDark } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  
  const dropdownRef = useRef(null);
  const productsPerPage = 7;

  useEffect(() => {
    fetchProducts();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts();
      console.log('Products Response:', response);

      const productsData = response.products || response.data || response;
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
    setOpenDropdown(null);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      setDeleting(true);
      await deleteProduct(productToDelete._id);
      
      // Remove product from state
      setProducts(prev => prev.filter(p => p._id !== productToDelete._id));
      
      alert('Product deleted successfully!');
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert(`Failed to delete product: ${error.message}`);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-lg p-6 max-w-md w-full mx-4 shadow-xl`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Delete Product</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>

            <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Are you sure you want to delete <span className="font-semibold">"{productToDelete?.name}"</span>? 
              This will permanently remove the product and all its images from the server.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteCancel}
                disabled={deleting}
                className={`px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-300 hover:bg-gray-100'
                } transition-colors ${deleting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                No, Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className={`px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors ${
                  deleting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

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
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-300 hover:bg-gray-100'
                } transition-colors`}>
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

          {/* Search & Filter */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-96">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-300 hover:bg-gray-100'
            } transition-colors`}>
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
                      <th className="text-left py-4 px-4"><input type="checkbox" /></th>
                      <th className="text-left py-4 px-4 font-medium">Products</th>
                      <th className="text-left py-4 px-4 font-medium">Category</th>
                      <th className="text-left py-4 px-4 font-medium">Brand</th>
                      <th className="text-left py-4 px-4 font-medium">Price</th>
                      <th className="text-left py-4 px-4 font-medium">Created At</th>
                      <th className="text-left py-4 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentProducts.map((product) => (
                      <tr 
                        key={product._id} 
                        className={`border-b ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'} transition`}
                      >
                        <td className="py-4 px-4"><input type="checkbox" /></td>

                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={`http://localhost:5000/${product.image[0]}`} 
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-gray-500 capitalize">{product.category}</td>

                        <td className="py-4 px-4 text-gray-500">{product.seller?.name || 'N/A'}</td>

                        <td className="py-4 px-4 font-medium">₹{product.price.toLocaleString()}</td>

                        <td className="py-4 px-4 text-gray-500">{formatDate(product.createdAt)}</td>

                        <td className="py-4 px-4">
                          <div className="relative" ref={openDropdown === product._id ? dropdownRef : null}>
                            <button 
                              onClick={() => setOpenDropdown(openDropdown === product._id ? null : product._id)}
                              className={`p-2 rounded-lg transition-colors ${
                                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                              }`}
                            >
                              <MoreVertical size={18} />
                            </button>

                            {/* Dropdown Menu */}
                            {openDropdown === product._id && (
                              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-10 ${
                                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                              }`}>
                                <button
                                  onClick={() => {
                                    alert('View Details - Coming Soon!');
                                    setOpenDropdown(null);
                                  }}
                                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <Eye size={16} className="text-blue-500" />
                                  <span>View Details</span>
                                </button>

                                <button
                                  onClick={() => handleDeleteClick(product)}
                                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-t ${
                                    isDark ? 'hover:bg-gray-700 border-gray-700' : 'hover:bg-gray-50 border-gray-200'
                                  }`}
                                >
                                  <Trash2 size={16} className="text-red-500" />
                                  <span className="text-red-500">Delete Product</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
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
                    className={`p-2 border rounded-lg ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === page ? 'bg-blue-600 text-white' : 'bg-white border'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p-2 border rounded-lg ${
                      currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
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