import Header from "@/components/auth/Header";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type PostNotFoundProps = {
  title?: string;
  message?: string;
};

export default function PostNotFound({
  title = "Post not found",
  message = "The post you are looking for does not exist or has been removed.",
}: PostNotFoundProps) {
  const theme = useTheme();
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: theme.palette.background.default }}>
      <Header />
      <Box sx={{ pt: 12, px: { xs: 2, sm: 4 }, pb: 4 }}>
        <Box sx={{ maxWidth: 600, mx: "auto" }}>
          <Card sx={{ textAlign: "center", py: 6 }}>
            <CardContent>
              <Typography variant="h6" color={theme.palette.text.secondary} sx={{ mb: 2 }}>
                {title}
              </Typography>
              <Typography variant="body2" color={theme.palette.text.secondary}>
                {message}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
