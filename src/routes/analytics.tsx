import { getPostClusters } from "@/api/posts";
import Header from "@/components/auth/Header";
import Heatmap from "@/components/maps/heatmap/Heatmap";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/analytics")({
  component: Analytics,
});

function Analytics() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { data: clusters, isLoading } = useQuery({
    queryKey: ["clusters"],
    queryFn: getPostClusters,
  });

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header currentPage="Analytics" />

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Heatmap
          style={{
            height: isMobile ? "300px" : "calc(100vh - 65px)",
            width: isMobile ? "100%" : "60%",
            position: isMobile ? "relative" : "sticky",
            top: isMobile ? 0 : "65px",
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            mt: 2,
            maxWidth: 800,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Clusters of Posts
          </Typography>

          <List sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {isLoading ? (
              <CircularProgress />
            ) : !clusters || clusters.length === 0 ? (
              <Typography>No cluster data available.</Typography>
            ) : (
              clusters.map((cluster: any) => (
                <Paper key={cluster.id} sx={{ mb: 2, p: 2, minWidth: "300px" }}>
                  <ListItem alignItems="flex-start" disableGutters>
                    <ListItemText
                      primary={`${cluster.name} (${cluster.count} posts)`}
                      secondary={cluster.description}
                    />
                  </ListItem>
                </Paper>
              ))
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );
}
