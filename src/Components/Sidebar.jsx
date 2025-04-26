import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard,
  Server,
  Settings,
  LogOut,
  ChevronFirst, 
  ChevronLast,
  User,
  Gauge,
  Thermometer,
  Droplets
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../Images/sltmobitellogo.png';
import miniLogo from '../Images/sltmobitel-mini.png';

const Sidebar = ({ onToggle }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Devices', icon: Server, path: '/devices' },
    { name: 'Account', icon: User, path: '/profile' },
  ];

  // Update active item based on current route
  useEffect(() => {
    const currentItem = menuItems.find(item => location.pathname.startsWith(item.path));
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [location.pathname]);

  const toggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    if (onToggle) onToggle(newCollapsed);
  };

  const handleNavigation = (item) => {
    setActiveItem(item.name);
    navigate(item.path);
  };

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <aside className={`h-screen bg-gray-800 border-r border-gray-700 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <nav className="h-full flex flex-col">
        {/* Header with logo and collapse button */}
        <div className={`p-5 pb-4 flex ${collapsed ? 'flex-col items-center gap-4' : 'justify-between items-center border-b border-gray-700'}`}>
          {collapsed ? (
            <div className="flex flex-col items-center">
              <img 
                src={miniLogo} 
                alt="logo" 
                className="w-10 h-10 object-contain rounded-full border-2 border-cyan-500 p-1 shadow-lg hover:scale-110 transition-transform duration-200"
              />
            </div>
          ) : (
            <img src={logo} alt="logo" className="w-45" />
          )}
          <button 
            onClick={toggleCollapse}
            className={`p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors ${collapsed ? 'mt-2' : ''}`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronLast size={18} /> : <ChevronFirst size={18} />}
          </button>
        </div>

        {/* Main Menu Items */}
        <div className="flex-1 px-3 py-6 space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => handleNavigation(item)}
              className={`group relative flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                activeItem === item.name
                  ? 'bg-gray-700 text-cyan-400 shadow-md'
                  : 'hover:bg-gray-700 text-gray-300'
              }`}
            >
              <div className={`p-2 rounded-lg ${activeItem === item.name ? 'bg-cyan-500/20' : 'bg-gray-600/30'} group-hover:bg-cyan-500/20`}>
                <item.icon 
                  size={18} 
                  className={`${activeItem === item.name ? 'text-cyan-400' : 'text-gray-400'} group-hover:text-cyan-400`} 
                />
              </div>
              {!collapsed ? (
                <span className="ml-3 font-medium">{item.name}</span>
              ) : (
                <div className="absolute left-full ml-4 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 border border-gray-700">
                  {item.name}
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-0 border-r-4 border-t-transparent border-b-transparent border-r-gray-800"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sign Out */}
        <div className="p-4 border-t border-gray-700">
          <div className={`flex ${collapsed ? 'justify-center' : ''} items-center`}>
            <button
              onClick={handleSignOut}
              className={`group relative flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                collapsed ? 'mx-auto' : 'w-full'
              }`}
              aria-label="Sign out"
            >
              <div className="p-2 rounded-lg bg-rose-500/10">
                <LogOut size={18} className="text-rose-400 group-hover:text-rose-300" />
              </div>
              {!collapsed && (
                <span className="ml-3 text-rose-400 group-hover:text-rose-300 font-medium">Sign Out</span>
              )}
              {collapsed && (
                <button  className="absolute left-full ml-4 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 border border-gray-700">
                  Sign Out
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-0 border-r-4 border-t-transparent border-b-transparent border-r-gray-800"></div>
                </button>
              )}
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;