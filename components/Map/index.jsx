import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import RoutingMachine from "./RoutingMachine";

const Map = ({ setOrigin, setDestination, destination, origin }) => {
  const [map, setMap] = useState(null);

  const routingMachineRef = useRef();
  const pluginRef = useRef();

  useEffect(() => {
    if (!map) return;
    const controlContainer = routingMachineRef.current.onAdd(map);
    pluginRef.current.appendChild(controlContainer);
  }, [map]);

  return (
    <MapContainer
      style={{ height: "100vh" }}
      center={[35.7219, 51.3347]}
      zoom={15}
      scrollWheelZoom={false}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingMachine
        destinationCity={destination}
        sourceCity={origin}
        setOrigin={setOrigin}
        setDestination={setDestination}
        ref={routingMachineRef}
        map={map}
      />
    </MapContainer>
  );
};

export default Map;
