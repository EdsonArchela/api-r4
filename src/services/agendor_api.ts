import axios from 'axios';

const agendor_api = axios.create({
  baseURL: process.env.REACT_APP_AGENDOR_API_URL,
  headers: {
    Authorization: `Token ${process.env.REACT_APP_AGENDOR_TOKEN}`,
  },
});

export default agendor_api;
