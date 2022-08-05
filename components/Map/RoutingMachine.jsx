import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({ destination, origin }) => {
  const instance = L.Routing.control({
    waypoints: [L.latLng(35.7219, 51.3347), L.latLng(35.73, 51.38)],
    // serviceUrl: "http://my-osrm/route/v1",
    lineOptions: {
      styles: [{ color: "#fff200", weight: 5 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
    reverseWaypoints: true,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
