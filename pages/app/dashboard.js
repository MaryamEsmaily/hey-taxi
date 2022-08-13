import DriverDashboard from "container/app/Dashboard/DriverDashboard";
import PassengerDashboard from "container/app/Dashboard/PassengerDashboard";
import { useUserState } from "hook/useUser";
import React, { useState } from "react";

function DashboardPage() {
  const user = useUserState();

  return <>{user?.role === 1 ? <PassengerDashboard /> : <DriverDashboard />}</>;
}

export default DashboardPage;
