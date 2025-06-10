import axios from 'axios';

const API_URL = 'http://localhost:8000/api/categories';

const getAll = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export default {
  getAll,
};