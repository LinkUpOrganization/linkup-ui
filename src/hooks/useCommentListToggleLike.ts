import { useMutation, useQueryClient } from "@tanstack/react-query";
import { togglePostCommentLike } from "../api/posts";
import { useParams } from "@tanstack/react-router";
import { useAuth } from "@/contexts/AuthProvider";
import { useCallback } from "react";
import { getToastStyle } from "@/utils/toastTheme";
import { useTheme } from "@mui/material";
import toast from "react-hot-toast";

export function useCommentListToggleLike() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const theme = useTheme();
  const { postId } = useParams({ from: "/posts/$postId" });

  const { mutate: togglePostCommentLikeMutation, isPending: likePending } = useMutation({
    mutationFn: ({ postId, commentId, isLiked }: { postId: string; commentId: string; isLiked: boolean }) =>
      togglePostCommentLike(postId, commentId, isLiked),
    onMutate: async ({ commentId }) => {
      await queryClient.cancelQueries({ queryKey: ["posts", postId, "comments"] });
      const prevData = queryClient.getQueryData<PostCommentType[]>(["posts", postId, "comments"]);

      queryClient.setQueryData<PostCommentType[]>(["posts", postId, "comments"], (old = []) =>
        old.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                isLikedByCurrentUser: !comment.isLikedByCurrentUser,
                reactionCount: (comment.reactionCount ?? 0) + (comment.isLikedByCurrentUser ? -1 : 1),
              }
            : comment
        )
      );

      return { prevData };
    },
    onError: (_err, _vars, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(["posts", postId, "comments"], context.prevData);
      }
    },
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ["posts", postId, "comments"] });
    },
  });

  const handleToggleCommentLike = useCallback(
    (postId: string, commentId: string, isLiked: boolean) => {
      if (!user || likePending) {
        toast("Please log in to like posts", {
          id: "login-required-posts",
          style: getToastStyle(theme),
          duration: 3000,
          position: "bottom-left",
        });
        return;
      }
      const newLikeState = !isLiked;
      togglePostCommentLikeMutation({ postId, commentId, isLiked: newLikeState });
    },
    [user, theme, togglePostCommentLikeMutation]
  );

  return { handleToggleCommentLike };
}
