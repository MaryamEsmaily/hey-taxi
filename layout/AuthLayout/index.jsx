import { Box } from "@mui/material";
import * as React from "react";

function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
}

export default AuthLayout;
