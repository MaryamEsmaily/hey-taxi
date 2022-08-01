import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const Map = dynamic(() => import("components/Map"), { ssr: false });
function MapView({ setOrigin, setDestination, origin, destination }) {
  return (
    <Box overflow="hidden" height="100vh">
      <Map
        setOrigin={setOrigin}
        setDestination={setDestination}
        origin={origin}
        destination={destination}
      />
    </Box>
  );
}

export default MapView;
