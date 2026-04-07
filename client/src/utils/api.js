import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Will be dynamic in production
});

// Add a request interceptor to add token if exists
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;
    const adminToken = localStorage.getItem('adminToken');

    if (userInfo && userInfo.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    } else if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
