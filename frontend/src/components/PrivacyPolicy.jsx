import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-blue-100">Your privacy and data security are our top priorities</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-sm text-gray-600">
            <span onClick={() => navigate('/')} className="cursor-pointer hover:text-blue-600">Home</span>
            {' › '}
            <span className="font-medium text-gray-800">Privacy Policy</span>
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
              Symphony Store ("we," "us," or "our") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our website, you consent to the data practices described in this policy. If you do not agree with this policy, please discontinue use of our website immediately.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We collect personal information that you voluntarily provide to us, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>Name, email address, phone number</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed securely through payment gateways)</li>
              <li>Account credentials (username and password)</li>
              <li>Product reviews and ratings</li>
              <li>Customer support communications</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              When you access our website, we automatically collect certain information, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use the collected information for various purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Processing and fulfilling your orders</li>
              <li>Providing customer support and responding to inquiries</li>
              <li>Sending order confirmations, shipping updates, and delivery notifications</li>
              <li>Improving our website, products, and services</li>
              <li>Personalizing your shopping experience</li>
              <li>Sending promotional offers and marketing communications (with your consent)</li>
              <li>Detecting and preventing fraud and unauthorized activities</li>
              <li>Complying with legal obligations and enforcing our terms</li>
              <li>Analyzing website usage and trends</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We may share your information with third parties in the following circumstances:
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">4.1 Service Providers</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We share information with trusted third-party service providers who assist us in:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-4">
              <li>Payment processing</li>
              <li>Order fulfillment and shipping</li>
              <li>Email and SMS communications</li>
              <li>Website hosting and maintenance</li>
              <li>Analytics and advertising</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">4.2 Legal Requirements</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We may disclose your information if required by law or in response to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-4">
              <li>Court orders or legal processes</li>
              <li>Government or regulatory requests</li>
              <li>Protection of our rights, property, or safety</li>
              <li>Prevention of fraud or illegal activities</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">4.3 Business Transfers</h3>
            <p className="text-gray-700 leading-relaxed">
              In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Provide personalized content and recommendations</li>
              <li>Serve targeted advertisements</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our website.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We implement industry-standard security measures to protect your personal information, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>SSL encryption for data transmission</li>
              <li>Secure payment gateways (PCI DSS compliant)</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Employee training on data protection practices</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the following rights regarding your personal information:
            </p>
            
            <div className="space-y-3 text-gray-700">
              <p><strong>7.1 Access and Update:</strong> You can access and update your account information at any time through your account settings.</p>
              <p><strong>7.2 Marketing Communications:</strong> You can opt-out of marketing emails by clicking the "unsubscribe" link in our emails or contacting us directly.</p>
              <p><strong>7.3 Data Deletion:</strong> You can request deletion of your personal information by contacting our customer support. Note that some information may be retained for legal or business purposes.</p>
              <p><strong>7.4 Data Portability:</strong> You can request a copy of your personal data in a structured, machine-readable format.</p>
              <p><strong>7.5 Objection to Processing:</strong> You can object to certain processing of your personal information, subject to legal limitations.</p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately to have it removed.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Websites</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          {/* International Users */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Users</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website is operated from India. If you are accessing our website from outside India, please note that your information may be transferred to, stored, and processed in India, where data protection laws may differ from those in your country.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on our website with a new "Last Updated" date. Your continued use of the website after such changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <p className="text-gray-700"><strong>Data Protection Officer</strong></p>
              <p className="text-gray-700"><strong>Symphony Store</strong></p>
              <p className="text-gray-700">Symphony House, FP12 to FP15</p>
              <p className="text-gray-700">Bodakdev, Ahmedabad - 380054</p>
              <p className="text-gray-700">Gujarat, India</p>
              <p className="text-gray-700 mt-3"><strong>Phone:</strong> 1800-419-4000</p>
              <p className="text-gray-700"><strong>Email:</strong> privacy@symphonylimited.com</p>
              <p className="text-gray-700"><strong>Support:</strong> support@symphonylimited.com</p>
            </div>
          </section>

          {/* Consent */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              By using our website and services, you acknowledge that you have read, understood, and agree to this Privacy Policy and consent to the collection, use, and disclosure of your information as described herein.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h2>
          <p className="text-blue-100 mb-6">
            Our team is dedicated to protecting your data and addressing your concerns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/contact')}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Contact Support
            </button>
            <a 
              href="mailto:privacy@symphonylimited.com"
              className="px-8 py-3 bg-blue-800 text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors"
            >
              Email Privacy Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;