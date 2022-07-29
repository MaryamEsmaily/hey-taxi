import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const Map = dynamic(() => import("components/Map"), { ssr: false });
function MapView() {
  return (
    <Box overflow="hidden" height="100vh">
      <Map />
    </Box>
  );
}

export default MapView;
