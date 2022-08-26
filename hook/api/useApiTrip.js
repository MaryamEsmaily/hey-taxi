import * as apiTrip from "api/apiTrip";
import { useMutation } from "@tanstack/react-query";

const usePostTripTripRequest = () => {
  return useMutation(apiTrip.postTripTripRequest);
};

const usePostTripCreateTrip = () => {
  return useMutation(apiTrip.postTripCreateTrip);
};

export { usePostTripTripRequest,usePostTripCreateTrip };
