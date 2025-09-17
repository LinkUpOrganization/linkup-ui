import { Card, CardContent, Typography } from "@mui/material";

export default function PostNotFound() {
  return (
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
  );
}
