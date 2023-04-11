import axios from 'axios';

const basicUrl = process.env.SERVER_API_URL;

const Axios = axios.create({
  baseURL: basicUrl,
});

export default Axios;
