import React from "react";
import Grid from "@mui/material/Grid";
import MapView from "container/Dashboard/MapView";
import TripDetails from "container/Dashboard/TripDetails";

function DashboardPage() {
  return (
    <Grid container>
      <Grid item xs={9}>
        <MapView />
      </Grid>
      <Grid item xs={3}>
        <TripDetails />
      </Grid>
    </Grid>
  );
}

export default DashboardPage;
