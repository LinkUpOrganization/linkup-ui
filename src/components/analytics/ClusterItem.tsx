import { Paper, Box, Typography } from "@mui/material";

type ClusterItemProps = {
  cluster: ClusterType;
  onClick: (coords: { latitude: number; longitude: number }) => void;
};

export default function ClusterItem({ cluster, onClick }: ClusterItemProps) {
  return (
    <Paper
      onClick={() => onClick({ latitude: cluster.latitude, longitude: cluster.longitude })}
      sx={{
        p: 2,
        mb: 2,
        width: "100%",
        borderRadius: 3,
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
          backgroundColor: "#bff4be",
        },
        "&:active": {
          transform: "scale(0.98)",
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="bold">
          {cluster.name}
        </Typography>

        <Typography variant="body2" fontWeight="medium" sx={{ color: "text.secondary" }}>
          {cluster.count} posts
        </Typography>
      </Box>
    </Paper>
  );
}
