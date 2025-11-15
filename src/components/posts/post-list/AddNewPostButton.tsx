import { Fab } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { Add } from "@mui/icons-material";

export default function AddNewPostButton() {
  return (
    <Link to="/create-post">
      <Fab
        color="primary"
        aria-label="create post"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          height: 50,
          width: 50,
        }}
      >
        <Add />
      </Fab>
    </Link>
  );
}
