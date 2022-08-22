import { useTripRequestsCtx } from "hook/useSocket";
import { useEffect } from "react";
import cookie from "js-cookie";
import { useUserState } from "hook/useUser";
//
function SetupSocket() {
  //
  const id = cookie.get("passOrDriverId");
  const user = useUserState();

  const { startConnection } = useTripRequestsCtx();

  useEffect(() => {
    if (id && user?.role === 2) {
      startConnection();
      console.log("Res");
    }
  }, [id, user?.role]);
  //
  return null;
}

export default SetupSocket;
