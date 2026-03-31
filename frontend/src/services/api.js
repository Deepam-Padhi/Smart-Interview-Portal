import axios from 'axios';

// Support both REACT_APP_API_BASE_URL (Render) and REACT_APP_API_URL (local)
const API_BASE_URL = 
  process.env.REACT_APP_API_BASE_URL || 
  process.env.REACT_APP_API_URL || 
  'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle errors
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

// Auth endpoints
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

// Course endpoints
export const courseAPI = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
};

// Mapping courseId to course name for quiz endpoints
const COURSE_ID_TO_NAME = {};

export const setCourseMapping = (courseId, courseName) => {
  COURSE_ID_TO_NAME[courseId] = courseName;
};

// Question endpoints
export const questionAPI = {
  getByCourse: (courseId) => {
    const courseName = COURSE_ID_TO_NAME[courseId];
    if (!courseName) {
      return Promise.reject(new Error('Course name not found for ID: ' + courseId));
    }
    return api.get(`/quiz/topics/${encodeURIComponent(courseName)}`);
  },
  getByTopic: (courseId, topic, difficulty) => {
    const courseName = COURSE_ID_TO_NAME[courseId];
    if (!courseName) {
      return Promise.reject(new Error('Course name not found for ID: ' + courseId));
    }
    return api.get(`/quiz/${encodeURIComponent(courseName)}/${encodeURIComponent(topic)}/${encodeURIComponent(difficulty)}`);
  },
  create: (data) => api.post('/quiz/add', data),
  update: (id, data) => api.put(`/questions/${id}`, data),
  delete: (id) => api.delete(`/questions/${id}`),
};

// Quiz Result endpoints
export const resultAPI = {
  getAll: () => api.get('/results'),
  getByUser: () => api.get('/results/user'),
  getById: (id) => api.get(`/results/${id}`),
  create: (data) => api.post('/results', data),
  getAnalytics: () => api.get('/results/analytics'),
};

// User endpoints
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  getAll: () => api.get('/users'),
  updateProfile: (data) => api.put('/users/profile', data),
  getDashboardStats: () => api.get('/users/stats'),
};

// Free Course endpoints
export const freeCourseAPI = {
  getAll: () => api.get('/free-courses'),
  getById: (id) => api.get(`/free-courses/${id}`),
  create: (data) => api.post('/free-courses', data),
  update: (id, data) => api.put(`/free-courses/${id}`, data),
  delete: (id) => api.delete(`/free-courses/${id}`),
};

// Resume endpoints
export const resumeAPI = {
  analyze: (formData) => api.post('/resume/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

export default api;