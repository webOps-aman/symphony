import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor (optional - for adding auth tokens)
axiosInstance.interceptors.request.use(
  (config) => {
    // Agar token chahiye to yahan add kar sakte ho
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional - for error handling)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Global error handling
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;