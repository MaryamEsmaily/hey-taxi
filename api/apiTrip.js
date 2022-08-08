import { instance } from "config/instanceAxios";
import { BASE_URL_ADDRESS } from "constant/baseURL";
const BASE_URL = BASE_URL_ADDRESS + "Trip/";

const postTripTripRequest = async (params) => {
  const { data } = await instance.post(BASE_URL + "TripRequest", params);
  return data;
};

export { postTripTripRequest };
