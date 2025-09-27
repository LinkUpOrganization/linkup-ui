import { Button } from "@mui/material";
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
      endIcon={
        location?.address && (
          <CloseIcon
            onClick={(e) => {
              e.stopPropagation();
              setLocation(null);
            }}
          />
        )
      }
    >
      {location?.address ? `📍 ${location.address}` : "Add location"}
    </Button>
  );
}
