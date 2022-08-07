import { userDispatchCtx, userStateCtx } from "context/user";
import { useCallback, useContext } from "react";
//
export const useUserState = () => useContext(userStateCtx);
export const useUserDispatch = () => useContext(userDispatchCtx);
export const useUser = () => {
  const dispatch = useUserDispatch();
  //   setUser
  const setUser = useCallback(
    (user) => {
      dispatch({ type: "SET_USER", payload: user });
    },
    [dispatch]
  );

  return { setUser };
};
