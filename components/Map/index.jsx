import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import RoutingMachine from "./RoutingMachine";

function AddMarker({ saveMarkers, data, setOrigin, setDestination }) {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      if (data.length < 2) {
        L.marker([lat, lng], {
          icon: L.icon({
            iconSize: [25, 41],
            iconAnchor: [10, 41],
            popupAnchor: [2, -40],
            iconUrl:
              "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
            shadowUrl:
              "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png",
          }),
        }).addTo(map);
        saveMarkers([lat, lng]);
        if (data.length < 1) {
          setOrigin([lat, lng]);
        }
        setDestination([lat, lng]);
      }
    },
  });
  return null;
}

const Map = ({ setOrigin, setDestination, destination, origin }) => {
  const [map, setMap] = useState(null);

  const [data, setData] = useState([]);
  const routingMachineRef = useRef();
  const pluginRef = useRef();

  useEffect(() => {
    if (!map) return;
    const controlContainer = routingMachineRef.current.onAdd(map);
    pluginRef.current.appendChild(controlContainer);
  }, [map]);

  const saveMarkers = (newMarkerCoords) => {
    setData([...data, newMarkerCoords]);
  };

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
        destination={destination}
        origin={origin}
        ref={routingMachineRef}
      />
      <AddMarker
        saveMarkers={saveMarkers}
        data={data}
        setOrigin={setOrigin}
        setDestination={setDestination}
      />
    </MapContainer>
  );
};

export default Map;
