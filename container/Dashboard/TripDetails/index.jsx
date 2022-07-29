import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PlaceIcon from "@mui/icons-material/Place";
import HomeIcon from "@mui/icons-material/Home";
//
function TripDetails() {
  return (
    <Box p={4} bgcolor="white">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AccountCircleIcon />
        <Typography>هی تاکسی!</Typography>
      </Box>
      <Box
        mt={5}
        sx={{
          textAlign: "center",
        }}
      >
        <Typography fontSize="24px">مشخصات مسیر</Typography>
        <TextField
          placeholder="مبدا"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HomeIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          placeholder="مقصد"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PlaceIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}

export default TripDetails;
