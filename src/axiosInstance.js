// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/", // Django API base URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add token to headers if it exists in localStorage
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;


import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include authentication tokens
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage or cookies
    const token = localStorage.getItem('authToken'); // Or use a cookie if preferred
    if (token) {
      config.headers['Authorization'] = `Token ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized. Redirecting to login...');
      // Optionally, redirect the user to the login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
