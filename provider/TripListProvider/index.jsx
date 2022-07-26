import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import SetupSocket from "components/SetupSocket";
import { SendTripCtx } from "context/socket";
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";

const TripListProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const [tripList, setTripList] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [requestStatus, setRequestStatus] = useState();
  const [firstTime, setFirstTime] = useState(false);
  const [driverFound, setDriverFound] = useState();

  //
  const SendRequest = async (data) => {
    try {
      await connection
        .invoke(
          "SendRequest",
          "35.65004306288284",
          "51.403567096601826",
          data?.[2]
        )
        .then(console.log("done "));
    } catch (err) {
      console.log(err.message);
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
          setIsConnected(true);
          connection.on("broadcastTripToDriver", (signal) => {
            setTripList((prev) => [...prev, ...signal]);
            setFirstTime(true);
          });
          connection.on("BroadcastOutfitResultToPassnger", (signal) => {
            setRequestStatus(signal);
          });
          connection.on("BroadcastDriverResultToPassnger", (signal) => {
            setDriverFound(signal);
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
        connection,
        SendRequest,
        startConnection,
        tripList,
        requestStatus,
        isConnected,
        firstTime,
        driverFound,
      }}
    >
      <SetupSocket />
      {children}
    </SendTripCtx.Provider>
  );
};

export default TripListProvider;
