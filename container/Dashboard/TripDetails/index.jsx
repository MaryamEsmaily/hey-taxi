import {
  Box,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import SquareIcon from "@mui/icons-material/Square";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
//
function TripDetails() {
  return (
    <Box pt={5} px={6} sx={{ bgcolor: "background.paper" }} height="100%">
      <Box
        mb={8}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton>
          <AccountCircleOutlinedIcon color="warning" />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocalTaxiIcon color="warning" sx={{ fontSize: 20 }} />
          <Typography>هی تاکسی!</Typography>
        </Box>
      </Box>

      <Typography
        fontSize="24px"
        sx={{
          textAlign: "center",
        }}
        mb={3}
      >
        مشخصات مسیر
      </Typography>
      <Box
        mb={8}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box px={2}>
          <TextField
            sx={{ mb: 2 }}
            placeholder="مبدا"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeOutlinedIcon color="warning" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            placeholder="مقصد"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PlaceOutlinedIcon color="warning" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CircleIcon color="warning" sx={{ fontSize: 8 }} />
          <Divider
            orientation="vertical"
            sx={{ height: 45, borderColor: "#ffc73f" }}
            variant="middle"
          />
          <SquareIcon color="warning" sx={{ fontSize: 8 }} />
        </Box>
      </Box>
      <Typography
        fontSize="24px"
        my={3}
        sx={{
          textAlign: "center",
        }}
      >
        تعداد نفرات
      </Typography>
      <TextField
        type="number"
        defaultValue={1}
        InputProps={{
          inputProps: { min: 1, max: 3 },
          startAdornment: (
            <InputAdornment position="start">
              <PeopleAltOutlinedIcon color="warning" />
            </InputAdornment>
          ),
        }}
        sx={{
          pl: 2,
          pr: 3,
          mb: 10,
          textAlign: "center",
          "*::-webkit-inner-spin-button": {
            opacity: 1,
          },
          "*::-webkit-outer-spin-button": {
            opacity: 1,
          },
          "& input": {
            textAlign: "center",
          },
        }}
      />
      <Box pl={2} pr={3}>
        <Button
          type="submit"
          fullWidth
          sx={{ borderRadius: "50px" }}
          color="neutral"
        >
          ثبت درخواست
        </Button>
        <Button
          fullWidth
          sx={{ borderRadius: "50px", mt: 1 }}
          color="neutral"
          variant="text"
        >
          لغو
        </Button>
      </Box>
    </Box>
  );
}

export default TripDetails;
