import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FiMonitor, FiAlertTriangle, FiDatabase, FiBarChart2 } from 'react-icons/fi';
import logo from '../Images/sltmobitellogo.png';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 mx-2 sm:mx-4">
        {/* Header Section */}
        <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 text-center">
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8">
            <img src={logo} alt="logo" className="w-24 sm:w-28 md:w-32 h-auto" />
            <div>
              <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-1 sm:mb-2 bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                ENVIRONMENTAL CONDITION MONITORING SYSTEM
              </h1>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg">
                Real-time Monitoring For A Sustainable Future
              </p>
            </div>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-xl border border-gray-600 hover:border-cyan-400 transition-all">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                <FiMonitor size={20} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">Real-time Monitoring</h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              Track environmental parameters with live data updates and interactive dashboards.
            </p>
          </div>
          
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-xl border border-gray-600 hover:border-purple-400 transition-all">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-purple-500/10 rounded-lg text-purple-400">
                <FiBarChart2 size={20} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">Visualizations</h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              Interactive charts and graphs for better data comprehension.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-6 md:p-8 bg-gray-800 border-t border-gray-700 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link 
            to="/dashboard"
            className="flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group font-medium"
          >
            Welcome 
            <FiArrowRight className="transition-transform group-hover:translate-x-1 w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-gray-900 border-t border-gray-700 text-center text-gray-500 text-xs sm:text-sm">
          © {new Date().getFullYear()} SLT Mobitel Environmental Monitoring System
        </div>
      </div>
    </div>
  );
};

export default Welcome;