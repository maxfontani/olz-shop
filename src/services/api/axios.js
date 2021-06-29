import axios from 'axios';

const yalantisClient = axios.create({
  baseURL: 'https://yalantis-react-school-api.yalantis.com/api/v1',
});

export default yalantisClient;
