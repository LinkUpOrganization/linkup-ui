import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const KYIV_COORDINATES: [number, number] = [50.4501, 30.5234];

function LocationMarker({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
}

export default function LocationModal({
  open,
  userCurrentLocation,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  userCurrentLocation: LocationCoordinates | null;
  onSave: (location: { lat: number; lng: number; address: string }) => void;
}) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState("");
  const mapCenter: [number, number] = userCurrentLocation
    ? [userCurrentLocation.lat, userCurrentLocation.lng]
    : KYIV_COORDINATES;

  const handleSelect = async (lat: number, lng: number) => {
    setLocation({ lat, lng });

    // Reverse geocoding з Nominatim
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      const data = await res.json();
      setAddress(data.display_name || "");
    } catch (err) {
      console.error("Reverse geocoding failed", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Select Location</DialogTitle>
      <DialogContent>
        <Box sx={{ height: 300, mb: 2 }}>
          <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker onSelect={handleSelect} />
          </MapContainer>
        </Box>

        <TextField fullWidth label="Адреса" value={address} onChange={(e) => setAddress(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Скасувати</Button>
        <Button
          variant="contained"
          onClick={() => {
            if (location) {
              onSave({ ...location, address });
            }
            onClose();
          }}
        >
          Зберегти
        </Button>
      </DialogActions>
    </Dialog>
  );
}
