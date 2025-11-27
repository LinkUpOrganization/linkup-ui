import { Box, Typography, Button } from "@mui/material";
import UserAvatar from "../../auth/UserAvatar";
import { Link } from "@tanstack/react-router";
import { useFollowUser } from "@/hooks/useFollowUser";
import { useState } from "react";

export default function RecommendedUserCard({ userInfo }: { userInfo: RecommendedUser }) {
  const { toggleFollowMutation } = useFollowUser();
  const [followed, setFollowed] = useState(false);

  const handleClick = () => {
    toggleFollowMutation.mutate(
      { followeeId: userInfo.user.id, isFollowed: !followed },
      {
        onSuccess: () => {
          setFollowed(!followed);
        },
      }
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 2,
        py: 1.5,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Link to="/users/$userId" params={{ userId: userInfo.user.id }}>
        <UserAvatar id={userInfo.user.id} size={42} displayName={userInfo.user.displayName} />
      </Link>

      <Box sx={{ flexGrow: 1 }}>
        <Link to="/users/$userId" params={{ userId: userInfo.user.id }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ lineHeight: 1 }}>
            {userInfo.user.displayName}
          </Typography>
        </Link>

        <Typography variant="body2" color="text.secondary" noWrap>
          {userInfo.followersCount
            ? `${userInfo.followersCount} users following`
            : userInfo.sameLocationsCount
              ? `Has ${userInfo.sameLocationsCount} shared locations`
              : ""}
        </Typography>
      </Box>

      <Button
        variant={followed ? "outlined" : "contained"}
        size="small"
        disabled={toggleFollowMutation.isPending}
        onClick={handleClick}
      >
        {followed ? "Followed" : "Follow"}
      </Button>
    </Box>
  );
}
