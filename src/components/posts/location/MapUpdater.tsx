import { useMap } from "react-leaflet";
import { useEffect } from "react";

export default function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}
