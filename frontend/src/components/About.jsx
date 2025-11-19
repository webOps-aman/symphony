import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, CreditCard, Headphones, Shield, Award, Users } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Truck className="w-10 h-10 text-blue-600" />,
      title: "Free Delivery PAN India",
      description: "We deliver your products safely to your doorstep across all of India at no extra cost."
    },
    {
      icon: <CreditCard className="w-10 h-10 text-blue-600" />,
      title: "No Cost EMI Options",
      description: "Shop now and pay later with our easy no-cost EMI options from 16+ banks."
    },
    {
      icon: <Headphones className="w-10 h-10 text-blue-600" />,
      title: "Lifetime Support",
      description: "Our dedicated customer support team is always ready to assist you throughout your product's lifetime."
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-600" />,
      title: "Assured Same Day Dispatch",
      description: "Order before 5 PM and get your product dispatched the same day for faster delivery."
    },
    {
      icon: <Award className="w-10 h-10 text-blue-600" />,
      title: "Premium Quality",
      description: "We offer only the best quality products from trusted brands to ensure your satisfaction."
    },
    {
      icon: <Users className="w-10 h-10 text-blue-600" />,
      title: "10 Lakh+ Happy Customers",
      description: "Join millions of satisfied customers who trust us for their cooling needs."
    }
  ];

  const stats = [
    { number: "10L+", label: "Happy Customers" },
    { number: "50+", label: "Products Range" },
    { number: "500+", label: "Cities Covered" },
    { number: "24/7", label: "Customer Support" }
  ];

  const brands = [
    "Symphony", "Bajaj", "Orient", "Crompton", "Havells", "Voltas", "Blue Star", "Kenstar"
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Symphony Store</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              India's Most Trusted Online Destination for Premium Cooling Solutions
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
            <span className="font-medium text-gray-800">About Us</span>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Welcome to Symphony Store, your ultimate destination for premium cooling solutions in India. 
                With over a decade of experience in the industry, we have established ourselves as the 
                most trusted name in air coolers, air conditioners, and cooling accessories.
              </p>
              <p>
                Our journey began with a simple mission: to bring advanced cooling technology to every 
                Indian household at affordable prices. Today, we proudly serve over 10 lakh satisfied 
                customers across 500+ cities in India.
              </p>
              <p>
                We partner with the best brands in the industry including Symphony, Bajaj, Orient, Crompton, 
                and many more to offer you a wide range of products that combine innovation, efficiency, 
                and durability. From compact desert coolers to powerful industrial coolers, we have 
                something for everyone.
              </p>
              <p>
                At Symphony Store, customer satisfaction is our top priority. We offer lifetime support, 
                free PAN India delivery, easy no-cost EMI options, and same-day dispatch on all orders. 
                Our dedicated customer service team is available 24/7 to assist you with any queries.
              </p>
            </div>
          </div>
          <div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600" 
                alt="About Symphony" 
                className="w-full h-80 object-cover rounded-xl shadow-md mb-6"
              />
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg text-center shadow-sm">
                    <div className="text-3xl font-bold text-blue-600">{stat.number}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Symphony Store?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer the best shopping experience with unmatched services and benefits
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 border border-gray-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Offers Section */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-orange-600 mb-2">3% Off</div>
              <div className="text-sm text-gray-600">On UPI Payments</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-green-600 mb-2">Same Day</div>
              <div className="text-sm text-gray-600">Dispatch Assured</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-2">Free Delivery</div>
              <div className="text-sm text-gray-600">PAN India</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-purple-600 mb-2">16+ Banks</div>
              <div className="text-sm text-gray-600">No Cost EMI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Brands We Offer Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted Brands We Offer</h2>
            <p className="text-lg text-gray-600">
              We partner with the best cooling brands in India
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {brands.map((brand, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-4 rounded-lg text-center hover:bg-blue-50 transition-colors duration-300 border border-gray-200"
              >
                <div className="text-sm font-semibold text-gray-700">{brand}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-blue-100 text-lg">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality First</h3>
              <p className="text-blue-100">
                We never compromise on product quality and only offer the best cooling solutions to our customers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Centric</h3>
              <p className="text-blue-100">
                Your satisfaction is our success. We go above and beyond to ensure a delightful shopping experience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trust & Transparency</h3>
              <p className="text-blue-100">
                We believe in honest business practices and maintain complete transparency in all our dealings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience the Best Cooling Solutions?
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Shop now and enjoy free delivery, no-cost EMI, and lifetime support on all products
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors duration-300 shadow-lg"
          >
            Explore Our Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;