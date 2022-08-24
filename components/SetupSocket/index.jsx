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
    if (id) {
      startConnection();
    }
  }, [id]);
  //
  return null;
}

export default SetupSocket;
