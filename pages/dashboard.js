import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MapView from "container/Dashboard/MapView";
import TripDetails from "container/Dashboard/TripDetails";

function DashboardPage() {
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();

  return (
    <Grid container>
      <Grid item xs={9}>
        <MapView
          setOrigin={setOrigin}
          setDestination={setDestination}
          origin={origin}
          destination={destination}
        />
      </Grid>
      <Grid item xs={3}>
        <TripDetails />
      </Grid>
    </Grid>
  );
}

export default DashboardPage;
