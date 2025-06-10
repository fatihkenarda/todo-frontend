import axios from 'axios';

const API_URL = 'http://localhost:8000/api/todos';

const getById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const create = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

const update = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const getAll = async (queryParams = '') => {
  const response = await axios.get(`${API_URL}?${queryParams}`);
  return response.data;
};

export default {
  getById,
  create,
  update,
  remove,
  getAll,
};