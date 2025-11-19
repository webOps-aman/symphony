import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReturnRefund = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    orderNumber: '',
    email: '',
    reason: '',
    comments: ''
  });

  const returnReasons = [
    'Product damaged/defective',
    'Wrong product delivered',
    'Product not as described',
    'Missing parts/accessories',
    'Change of mind',
    'Other'
  ];

  const showToastNotification = (message) => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToastNotification('Return request submitted successfully!');
    setFormData({ orderNumber: '', email: '', reason: '', comments: '' });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Return request submitted successfully!</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Return & Refund Policy</h1>
          <p className="text-xl text-blue-100">Easy returns within 7 days of delivery</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-sm text-gray-600">
            <span onClick={() => navigate('/')} className="cursor-pointer hover:text-blue-600">Home</span>
            {' › '}
            <span className="font-medium text-gray-800">Return & Refund</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Return Policy Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our 7-Day Return Policy</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              At Symphony, customer satisfaction is our top priority. We offer a hassle-free 7-day return policy on most products. If you're not satisfied with your purchase, you can return it within 7 days of delivery for a full refund or replacement.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-4xl mb-3">📦</div>
                <h3 className="font-bold text-gray-900 mb-2">Easy Returns</h3>
                <p className="text-sm text-gray-600">Return within 7 days of delivery</p>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-bold text-gray-900 mb-2">Full Refund</h3>
                <p className="text-sm text-gray-600">Get 100% refund on eligible returns</p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-4xl mb-3">🚚</div>
                <h3 className="font-bold text-gray-900 mb-2">Free Pickup</h3>
                <p className="text-sm text-gray-600">We arrange free pickup from your location</p>
              </div>
            </div>
          </div>
        </div>

        {/* Return Eligibility */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Return Eligibility Criteria</h2>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-700">Product must be unused and in original condition with all tags and labels intact</p>
            </div>

            <div className="flex gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-700">Original packaging, manuals, and accessories must be included</p>
            </div>

            <div className="flex gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-700">Product should be in the same condition as received</p>
            </div>

            <div className="flex gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-700">Return must be initiated within 7 days of delivery</p>
            </div>

            <div className="flex gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-700">Invoice or order confirmation must be provided</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Non-Returnable Items:</strong> Products on clearance sale, opened/used products, products without original packaging, and items marked as "non-returnable" are not eligible for return.
            </p>
          </div>
        </div>

        {/* Return Process */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Return Your Product</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Initiate Return Request</h3>
                <p className="text-gray-600">
                  Fill out the return request form below or call our customer support at 1800-419-4000
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Approval & Pickup Scheduling</h3>
                <p className="text-gray-600">
                  Once approved, we'll schedule a free pickup from your location within 24-48 hours
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Check</h3>
                <p className="text-gray-600">
                  The returned product will undergo quality inspection to verify eligibility
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Refund Processing</h3>
                <p className="text-gray-600">
                  Refund will be processed within 5-7 business days after quality check approval
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Refund Policy */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Policy</h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Refund Timeline</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Online Payment (Card/UPI/Net Banking): 5-7 business days</li>
                <li>Wallet: 2-3 business days</li>
                <li>Cash on Delivery: Bank transfer within 7-10 business days</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-gray-900 mb-2">Refund Amount</h3>
              <p className="text-sm">
                Full product cost will be refunded. Shipping charges are non-refundable unless the product is damaged or defective.
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-2">Refund Method</h3>
              <p className="text-sm">
                Refunds will be processed to the original payment method. For COD orders, provide bank account details for NEFT/IMPS transfer.
              </p>
            </div>
          </div>
        </div>

        {/* Return Request Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Return Request</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleInputChange}
                required
                placeholder="Enter your order number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Return <span className="text-red-500">*</span>
              </label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a reason</option>
                {returnReasons.map((reason, index) => (
                  <option key={index} value={reason}>{reason}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Comments
              </label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                rows="4"
                placeholder="Please provide more details about your return request..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Submit Return Request
            </button>
          </form>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help with Returns?</h2>
          <p className="text-blue-100 mb-6">
            Our customer support team is available to assist you with return and refund queries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/contact')}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Contact Support
            </button>
            <a 
              href="tel:18004194000"
              className="px-8 py-3 bg-blue-800 text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors"
            >
              Call: 1800-419-4000
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefund;