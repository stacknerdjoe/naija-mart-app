import axios from 'axios';

const client = axios.create({ baseURL: 'http://127.0.0.1:8002/api' })

export default client;