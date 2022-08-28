import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";

const DriverMap = () => {
  const [status, setStatus] = useState(0);
  const [markers, setMarkers] = useState([]);
  //
  //

  return (
    <>
      {markers.length ? (
        <Fab
          color="primary"
          sx={{
            position: "fixed",
            right: "10px",
            top: "10px",
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
          position: "fixed",
          width: "100%",
          p: 3,
          backgroundColor: "#fff",
          left: 0,
          bottom: 0,
          zIndex: 9999999,
          transform: markers.length ? "translateY(0%)" : "translateY(100%)",
          transition: "330ms",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="FROM"
              value={markers?.[0] ? markers?.[0]?.formatted_address : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="TO"
              value={markers?.[1] ? markers?.[1]?.formatted_address : ""}
            />
          </Grid>
        </Grid>
      </Box>
      <MapContainer
        center={[35.65500011058058, 51.39948005533141]}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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

export default DriverMap;
