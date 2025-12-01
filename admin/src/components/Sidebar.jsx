
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';  // 👈 Added
import { ChevronDown, Grid } from 'lucide-react';
import { closeMobileSidebar } from '../store/slices/sidebarSlice';
import menuItems from '../data/menuItems';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // 👈 Added
  const location = useLocation();  // 👈 Added for active state
  const { isOpen, isMobileOpen } = useSelector((state) => state.sidebar);
  const { isDark } = useSelector((state) => state.theme);
  const [expandedMenu, setExpandedMenu] = useState('E-commerce');

  const handleMenuClick = (item) => {
    if (item.submenu) {
      // Toggle submenu
      if (expandedMenu === item.label) {
        setExpandedMenu(null);
      } else {
        setExpandedMenu(item.label);
      }
    } else {
      // Navigate to page
      navigate(item.path);
      // Close mobile sidebar after navigation
      if (isMobileOpen) {
        dispatch(closeMobileSidebar());
      }
    }
  };

  const handleSubmenuClick = (path) => {
    navigate(path);
    // Close mobile sidebar after navigation
    if (isMobileOpen) {
      dispatch(closeMobileSidebar());
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-700">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Grid size={24} className="text-white" />
        </div>
        {isOpen && <span className="text-xl font-bold">Admin Panel</span>}
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className={`px-4 mb-2 text-xs font-semibold ${isDark ? 'text-gray-500' : 'text-gray-400'} uppercase ${!isOpen && 'hidden'}`}>
          Menu
        </div>
        
        {menuItems.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => handleMenuClick(item)}
              className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${!isOpen && 'justify-center'} ${
                isActive(item.path) 
                  ? 'bg-blue-500 text-white' 
                  : isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon 
                  size={20} 
                  className={
                    isActive(item.path) 
                      ? 'text-white' 
                      : expandedMenu === item.label || item.label === 'E-commerce' 
                        ? 'text-blue-500' 
                        : ''
                  } 
                />
                {isOpen && (
                  <>
                    <span className={
                      isActive(item.path) 
                        ? 'text-white' 
                        : expandedMenu === item.label || item.label === 'E-commerce' 
                          ? 'text-blue-500' 
                          : ''
                    }>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </div>
              {isOpen && item.submenu && (
                <ChevronDown
                  size={16}
                  className={`transition-transform ${expandedMenu === item.label ? 'rotate-180' : ''}`}
                />
              )}
            </button>

            {/* Submenu */}
            {item.submenu && isOpen && expandedMenu === item.label && (
              <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} py-2`}>
                {item.submenu.map((subitem) => (
                  <button
                    key={subitem.label}
                    onClick={() => handleSubmenuClick(subitem.path)}
                    className={`w-full text-left px-12 py-2 text-sm transition-colors ${
                      isActive(subitem.path)
                        ? 'bg-blue-500 text-white font-medium'
                        : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    {subitem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block fixed left-0 top-0 h-screen ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-r transition-all duration-300 z-40 ${isOpen ? 'w-64' : 'w-20'}`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => dispatch(closeMobileSidebar())}
          ></div>

          {/* Sidebar */}
          <aside
            className={`lg:hidden fixed left-0 top-0 h-screen w-64 ${isDark ? 'bg-gray-900' : 'bg-white'} z-50 transform transition-transform duration-300`}
          >
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;