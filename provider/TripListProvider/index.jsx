import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import SetupSocket from "components/SetupSocket";
import { SendTripCtx } from "context/socket";
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";

const TripListProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const [tripList, setTripList] = useState();
  //
  const SendRequest = async (data) => {
    try {
      await connection
        .invoke("SendRequest", data?.[0], data?.[1], data?.[2])
        .then(console.log("done"));
    } catch (err) {
      console.log(err.message, "hi");
    }
  };
  //

  const startConnection = () => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(
        `https://localhost:5001/TripList?access_token=${cookie.get(
          "passOrDriverId"
        )}`
      )
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    setConnection(newConnection);
  };
  //
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("broadcastTripToDriver", (signal) => {
            console.log(signal, "signal");
            setTripList(signal);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);
  //

  //
  const connectionStop = () => {
    if (connection) connection.stop();
    setConnection(null);
  };
  //
  return (
    <SendTripCtx.Provider
      value={{
        connectionStop,
        SendRequest,
        startConnection,
        tripList,
      }}
    >
      <SetupSocket />
      {children}
    </SendTripCtx.Provider>
  );
};

export default TripListProvider;
