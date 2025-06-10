// src/api/categories.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getCategories = () =>
  axios.get(`${API_BASE_URL}/categories`);

export const getCategory = (id) =>
  axios.get(`${API_BASE_URL}/categories/${id}`);

export const createCategory = (data) =>
  axios.post(`${API_BASE_URL}/categories`, data);

// İstersen update/delete için de fonksiyon ekleyebilirsin
export const updateCategory = (id, data) =>
  axios.put(`${API_BASE_URL}/categories/${id}`, data);

export const deleteCategory = (id) =>
  axios.delete(`${API_BASE_URL}/categories/${id}`);