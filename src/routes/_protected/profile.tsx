import Header from "@/components/auth/Header";
import UserAvatar from "@/components/auth/UserAvatar";
import { useAuth } from "@/contexts/AuthProvider";
import { Alert, Box, Button, Card, CardContent, CircularProgress, Divider, Typography } from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import VerifiedIcon from "@mui/icons-material/Verified";
import { ROUTES } from "@/constants/routes";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { extractApiErrorMessage } from "@/utils/extractErrorMessage";

export const Route = createFileRoute("/_protected/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, setToken } = useAuth();
  const navigate = useNavigate();

  const handleVerifyEmail = () => {
    navigate({ to: ROUTES.VERIFY_EMAIL });
  };

  const {
    mutate: handleLogout,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setToken(null);
      navigate({ to: "/" });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  if (user == null)
    return (
      <>
        <Header />
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress />
        </Box>
      </>
    );

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1, mt: 12, px: { xs: 2, sm: 4 } }}>
        <Card sx={{ maxWidth: 600, width: "100%", height: "fit-content" }}>
          <CardContent>
            {!user.isVerified && (
              <Alert
                severity="warning"
                sx={{
                  mb: 3,
                  "& .MuiAlert-action": {
                    padding: 0,
                  },
                }}
                action={
                  <Button color="inherit" size="small" onClick={handleVerifyEmail} sx={{ fontWeight: "bold" }}>
                    Verify
                  </Button>
                }
              >
                Verify your email to access all features of our app.
              </Alert>
            )}
            {isError && (
              <Alert icon={<ErrorOutlineIcon fontSize="inherit" />} sx={{ mb: 2 }} severity="error">
                {extractApiErrorMessage(error, "Failed to logout. Pleasy, try again later")}
              </Alert>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: { xs: "center", sm: "start" },
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                }}
              >
                <UserAvatar id={user.id} displayName={user.displayName} size={64} />
                <Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h6">{user.displayName}</Typography>
                    {user.isVerified && <VerifiedIcon color="primary" />}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>

              <Button variant="contained" disabled={isPending} onClick={() => handleLogout()}>
                Log out
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", gap: 3, justifyContent: "center", mb: 2 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight="bold">
                  {user.followersCount ?? 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Followers
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight="bold">
                  {user.followingCount ?? 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Following
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
