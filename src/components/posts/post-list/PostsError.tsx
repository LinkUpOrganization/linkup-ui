import Header from "@/components/auth/Header";
import { Box, Alert } from "@mui/material";

export default function PostsError() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Header />
      <Box sx={{ pt: 12, px: { xs: 2, sm: 4 }, pb: 4 }}>
        <Box sx={{ maxWidth: 600, mx: "auto" }}>
          <Alert severity="error">Failed to load posts. Please try again later.</Alert>
        </Box>
      </Box>
    </Box>
  );
}
