import { useTripRequestsCtx } from "hook/useSocket";
import { useEffect } from "react";
import cookie from "js-cookie";
//
function SetupSocket() {
  //
  const id = cookie.get("userId");
  const { startConnection } = useTripRequestsCtx();

  useEffect(() => {
    if (id) startConnection();
  }, [id]);
  //
  return null;
}

export default SetupSocket;
