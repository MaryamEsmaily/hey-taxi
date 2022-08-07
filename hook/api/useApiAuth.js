import * as apiAuth from "api/apiAuth";
import { useMutation } from "@tanstack/react-query";

const usePostAuthLogin = () => {
  return useMutation(apiAuth.postAuthLogin);
};

const usePostAuthCreateAdmin = () => {
  return useMutation(apiAuth.postAuthCreateAdmin);
};

export { usePostAuthLogin, usePostAuthCreateAdmin };
