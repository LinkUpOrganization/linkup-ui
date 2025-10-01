import { Route } from "@/routes/locations";
import { useCallback } from "react";

export function usePostLocation() {
  const navigate = Route.useNavigate();
  const { filter, latitude, longitude, radius } = Route.useSearch();

  const setFilter = useCallback(
    (newFilter: PostFilterType, coordinates?: LocationCoordinates, newRadius?: number) => {
      navigate({
        search: (prev) => ({
          ...prev,
          filter: newFilter,
          latitude: coordinates?.latitude,
          longitude: coordinates?.longitude,
          radius: newRadius ?? prev.radius,
        }),
        replace: true,
      });
    },
    [navigate]
  );

  const handleSelectLocation = useCallback(
    async (coordinates: LocationCoordinates) => {
      setFilter(filter, { latitude: coordinates.latitude, longitude: coordinates.longitude }, radius);
    },
    [filter, radius, setFilter]
  );

  const radiusOptions: number[] = [0.1, 1, 5, 10, 20];
  const radiusValue: number = radius ?? radiusOptions[0];

  const handleChangeRadius = useCallback(() => {
    const currentIndex = radiusOptions.indexOf(radius ?? radiusOptions[0]);
    const nextIndex = (currentIndex + 1) % radiusOptions.length;
    const newRadius = radiusOptions[nextIndex];
    setFilter(filter, latitude && longitude ? { latitude, longitude } : undefined, newRadius);
  }, [radius, filter, latitude, longitude, setFilter]);

  return {
    filter,
    latitude,
    longitude,
    radius,
    radiusOptions,
    radiusValue,
    setFilter,
    handleSelectLocation,
    handleChangeRadius,
  };
}
