import { useMutation, useQueryClient } from "@tanstack/react-query";
import { togglePostLike } from "../api/posts";
import { useCallback } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { useTheme } from "@mui/material";
import toast from "react-hot-toast";
import { getToastStyle } from "@/utils/toastTheme";

export function usePostToggleLike() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const theme = useTheme();

  const toggleLikeMutation = useMutation({
    mutationFn: ({ postId, isLiked }: { postId: string; isLiked: boolean }) => togglePostLike(postId, isLiked),

    onMutate: async ({ postId, isLiked }) => {
      // stops any current refetches ["posts"] to avoid conflicts
      await queryClient.cancelQueries({ queryKey: ["posts", postId] });

      const prevData = queryClient.getQueryData<Post>(["posts", postId]);

      queryClient.setQueryData<Post>(["posts", postId], (oldData) => {
        if (!oldData) return oldData;

        const newData = {
          ...oldData,
          isLikedByCurrentUser: isLiked,
          reactionCount: (oldData.reactionCount ?? 0) + (isLiked ? 1 : -1),
        };

        return newData;
      });

      return { prevData };
    },

    onError: (_err, vars, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(["posts", vars.postId], context.prevData);
      }
    },

    onSettled: () => {
      // optional
      // queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleLike = useCallback(
    (postId: string, isLikedByCurrentUser: boolean) => {
      if (!user) {
        toast("Please log in to like posts", {
          id: "login-required-posts",
          style: getToastStyle(theme),
          duration: 3000,
          position: "bottom-left",
        });
        return;
      }

      toggleLikeMutation.mutate({
        postId,
        isLiked: !isLikedByCurrentUser,
      });
    },
    [user, theme, toggleLikeMutation]
  );

  return { handleLike };
}
