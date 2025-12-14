import { CircleMarker } from "react-leaflet";
import { useMapBounds } from "@/hooks/useMapBounds";

type PointDto = {
  latitude: number;
  longitude: number;
  count: number;
};

export default function WeightedPointsLayer({
  points,
  onBoundsChange,
  onZoomChange,
}: {
  points: PointDto[];
  onBoundsChange: (bounds: BoundsType) => void;
  onZoomChange: (zoom: number) => void;
}) {
  useMapBounds(onBoundsChange, onZoomChange);

  const maxCount = Math.max(...points.map((p) => p.count), 1);

  return (
    <>
      {points.map((p, i) => {
        const intensity = p.count / maxCount;

        const baseRadius = 10 + Math.sqrt(intensity) * 25;

        return (
          <div key={i}>
            <CircleMarker
              center={[p.latitude, p.longitude]}
              radius={baseRadius * 1.6}
              pathOptions={{
                fillColor: "#ff0000",
                fillOpacity: 0.08,
                stroke: false,
              }}
            />

            <CircleMarker
              center={[p.latitude, p.longitude]}
              radius={baseRadius * 1.1}
              pathOptions={{
                fillColor: "#ff4500",
                fillOpacity: 0.18,
                stroke: false,
              }}
            />

            <CircleMarker
              center={[p.latitude, p.longitude]}
              radius={baseRadius * 0.6}
              pathOptions={{
                fillColor: "#ffff00",
                fillOpacity: 0.5,
                stroke: false,
              }}
            />
          </div>
        );
      })}
    </>
  );
}
