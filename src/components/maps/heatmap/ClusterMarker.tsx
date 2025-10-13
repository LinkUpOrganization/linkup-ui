import { Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";

export default function ClusterMarker({ coords }: { coords: { latitude: number; longitude: number } }) {
  const map = useMap();

  useEffect(() => {
    map.setView([coords.latitude, coords.longitude], 5, { animate: true });
  }, [coords, map]);

  return (
    <Marker position={[coords.latitude, coords.longitude]}>
      <Popup>
        Cluster at
        <br />
        Lat: {coords.latitude.toFixed(4)}, Lon: {coords.longitude.toFixed(4)}
      </Popup>
    </Marker>
  );
}
