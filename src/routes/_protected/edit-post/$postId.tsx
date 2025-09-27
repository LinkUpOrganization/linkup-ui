import { Box, Card, CardContent, Typography, Alert, Divider } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/auth/Header";
import EditPostActions from "@/components/posts/edit-post/EditPostActions";
import useEditPost from "@/hooks/useEditPost";
import { useState } from "react";
import TitleField from "@/components/posts/create-post/TitleField";
import ContentField from "@/components/posts/create-post/ContentField";
import SelectLocationButton from "@/components/posts/create-post/SelectLocationButton";
import LocationModal from "@/components/posts/create-post/LocationModal";
import UserInfoSection from "@/components/posts/create-post/UserInfoSection";
import SelectedImagesList from "@/components/posts/create-post/SelectedImagesList";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/api/posts";
import PostsLoading from "@/components/posts/post-list/PostsLoading";
import PostNotFound from "@/components/posts/post-list/PostNotFound";

export const Route = createFileRoute("/_protected/edit-post/$postId")({
  component: EditPostPage,
});

export default function EditPostPage() {
  const { postId } = Route.useParams();

  const {
    data: initialPost,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });

  const {
    onEditPost,
    handleSubmit,
    control,
    errors,
    titleValue,
    contentValue,
    isEditPending,
    isEditError,
    editError,
    handleRemoveSelectedImage,
    handleRemoveExistingImage,
    selectedImages,
    location,
    setLocation,
    handleImageSelect,
    handleDeletePost,
    isDeletePending,
    isDeleteError,
    deleteError,
    totalImagesCount,
  } = useEditPost({ postId, initialPost });

  const [modalOpen, setModalOpen] = useState(false);

  if (isPostLoading) return <PostsLoading cardNumber={1} />;
  if (isPostError) return <PostNotFound />;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Header />
      <Box
        component="form"
        onSubmit={handleSubmit((data) => onEditPost({ ...data, ...location }))}
        sx={{ display: "flex", justifyContent: "center", py: 8, px: 2 }}
      >
        <Card sx={{ maxWidth: 600, width: "100%" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Edit Post
            </Typography>

            {isEditError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                Failed to update post. {editError.response.data}
              </Alert>
            )}

            {isDeleteError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                Failed to update post. {deleteError.response.data}
              </Alert>
            )}

            <UserInfoSection />
            <TitleField control={control} errors={errors} value={titleValue} />
            <ContentField control={control} errors={errors} value={contentValue} />
            <SelectedImagesList
              selectedImages={selectedImages}
              existingImages={initialPost?.photos}
              handleRemoveSelectedImage={handleRemoveSelectedImage}
              handleRemoveExistingImage={handleRemoveExistingImage}
            />
            <SelectLocationButton location={location} setLocation={setLocation} setModalOpen={setModalOpen} />

            <Divider sx={{ mb: 3 }} />

            <EditPostActions
              handleImageSelect={handleImageSelect}
              handleDeletePost={handleDeletePost}
              isEditPending={isEditPending}
              isDeletePending={isDeletePending}
              totalImagesCount={totalImagesCount}
            />
          </CardContent>
        </Card>
      </Box>

      <LocationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(loc) => setLocation(loc)}
        intialLocation={location}
      />
    </Box>
  );
}
