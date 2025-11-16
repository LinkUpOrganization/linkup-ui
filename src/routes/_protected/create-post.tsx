import { Box, Card, CardContent, Typography, Alert, Divider } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/auth/Header";
import SelectedImagesList from "@/components/posts/create-post/SelectedImagesList";
import CreatePostActions from "@/components/posts/create-post/CreatePostActions";
import useCreatePost from "@/hooks/useCreatePost";
import UserInfoSection from "@/components/posts/create-post/UserInfoSection";
import ContentField from "@/components/posts/create-post/ContentField";
import LocationModal from "@/components/posts/create-post/LocationModal";
import { useState } from "react";
import SelectLocationButton from "@/components/posts/create-post/SelectLocationButton";

export const Route = createFileRoute("/_protected/create-post")({
  component: CreatePostPage,
});

export default function CreatePostPage() {
  const {
    onSubmit,
    handleSubmit,
    control,
    isPending,
    isError,
    errors,
    contentValue,
    handleImageSelect,
    handleRemoveImage,
    selectedImages,
    location,
    setLocation,
  } = useCreatePost();

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Header />
      <Box
        component="form"
        onSubmit={handleSubmit((data) => onSubmit({ ...data, ...location }))}
        sx={{ mx: "auto", width: "100%", maxWidth: 650, py: { xs: 0, sm: 8 } }}
      >
        <Card sx={{ maxWidth: 600, width: "100%" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Create Post
            </Typography>

            {isError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                Failed to create post. Please try again.
              </Alert>
            )}

            <UserInfoSection />
            <ContentField control={control} errors={errors} value={contentValue} />
            <SelectedImagesList selectedImages={selectedImages} handleRemoveSelectedImage={handleRemoveImage} />
            <SelectLocationButton location={location} setLocation={setLocation} setModalOpen={setModalOpen} />

            <Divider sx={{ mb: 3 }} />

            <CreatePostActions
              selectedImages={selectedImages}
              handleImageSelect={handleImageSelect}
              isPending={isPending}
            />
          </CardContent>
        </Card>
      </Box>

      <LocationModal
        open={modalOpen}
        initialLocation={location}
        onClose={() => setModalOpen(false)}
        onSave={(loc) => setLocation(loc)}
      />
    </Box>
  );
}
