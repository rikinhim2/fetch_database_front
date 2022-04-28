import axios from 'axios';

const TIMEOUT: number = 20000;

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
  headers: undefined,
  timeout: TIMEOUT,
});

export default instance;
