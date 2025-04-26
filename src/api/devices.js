import axios from 'axios';

const API_BASE = 'http://localhost:3001'; // Match your backend port

export const getDevices = async (userId) => {
  return axios.get(`${API_BASE}/devices/${userId}`);
};

export const createDevice = async (device) => {
  return axios.post(`${API_BASE}/devices`, device);
};

export const updateDevice = async (id, updates) => {
  return axios.put(`${API_BASE}/devices/${id}`, updates);
};

export const deleteDevice = async (id) => {
  return axios.delete(`${API_BASE}/devices/${id}`);
};