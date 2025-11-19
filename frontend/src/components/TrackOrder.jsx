import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrackOrder = () => {
  const navigate = useNavigate();

  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // success or error

  // Demo order data (In real app, this would come from API)
  const demoOrders = {
    'OD123456789': {
      orderNumber: 'OD123456789',
      orderDate: '15 Jan 2025',
      estimatedDelivery: '20 Jan 2025',
      status: 'In Transit',
      currentStatus: 3, // 0: Placed, 1: Confirmed, 2: Shipped, 3: In Transit, 4: Delivered
      products: [
        {
          id: 1,
          name: 'Symphony Diet 3D 30i Tower Air Cooler',
          image: 'https://via.placeholder.com/80',
          quantity: 1,
          price: 12499,
          size: '30L',
          color: 'Black'
        }
      ],
      shippingAddress: {
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        address: 'Flat 402, Green Valley Apartments',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      },
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      totalAmount: 12499,
      discount: 500,
      deliveryCharges: 0,
      finalAmount: 11999,
      trackingTimeline: [
        {
          status: 'Order Placed',
          date: '15 Jan 2025, 10:30 AM',
          description: 'Your order has been placed successfully',
          completed: true
        },
        {
          status: 'Order Confirmed',
          date: '15 Jan 2025, 11:00 AM',
          description: 'Seller has confirmed your order',
          completed: true
        },
        {
          status: 'Shipped',
          date: '16 Jan 2025, 09:15 AM',
          description: 'Your order has been shipped',
          completed: true
        },
        {
          status: 'Out for Delivery',
          date: '18 Jan 2025, 08:00 AM',
          description: 'Your order is out for delivery',
          completed: true
        },
        {
          status: 'Delivered',
          date: 'Expected by 20 Jan 2025',
          description: 'Your order will be delivered soon',
          completed: false
        }
      ],
      courierDetails: {
        name: 'BlueDart Express',
        trackingNumber: 'BD789456123',
        phone: '1800-233-1234',
        currentLocation: 'Mumbai Distribution Center'
      },
      invoiceNumber: 'INV-2025-123456',
      canCancel: false,
      canReturn: false
    },
    'OD987654321': {
      orderNumber: 'OD987654321',
      orderDate: '10 Jan 2025',
      estimatedDelivery: '15 Jan 2025',
      status: 'Delivered',
      currentStatus: 4,
      products: [
        {
          id: 2,
          name: 'Bajaj Frio 23L Personal Air Cooler',
          image: 'https://via.placeholder.com/80',
          quantity: 2,
          price: 8999,
          size: '23L',
          color: 'White'
        }
      ],
      shippingAddress: {
        name: 'Priya Sharma',
        phone: '+91 87654 32109',
        address: 'House No. 45, Sector 21',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001'
      },
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      totalAmount: 17998,
      discount: 1000,
      deliveryCharges: 0,
      finalAmount: 16998,
      trackingTimeline: [
        {
          status: 'Order Placed',
          date: '10 Jan 2025, 02:30 PM',
          description: 'Your order has been placed successfully',
          completed: true
        },
        {
          status: 'Order Confirmed',
          date: '10 Jan 2025, 03:00 PM',
          description: 'Seller has confirmed your order',
          completed: true
        },
        {
          status: 'Shipped',
          date: '11 Jan 2025, 10:00 AM',
          description: 'Your order has been shipped',
          completed: true
        },
        {
          status: 'Out for Delivery',
          date: '14 Jan 2025, 07:30 AM',
          description: 'Your order is out for delivery',
          completed: true
        },
        {
          status: 'Delivered',
          date: '15 Jan 2025, 11:45 AM',
          description: 'Your order has been delivered successfully',
          completed: true
        }
      ],
      courierDetails: {
        name: 'Delhivery',
        trackingNumber: 'DLV456789123',
        phone: '1800-102-1234',
        currentLocation: 'Delivered'
      },
      invoiceNumber: 'INV-2025-987654',
      canCancel: false,
      canReturn: true,
      deliveredDate: '15 Jan 2025'
    }
  };

  const showToastNotification = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();

    if (!orderNumber.trim()) {
      showToastNotification('Please enter your order number!', 'error');
      return;
    }

    // Check if order exists in demo data
    if (demoOrders[orderNumber]) {
      setOrderData(demoOrders[orderNumber]);
      showToastNotification('Order found successfully!', 'success');
    } else {
      showToastNotification('Order not found! Please check your order number.', 'error');
      setOrderData(null);
    }
  };

  const handleCancelOrder = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      showToastNotification('Order cancelled successfully!', 'success');
      setOrderData(null);
    }
  };

  const handleDownloadInvoice = () => {
    showToastNotification('Invoice download started!', 'success');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600 bg-green-50';
      case 'In Transit':
      case 'Out for Delivery':
        return 'text-blue-600 bg-blue-50';
      case 'Shipped':
        return 'text-orange-600 bg-orange-50';
      case 'Order Confirmed':
        return 'text-purple-600 bg-purple-50';
      case 'Cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-24 right-4 px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in-right ${
          toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          <div className="flex items-center gap-2">
            {toastType === 'success' ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Order</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Enter your order number to get real-time tracking information
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-sm text-gray-600">
            <span 
              onClick={() => navigate('/')}
              className="cursor-pointer hover:text-blue-600"
            >
              Home
            </span>
            {' › '}
            <span className="font-medium text-gray-800">Track Order</span>
          </div>
        </div>
      </div>

      {/* Track Order Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Track Your Order</h2>
              <p className="text-gray-600">Enter your order details to track your package</p>
            </div>

            <form onSubmit={handleTrackOrder} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter your order number (e.g., OD123456789)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Track Order
              </button>
            </form>

            {/* Demo Order Numbers */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 font-medium mb-2">📝 Try Demo Order Numbers:</p>
              <div className="space-y-1 text-sm text-blue-600">
                <p className="cursor-pointer hover:underline" onClick={() => setOrderNumber('OD123456789')}>
                  • OD123456789 (In Transit)
                </p>
                <p className="cursor-pointer hover:underline" onClick={() => setOrderNumber('OD987654321')}>
                  • OD987654321 (Delivered)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Section */}
      {orderData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Order Status Banner */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Order #{orderData.orderNumber}
                  </h2>
                  <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(orderData.status)}`}>
                    {orderData.status}
                  </span>
                </div>
                <p className="text-gray-600">
                  Placed on {orderData.orderDate} | Expected by {orderData.estimatedDelivery}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDownloadInvoice}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Invoice
                </button>
                {orderData.canCancel && (
                  <button
                    onClick={handleCancelOrder}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Tracking</h3>
            <div className="relative">
              {orderData.trackingTimeline.map((item, index) => (
                <div key={index} className="flex gap-4 pb-8 last:pb-0">
                  {/* Timeline Icon */}
                  <div className="relative flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {item.completed ? (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    {index < orderData.trackingTimeline.length - 1 && (
                      <div className={`w-0.5 h-full mt-2 ${
                        item.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </div>

                  {/* Timeline Content */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className={`font-semibold ${
                          item.completed ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {item.status}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Products Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Items */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Order Items</h3>
                {orderData.products.map((product) => (
                  <div key={product.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Size: {product.size} | Color: {product.color}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p className="font-semibold text-gray-900">₹{product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Courier Details */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Courier Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Courier Partner</span>
                    <span className="font-semibold text-gray-900">{orderData.courierDetails.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Tracking Number</span>
                    <span className="font-semibold text-blue-600">{orderData.courierDetails.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Current Location</span>
                    <span className="font-semibold text-gray-900">{orderData.courierDetails.currentLocation}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Contact Number</span>
                    <span className="font-semibold text-gray-900">{orderData.courierDetails.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h3>
                <div className="text-gray-700 space-y-1">
                  <p className="font-semibold">{orderData.shippingAddress.name}</p>
                  <p>{orderData.shippingAddress.phone}</p>
                  <p>{orderData.shippingAddress.address}</p>
                  <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.state}</p>
                  <p>PIN: {orderData.shippingAddress.pincode}</p>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₹{orderData.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- ₹{orderData.discount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Charges</span>
                    <span className="text-green-600">
                      {orderData.deliveryCharges === 0 ? 'FREE' : `₹${orderData.deliveryCharges}`}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900 text-lg">
                    <span>Total Amount</span>
                    <span>₹{orderData.finalAmount.toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-gray-700">
                      <span>Payment Method</span>
                      <span className="font-semibold">{orderData.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 mt-2">
                      <span>Payment Status</span>
                      <span className="font-semibold text-green-600">{orderData.paymentStatus}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Need Help?</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Have questions about your order? Our customer support team is here to help!
                </p>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-semibold">
                    Contact Support
                  </button>
                  {orderData.canReturn && (
                    <button className="w-full px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300 text-sm font-semibold">
                      Return Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">How can I track my order?</h3>
              <p className="text-gray-600 text-sm">
                Enter your order number in the tracking form above. You'll receive real-time updates about your shipment.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">What if my order is delayed?</h3>
              <p className="text-gray-600 text-sm">
                Contact our customer support team immediately. We'll help resolve any delivery issues quickly.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel my order?</h3>
              <p className="text-gray-600 text-sm">
                Orders can be cancelled before they are shipped. Use the cancel button on your order details page.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">What is your return policy?</h3>
              <p className="text-gray-600 text-sm">
                We offer 7-day returns on most products. Items must be unused and in original packaging.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Support Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Need Help?</h2>
          <p className="text-blue-100 text-lg mb-6">
            Our customer support team is available 24/7 to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
              Call: 1800-123-4567
            </button>
            <button className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors duration-300">
              Live Chat
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;