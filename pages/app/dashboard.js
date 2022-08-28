import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import DriverDashboard from "container/app/Dashboard/DriverDashboard";
import PassengerDashboard from "container/app/Dashboard/PassengerDashboard";
import { useUserState } from "hook/useUser";
import React from "react";

function DashboardPage() {
  const user = useUserState();

  return (
    <>
      {/* {user?.role === 1 ? ( */}
      {/* <PassengerDashboard /> */}
      <DriverDashboard />
      {/* ) : user?.role === 2 ? (
      ) : (
        <Box
          sx={{
            width: "100vw",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="warning" />
        </Box>
      )} */}
    </>
  );
}

export default DashboardPage;
