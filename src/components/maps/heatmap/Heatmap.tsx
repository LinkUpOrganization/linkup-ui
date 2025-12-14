import { MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery, useTheme } from "@mui/material";

import { getHeatmapPoints } from "@/api/posts";
import ClusterMarker from "./ClusterMarker";
import WeightedPointsLayer from "./WeightedPointsLayer";

import {
  HEATMAP_DEFAULT_COORDINATES_DESKTOP,
  HEATMAP_DEFAULT_COORDINATES_MOBILE,
  HEATMAP_ZOOM,
} from "@/constants/posts";

type HeatMapProps = {
  style?: React.CSSProperties;
  selectedCluster: ClusterType | null;
};

export default function Heatmap({ style, selectedCluster }: HeatMapProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [bounds, setBounds] = useState<BoundsType | null>(null);
  const [zoom, setZoom] = useState<number>(HEATMAP_ZOOM);

  const { data: points = [] } = useQuery({
    queryKey: ["weighted-points", bounds, zoom],
    queryFn: () => (bounds ? getHeatmapPoints({ ...bounds, zoom }) : Promise.resolve([])),
    enabled: !!bounds,
  });

  return (
    <MapContainer
      key={isMobile ? "mobile" : "desktop"}
      center={isMobile ? HEATMAP_DEFAULT_COORDINATES_MOBILE : HEATMAP_DEFAULT_COORDINATES_DESKTOP}
      zoom={zoom}
      worldCopyJump
      style={{ outline: "none", ...style }}
      className="no-outline"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      />

      <WeightedPointsLayer points={points} onBoundsChange={setBounds} onZoomChange={setZoom} />

      {selectedCluster && <ClusterMarker cluster={selectedCluster} />}
    </MapContainer>
  );
}
