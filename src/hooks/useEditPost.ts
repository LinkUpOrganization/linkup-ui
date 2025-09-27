import type React from "react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, type PostFormValues } from "@/schemas/postSchemas";
import { deletePostById, updatePost } from "@/api/posts";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { MAX_IMAGES_COUNT } from "@/constants/posts";

type UseEditPostProps = {
  postId: string;
  initialPost?: Post;
};

export default function useEditPost({ postId, initialPost }: UseEditPostProps) {
  const navigate = useNavigate();

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [location, setLocation] = useState<PostLocation | null>(null);

  const availableImagesCount =
    MAX_IMAGES_COUNT - (initialPost?.photos.length ?? 0) - selectedImages.length + deletedImages.length;

  console.log(availableImagesCount);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialPost?.title || "",
      content: initialPost?.content || "",
    },
  });

  const titleValue = watch("title") ?? "";
  const contentValue = watch("content") ?? "";

  const {
    mutate: handleEditPost,
    isPending: isEditPending,
    isError: isEditError,
    error: editError,
  } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      navigate({ to: "/", search: { filter: "recent" } });
    },
    onError: (error: any) => {
      console.error("Failed to update post:", error);
    },
  });

  useEffect(() => {
    if (!initialPost) return;

    reset({
      title: initialPost.title,
      content: initialPost.content,
    });

    const latitude = Number(initialPost?.latitude);
    const longitude = Number(initialPost?.longitude);
    console.log(initialPost);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      const initialLocation: PostLocation = {
        latitude,
        longitude,
        address: initialPost.address,
      };
      setLocation(initialLocation);
    }
  }, [initialPost]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (initialPost == null) return;
    const files = Array.from(event.target.files || []);
    const filesToAdd = files.slice(0, availableImagesCount);

    setSelectedImages((prev) => [...prev, ...filesToAdd]);
    event.target.value = "";
  };

  const handleRemoveSelectedImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (publicId: string) => {
    setDeletedImages((prev) => [...prev, publicId]);
  };

  const onEditPost = async (data: PostFormValues) => {
    if (initialPost == null) return;

    const formData = new FormData();
    if (data.title != initialPost.title) formData.append("Title", data.title);
    if (data.content != null && data?.content != initialPost.content) formData.append("Content", data.content);
    if (data.latitude && String(data.latitude) != initialPost.latitude)
      formData.append("Latitude", String(data.latitude));
    if (data.longitude && String(data.longitude) != initialPost.longitude)
      formData.append("Longitude", String(data.longitude));
    if (data.address && data.address != initialPost.address) formData.append("Address", data.address);
    selectedImages.forEach((file) => {
      formData.append("PhotosToAdd", file);
    });
    deletedImages.forEach((file) => {
      formData.append("PhotosToDelete", file);
    });

    handleEditPost({ postId, data: formData });
  };

  const {
    mutate: handleDeletePost,
    isPending: isDeletePending,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: () => {
      if (!initialPost) return Promise.reject();
      return deletePostById(initialPost.id);
    },
    onSuccess: () => {
      navigate({ to: "/", search: { filter: "recent" } });
    },
    onError: (error: any) => {
      console.error("Failed to delete post:", error);
    },
  });

  return {
    onEditPost,
    handleSubmit,
    control,
    errors,
    titleValue,
    contentValue,
    handleImageSelect,
    handleRemoveSelectedImage,
    handleRemoveExistingImage,
    selectedImages,
    location,
    setLocation,
    isEditPending,
    isEditError,
    editError,
    handleDeletePost,
    isDeletePending,
    isDeleteError,
    deleteError,
    availableImagesCount,
  };
}
