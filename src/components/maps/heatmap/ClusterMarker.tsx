import { Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import { defaultMarkerIcon } from "@/utils/defaultMarkerIcon";

export default function ClusterMarker({ cluster }: { cluster: ClusterType }) {
  const map = useMap();

  useEffect(() => {
    map.setView([cluster.latitude, cluster.longitude], 5, { animate: true });
  }, [cluster, map]);

  return (
    <Marker position={[cluster.latitude, cluster.longitude]} icon={defaultMarkerIcon}>
      <Popup>
        Cluster at
        <br />
        Lat: {cluster.latitude.toFixed(4)}, Lon: {cluster.longitude.toFixed(4)}
      </Popup>
    </Marker>
  );
}
