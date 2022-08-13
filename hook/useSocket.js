import { SendTripCtx } from "context/socket";
import { useContext } from "react";

export const useTripRequestsCtx = () => useContext(SendTripCtx);
