import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShippingPolicy = () => {
  const navigate = useNavigate();

  const deliveryTimeline = [
    { location: 'Metro Cities', time: '2-4 business days', icon: '🏙️' },
    { location: 'Tier 2 Cities', time: '3-5 business days', icon: '🏘️' },
    { location: 'Tier 3 Cities & Towns', time: '5-7 business days', icon: '🏡' },
    { location: 'Remote Areas', time: '7-10 business days', icon: '⛰️' }
  ];

  const shippingCharges = [
    { orderValue: 'Above ₹5000', charge: 'FREE', color: 'text-green-600' },
    { orderValue: '₹2000 - ₹5000', charge: '₹150', color: 'text-blue-600' },
    { orderValue: 'Below ₹2000', charge: '₹250', color: 'text-orange-600' }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipping Policy</h1>
          <p className="text-xl text-blue-100">Fast, reliable, and secure delivery across India</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-sm text-gray-600">
            <span onClick={() => navigate('/')} className="cursor-pointer hover:text-blue-600">Home</span>
            {' › '}
            <span className="font-medium text-gray-800">Shipping Policy</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Delivery Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Estimated Delivery Time</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {deliveryTimeline.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-4xl">{item.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.location}</h3>
                  <p className="text-blue-600 font-medium">{item.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Delivery times may vary during festive seasons, public holidays, or due to unforeseen circumstances. Orders placed before 5 PM are dispatched the same day.
            </p>
          </div>
        </div>

        {/* Shipping Charges */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Charges</h2>
          
          <div className="space-y-4">
            {shippingCharges.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="font-semibold text-gray-900">{item.orderValue}</span>
                <span className={`text-xl font-bold ${item.color}`}>{item.charge}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-gray-700">
              🎉 <strong>Special Offer:</strong> Get FREE shipping on all orders above ₹5000! Shop more, save more!
            </p>
          </div>
        </div>

        {/* Shipping Process */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Shipping Works</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Confirmation</h3>
                <p className="text-gray-600">
                  Once you place your order, you'll receive an immediate order confirmation email with all order details.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing & Packaging</h3>
                <p className="text-gray-600">
                  Our team carefully packs your products with high-quality packaging materials to ensure safe transit.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Dispatch & Tracking</h3>
                <p className="text-gray-600">
                  Your order is dispatched with a tracking number. You'll receive SMS and email updates at every step.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery at Doorstep</h3>
                <p className="text-gray-600">
                  Our delivery partner will deliver the product to your doorstep. Please verify the package before accepting.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Information</h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong>Order Tracking:</strong> You can track your order anytime using the tracking number provided via email and SMS.
              </p>
            </div>

            <div className="flex gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong>Packaging:</strong> All products are securely packed with bubble wrap and corrugated boxes to prevent damage during transit.
              </p>
            </div>

            <div className="flex gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong>Delivery Attempts:</strong> Our delivery partners will make 3 attempts to deliver your order. Please ensure someone is available to receive it.
              </p>
            </div>

            <div className="flex gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong>Address Verification:</strong> Please ensure your delivery address is complete and correct to avoid delivery delays.
              </p>
            </div>

            <div className="flex gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong>Non-Serviceable Areas:</strong> We currently do not deliver to P.O. Boxes, APO/FPO addresses, or certain remote locations.
              </p>
            </div>

            <div className="flex gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                <strong>Damaged Products:</strong> If you receive a damaged product, please refuse delivery and contact us immediately at 1800-419-4000.
              </p>
            </div>
          </div>
        </div>

        {/* Our Delivery Partners */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Trusted Delivery Partners</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['BlueDart', 'Delhivery', 'DTDC', 'FedEx'].map((partner, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-900">{partner}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Have Questions About Shipping?</h2>
          <p className="text-blue-100 mb-6">
            Our customer support team is here to help you with any shipping-related queries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/contact')}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Contact Support
            </button>
            <button 
              onClick={() => navigate('/track-order')}
              className="px-8 py-3 bg-blue-800 text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors"
            >
              Track Your Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;