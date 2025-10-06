import { useMapBounds } from "@/hooks/useMapBounds";
import L from "leaflet";
import { useEffect } from "react";

export default function HeatmapLayer({
  points,
  onBoundsChange,
  onZoomChange,
}: {
  points?: [number, number, number?][];
  onBoundsChange: (bounds: BoundsType) => void;
  onZoomChange: (zoom: number) => void;
}) {
  const map = useMapBounds(onBoundsChange, onZoomChange);

  useEffect(() => {
    if (!points?.length) return;

    const heatLayer = (L as any).heatLayer(points, {
      radius: 15, // size of the heat spot in pixels
      blur: 4, // blur (smaller → sharper spots)
      maxZoom: 18, // zoom level at which the values are maximally detailed
      max: 1.0, // normalization (1.0 = count values interpreted "as is")
      minOpacity: 0.1, // minimum opacity of the heat spot
      gradient: {
        // set of colors for the gradient
        0.0: "red",
        0.5: "lime",
        1.0: "skyblue",
      },
    });
    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [points, map]);

  return null;
}
