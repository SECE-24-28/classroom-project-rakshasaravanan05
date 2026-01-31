import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

export const issueAPI = {
  createIssue: (formData: FormData) => api.post('/issues', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getUserIssues: () => api.get('/issues/my'),
  getMyIssues: () => api.get('/issues/my'),
  getAllIssues: (filters?: any) => api.get('/issues/all', { params: filters }),
  updateIssueStatus: (id: string, data: any) => api.put(`/issues/${id}`, data),
};

export default api;