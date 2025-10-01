import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet.heat";
import L from "leaflet";

function HeatmapLayer({ points }: { points: [number, number, number?][] }) {
  const map = useMap();

  if (points.length) {
    const heatLayer = (L as any).heatLayer(points, { radius: 25 });
    heatLayer.addTo(map);
  }

  return null;
}

export default function MyMap() {
  const testPoints: [number, number, number?][] = [
    [50.45, 30.52, 0.8], // Київ
    [49.84, 24.03, 0.9], // Львів
    [46.48, 30.73, 0.7], // Одеса
  ];

  return (
    <MapContainer center={[49, 32]} zoom={6} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <HeatmapLayer points={testPoints} />
    </MapContainer>
  );
}
