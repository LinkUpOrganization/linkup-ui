import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import { type LatLngExpression } from "leaflet";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUserPostLocations } from "@/api/posts";
import { useMemo } from "react";
import { DEFAULT_ZOOM } from "@/constants/posts";
import { defaultMarkerIcon } from "@/utils/defaultMarkerIcon";

type UserPostLocationsProps = {
  userId: string;
};

export default function UserPostLocations({ userId }: UserPostLocationsProps) {
  const { data: postLocations } = useQuery({
    queryKey: ["user-post-locations", userId],
    queryFn: async () => getUserPostLocations(userId),
    enabled: !!userId,
  });

  const positions = useMemo<[number, number][]>(() => {
    if (!postLocations) return [];
    return postLocations.map((p) => [p.latitude, p.longitude]);
  }, [postLocations]);

  if (!positions.length)
    return <Typography sx={{ mt: 4, color: "text.secondary" }}>User doesn't have posts with locations yet</Typography>;

  const center: LatLngExpression = positions[0];

  return (
    <MapContainer center={center} zoom={DEFAULT_ZOOM} style={{ height: "100%", width: "100%" }} worldCopyJump={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline
        positions={positions as LatLngExpression[]}
        pathOptions={{ color: "green", weight: 3, dashArray: "5, 8" }}
      />

      {positions.map((pos, i) => (
        <Marker key={i} position={pos as LatLngExpression} icon={defaultMarkerIcon}>
          <Popup>Post #{i + 1}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
