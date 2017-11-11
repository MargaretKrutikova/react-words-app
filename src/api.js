import axios from 'axios';

export const getData = () => {
  return axios.get('/api/data').then(resp => resp.data);
};