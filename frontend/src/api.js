// frontend/src/api.js
import axios from 'axios';

// The base URL will be proxied during development and handled by Vercel rewrites in production.
const API_URL = '/api/tasks/';

const api = axios.create({
  baseURL: API_URL,
});

export const getTasks = () => api.get('/');
export const createTask = (task) => api.post('/', task);
export const updateTask = (id, updates) => api.put(`/${id}`, updates);
export const deleteTask = (id) => api.delete(`/${id}`);