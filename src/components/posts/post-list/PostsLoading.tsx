import Header from "@/components/auth/Header";
import { Box, Card, CardContent, Skeleton } from "@mui/material";

type PostsLoadingProps = {
  cardNumber?: number;
};

export default function PostsLoading({ cardNumber = 3 }: PostsLoadingProps) {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Header />
      <Box sx={{ pt: 12, px: { xs: 2, sm: 4 }, pb: 4 }}>
        <Box sx={{ maxWidth: 600, mx: "auto" }}>
          {Array.from({ length: cardNumber }).map((_, index) => (
            <Card key={index} sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="30%" />
                    <Skeleton variant="text" width="20%" />
                  </Box>
                </Box>
                <Skeleton variant="text" width="80%" sx={{ mb: 1 }} />
                <Skeleton variant="text" width="60%" sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1 }} />
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
