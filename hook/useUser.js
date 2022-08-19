import { userDispatchCtx, userStateCtx } from "context/user";
import { useCallback, useContext } from "react";
import cookie from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
//
export const useUserState = () => useContext(userStateCtx);
export const useUserDispatch = () => useContext(userDispatchCtx);
export const useUser = () => {
  const dispatch = useUserDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();
  //   setUser
  const setUser = useCallback(
    (user) => {
      dispatch({ type: "SET_USER", payload: user });
    },
    [dispatch]
  );

  const login = useCallback(
    (user) => {
      cookie.set("ID", user);
      router.push("/app/dashboard");
      queryClient.clear();
    },
    [queryClient, router]
  );
  // logout
  const logout = useCallback(() => {
    dispatch({ type: "REMOVE_USER" });
    cookie.remove("ID");
    router.push("/login");
    queryClient.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, queryClient, router]);

  return { setUser, login, logout };
};
