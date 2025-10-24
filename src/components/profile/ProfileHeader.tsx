import VerifiedIcon from "@mui/icons-material/Verified";
import { Box, Typography } from "@mui/material";
import UserAvatar from "../auth/UserAvatar";

export default function ProfileHeader({ user }: { user: User }) {
  return (
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
  );
}
