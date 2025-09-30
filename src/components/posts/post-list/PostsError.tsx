import { Box, Alert } from "@mui/material";

export default function PostsError() {
  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <Alert severity="error">Failed to load posts. Please try again later.</Alert>
    </Box>
  );
}
