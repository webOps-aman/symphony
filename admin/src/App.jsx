// ============================================
// FILE: src/App.jsx
// ============================================
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddProduct from './pages/AddProduct';


const App = () => {
  const { isOpen } = useSelector((state) => state.sidebar);
  const { isDark } = useSelector((state) => state.theme);

  return (
    <Router>
      <div className={`min-h-screen ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Navbar />
        <Sidebar />
        
        {/* Main Content Area */}
        <main className={`pt-16 transition-all duration-300 ${isOpen ? 'lg:pl-64' : 'lg:pl-20'}`}>
          <Routes>
            <Route path="/" element={
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <p className="text-gray-500">Your dashboard content will go here...</p>
              </div>
            } />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;