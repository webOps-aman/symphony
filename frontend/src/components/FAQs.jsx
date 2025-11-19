import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQs = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const faqCategories = ['All', 'Products', 'Shipping', 'Payment', 'Warranty', 'Returns', 'Technical'];

  const faqs = [
    {
      category: 'Products',
      question: 'What is the difference between a desert cooler and a tower cooler?',
      answer: 'Desert coolers have a larger water tank capacity (typically 30-90 liters) and are ideal for large spaces, while tower coolers are compact with 20-30 liters capacity, perfect for small to medium rooms. Desert coolers provide more cooling power, while tower coolers are more aesthetically designed and space-saving.'
    },
    {
      category: 'Products',
      question: 'How does an air cooler work?',
      answer: 'Air coolers work on the principle of evaporative cooling. Water is circulated over cooling pads, and a fan draws warm air through these wet pads. As the air passes through, water evaporates and absorbs heat, resulting in cool, fresh air being blown into the room.'
    },
    {
      category: 'Products',
      question: 'What is BLDC technology in air coolers?',
      answer: 'BLDC (Brushless DC) technology uses a more efficient motor that consumes up to 50% less energy compared to traditional motors. BLDC coolers operate quietly, have a longer lifespan, and provide better air throw with reduced electricity bills.'
    },
    {
      category: 'Shipping',
      question: 'How long does delivery take?',
      answer: 'Delivery typically takes 2-4 business days for metro cities, 3-5 days for tier-2 cities, and 5-7 days for tier-3 cities and towns. Orders placed before 5 PM are dispatched the same day. Remote areas may take 7-10 business days.'
    },
    {
      category: 'Shipping',
      question: 'Do you provide free shipping?',
      answer: 'Yes! We offer FREE shipping on all orders above ₹5000. For orders below ₹5000, shipping charges range from ₹150 to ₹250 depending on the order value and location.'
    },
    {
      category: 'Shipping',
      question: 'Can I track my order?',
      answer: 'Absolutely! Once your order is dispatched, you will receive a tracking number via email and SMS. You can track your order in real-time using our Track Order page or directly on the courier partner\'s website.'
    },
    {
      category: 'Payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept multiple payment methods including Credit/Debit Cards, Net Banking, UPI, Digital Wallets, and Cash on Delivery (COD). We also offer No-Cost EMI options from 16+ banks for eligible purchases.'
    },
    {
      category: 'Payment',
      question: 'Is it safe to use my credit card on your website?',
      answer: 'Yes, your transactions are 100% secure. We use industry-standard SSL encryption and secure payment gateways. We do not store your card details on our servers. All payments are processed through trusted third-party payment processors.'
    },
    {
      category: 'Payment',
      question: 'Can I get a discount on UPI payments?',
      answer: 'Yes! We offer a 3% instant discount on all UPI payments. This offer is applicable on most products and will be automatically applied during checkout when you select UPI as your payment method.'
    },
    {
      category: 'Warranty',
      question: 'What is the warranty period for Symphony products?',
      answer: 'Desert coolers come with 2 years warranty on the product and 5 years on the motor. Tower coolers have 1 year warranty on the product and 3 years on the motor. Personal coolers have 1 year warranty on the product and 2 years on the motor.'
    },
    {
      category: 'Warranty',
      question: 'How do I claim warranty?',
      answer: 'To claim warranty, contact our customer support at 1800-419-4000 with your product serial number and purchase invoice. Our team will guide you through the process and arrange for service or replacement as per warranty terms.'
    },
    {
      category: 'Warranty',
      question: 'Does warranty cover all parts?',
      answer: 'Warranty covers manufacturing defects in materials and workmanship, including motor, pump, electrical components, and body panels. However, it does not cover consumable parts like cooling pads, normal wear and tear, or damage due to mishandling.'
    },
    {
      category: 'Returns',
      question: 'What is your return policy?',
      answer: 'We offer a hassle-free 7-day return policy. If you\'re not satisfied with your purchase, you can return it within 7 days of delivery for a full refund or replacement. The product must be unused and in original packaging with all accessories.'
    },
    {
      category: 'Returns',
      question: 'How do I return a product?',
      answer: 'To return a product, fill out the return request form on our website or call our customer support. Once approved, we will arrange a free pickup from your location within 24-48 hours. After quality inspection, refund will be processed within 5-7 business days.'
    },
    {
      category: 'Returns',
      question: 'Are there any products that cannot be returned?',
      answer: 'Yes, products on clearance sale, opened/used products, products without original packaging, and items specifically marked as "non-returnable" cannot be returned. Please check the product page before purchasing.'
    },
    {
      category: 'Technical',
      question: 'How often should I clean my air cooler?',
      answer: 'Clean your air cooler at least once a week during regular use. Clean the water tank, cooling pads, and fan blades to prevent bacterial growth and maintain optimal cooling performance. Deep cleaning should be done at the beginning and end of summer season.'
    },
    {
      category: 'Technical',
      question: 'Why is my air cooler not cooling properly?',
      answer: 'Common reasons include: dirty cooling pads, low water level, clogged water pump, improper ventilation, or worn-out pads. Check and clean the cooling pads, ensure adequate water supply, clean the pump, and ensure proper cross-ventilation in the room.'
    },
    {
      category: 'Technical',
      question: 'What is the ideal room size for different cooler capacities?',
      answer: 'Personal coolers (up to 20L) are ideal for rooms up to 150 sq ft. Tower coolers (20-30L) work best for 150-250 sq ft. Desert coolers (30-50L) are suitable for 250-400 sq ft, and large desert coolers (50L+) can cool spaces above 400 sq ft.'
    },
    {
      category: 'Technical',
      question: 'Can air coolers work in humid climates?',
      answer: 'Air coolers work best in hot and dry climates where evaporation is efficient. In very humid climates (humidity above 70%), their cooling efficiency reduces significantly. For humid areas, consider air conditioners or coolers with dehumidifying features.'
    },
    {
      category: 'Products',
      question: 'Do you provide installation services?',
      answer: 'Yes, we provide free installation services for all air coolers across India through our authorized service partners. Our technicians will visit your location within 48 hours of delivery to install and demonstrate the product.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100">Find answers to common questions about our products and services</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-sm text-gray-600">
            <span onClick={() => navigate('/')} className="cursor-pointer hover:text-blue-600">Home</span>
            {' › '}
            <span className="font-medium text-gray-800">FAQs</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for questions..."
              className="w-full px-6 py-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {faqCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <p className="text-gray-600">Showing {filteredFAQs.length} questions</p>
        </div>

        {filteredFAQs.length > 0 ? (
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mb-2">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  <svg
                    className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 pb-5' : 'max-h-0'
                  }`}
                >
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600">Try adjusting your search or category filter</p>
          </div>
        )}

        {/* Still Have Questions */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-blue-100 mb-6">
            Can't find what you're looking for? Our customer support team is here to help!
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

export default FAQs;