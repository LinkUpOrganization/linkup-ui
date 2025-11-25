import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import UserAvatar from "../auth/UserAvatar";
import { useMutation } from "@tanstack/react-query";
import { toggleFollow } from "@/api/users";
import { Link } from "@tanstack/react-router";

export default function RecommendedUserCard({ user }: { user: RecommendedUser }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    mutate({ followeeId: user.id, isFollowed: isFollowing });
    setIsFollowing((prev) => !prev);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: toggleFollow,
  });

  return (
    <Box
      sx={{
        minWidth: 100,
        maxWidth: 100,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Link to={`/users/$userId`} params={{ userId: user.id }}>
        <UserAvatar id={user.id} size={56} displayName={user.displayName} />
      </Link>

      <Typography
        variant="caption"
        sx={{
          mt: 1,
          mb: 1,
          fontWeight: 600,
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {user.displayName}
      </Typography>

      <Button
        variant={isFollowing ? "outlined" : "contained"}
        size="small"
        onClick={handleFollow}
        disabled={isPending}
        sx={{
          textTransform: "none",
          borderRadius: 4,
          px: 2,
          minWidth: "auto",
          fontSize: "0.7rem",
          lineHeight: 1.2,
          height: 26,
        }}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </Box>
  );
}
