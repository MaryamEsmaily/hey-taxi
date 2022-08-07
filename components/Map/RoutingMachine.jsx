import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

const RoutingMachine = ({ markers }) => {
  const map = useMap();
  const [waypoints, setWaypoints] = useState();

  useEffect(() => {
    setWaypoints(markers);
  }, [markers]);

  useEffect(() => {
    if (!map) return;
    const routingControl = L.Routing.control({
      waypoints,
      lineOptions: {
        styles: [{ color: "#fff200", weight: 5 }],
      },
      show: false,
      showAlternatives: false,
      addWaypoints: true,
      fitSelectedRoutes: false,
      draggableWaypoints: true,
    }).addTo(map);
    return () => map?.removeControl(routingControl);
  }, [map, waypoints]);

  return null;
};

export default RoutingMachine;
