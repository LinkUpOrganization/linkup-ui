import { Save, Delete } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import type React from "react";
import SelectImagesInput from "../create-post/SelectImagesInput";
import { useNavigate } from "@tanstack/react-router";
import { MAX_IMAGES_COUNT } from "@/constants/posts";

type EditPostActionsProps = {
  isEditPending: boolean;
  isDeletePending: boolean;
  handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeletePost: () => void;
  availableImagesCount: number;
};

export default function EditPostActions({
  isEditPending,
  isDeletePending,
  handleImageSelect,
  handleDeletePost,
  availableImagesCount,
}: EditPostActionsProps) {
  const navigate = useNavigate();

  const totalImagesCount = MAX_IMAGES_COUNT - availableImagesCount;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <SelectImagesInput selectedImagesCount={totalImagesCount} handleImageSelect={handleImageSelect} />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeletePost}
          disabled={isDeletePending || isEditPending}
          startIcon={<Delete />}
        >
          {isDeletePending ? "Deleting..." : "Delete"}
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate({ to: "/", search: { sort: "recent" } })}
          disabled={isEditPending || isDeletePending}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={isEditPending || isDeletePending} startIcon={<Save />}>
          {isEditPending ? "Updating..." : "Update"}
        </Button>
      </Box>
    </Box>
  );
}
