import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import { useRouter } from "next/router";

function DriverDashboard() {
  const { push } = useRouter();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("مشکلی در خواندن لوکیشن پیش آمده است");
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        width="100%"
        bgcolor="#fefefe"
        maxWidth={600}
        borderRadius={3}
        overflow="hidden"
        py={5}
        px={10}
        textAlign="center"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={() => push("/profile")}>
            <AccountCircleOutlinedIcon color="warning" />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalTaxiIcon color="warning" sx={{ fontSize: 20 }} />
            <Typography>هی تاکسی!</Typography>
          </Box>
        </Box>
        <Image
          src="/img/waiting.jpg"
          width="450px"
          height="350px"
          alt="waiting img"
        />
        <Typography mb={2} fontSize={20}>
          برای سفر آماده اید؟
        </Typography>
        <Typography mb={2} fontSize={20}>
          {(lat, lng, status)}
        </Typography>
        <Button
          type="submit"
          fullWidth
          size="large"
          sx={{ borderRadius: "50px" }}
          color="neutral"
        >
          آماده ام
        </Button>
      </Box>
    </Box>
  );
}

export default DriverDashboard;
