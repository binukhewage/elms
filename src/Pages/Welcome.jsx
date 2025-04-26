import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FiMonitor, FiAlertTriangle, FiDatabase, FiBarChart2 } from 'react-icons/fi';
import logo from '../Images/sltmobitellogo.png';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Header Section */}
        <div className="p-8 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <img src={logo} alt="logo" className="w-32 h-auto" />
            <div>
              <h1 className="text-white text-3xl font-bold tracking-tight mb-2 bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                ENVIRONMENTAL CONDITION MONITORING SYSTEM
              </h1>
              <p className="text-gray-400 text-lg">Real-time Monitoring For A Sustainable Future</p>
            </div>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600 hover:border-cyan-400 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                <FiMonitor size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Real-time Monitoring</h3>
            </div>
            <p className="text-gray-400">Track environmental parameters with live data updates and interactive dashboards.</p>
          </div>
          
          {/*<div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600 hover:border-emerald-400 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                <FiAlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Alert System</h3>
            </div>
            <p className="text-gray-400">Instant notifications when parameters exceed safe thresholds.</p>
          </div>
          
          <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600 hover:border-blue-400 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                <FiDatabase size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Data Analytics</h3>
            </div>
            <p className="text-gray-400">Historical data analysis with customizable reporting tools.</p>
          </div>*/}
          
          <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600 hover:border-purple-400 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                <FiBarChart2 size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white">Visualizations</h3>
            </div>
            <p className="text-gray-400">Interactive charts and graphs for better data comprehension.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-8 bg-gray-800 border-t border-gray-700 flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/dashboard"
            className="flex items-center justify-center gap-3 text-lg w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group font-medium"
          >
            Welcome 
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
          
          
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-900 border-t border-gray-700 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} SLT Mobitel Environmental Monitoring System
        </div>
      </div>
    </div>
  );
};

export default Welcome;