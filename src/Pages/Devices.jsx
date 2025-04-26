import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiSave, FiTrash2, FiPlus, FiChevronDown } from 'react-icons/fi';
import { Gauge, Thermometer, Droplets, Cloud } from 'lucide-react';
import Sidebar from '../Components/Sidebar';

const Devices = () => {
  // Load devices from localStorage if available
  const [devices, setDevices] = useState(() => {
    const savedDevices = localStorage.getItem('devices');
    return savedDevices ? JSON.parse(savedDevices) : [
      {
        id: 'gsheet-1',
        name: 'Environmental Sensor',
        type: 'Google Sheets',
        scriptUrl: 'AKfycbwX-AaJBnjm8mMlB_g6acwaycDp-hb3zPpKTvEgVBl3BpX1mFCg6sLW0coMZvoTufgf',
        lastUpdated: '2023-11-15T10:30:00Z',
        metrics: ['temperature', 'humidity', 'tvoc', 'eco2']
      }
    ];
  });

  const [editingDeviceId, setEditingDeviceId] = useState(null);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [isAddingDevice, setIsAddingDevice] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    type: 'Google Sheets',
    scriptUrl: ''
  });

  // Save devices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('devices', JSON.stringify(devices));
  }, [devices]);

  // Toggle edit mode
  const toggleEdit = (device) => {
    setEditingDeviceId(device.id);
    setNewDeviceName(device.name);
  };

  // Save edited device name
  const saveDeviceName = (id) => {
    const updatedDevices = devices.map(device => 
      device.id === id ? { ...device, name: newDeviceName } : device
    );
    setDevices(updatedDevices);
    setEditingDeviceId(null);
  };

  // Add new device
  const addDevice = () => {
    if (newDevice.name && newDevice.scriptUrl) {
      const shortCode = newDevice.scriptUrl.split('/').pop();
      const updatedDevices = [...devices, {
        id: `gsheet-${Date.now()}`, // Using timestamp for unique ID
        name: newDevice.name,
        type: 'Google Sheets',
        scriptUrl: shortCode,
        lastUpdated: new Date().toISOString(),
        metrics: ['temperature', 'humidity'] // Default metrics
      }];
      setDevices(updatedDevices);
      setIsAddingDevice(false);
      setNewDevice({ name: '', type: 'Google Sheets', scriptUrl: '' });
    }
  };

  // Delete device
  const deleteDevice = (id) => {
    const updatedDevices = devices.filter(device => device.id !== id);
    setDevices(updatedDevices);
  };

  // Get device icon based on type
  const getDeviceIcon = (type) => {
    switch(type) {
      case 'Google Sheets':
        return <Cloud className="text-blue-400" size={20} />;
      default:
        return <Gauge className="text-gray-400" size={20} />;
    }
  };

  // Get metric icon
  const getMetricIcon = (metric) => {
    switch(metric) {
      case 'temperature':
        return <Thermometer className="text-rose-400" size={16} />;
      case 'humidity':
        return <Droplets className="text-blue-400" size={16} />;
      case 'tvoc':
        return <Gauge className="text-purple-400" size={16} />;
      case 'eco2':
        return <Cloud className="text-cyan-400" size={16} />;
      default:
        return <Gauge className="text-gray-400" size={16} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar/>
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header Section */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <div>
            <h1 className="text-white text-3xl font-bold tracking-tight">Devices</h1>
            <p className="text-gray-400 text-sm mt-1">Manage Your Connected Data Sources</p>
          </div>
          
          <button 
            onClick={() => setIsAddingDevice(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <FiPlus size={18} />
            Add Device
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Add New Device Form */}
          {isAddingDevice && (
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-6">
              <h2 className="text-white text-xl font-semibold mb-4">Add New Google Sheets Device</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Device Name</label>
                  <input
                    type="text"
                    value={newDevice.name}
                    onChange={(e) => setNewDevice({...newDevice, name: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="e.g., Office Sensor"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Google Sheets Script ID</label>
                  <input
                    type="text"
                    value={newDevice.scriptUrl}
                    onChange={(e) => setNewDevice({...newDevice, scriptUrl: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="Paste script ID or full URL"
                  />
                  <p className="text-gray-500 text-xs mt-2">
                    Example: AKfycbwX-AaJBnjm8mMlB_g6acwaycDp-hb3zPpKTvEgVBl3BpX1mFCg6sLW0coMZvoTufgf
                  </p>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setIsAddingDevice(false)}
                    className="px-4 py-2 text-gray-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addDevice}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Save Device
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Devices List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {devices.map(device => (
              <div key={device.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all min-w-[360px]">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      {getDeviceIcon(device.type)}
                    </div>
                    <div className="min-w-0">
                      {editingDeviceId === device.id ? (
                        <input
                          type="text"
                          value={newDeviceName}
                          onChange={(e) => setNewDeviceName(e.target.value)}
                          className="bg-gray-700 text-white border-b border-gray-600 focus:outline-none focus:border-blue-500 w-full"
                        />
                      ) : (
                        <h3 className="text-white font-semibold truncate">{device.name}</h3>
                      )}
                      <span className="text-gray-400 text-sm">{device.type}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {editingDeviceId === device.id ? (
                      <button 
                        onClick={() => saveDeviceName(device.id)}
                        className="p-1.5 text-emerald-400 hover:text-emerald-300 rounded-full hover:bg-gray-700"
                      >
                        <FiSave size={16} />
                      </button>
                    ) : (
                      <button 
                        onClick={() => toggleEdit(device)}
                        className="p-1.5 text-blue-400 hover:text-blue-300 rounded-full hover:bg-gray-700"
                      >
                        <FiEdit2 size={16} />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteDevice(device.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 rounded-full hover:bg-gray-700"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-gray-400 text-sm mb-2">
                    <span>Script ID:</span>
                    <code className="bg-gray-700 px-2 py-1 rounded text-xs truncate max-w-[180px]">
                      {device.scriptUrl}
                    </code>
                  </div>
                  <div className="flex items-center justify-between text-gray-400 text-sm">
                    <span>Last updated:</span>
                    <span>{new Date(device.lastUpdated).toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                    <FiChevronDown size={16} />
                    Collected Metrics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {device.metrics.map(metric => (
                      <span 
                        key={metric} 
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-700 rounded-full text-sm"
                      >
                        {getMetricIcon(metric)}
                        {metric.charAt(0).toUpperCase() + metric.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to={`/dashboard?device=${device.id}`}
                    className="w-full block text-center py-2 bg-gradient-to-r from-blue-600/80 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all text-sm"
                  >
                    View Dashboard
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {devices.length === 0 && !isAddingDevice && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Gauge className="text-gray-600" size={40} />
              </div>
              <h3 className="text-gray-300 text-xl font-medium mb-2">No devices connected</h3>
              <p className="text-gray-500 mb-6">Add your first device to start monitoring</p>
              <button 
                onClick={() => setIsAddingDevice(true)}
                className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <FiPlus size={18} />
                Add Device
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Devices;