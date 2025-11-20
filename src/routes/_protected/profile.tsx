import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/auth/Header";
import { Box, Tab, Tabs } from "@mui/material";
import { useProfilePage } from "@/hooks/useProfilePage";
import UserLoadingState from "@/components/user/UserLoadingState";
import CurrentUserProfileCard from "@/components/profile/CurrentUserProfileCard";
import { useEffect, useRef, useState } from "react";
import UserPostsSection from "@/components/profile/UserPostsSection";
import UserPostLocations from "@/components/maps/routemap/UserPostLocations";

export const Route = createFileRoute("/_protected/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, handleVerifyEmail, handleLogout, isPending, isError, error } = useProfilePage();
  const [activeTab, setActiveTab] = useState<"posts" | "map">("posts");
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeTab === "map" && mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeTab]);

  if (!user) return <UserLoadingState />;

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
        <CurrentUserProfileCard
          user={user}
          handleLogout={handleLogout}
          handleVerifyEmail={handleVerifyEmail}
          isError={isError}
          error={error}
          isPending={isPending}
        />

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
