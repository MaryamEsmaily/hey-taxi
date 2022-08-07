import axios from "axios";
import { BASE_URL_ADDRESS } from "constant/baseURL";

const instance = axios.create({
  baseURL: BASE_URL_ADDRESS,
});
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { instance };
