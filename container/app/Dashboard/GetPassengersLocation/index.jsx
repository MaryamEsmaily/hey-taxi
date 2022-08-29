import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Box from "@mui/material/Box";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/router";
import RoutingMachine from "./RoutingMachine";

const GetPassengersLocation = () => {
  //
  const { push, query, isReady } = useRouter();
  //
  const [markers, setMarkers] = useState([]);
  //
  const routingMachineRef = useRef();
  const pluginRef = useRef();
  const [map, setMap] = useState(null);
  //

  useEffect(() => {
    if (query && isReady)
      setMarkers([
        {
          lat: query?.sLatitude1,
          lng: query?.sLongitude1,
        },
        {
          lat: query?.sLatitude2,
          lng: query?.sLongitude2,
        },
        {
          lat: query?.sLatitude3,
          lng: query?.sLongitude3,
        },
        {
          lat: query?.dLatitude1,
          lng: query?.dLongitude1,
        },
        {
          lat: query?.dLatitude2,
          lng: query?.dLongitude2,
        },
        {
          lat: query?.dLatitude3,
          lng: query?.dLongitude3,
        },
      ]);
  }, [isReady, query]);
  //
  useEffect(() => {
    if (!map) return;
    const controlContainer = routingMachineRef.current.onAdd(map);
    pluginRef.current.appendChild(controlContainer);
  }, [map]);
  //
  return (
    <>
      <Box
        sx={{
          bgcolor: "#fff",
          width: "100%",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 5,
        }}
      >
        <IconButton onClick={() => push("/profile")}>
          <AccountCircleOutlinedIcon color="warning" />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocalTaxiIcon color="warning" sx={{ fontSize: 20 }} />
          <Typography>هی تاکسی!</Typography>
        </Box>
        <IconButton onClick={() => push("/app/trip-requests")}>
          <ArrowBackIosNewIcon color="warning" variant="h6" />
        </IconButton>
      </Box>

      <Box
        sx={{
          position: "fixed",
          width: "100%",
          height: 220,
          p: 3,
          px: 5,
          backgroundColor: "#fff",
          left: 0,
          bottom: 0,
          zIndex: 9999999,
          borderRadius: "40px 40px 0  0 ",
        }}
      >
        <Typography fontSize={24}>مشخصات سفر</Typography>
        <Stack direction="row" justifyContent="space-evenly">
          <Box>
            <Typography>نام مسافر: {query?.username1}</Typography>
            <Typography>شماره تماس: {query?.phoneNo1}</Typography>
            <Typography> هزینه سفر: {query?.price1}</Typography>
          </Box>
          <Box>
            <Typography>نام مسافر: {query?.username2 || "-"}</Typography>
            <Typography>شماره تماس: {query?.phoneNo2 || "-"}</Typography>
            <Typography> هزینه سفر: {query?.price2 || "-"}</Typography>
          </Box>
          <Box>
            <Typography>نام مسافر: {query?.username3 || "-"}</Typography>
            <Typography>شماره تماس: {query?.phoneNo3 || "-"}</Typography>
            <Typography> هزینه سفر: {query?.price3 || "-"}</Typography>
          </Box>
        </Stack>
        <Box textAlign="end">
          <Button
            color="success"
            onClick={() => {
              push("/app/trip-requests");
            }}
          >
            پایان سفر
          </Button>
        </Box>
      </Box>
      <MapContainer
        center={[35.65500011058058, 51.39948005533141]}
        zoom={7}
        scrollWheelZoom={true}
        whenCreated={setMap}
        style={{ height: "calc(100vh - 70px)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RoutingMachine markers={markers} ref={routingMachineRef} map={map} />
      </MapContainer>
    </>
  );
};

export default GetPassengersLocation;
