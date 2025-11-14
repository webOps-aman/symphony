import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cart);
  
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: 'Amandeep Singh',
    address: 'JA /41D 1st Floor LIG Flats Hari Enclave near Swarg Ashram Mandir',
    city: 'Hari Nagar',
    state: 'New Delhi',
    pincode: '110064',
    phone: '+91 9876543210'
  });

  const [showAddressForm, setShowAddressForm] = useState(false);

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const platformFee = 7;
  const deliveryCharges = subtotal > 5000 ? 0 : 50;
  const discount = Math.round(subtotal * 0.05); // 5% discount
  const totalAmount = subtotal + platformFee + deliveryCharges - discount;

  const getImageSrc = (image) => {
    return Array.isArray(image) ? image[0] : image;
  };

  const handleContinue = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/payment');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-32 h-32 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add products to proceed to checkout</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Delivery & Order Summary */}
          <div className="lg:col-span-2 space-y-4">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <h2 className="text-lg font-semibold">DELIVERY ADDRESS</h2>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="text-blue-100 hover:text-white text-sm font-semibold"
                >
                  {showAddressForm ? 'CANCEL' : 'CHANGE'}
                </button>
              </div>

              <div className="p-6">
                {!showAddressForm ? (
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-800">{deliveryAddress.name}</p>
                    <p className="text-sm text-gray-600">{deliveryAddress.address}</p>
                    <p className="text-sm text-gray-600">
                      {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pincode}
                    </p>
                    <p className="text-sm text-gray-600">Phone: {deliveryAddress.phone}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={deliveryAddress.name}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <textarea
                      placeholder="Address"
                      value={deliveryAddress.address}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, address: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={deliveryAddress.city}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={deliveryAddress.state}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, state: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Pincode"
                        value={deliveryAddress.pincode}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, pincode: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={deliveryAddress.phone}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, phone: e.target.value})}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => setShowAddressForm(false)}
                      className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
                    >
                      SAVE ADDRESS
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-blue-600 text-white px-6 py-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <h2 className="text-lg font-semibold">ORDER SUMMARY</h2>
              </div>

              <div className="p-6 space-y-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden border">
                      <img
                        src={getImageSrc(item.image)}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">Seller: Symphony Limited</p>
                      
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              ₹{(item.originalPrice * item.quantity).toLocaleString()}
                            </span>
                            <span className="text-sm text-green-600 font-semibold">
                              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% Off
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Quantity: {item.quantity}</span>
                        <span>•</span>
                        <span>₹{item.price.toLocaleString()} each</span>
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Delivery in 2-3 days</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Button for Mobile */}
            <div className="lg:hidden">
              <button
                onClick={handleContinue}
                className="w-full py-4 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
              >
                CONTINUE TO PAYMENT
              </button>
            </div>
          </div>

          {/* Right Section - Price Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm sticky top-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700">PRICE DETAILS</h2>
              </div>

              <div className="px-6 py-4 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Price ({cartItems.length} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Delivery Charges</span>
                  <span className={deliveryCharges === 0 ? 'text-green-600' : ''}>
                    {deliveryCharges === 0 ? (
                      <span className="flex items-center gap-1">
                        <span className="line-through text-gray-400">₹50</span>
                        <span className="font-semibold">FREE</span>
                      </span>
                    ) : (
                      `₹${deliveryCharges}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Discount (5%)</span>
                  <span>- ₹{discount.toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t border-gray-300">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total Amount</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-green-600 font-semibold text-sm">
                    Your Total Savings on this order ₹{discount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Safe and Secure Payments. Easy returns.</p>
                    <p>100% Authentic products.</p>
                  </div>
                </div>
              </div>

              {/* Desktop Continue Button */}
              <div className="hidden lg:block p-6 pt-4">
                <button
                  onClick={handleContinue}
                  className="w-full py-4 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            By continuing with the order, you confirm that you are above 18 years of age, 
            and you agree to the{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Use</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;