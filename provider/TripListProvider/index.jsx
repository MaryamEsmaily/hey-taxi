import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import SetupSocket from "components/SetupSocket";
import { SendTripCtx } from "context/socket";
import React, { useContext, useEffect, useState } from "react";

const TripListProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const [tripList, setTripList] = useState([
    // {
    //   id: 1,
    //   name: "سفر1",
    //   origin: "بابل، میدان امام علی",
    //   destination: "بابلسر، شهربانی",
    // },
    // {
    //   id: 2,
    //   name: "سفر2",
    //   origin: "بابل، میدان امام علی",
    //   destination: "بابلسر، شهربانی",
    // },
    // {
    //   id: 3,
    //   name: "سفر2",
    //   origin: "بابل، میدان امام علی",
    //   destination: "بابلسر، شهربانی",
    // },
    // {
    //   id: 4,
    //   name: "سفر2",
    //   origin: "بابل، میدان امام علی",
    //   destination: "بابلسر، شهربانی",
    // },
    // {
    //   id: 5,
    //   name: "سفر2",
    //   origin: "بابل، میدان امام علی",
    //   destination: "بابلسر، شهربانی",
    // },
    // {
    //   id: 6,
    //   name: "سفر2",
    //   origin: "بابل، میدان امام علی",
    //   destination: "بابلسر، شهربانی",
    // },
    // {
    //   id: 7,
    //   name: "سفر2",
    //   origin: "بابل، میدان امام علی",
    //   destination: "بابلسر، شهربانی",
    // },
    // {
    //   id: 8,
    //   name: "سفر2",
    //   origin: "بابل، میدان امام علی",
    //   destination: "بابلسر، شهربانی",
    // },
    // {
    //   id: 9,
    //   name: "سفر2",
    //   origin: "بابل، میدان امام علی",
    //   destination: "بابلسر، شهربانی",
    // },
    // {
    //   id: 10,
    //   name: "سفر2",
    //   origin: "بابل، میدان امام علی",
    //   destination: "بابلسر، شهربانی",
    // },
    // {
    //   id: 11,
    //   name: "سفر2",
    //   origin: "بابل، میدان امام علی",
    //   destination: "بابلسر، شهربانی",
    // },
  ]);

  //

  const SendRequest = async (data) => {
    console.log(data);
    try {
      await connection
        .invoke("SendRequest", { locationModel: data })
        .then(console.log("done"));
    } catch (err) {
      console.log(err.message, "hi");
    }
  };
  //

  // negotiates with server and starts the connection
  const startConnection = () => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/TripList")
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    setConnection(newConnection);
  };
  //
  useEffect(() => {
    
    // if the socket is connected starts listening for signals
    if (connection) {
      connection
        .start()
        .then((result) => {
          connection.on("broadcastTripList", (signal) => {
            console.log(signal, "signal");
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
