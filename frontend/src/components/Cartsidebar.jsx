import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { assets } from '../assets/assets';

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cart);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const handleIncrement = (id) => {
    const item = cartItems.find(item => item.id === id);
    dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    onClose(); // Close the sidebar
    navigate('/checkout'); // Navigate to checkout page
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white">
          <h2 className="text-xl font-semibold">Shopping Cart ({cartItems.length})</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-blue-700 rounded-full transition-colors"
          >
            <img src={assets.closeIcon} alt="close" className="w-6 h-6 invert" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-200px)] p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm mt-2">Add products to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 bg-white rounded-md overflow-hidden border">
                    <img
                      src={Array.isArray(item.image) ? item.image[0] : item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-lg font-semibold text-blue-600">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md">
                        <button
                          onClick={() => handleDecrement(item.id)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="w-10 text-center font-medium text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(item.id)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total and Actions */}
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4 space-y-3">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-lg">
              <span className="font-medium text-gray-700">Subtotal:</span>
              <span className="font-bold text-gray-900">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={handleClearCart}
                className="w-full py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;