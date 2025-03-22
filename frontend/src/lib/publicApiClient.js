import axios from 'axios';

const publicApiClient = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

export default publicApiClient;