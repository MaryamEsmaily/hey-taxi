import dynamic from "next/dynamic";
import React from "react";

const GetPassengersLocation = dynamic(
  () => import("container/app/Dashboard/GetPassengersLocation"),
  { ssr: false }
);
//
function StartTrip() {
  return <GetPassengersLocation />;
}

export default StartTrip;
