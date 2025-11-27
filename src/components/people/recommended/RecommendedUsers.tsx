import { getUserRecommendation } from "@/api/users";
import { useQuery } from "@tanstack/react-query";
import RecommendedUserList from "./RecommendedUserList";
import { Box, Typography } from "@mui/material";

export default function RecommendedUsers() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", "recommended"],
    queryFn: getUserRecommendation,
  });

  return (
    <Box>
      <Typography fontWeight="bold" color="textSecondary" mb={1.5} ml={1}>
        Follow suggestions
      </Typography>
      <RecommendedUserList users={users} isLoading={isLoading} isError={isError} />
    </Box>
  );
}
