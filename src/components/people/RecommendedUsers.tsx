import { Box, CircularProgress, Typography } from "@mui/material";
import RecommendedUserCard from "./RecommendedUserCard";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthProvider";
import { getUserRecommendation } from "@/api/users";

export default function RecommendedUsers() {
  const { user: currentUser } = useAuth();

  const { data: users, isLoading } = useQuery({
    queryKey: ["recommended", currentUser?.id],
    queryFn: getUserRecommendation,
    enabled: !!currentUser?.id,
  });

  return (
    <Box
      sx={{
        border: 1,
        borderBottom: 0,
        borderColor: "divider",
        backgroundColor: "#fff",
        py: 2,
      }}
    >
      <Typography variant="subtitle1" sx={{ px: 2, mb: 2, fontWeight: 600 }}>
        People who you might know
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          pb: 1,
          // hide scrollbar
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
          "&::-webkit-scrollbar": {
            display: "none", // Chrome/Safari
          },
        }}
      >
        {isLoading || !users || users.length === 0 ? (
          <CircularProgress />
        ) : (
          users.map((u) => (
            <Box key={u.id}>
              <RecommendedUserCard user={u} />
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
