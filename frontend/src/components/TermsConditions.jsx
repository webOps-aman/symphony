import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-xl text-blue-100">Please read these terms carefully before using our services</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-sm text-gray-600">
            <span onClick={() => navigate('/')} className="cursor-pointer hover:text-blue-600">Home</span>
            {' › '}
            <span className="font-medium text-gray-800">Terms & Conditions</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Last Updated */}
          <div className="pb-6 border-b border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Last Updated:</strong> January 15, 2025
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Effective Date:</strong> January 1, 2025
            </p>
          </div>

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Welcome to Symphony Store. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms and our Privacy Policy.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you do not agree with any part of these Terms, please do not use our website or services. We reserve the right to modify these Terms at any time, and such modifications will be effective immediately upon posting.
            </p>
          </section>

          {/* Definitions */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definitions</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>"Website"</strong> refers to symphonystore.com and all associated pages</li>
              <li><strong>"User"</strong> refers to anyone who accesses or uses our website</li>
              <li><strong>"Products"</strong> refers to all items available for purchase on our website</li>
              <li><strong>"Services"</strong> refers to all services offered through our website</li>
              <li><strong>"We," "Us," "Our"</strong> refers to Symphony Store and its affiliates</li>
            </ul>
          </section>

          {/* User Account */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Account</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              To make purchases on our website, you may need to create an account. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent activities.
            </p>
          </section>

          {/* Product Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Product Information and Pricing</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We strive to provide accurate product descriptions, images, and pricing. However:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Product colors may vary slightly due to monitor settings</li>
              <li>Specifications are subject to change by manufacturers</li>
              <li>Prices are displayed in Indian Rupees (₹) and include applicable taxes</li>
              <li>We reserve the right to correct pricing errors and cancel orders placed at incorrect prices</li>
              <li>Promotional offers are time-limited and subject to availability</li>
            </ul>
          </section>

          {/* Orders and Payment */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Orders and Payment</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>5.1 Order Acceptance:</strong> All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason.</p>
              <p><strong>5.2 Payment Methods:</strong> We accept Credit/Debit Cards, Net Banking, UPI, Wallets, and Cash on Delivery as specified during checkout.</p>
              <p><strong>5.3 Payment Security:</strong> All payment transactions are processed through secure payment gateways. We do not store your card details.</p>
              <p><strong>5.4 Order Confirmation:</strong> You will receive an order confirmation email upon successful payment. This does not constitute acceptance of your order.</p>
            </div>
          </section>

          {/* Shipping and Delivery */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Shipping and Delivery</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Delivery times and shipping charges are as per our Shipping Policy. We are not responsible for delays caused by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Natural disasters or force majeure events</li>
              <li>Incorrect address provided by the customer</li>
              <li>Customer unavailability during delivery attempts</li>
              <li>Customs or regulatory delays</li>
              <li>Courier partner delays beyond our control</li>
            </ul>
          </section>

          {/* Returns and Refunds */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Returns and Refunds</h2>
            <p className="text-gray-700 leading-relaxed">
              Our return and refund policy is detailed in our Return & Refund Policy page. All returns must comply with the eligibility criteria and timelines specified therein. Refunds will be processed only after quality inspection of returned products.
            </p>
          </section>

          {/* Warranty */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Warranty</h2>
            <p className="text-gray-700 leading-relaxed">
              Products are covered under manufacturer warranty as specified on the product page and in our Warranty Policy. Warranty claims must be made through authorized service centers. We are not liable for defects arising from misuse, negligence, or unauthorized repairs.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              All content on this website, including text, graphics, logos, images, and software, is the property of Symphony Store or its licensors and is protected by intellectual property laws. You may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Reproduce, distribute, or modify any content without permission</li>
              <li>Use our trademarks or logos without authorization</li>
              <li>Extract data using automated tools or scrapers</li>
              <li>Create derivative works based on our content</li>
            </ul>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Prohibited Activities</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Use the website for any illegal or unauthorized purpose</li>
              <li>Transmit viruses, malware, or harmful code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Impersonate any person or entity</li>
              <li>Engage in fraudulent activities or provide false information</li>
              <li>Interfere with the proper functioning of the website</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, Symphony Store shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or products purchased. Our total liability shall not exceed the amount paid by you for the product in question.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed">
              Any disputes arising from these Terms or your use of our services shall be resolved through arbitration in accordance with the Indian Arbitration and Conciliation Act, 1996. The seat of arbitration shall be Ahmedabad, Gujarat, India.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. The courts in Ahmedabad, Gujarat shall have exclusive jurisdiction over any disputes.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website after such changes constitutes acceptance of the modified Terms. We recommend reviewing these Terms periodically.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <p className="text-gray-700"><strong>Symphony Store</strong></p>
              <p className="text-gray-700">Symphony House, FP12 to FP15</p>
              <p className="text-gray-700">Bodakdev, Ahmedabad - 380054</p>
              <p className="text-gray-700">Gujarat, India</p>
              <p className="text-gray-700 mt-3"><strong>Phone:</strong> 1800-419-4000</p>
              <p className="text-gray-700"><strong>Email:</strong> support@symphonylimited.com</p>
            </div>
          </section>

          {/* Acceptance */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
          <p className="text-blue-100 mb-6">
            Our customer support team is here to help clarify any concerns
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;