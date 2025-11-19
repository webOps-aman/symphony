import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CategoryProducts from './components/CategoryProducts';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import CheckoutPage from './components/CheckoutPage';
import PaymentPage from './components/PaymentPage';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import TrackOrder from './components/TrackOrder';
import DealerLocator from './components/DealerLocator';
import Careers from './components/Careers';
import Blog from './components/Blog';
import ShippingPolicy from './components/ShippingPolicy';
import ReturnRefund from './components/ReturnRefund';
import Warranty from './components/Warranty';
import FAQs from './components/FAQs';
import TermsConditions from './components/TermsConditions';
import PrivacyPolicy from './components/PrivacyPolicy';

const App = () => {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryProducts />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/products" element={<Products/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/track-order" element={<TrackOrder/>}/>
          
          {/* Footer Links Routes */}
          <Route path="/dealer-locator" element={<DealerLocator/>}/>
          <Route path="/careers" element={<Careers/>}/>
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/shipping-policy" element={<ShippingPolicy/>}/>
          <Route path="/return-refund" element={<ReturnRefund/>}/>
          <Route path="/warranty" element={<Warranty/>}/>
          <Route path="/faqs" element={<FAQs/>}/>
          <Route path="/terms-conditions" element={<TermsConditions/>}/>
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
          
          {/* Checkout & Payment */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
        <Footer/>
      </div>
    </>
  );
}

export default App;