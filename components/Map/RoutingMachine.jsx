import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap, useMapEvents } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png",
});

const RoutingMachine = ({
  sourceCity,
  destinationCity,
  setOrigin,
  setDestination,
}) => {
  const map = useMap();
  const [data, setData] = useState([]);

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      if (data.length < 2) {
        setData([...data, [lat, lng]]);
        if (data.length < 1) {
          setOrigin([lat, lng]);
        }
        setDestination([lat, lng]);
      }
    },
  });

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(sourceCity?.[0], sourceCity?.[1]),
        L.latLng(destinationCity?.[0], destinationCity?.[1]),
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }],
      },
      show: true,
      showAlternatives: true,
      addWaypoints: true,
      fitSelectedRoutes: true,
    }).addTo(map);

    return () => map?.removeControl(routingControl);
  }, [map, sourceCity, destinationCity]);

  return null;
};

export default RoutingMachine;
