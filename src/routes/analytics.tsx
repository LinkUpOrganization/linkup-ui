import Header from "@/components/auth/Header";
import Heatmap from "@/components/maps/heatmap/Heatmap";
import { Box, Typography, Paper, List, ListItem, ListItemText, useTheme, useMediaQuery } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

const mockClusters = [
  { id: 1, title: "Cluster 1: Tech Posts", count: 25, description: "Posts about technology and gadgets." },
  { id: 2, title: "Cluster 2: Travel", count: 15, description: "Posts about travel experiences and locations." },
  { id: 3, title: "Cluster 3: Food", count: 30, description: "Posts related to food recipes and restaurants." },
  { id: 4, title: "Cluster 3: Food", count: 30, description: "Posts related to food recipes and restaurants." },
  { id: 5, title: "Cluster 3: Food", count: 30, description: "Posts related to food recipes and restaurants." },
  { id: 6, title: "Cluster 3: Food", count: 30, description: "Posts related to food recipes and restaurants." },
  { id: 7, title: "Cluster 3: Food", count: 30, description: "Posts related to food recipes and restaurants." },
  { id: 8, title: "Cluster 3: Food", count: 30, description: "Posts related to food recipes and restaurants." },
];

export const Route = createFileRoute("/analytics")({
  component: Analytics,
});

function Analytics() {
  const [clusters, setClusters] = useState<any>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Імітація завантаження кластерів (можна замінити на API виклик)
  useEffect(() => {
    setClusters(mockClusters);
  }, []);

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

        <Box sx={{ mt: 2, maxWidth: 800, mx: "auto", p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Clusters of Posts
          </Typography>

          {clusters.length === 0 ? (
            <Typography>No cluster data available.</Typography>
          ) : (
            <List>
              {clusters.map((cluster: any) => (
                <Paper key={cluster.id} sx={{ mb: 2, p: 2 }}>
                  <ListItem alignItems="flex-start" disableGutters>
                    <ListItemText
                      primary={`${cluster.title} (${cluster.count} posts)`}
                      secondary={cluster.description}
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Box>
  );
}
