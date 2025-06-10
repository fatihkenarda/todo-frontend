import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Laravel API adresin
});

export const fetchTodos = () => api.get('/todos');
export const createTodo = (data) => api.post('/todos', data);

export default api;