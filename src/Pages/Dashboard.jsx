import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import {
  User,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Gauge,
  Cloud,
  Thermometer,
  Droplets,
  FlaskConical,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [airQuality, setAirQuality] = useState("Good");
  const [tvocLevel, setTvocLevel] = useState(0);
  const [eco2Level, setEco2Level] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("User");
  const [isDeviceDropdownOpen, setIsDeviceDropdownOpen] = useState(false);

  // Load devices from localStorage
  const [devices, setDevices] = useState(() => {
    const savedDevices = localStorage.getItem('devices');
    return savedDevices ? JSON.parse(savedDevices) : [
      {
        id: 'gsheet-1',
        name: 'Environmental Sensor',
        type: 'Google Sheets',
        scriptUrl: 'AKfycbwX-AaJBnjm8mMlB_g6acwaycDp-hb3zPpKTvEgVBl3BpX1mFCg6sLW0coMZvoTufgf',
        lastUpdated: new Date().toISOString(),
        metrics: ['temperature', 'humidity', 'tvoc', 'eco2']
      }
    ];
  });

  const [selectedDevice, setSelectedDevice] = useState(() => {
    return devices[0]?.id || null;
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [],
        borderColor: "rgba(255, 99, 132, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "rgba(255, 99, 132, 0.8)",
        pointRadius: 3,
        pointHoverRadius: 6,
      },
      {
        label: "Humidity (%)",
        data: [],
        borderColor: "rgba(53, 162, 235, 0.8)",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "rgba(53, 162, 235, 0.8)",
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  });

  useEffect(() => {
    // Get user data from localStorage when component mounts
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name || "User");
    }
  }, []);

  // Fetch data from Google Sheets
  const fetchData = async () => {
    if (!selectedDevice) return;
    
    try {
      const currentDevice = devices.find(d => d.id === selectedDevice);
      if (!currentDevice) return;

      const SCRIPT_URL = `https://script.google.com/macros/s/${currentDevice.scriptUrl}/exec`;
      const response = await fetch(SCRIPT_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Unknown error from server");
      }

      const rows = result.data;
      // Get last 24 readings without reversing
      const last24Readings = rows.slice(-24);
      const latest = rows[rows.length - 1];

      setChartData({
        labels: last24Readings.map((reading) =>
          new Date(reading.DateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        ),
        datasets: [
          {
            ...chartData.datasets[0],
            data: last24Readings.map((r) => parseFloat(r.Temperature || 0)),
          },
          {
            ...chartData.datasets[1],
            data: last24Readings.map((r) => parseFloat(r.humidity || 0)),
          },
        ],
      });

      // Update all state variables with correct property names
      setTemperature(parseFloat(latest.Temperature || 0).toFixed(1));
      setHumidity(parseFloat(latest.humidity || 0).toFixed(1));
      setTvocLevel(parseInt(latest.tvoc || 0));
      setEco2Level(parseInt(latest.eco2 || 0));
      setAirQuality(latest.airquality == 1 ? "Good" : "Poor");
      setLastUpdated(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      setError(null);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    // Initial data fetch
    if (selectedDevice) {
      fetchData();
    }

    // Set up refresh interval (every minute)
    const interval = setInterval(fetchData, 1000);

    // Update current time every second
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, [selectedDevice]);

  const toggleDeviceDropdown = () => {
    setIsDeviceDropdownOpen(!isDeviceDropdownOpen);
  };

  const handleDeviceChange = (deviceId) => {
    setSelectedDevice(deviceId);
    setIsDeviceDropdownOpen(false);
    localStorage.setItem('lastSelectedDevice', deviceId);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#718096",
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(226, 232, 240, 0.2)",
        },
        ticks: {
          color: "#718096",
          maxRotation: 45,
          minRotation: 45,
        },
        display: true,
        offset: true,
      },
      y: {
        grid: {
          color: "rgba(226, 232, 240, 0.2)",
        },
        ticks: {
          color: "#718096",
        },
        beginAtZero: false,
      },
    },
  };

  // Determine status colors
  const airQualityColor =
    airQuality === "Good"
      ? "bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-800"
      : "bg-gradient-to-br from-rose-100 to-rose-50 text-rose-800";
  const tvocColor =
    tvocLevel > 300
      ? "bg-gradient-to-br from-rose-100 to-rose-50 text-rose-800"
      : tvocLevel > 200
      ? "bg-gradient-to-br from-amber-100 to-amber-50 text-amber-800"
      : "bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-800";
  const eco2Color =
    eco2Level > 1000
      ? "bg-gradient-to-br from-rose-100 to-rose-50 text-rose-800"
      : eco2Level > 800
      ? "bg-gradient-to-br from-amber-100 to-amber-50 text-amber-800"
      : "bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-800";

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 border-b border-gray-800 gap-4 sm:gap-0">
          <div>
            <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
              DASHBOARD
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Real-time Environmental Monitoring
            </p>
          </div>

          <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-normal">
            <div className="text-right">
              <p className="text-gray-300 text-xs sm:text-sm">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="text-white font-medium text-sm sm:text-base">
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="flex cursor-pointer group relative">
              <Link
                to="/profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg"
              >
                <User className="text-white" size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Device Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <div className="relative w-full sm:w-auto">
              <button
                onClick={toggleDeviceDropdown}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors w-full sm:w-auto justify-between"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-gray-300 font-medium text-sm sm:text-base">
                    {devices.find((d) => d.id === selectedDevice)?.name || "Select a device"}
                  </span>
                </div>
                <div className="flex items-center">
                  <ChevronDown
                    className={`text-gray-400 transition-transform ${
                      isDeviceDropdownOpen ? "rotate-180" : ""
                    }`}
                    size={14}
                  />
                  <span className="text-gray-500 text-xs sm:text-sm ml-2">• Connected</span>
                </div>
              </button>

              {isDeviceDropdownOpen && (
                <div className="absolute z-10 mt-2 w-full sm:w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                  <div className="py-1">
                    {devices.map((device) => (
                      <button
                        key={device.id}
                        onClick={() => handleDeviceChange(device.id)}
                        className={`w-full text-left px-4 py-2 text-xs sm:text-sm flex items-center space-x-2 ${
                          selectedDevice === device.id
                            ? "bg-gray-700 text-white"
                            : "text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                        <span>{device.name}</span>
                        {selectedDevice === device.id && (
                          <span className="ml-auto text-emerald-400">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="text-gray-400 text-xs sm:text-sm w-full sm:w-auto text-right">
              Last updated: {lastUpdated || "Loading..."}
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Temperature Chart */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="p-1 sm:p-2 rounded-lg bg-rose-500/10">
                    <Thermometer className="text-rose-500" size={18} />
                  </div>
                  <h2 className="text-white text-lg sm:text-xl font-semibold">
                    Temperature
                  </h2>
                </div>
                <span className="text-rose-400 font-medium text-sm sm:text-base">
                  {temperature}°C
                </span>
              </div>
              <div className="h-48 sm:h-64 w-full">
                <Line
                  data={{
                    labels: chartData.labels,
                    datasets: [chartData.datasets[0]],
                  }}
                  options={chartOptions}
                />
              </div>
            </div>

            {/* Humidity Chart */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="p-1 sm:p-2 rounded-lg bg-blue-500/10">
                    <Droplets className="text-blue-500" size={18} />
                  </div>
                  <h2 className="text-white text-lg sm:text-xl font-semibold">Humidity</h2>
                </div>
                <span className="text-blue-400 font-medium text-sm sm:text-base">{humidity}%</span>
              </div>
              <div className="h-48 sm:h-64 w-full">
                <Line
                  data={{
                    labels: chartData.labels,
                    datasets: [chartData.datasets[1]],
                  }}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>

          {/* Air Quality Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Air Quality */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
              <div className="p-3 sm:p-4 md:p-5 border-b border-gray-700">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="p-1 sm:p-2 rounded-lg bg-emerald-500/10">
                    <Gauge className="text-emerald-500" size={18} />
                  </div>
                  <h2 className="text-white font-semibold text-sm sm:text-base">Air Quality</h2>
                </div>
              </div>
              <div
                className={`p-4 sm:p-6 ${airQualityColor} flex flex-col items-center justify-center h-36 sm:h-48`}
              >
                {airQuality === "Good" ? (
                  <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-3 text-emerald-500" />
                ) : (
                  <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-3 text-rose-500" />
                )}
                <span className="text-xl sm:text-2xl font-bold">{airQuality}</span>
                <span className="text-xs sm:text-sm mt-1">
                  Last updated: {lastUpdated || "Loading..."}
                </span>
              </div>
            </div>

            {/* TVOC Level */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
              <div className="p-3 sm:p-4 md:p-5 border-b border-gray-700">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="p-1 sm:p-2 rounded-lg bg-purple-500/10">
                    <FlaskConical className="text-purple-500" size={18} />
                  </div>
                  <h2 className="text-white font-semibold text-sm sm:text-base">TVOC Level</h2>
                </div>
              </div>
              <div
                className={`p-4 sm:p-6 ${tvocColor} flex flex-col items-center justify-center h-36 sm:h-48`}
              >
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{tvocLevel}</span>
                <span className="text-sm sm:text-base md:text-lg mt-1">ppb</span>
                <span
                  className={`text-xs sm:text-sm mt-2 sm:mt-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full ${
                    tvocLevel > 300
                      ? "bg-rose-100 text-rose-800"
                      : tvocLevel > 200
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {tvocLevel > 300
                    ? "Unhealthy"
                    : tvocLevel > 200
                    ? "Moderate"
                    : "Good"}
                </span>
              </div>
            </div>

            {/* eCO2 Level */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
              <div className="p-3 sm:p-4 md:p-5 border-b border-gray-700">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="p-1 sm:p-2 rounded-lg bg-cyan-500/10">
                    <Cloud className="text-cyan-500" size={18} />
                  </div>
                  <h2 className="text-white font-semibold text-sm sm:text-base">eCO2 Level</h2>
                </div>
              </div>
              <div
                className={`p-4 sm:p-6 ${eco2Color} flex flex-col items-center justify-center h-36 sm:h-48`}
              >
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{eco2Level}</span>
                <span className="text-sm sm:text-base md:text-lg mt-1">ppm</span>
                <span
                  className={`text-xs sm:text-sm mt-2 sm:mt-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full ${
                    eco2Level > 1000
                      ? "bg-rose-100 text-rose-800"
                      : eco2Level > 800
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {eco2Level > 1000
                    ? "Unhealthy"
                    : eco2Level > 800
                    ? "Moderate"
                    : "Good"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;