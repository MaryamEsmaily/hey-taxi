import { instance } from "config/instanceAxios";
import { BASE_URL_ADDRESS } from "constant/baseURL";
const BASE_URL = BASE_URL_ADDRESS + "Auth/";

const postAuthLogin = async (params) => {
  const { data } = await instance.post(BASE_URL + "Login", params);
  return data;
};

const postAuthRegister = async (params) => {
  const { data } = await instance.post(BASE_URL + "Register", params);
  return data;
};

const postAuthProfile = async (params) => {
  const { data } = await instance.post(BASE_URL + "Profile", params);
  return data;
};

export { postAuthLogin, postAuthRegister, postAuthProfile };
