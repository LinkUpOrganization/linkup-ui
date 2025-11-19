import { Paper, Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";

type ClusterItemProps = {
  cluster: ClusterType;
  onSelect: (cluster: ClusterType) => void;
  isSelected: boolean;
  onOpenLocations: (cluster: ClusterType) => void;
};

export default function ClusterItem({ cluster, onSelect, isSelected, onOpenLocations }: ClusterItemProps) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => setMenuAnchor(null);

  const handleOpenLocations = () => {
    closeMenu();
    onOpenLocations(cluster);
  };

  const handleCenterMap = () => {
    closeMenu();
    onSelect(cluster);
  };

  return (
    <Paper
      onClick={() => onSelect(cluster)}
      sx={{
        p: 2,
        mb: 2,
        width: "100%",
        borderRadius: 3,
        cursor: "pointer",
        transition: "0.2s ease",
        "&:hover": {
          boxShadow: 4,
          backgroundColor: isSelected ? "#abf2aa" : "#bff4be",
        },
        backgroundColor: isSelected ? "#abf2aa" : "background.default",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {cluster.name}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {cluster.count} posts
          </Typography>
        </Box>

        <IconButton onClick={openMenu}>
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            closeMenu();
          }}
        >
          <MenuItem onClick={handleOpenLocations}>
            <PlaceIcon sx={{ mr: 1 }} />
            View Posts
          </MenuItem>

          <MenuItem onClick={handleCenterMap}>
            <CenterFocusStrongIcon sx={{ mr: 1 }} />
            Center Map Here
          </MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
}
