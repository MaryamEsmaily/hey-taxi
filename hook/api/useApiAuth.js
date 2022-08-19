import * as apiAuth from "api/apiAuth";
import { useMutation } from "@tanstack/react-query";

const usePostAuthLogin = () => {
  return useMutation(apiAuth.postAuthLogin);
};

const usePostAuthRegister = () => {
  return useMutation(apiAuth.postAuthRegister);
};

const usePostAuthProfile = (params) => {
  return useMutation(apiAuth.postAuthProfile);
};

export { usePostAuthLogin, usePostAuthRegister, usePostAuthProfile };
