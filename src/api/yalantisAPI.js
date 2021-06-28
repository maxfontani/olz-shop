import axios from "axios";

export const yalantisApi = axios.create({
  baseURL: "https://yalantis-react-school-api.yalantis.com/api/v1",
});
