import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MapView from "container/Dashboard/MapView";
import TripDetails from "container/Dashboard/TripDetails";

function PassengerDashboard() {
  const [markers, setMarkers] = useState([]);
  return (
    <Grid container>
      <Grid item xs={9}>
        <MapView setMarkers={setMarkers} markers={markers} />
      </Grid>
      <Grid item xs={3}>
        <TripDetails markers={markers} />
      </Grid>
    </Grid>
  );
}

export default PassengerDashboard;
