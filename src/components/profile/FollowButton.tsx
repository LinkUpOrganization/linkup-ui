import { Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

type FollowButtonProps = {
  user: UserProfile;
  handleFollowToggle: VoidFunction;
  isToggleFollowPending: boolean;
};

export default function FollowButton({ user, handleFollowToggle, isToggleFollowPending }: FollowButtonProps) {
  return (
    <Button
      variant={user.isFollowing ? "outlined" : "contained"}
      startIcon={user.isFollowing ? <PersonRemoveIcon /> : <PersonAddIcon />}
      onClick={handleFollowToggle}
      disabled={isToggleFollowPending}
      sx={{
        minWidth: 120,
        borderRadius: 2,
        textTransform: "none",
        fontWeight: "bold",
      }}
    >
      {user.isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
