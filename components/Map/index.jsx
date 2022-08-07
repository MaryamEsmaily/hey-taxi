import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import RoutingMachine from "./RoutingMachine";

function Events({ onClick }) {
  const map = useMapEvents({
    click: (e) => {
      onClick(e);
    },
  });
  return null;
}

const MyMap = ({ setMarkers, markers }) => {
  const [map, setMap] = useState(null);
  const [status, setStatus] = useState(0);
  //
  const handleClick = (location) => {
    if (status === 0) {
      setStatus(1);
      setMarkers([
        {
          ...location.latlng,
          type: 1,
        },
      ]);
      return;
    }
    if (status === 1) {
      setStatus(2);
      setMarkers((prev) => {
        return [
          ...prev,
          {
            ...location.latlng,
            type: 2,
          },
        ];
      });
      return;
    }
  };
  //

  const routingMachineRef = useRef();
  const pluginRef = useRef();

  useEffect(() => {
    if (!map) return;
    const controlContainer = routingMachineRef.current.onAdd(map);
    pluginRef.current.appendChild(controlContainer);
  }, [map]);
  //

  return (
    <>
      {markers?.length ? (
        <Fab
          color="warning"
          sx={{
            position: "fixed",
            left: "10px",
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
          {markers?.length === 1 ? <ClearIcon /> : <ArrowBackIcon />}
        </Fab>
      ) : null}

      <MapContainer
        center={[35.65500011058058, 51.39948005533141]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100vh" }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Events onClick={handleClick} />
        <RoutingMachine markers={markers} ref={routingMachineRef} map={map} />
      </MapContainer>
    </>
  );
};

export default MyMap;
