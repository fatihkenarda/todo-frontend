import api from './axios';

export const getTodos = () => api.get('/todos');
export const createTodo = (data) => api.post('/todos', data);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);