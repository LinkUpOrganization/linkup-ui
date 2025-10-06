import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet.heat";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHeatmapPoints } from "@/api/posts";
import { useMediaQuery, useTheme } from "@mui/material";
import HeatmapLayer from "./HeatmapLayer";

type HeatMapProps = {
  style?: React.CSSProperties;
};

export default function Heatmap({ style }: HeatMapProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [bounds, setBounds] = useState<BoundsType | null>(null);
  const [zoom, setZoom] = useState<number>(3);

  const { data: heatmapPoints } = useQuery({
    queryKey: ["heatmap", bounds, zoom],
    queryFn: () => (bounds ? getHeatmapPoints({ ...bounds, zoom }) : Promise.resolve([])),
    enabled: !!bounds && !!zoom,
  });

  return (
    <MapContainer
      key={isMobile ? "mobile" : "desktop"}
      center={[50, 10]}
      zoom={zoom}
      worldCopyJump={true}
      style={{ outline: "none", ...style }}
      className="no-outline"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <HeatmapLayer
        points={heatmapPoints?.map((p: any) => [p.latitude, p.longitude, p.count])}
        onBoundsChange={setBounds}
        onZoomChange={setZoom}
      />
    </MapContainer>
  );
}
