import Header from "@/components/auth/Header";
import { Box, Card, CardContent, Typography, Divider, CircularProgress, Alert } from "@mui/material";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { getUserById } from "@/api/users";
import { useQuery } from "@tanstack/react-query";
import useToggleFollow from "@/hooks/useToggleFollow";
import FollowersInfo from "@/components/profile/FollowersInfo";
import ProfileHeader from "@/components/profile/ProfileHeader";
import FollowButton from "@/components/profile/FollowButton";

export const Route = createFileRoute("/users/$userId")({
  component: UserPage,
});

function UserPage() {
  const { userId } = useParams({ from: "/users/$userId" });

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });

  const { handleFollowToggle, isToggleFollowPending, isToggleFollowError, toggleFollowError } = useToggleFollow(user);

  if (isUserLoading)
    return (
      <>
        <Header />
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress />
        </Box>
      </>
    );

  if (user == null) {
    return (
      <>
        <Header />
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <Typography variant="h6" color="text.secondary">
            User not found
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1, mt: 12, px: { xs: 2, sm: 4 } }}>
        <Card sx={{ maxWidth: 600, width: "100%", height: "fit-content" }}>
          {isToggleFollowError && (
            <Alert severity="error">{toggleFollowError?.message ?? "Failed to toggle follow state"}</Alert>
          )}
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: { xs: "center", sm: "start" },
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
                mb: 3,
              }}
            >
              <ProfileHeader user={user} />
              <FollowButton
                user={user}
                handleFollowToggle={handleFollowToggle}
                isToggleFollowPending={isToggleFollowPending}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <FollowersInfo followersCount={user.followersCount} followingCount={user.followingCount} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
