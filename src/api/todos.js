import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// src/api/todos.js
export const getTodos = (params = {}) => {
  return axios.get(`${API_BASE_URL}/todos`, { params });
};

export const getTodo = (id) => {
  return axios.get(`${API_BASE_URL}/todos/${id}`);
};

export const updateTodoStatus = (id, status) => {
  return axios.patch(`${API_BASE_URL}/todos/${id}`, { status });
};

export const getTodoStatistics = async () => {
  const response = await axios.get(`${API_BASE_URL}/todos/statistics`);
  return response.data.data;
};

export const getUpcomingTodos = async () => {
  const response = await axios.get(`${API_BASE_URL}/todos/upcoming`);
  return response.data.data;
};

export const updateTodo = (id, data) =>
  axios.put(`${API_BASE_URL}/todos/${id}`, data);

export const deleteTodo = (id) =>
  axios.delete(`${API_BASE_URL}/todos/${id}`); 