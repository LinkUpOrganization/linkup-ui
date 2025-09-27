import Header from "@/components/auth/Header";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function PostsNotFound() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Header />
      <Box sx={{ pt: 12, px: { xs: 2, sm: 4 }, pb: 4 }}>
        <Box sx={{ maxWidth: 600, mx: "auto" }}>
          <Card sx={{ textAlign: "center", py: 6 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No posts yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Be the first to share something amazing!
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
