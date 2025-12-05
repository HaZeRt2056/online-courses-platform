import axios from 'axios';
// Create axios instance with base URL
const API_URL = import.meta.env.VITE_API_BASE_URL
export const api = axios.create({
  baseURL: API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log(API_URL)
// Add request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service functions
export const courseService = {
  // Get all courses with optional filters
  getCourses: async (params?: Record<string, any>) => {
    return api.get('/courses/', { params });
  },
  
  // Get course by ID
  getCourse: async (id: string) => {
    return api.get(`/courses/${id}/`);
  },
};

export const fetchCategories = {
    getCategories: async (id?: string) => {
        const url = id ? `/categories/${id}/` : `/categories/`;
        return api.get(url);
    },
};


export const searchService = {
  // Search courses
  search: async (query: string) => {
    return api.get(`/search/`, { params: { q: query } });
  },
};