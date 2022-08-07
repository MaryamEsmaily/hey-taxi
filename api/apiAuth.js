import { instance } from "config/instanceAxios";
import { BASE_URL_ADDRESS } from "constant/baseURL";
const BASE_URL = BASE_URL_ADDRESS + "Auth/";

const postAuthLogin = async (params) => {
  const { data } = await instance.post(BASE_URL + "Login", params);
  return data;
};

const postAuthCreateAdmin = async (params) => {
  const { data } = await instance.post(BASE_URL + "CreateAdmin", params);
  return data;
};

export { postAuthLogin, postAuthCreateAdmin };
