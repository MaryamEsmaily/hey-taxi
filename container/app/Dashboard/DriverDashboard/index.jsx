import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import { useRouter } from "next/router";
import { useTripRequestsCtx } from "hook/useSocket";
import axios from "axios";
import { useUserState } from "hook/useUser";

function DriverDashboard() {
  //
  const { SendRequest } = useTripRequestsCtx();
  //
  const { push } = useRouter();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  //
  const user = useUserState();
  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus({ label: "خطای مرورگر", value: 1 });
    } else {
      setStatus({ label: "در حال دریافت موقعیت مکانی شما...", value: 2 });
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          axios
            .get("https://api.neshan.org/v4/reverse", {
              params: {
                ...{
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
              },
              headers: {
                "Api-Key": "service.7f87d05ab66c440098e036b97f3dd1b1",
              },
            })
            .then((res) => {
              setDriverLocation(res?.data?.formatted_address);
            });
          setLat(position.coords.latitude?.toString());
          setLng(position.coords.longitude?.toString());
        },
        () => {
          setStatus({ label: "مشکلی در دریافت لوکیشن پیش آمده است", value: 3 });
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
          src="/img/taxi.jpg"
          width="450px"
          height="350px"
          alt="waiting img"
        />
        <Typography mb={2} fontSize={20}>
          برای سفر آماده اید؟
        </Typography>
        <Typography mb={2} fontSize={20}>
          {driverLocation ? `موقعیت شما: ${driverLocation} ` : status?.label}
        </Typography>
        {status?.value === 1 || status?.value === 3 ? (
          <Button
            onClick={() => {
              push("/app/get-location");
            }}
            fullWidth
            size="large"
            sx={{ borderRadius: "50px" }}
          >
            انتخاب موقعیت روی نقشه
          </Button>
        ) : (
          <Button
            onClick={() => {
              SendRequest([lat, lng, user?.id]);
              push({
                pathname: "/app/trip-requests",
                query: { lat, lng, driverId: user?.id },
              });
            }}
            fullWidth
            size="large"
            sx={{ borderRadius: "50px" }}
            disabled={!lat && !lng}
          >
            آماده ام
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default DriverDashboard;
