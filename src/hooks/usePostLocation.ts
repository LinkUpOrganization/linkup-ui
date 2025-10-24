import { Route } from "@/routes/locations";
import { useCallback } from "react";

export function usePostLocation() {
  const navigate = Route.useNavigate();
  const { sort, latitude, longitude, radius } = Route.useSearch();

  const setFilter = useCallback(
    (newFilter: PostSortType, coordinates?: LocationCoordinates, newRadius?: number) => {
      navigate({
        search: (prev) => ({
          ...prev,
          sort: newFilter,
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
      setFilter(sort, { latitude: coordinates.latitude, longitude: coordinates.longitude }, radius);
    },
    [sort, radius, setFilter]
  );

  const radiusOptions: number[] = [0.1, 1, 5, 10, 20];
  const radiusValue: number = radius ?? radiusOptions[4];

  const handleChangeRadius = useCallback(() => {
    const currentIndex = radiusOptions.indexOf(radius ?? radiusOptions[0]);
    const nextIndex = (currentIndex + 1) % radiusOptions.length;
    const newRadius = radiusOptions[nextIndex];
    setFilter(sort, latitude && longitude ? { latitude, longitude } : undefined, newRadius);
  }, [radius, sort, latitude, longitude, setFilter]);

  return {
    sort,
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
