import DriverDashboard from "container/Dashboard/DriverDashboard";
import PassengerDashboard from "container/Dashboard/PassengerDashboard";
import { useUserState } from "hook/useUser";
import React, { useState } from "react";

function DashboardPage() {
  const user = useUserState();

  return (
    <>{!user?.role === true ? <PassengerDashboard /> : <DriverDashboard />}</>
  );
}

export default DashboardPage;
