import { Box, Typography } from "@mui/material";

type FollowersInfoProps = {
  followersCount?: number;
  followingCount?: number;
};

export default function FollowersInfo({ followersCount, followingCount }: FollowersInfoProps) {
  return (
    <Box sx={{ display: "flex", gap: 3, justifyContent: "center", mb: 2 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold">
          {followersCount ?? 0}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Followers
        </Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold">
          {followingCount ?? 0}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Following
        </Typography>
      </Box>
    </Box>
  );
}
