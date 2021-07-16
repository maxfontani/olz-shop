import axios from "axios";

const yalantisApi = axios.create({
  baseURL: "https://yalantis-react-school-api.yalantis.com/api/v1",
});

const yalantisApiAuth = axios.create({
  baseURL: "https://yalantis-react-school-api.yalantis.com/api/v1",
  headers: {
    Authorization: process.env.REACT_APP_YALANTIS_API,
  },
});

export { yalantisApi, yalantisApiAuth };
