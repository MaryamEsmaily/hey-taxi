import dynamic from "next/dynamic";
import React from "react";
//
const GetDriverLocation = dynamic(
  () => import("container/app/Dashboard/GetLocation"),
  { ssr: false }
);
//
function GetLocation() {
  return (
    <div>
      <GetDriverLocation />
    </div>
  );
}

export default GetLocation;
