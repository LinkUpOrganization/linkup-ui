import { Box, Typography } from "@mui/material";
import SearchedUserCard from "./SearchedUserCard";
import UsersLoading from "../UsersLoading";

type UserListProps = {
  users?: SearchedUser[];
  isLoading: boolean;
  isError: boolean;
};

export default function SearchedUserList({ users, isLoading, isError }: UserListProps) {
  if (isLoading) return <UsersLoading cardCount={5} />;
  if (isError) return <Typography>Failed to load users.</Typography>;
  if (!users || !users.length) return <Typography>No users found.</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {users.map((u) => (
        <SearchedUserCard key={u.id} user={u} />
      ))}
    </Box>
  );
}
