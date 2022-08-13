import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const Map = dynamic(() => import("components/Map"), { ssr: false });
function MapView({ setMarkers, markers }) {
  return (
    <Box overflow="hidden" height="100vh">
      <Map setMarkers={setMarkers} markers={markers} />
    </Box>
  );
}

export default MapView;
