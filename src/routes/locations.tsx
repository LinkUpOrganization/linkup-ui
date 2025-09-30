import Header from "@/components/auth/Header";
import Map from "@/components/posts/location/Map";
import RadiusPickerButton from "@/components/posts/location/RadiusPickerButton";
import PostCard from "@/components/posts/post-list/PostCard";
import PostsError from "@/components/posts/post-list/PostsError";
import PostsLoading from "@/components/posts/post-list/PostsLoading";
import PostsNotFound from "@/components/posts/post-list/PostsNotFound";
import { KYIV_COORDINATES } from "@/constants/posts";
import { usePostList } from "@/hooks/usePostList";
import { useToggleLike } from "@/hooks/useToggleLike";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useInView } from "react-intersection-observer";

export const Route = createFileRoute("/locations")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      filter: (search.filter as PostFilterType) ?? "recent",
      latitude: search.latitude ? Number(search.latitude) : undefined,
      longitude: search.longitude ? Number(search.longitude) : undefined,
      radius: search.radius ? Number(search.radius) : undefined,
    };
  },
  component: LocationsPage,
});

function LocationsPage() {
  const navigate = Route.useNavigate();
  const { filter, latitude, longitude, radius } = Route.useSearch();
  const mapCenter: [number, number] = latitude && longitude ? [latitude, longitude] : KYIV_COORDINATES;

  const setFilter = (newFilter: PostFilterType, coordinates?: LocationCoordinates, newRadius?: number) => {
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
  };

  const handleSelectLocation = async (coordinates: LocationCoordinates) => {
    setFilter(filter, { latitude: coordinates.latitude, longitude: coordinates.longitude }, radius);
  };

  const radiusOptions = [0.1, 1, 5, 10, 20];
  const radiusValue = radius || radiusOptions[0];

  const handleChangeRadius = () => {
    const currentIndex = radiusOptions.indexOf(radius ?? radiusOptions[0]);
    const nextIndex = (currentIndex + 1) % radiusOptions.length;
    const newRadius = radiusOptions[nextIndex];
    setFilter(filter, latitude && longitude ? { latitude, longitude } : undefined, newRadius);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = usePostList(
    filter,
    mapCenter[0],
    mapCenter[1],
    radius
  );
  const { handleLike } = useToggleLike(filter, mapCenter[0], mapCenter[1], radius);

  const posts = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);

  const { ref: loadMoreRef } = useInView({
    threshold: 0,
    rootMargin: "100px",
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });

  if (isError) return <PostsError />;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Header currentPage="Locations" />

      <Box sx={{ position: "relative" }}>
        <Map mapCenter={mapCenter} handleSelect={handleSelectLocation} boxStyles={{ height: 250 }} />
        <RadiusPickerButton radius={radiusValue} handleChangeRadius={handleChangeRadius} />
      </Box>

      <Tabs
        sx={{ mt: 2 }}
        value={filter}
        onChange={(_, newValue) =>
          setFilter(newValue, latitude && longitude ? { latitude, longitude } : undefined, radius)
        }
        centered
      >
        <Tab label="Recent" value="recent" />
        <Tab label="Top" value="top" />
        <Tab label="Following" value="following" />
      </Tabs>

      <Box sx={{ pt: 4, px: { xs: 2, sm: 4 }, pb: 4 }}>
        <Box sx={{ maxWidth: 600, mx: "auto" }}>
          {isLoading ? (
            <PostsLoading />
          ) : isError ? (
            <PostsError />
          ) : posts.length === 0 ? (
            <PostsNotFound />
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} handleLike={handleLike} />)
          )}

          {/* Sentinel for IntersectionObserver */}
          {hasNextPage && <div ref={loadMoreRef} style={{ height: 1 }} />}

          {isFetchingNextPage && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
              Loading more posts...
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
