import { Box, Typography } from "@mui/material";
import RecommendedUserCard from "./RecommendedUserCard";
import UsersLoading from "../UsersLoading";

type UserListProps = {
  users?: RecommendedUser[];
  isLoading: boolean;
  isError: boolean;
};

export default function RecommendedUserList({ users, isLoading, isError }: UserListProps) {
  if (isLoading) return <UsersLoading />;
  if (isError) return <Typography>Failed to load users.</Typography>;
  if (!users || !users.length) return <Typography>No users found.</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {users.map((u) => (
        <RecommendedUserCard key={u.user.id} userInfo={u} />
      ))}
    </Box>
  );
}
