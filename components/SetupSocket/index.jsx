import { useTripRequestsCtx } from "hook/useSocket";
import { useEffect } from "react";
//
function SetupSocket() {
  //
  const { startConnection } = useTripRequestsCtx();

  useEffect(() => {
    startConnection();
  }, []);
  //
  return null;
}

export default SetupSocket;
