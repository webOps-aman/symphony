import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [selectedBank, setSelectedBank] = useState('');
  const [processing, setProcessing] = useState(false);

  // Calculate total
  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const platformFee = 7;
    const discount = Math.round(subtotal * 0.05);
    return subtotal + platformFee - discount;
  };

  const totalAmount = calculateTotal();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Popular UPI apps
  const upiApps = [
    { name: 'PhonePe', icon: '📱', color: 'bg-purple-600' },
    { name: 'Google Pay', icon: '🔵', color: 'bg-blue-600' },
    { name: 'Paytm', icon: '💙', color: 'bg-sky-500' },
    { name: 'BHIM', icon: '🇮🇳', color: 'bg-orange-500' },
    { name: 'Amazon Pay', icon: '🛒', color: 'bg-yellow-500' }
  ];

  // Popular banks
  const banks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank',
    'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda',
    'Canara Bank', 'Union Bank', 'Bank of India'
  ];

  const handlePayment = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      navigate('/');
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      
      // Show success message
      alert(`Payment of ₹${totalAmount.toLocaleString()} successful!\nPayment Method: ${selectedPaymentMethod.toUpperCase()}\nThank you for your order!`);
      
      // Clear cart after successful payment
      dispatch(clearCart());
      
      // Navigate to home or order success page
      navigate('/');
    }, 2000);
  };

  const handleUpiPayment = () => {
    if (!upiId) {
      alert('Please enter your UPI ID');
      return;
    }
    handlePayment();
  };

  const handleCardPayment = () => {
    if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
      alert('Please fill all card details');
      return;
    }
    handlePayment();
  };

  const handleNetBanking = () => {
    if (!selectedBank) {
      alert('Please select a bank');
      return;
    }
    handlePayment();
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">No items to pay for</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/checkout')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Complete Payment</span>
          </button>
          <div className="flex items-center gap-2 text-green-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">100% Secure</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* UPI Payment */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setSelectedPaymentMethod('upi')}
                  className={`w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    selectedPaymentMethod === 'upi' ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedPaymentMethod === 'upi' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                    }`}>
                      📱
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">UPI</h3>
                      <p className="text-sm text-gray-500">Pay by any UPI app</p>
                      <p className="text-xs text-green-600 font-medium mt-1">
                        Get upto 5000% cashback • 3 offers available
                      </p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPaymentMethod === 'upi' ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {selectedPaymentMethod === 'upi' && (
                      <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                </button>

                {selectedPaymentMethod === 'upi' && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="mb-4">
                      <p className="text-sm text-gray-700 mb-3 font-medium flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                          upiId ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                        }`}>
                          {upiId ? '✓' : '1'}
                        </span>
                        Add new UPI ID
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter your UPI ID (e.g., name@paytm)"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          onClick={handleUpiPayment}
                          disabled={!upiId || processing}
                          className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                            upiId && !processing
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {processing ? 'Processing...' : 'Verify'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-3">
                      {upiApps.map((app) => (
                        <button
                          key={app.name}
                          onClick={() => setUpiId(`user@${app.name.toLowerCase().replace(' ', '')}`)}
                          className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
                        >
                          <div className={`text-2xl ${app.color} w-12 h-12 rounded-full flex items-center justify-center`}>
                            {app.icon}
                          </div>
                          <span className="text-xs text-gray-700 text-center">{app.name}</span>
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleUpiPayment}
                      disabled={!upiId || processing}
                      className={`w-full mt-4 py-3 rounded-md font-semibold transition-colors ${
                        upiId && !processing
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {processing ? 'Processing Payment...' : `Pay ₹${totalAmount.toLocaleString()}`}
                    </button>
                  </div>
                )}
              </div>

              {/* Credit/Debit/ATM Card */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setSelectedPaymentMethod('card')}
                  className={`w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    selectedPaymentMethod === 'card' ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedPaymentMethod === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                    }`}>
                      💳
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">Credit / Debit / ATM Card</h3>
                      <p className="text-sm text-gray-500">Add and secure cards as per RBI guidelines</p>
                      <p className="text-xs text-green-600 font-medium mt-1">
                        5% cashback on Flipkart Axis Bank Credit Card upto ₹4,000 per statement quarter
                      </p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPaymentMethod === 'card' ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {selectedPaymentMethod === 'card' && (
                      <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                </button>

                {selectedPaymentMethod === 'card' && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        maxLength="16"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Name on Card"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Valid Thru (MM/YY)"
                          maxLength="5"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          maxLength="3"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <button
                        onClick={handleCardPayment}
                        disabled={processing}
                        className={`w-full py-3 rounded-md font-semibold transition-colors ${
                          processing
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {processing ? 'Processing Payment...' : `Pay ₹${totalAmount.toLocaleString()}`}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Net Banking */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setSelectedPaymentMethod('netbanking')}
                  className={`w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    selectedPaymentMethod === 'netbanking' ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedPaymentMethod === 'netbanking' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                    }`}>
                      🏦
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">Net Banking</h3>
                      <p className="text-sm text-gray-500">Select from popular banks</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPaymentMethod === 'netbanking' ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {selectedPaymentMethod === 'netbanking' && (
                      <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                </button>

                {selectedPaymentMethod === 'netbanking' && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                    >
                      <option value="">Select Your Bank</option>
                      {banks.map((bank) => (
                        <option key={bank} value={bank}>{bank}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleNetBanking}
                      disabled={!selectedBank || processing}
                      className={`w-full py-3 rounded-md font-semibold transition-colors ${
                        selectedBank && !processing
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {processing ? 'Processing Payment...' : `Pay ₹${totalAmount.toLocaleString()}`}
                    </button>
                  </div>
                )}
              </div>

              {/* Cash on Delivery */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setSelectedPaymentMethod('cod')}
                  className={`w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    selectedPaymentMethod === 'cod' ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedPaymentMethod === 'cod' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                    }`}>
                      💵
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">Cash on Delivery</h3>
                      <p className="text-sm text-gray-500">Pay when you receive</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPaymentMethod === 'cod' ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {selectedPaymentMethod === 'cod' && (
                      <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                </button>

                {selectedPaymentMethod === 'cod' && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                      <p className="text-sm text-yellow-800">
                        📦 Please keep exact change handy to help us deliver your order quickly
                      </p>
                    </div>
                    <button
                      onClick={handlePayment}
                      disabled={processing}
                      className={`w-full py-3 rounded-md font-semibold transition-colors ${
                        processing
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {processing ? 'Placing Order...' : 'PLACE ORDER'}
                    </button>
                  </div>
                )}
              </div>

              {/* EMI */}
              <div>
                <button
                  onClick={() => setSelectedPaymentMethod('emi')}
                  className={`w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    selectedPaymentMethod === 'emi' ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedPaymentMethod === 'emi' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                    }`}>
                      📊
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">EMI</h3>
                      <p className="text-sm text-gray-500">Cardless EMI and Card EMI</p>
                      <p className="text-xs text-red-500 font-medium mt-1">Unavailable</p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-gray-100"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm sticky top-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-700">Price ({itemCount} items)</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">₹{totalAmount.toLocaleString()}</p>
              </div>

              <div className="px-6 py-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Platform Fee</span>
                  <span>₹7</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-green-600">
                  <span>5% Cashback</span>
                  <span>Claim now with payment offers</span>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-700">Safe and Secure Payments.</p>
                    <p className="text-xs mt-1">Easy returns. 100% Authentic products.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            Policies:{' '}
            <a href="#" className="text-blue-600 hover:underline">Returns Policy</a>
            {' | '}
            <a href="#" className="text-blue-600 hover:underline">Terms of use</a>
            {' | '}
            <a href="#" className="text-blue-600 hover:underline">Security</a>
            {' | '}
            <a href="#" className="text-blue-600 hover:underline">Privacy</a>
          </p>
          <p className="mt-2">© 2007-2025 Symphony.com</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;