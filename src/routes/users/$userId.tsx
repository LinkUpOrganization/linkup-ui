import Header from "@/components/auth/Header";
import { Box, Tabs, Tab } from "@mui/material";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/api/users";
import UserNotFoundState from "@/components/user/UserNotFoundState";
import UserLoadingState from "@/components/user/UserLoadingState";
import UserProfileCard from "@/components/user/UserProfileCard";
import UserPostsSection from "@/components/profile/UserPostsSection";
import UserPostLocations from "@/components/maps/routemap/UserPostLocations";

export const Route = createFileRoute("/users/$userId")({
  component: UserPage,
});

function UserPage() {
  const { userId } = useParams({ from: "/users/$userId" });
  const [activeTab, setActiveTab] = useState<"posts" | "map">("posts");
  const mapRef = useRef<HTMLDivElement | null>(null);

  const { data: user, isLoading } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (activeTab === "map" && mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeTab]);

  if (isLoading) return <UserLoadingState />;
  if (!user) return <UserNotFoundState />;

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
          mt: 4,
        }}
      >
        <UserProfileCard user={user} />

        <Box
          sx={{
            position: "sticky",
            top: "env(safe-area-inset-top, 0px)",
            zIndex: 20,
            background: "background.paper",
          }}
        >
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} centered variant="fullWidth">
            <Tab label="Posts" value="posts" />
            <Tab label="Route" value="map" />
          </Tabs>
        </Box>

        {activeTab === "posts" && <UserPostsSection userId={user.id} />}
        {activeTab === "map" && (
          <Box
            ref={mapRef}
            sx={{
              height: "calc(100vh - 200px)",
              width: "100%",
              mt: 1,
              scrollMarginTop: "calc(env(safe-area-inset-top, 0px) + 72px)",
            }}
          >
            <UserPostLocations userId={user.id} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
