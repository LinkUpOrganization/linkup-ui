import { Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type LocationMarkerProps = {
  onSelect: (coordinates: LocationCoordinates) => Promise<void>;
  position?: [number, number];
};

export default function LocationMarker({ onSelect, position }: LocationMarkerProps) {
  useMapEvents({
    click(e) {
      const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
      onSelect({ latitude: newPos[0], longitude: newPos[1] });
    },
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
}
