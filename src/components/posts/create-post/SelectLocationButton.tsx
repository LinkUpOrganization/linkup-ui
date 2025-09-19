import { Button, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type SelectLocationButtonProps = {
  location: PostLocation | null;
  setLocation: React.Dispatch<React.SetStateAction<PostLocation | null>>;
  setModalOpen: (value: React.SetStateAction<boolean>) => void;
};

export default function SelectLocationButton({ location, setLocation, setModalOpen }: SelectLocationButtonProps) {
  return (
    <Button
      variant="outlined"
      fullWidth
      sx={{
        my: 2,
        justifyContent: "flex-start",
        textTransform: "none",
      }}
      onClick={() => setModalOpen(true)}
    >
      {location?.address ? (
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Typography
            variant="body2"
            sx={{
              flexGrow: 1,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            📍 {location.address}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setLocation(null);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        "Add location"
      )}
    </Button>
  );
}
