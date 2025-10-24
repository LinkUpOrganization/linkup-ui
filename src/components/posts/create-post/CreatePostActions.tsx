import { Send } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import SelectImagesInput from "./SelectImagesInput";
import { useNavigate } from "@tanstack/react-router";

type CreatePostActionsProps = {
  isPending: boolean;
  handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImages: File[];
};

export default function CreatePostActions({ isPending, handleImageSelect, selectedImages }: CreatePostActionsProps) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
      }}
    >
      <SelectImagesInput selectedImagesCount={selectedImages.length} handleImageSelect={handleImageSelect} />
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => navigate({ to: "/", search: { sort: "recent" } })}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={isPending} startIcon={<Send />}>
          {isPending ? "Posting..." : "Post"}
        </Button>
      </Box>
    </Box>
  );
}
