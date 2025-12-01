import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X, Search, Bell, Moon, Sun, ChevronDown } from 'lucide-react';
import { toggleSidebar, toggleMobileSidebar } from '../store/slices/sidebarSlice';
import { toggleTheme } from '../store/slices/themeSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isOpen, isMobileOpen } = useSelector((state) => state.sidebar);
  const { isDark } = useSelector((state) => state.theme);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className={`fixed top-0 right-0 left-0 z-50 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b transition-all duration-300 ${isOpen ? 'lg:pl-64' : 'lg:pl-20'}`}>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => dispatch(toggleMobileSidebar())}
              className={`lg:hidden p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Menu Button */}
            <button
              onClick={() => dispatch(toggleSidebar())}
              className={`hidden lg:block p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <Menu size={24} />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center relative">
              <Search size={18} className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search or type command..."
                className={`pl-10 pr-20 py-2 rounded-lg w-64 lg:w-80 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <span className={`absolute right-3 text-xs ${isDark ? 'bg-gray-700' : 'bg-gray-200'} px-2 py-1 rounded`}>⌘K</span>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-lg relative ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Musharof"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden md:block font-medium">Musharof</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;