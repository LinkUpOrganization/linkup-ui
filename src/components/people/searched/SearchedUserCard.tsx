import { Box, Typography } from "@mui/material";
import UserAvatar from "../../auth/UserAvatar";
import { Link } from "@tanstack/react-router";

export default function SearchedUserCard({ user }: { user: SearchedUser }) {
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
      <UserAvatar id={user.id} size={42} displayName={user.displayName} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ lineHeight: 1 }}>
          {user.displayName}
        </Typography>
      </Box>
      <Link to="/users/$userId" params={{ userId: user.id }}>
        <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
          View
        </Typography>
      </Link>
    </Box>
  );
}
