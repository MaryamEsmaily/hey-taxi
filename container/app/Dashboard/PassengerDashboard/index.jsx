import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MapView from "container/app/Dashboard/MapView";
import TripDetails from "container/app/Dashboard/TripDetails";

function PassengerDashboard() {
  const [markers, setMarkers] = useState([]);
  return (
    <Grid container>
      <MapView setMarkers={setMarkers} markers={markers} />
      <TripDetails markers={markers} />
    </Grid>
  );
}

export default PassengerDashboard;
