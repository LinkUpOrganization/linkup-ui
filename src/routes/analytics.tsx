import { getPostClusters } from "@/api/posts";
import Header from "@/components/auth/Header";
import Heatmap from "@/components/maps/heatmap/Heatmap";
import ClusterItem from "@/components/analytics/ClusterItem";
import { Box, Typography, List, CircularProgress, useTheme, useMediaQuery } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/analytics")({
  component: Analytics,
});

function Analytics() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedCluster, setSelectedCluster] = useState<{ latitude: number; longitude: number } | null>(null);

  const { data: clusters, isLoading } = useQuery({
    queryKey: ["clusters"],
    queryFn: getPostClusters,
  });

  const handleClusterClick = (coords: { latitude: number; longitude: number }) => {
    setSelectedCluster(coords);
  };

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
          selectedCluster={selectedCluster}
        />

        <Box
          sx={{
            mt: { xs: 2, md: 2 },
            maxWidth: 800,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
            height: { xs: "calc(100vh - 380px)", sm: "100%" },
          }}
        >
          <Typography textAlign="center" variant="h6" sx={{ mb: { xs: 2, md: 4 } }} gutterBottom>
            Clusters of Posts
          </Typography>

          {isLoading ? (
            <CircularProgress />
          ) : !clusters || clusters.length === 0 ? (
            <Typography>No cluster data available.</Typography>
          ) : (
            <List
              sx={{
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                px: 2,
              }}
            >
              {clusters.map((cluster) => (
                <ClusterItem key={cluster.id} cluster={cluster} onClick={handleClusterClick} />
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Box>
  );
}
