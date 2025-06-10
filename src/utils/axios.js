import axios from 'axios';

console.log('API BASE:', process.env.REACT_APP_API_BASE_URL); // DEBUG

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default instance;