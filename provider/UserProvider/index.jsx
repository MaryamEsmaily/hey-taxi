//
import { userDispatchCtx, userStateCtx } from "context/user";
import React, { useReducer } from "react";
import userReducer, { initialStateUser } from "reducer/UserReducer";
//
function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialStateUser);
  //
  return (
    <userDispatchCtx.Provider value={dispatch}>
      <userStateCtx.Provider value={state}>{children}</userStateCtx.Provider>
    </userDispatchCtx.Provider>
  );
}

export default UserProvider;
