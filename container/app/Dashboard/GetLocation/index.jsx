import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useUserState } from "hook/useUser";
import { useTripRequestsCtx } from "hook/useSocket";
import { useRouter } from "next/router";

function Events({ onClick }) {
  const map = useMapEvents({
    click: (e) => {
      axios
        .get("https://api.neshan.org/v4/reverse", {
          params: {
            ...e.latlng,
          },
          headers: {
            "Api-Key": "service.0b631c6844834fe283ab06a157404729",
          },
        })
        .then((res) => {
          onClick({ ...e, formatted_address: res?.data?.formatted_address });
        });
    },
  });
  return null;
}

const GetDriverLocation = () => {
  //
  const { push } = useRouter();
  //
  const { SendRequest } = useTripRequestsCtx();
  const user = useUserState();
  //
  const [status, setStatus] = useState(0);
  const [markers, setMarkers] = useState([]);
  //
  const handleClick = (location) => {
    if (status === 0) {
      setStatus(1);
      setMarkers([
        {
          ...location.latlng,
          formatted_address: location?.formatted_address,
          type: 1,
        },
      ]);
      return;
    }
  };
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
        <IconButton onClick={() => push("/app/dashboard")}>
          <ArrowBackIosNewIcon color="warning" variant="h6" />
        </IconButton>
      </Box>
      {markers.length ? (
        <Fab
          color="warning"
          sx={{
            position: "fixed",
            right: "10px",
            top: "80px",
            zIndex: 99999999999,
          }}
          onClick={() => {
            setMarkers((prev) => {
              const newArr = JSON.parse(JSON.stringify(prev));
              setStatus(newArr.pop().type - 1);
              return newArr;
            });
          }}
        >
          {markers.length === 1 ? <ClearIcon /> : <ArrowBackIcon />}
        </Fab>
      ) : null}

      <Box
        sx={{
          textAlign: "center",
          position: "fixed",
          width: "100%",
          height: 200,
          p: 3,
          px: 5,
          backgroundColor: "#fff",
          left: 0,
          bottom: 0,
          zIndex: 9999999,
          transform: markers.length ? "translateY(0%)" : "translateY(100%)",
          transition: "330ms",
          borderRadius: "40px 40px 0  0 ",
        }}
      >
        <Typography color="orange" fontSize={24}>
          موقعیت شما:
        </Typography>
        <TextField
          sx={{ "& input": { textAlign: "center" }, mb: 3 }}
          value={markers?.[0] ? markers?.[0]?.formatted_address : ""}
        />
        <Button
          size="small"
          onClick={() => {
            SendRequest([markers?.lat, markers?.lng, user?.id]);
            push("/app/trip-requests");
          }}
        >
          تایید
        </Button>
      </Box>
      <MapContainer
        center={[35.65500011058058, 51.39948005533141]}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: "calc(100vh - 70px)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Events onClick={handleClick} />
        {markers.map((marker, i) => {
          return (
            <Marker key={i} position={[marker.lat, marker.lng]}>
              <Popup>{marker.lat + " " + marker.lng}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
};

export default GetDriverLocation;
