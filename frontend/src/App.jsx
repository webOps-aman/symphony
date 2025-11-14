import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CategoryProducts from './components/CategoryProducts';
import ProductDetail from './components/ProductDetail';
import CheckoutPage from './components/CheckoutPage';
import PaymentPage from './components/PaymentPage';

const App = () => {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryProducts />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          
          {/* NEW ROUTES - Checkout & Payment */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;