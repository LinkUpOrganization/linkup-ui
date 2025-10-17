import { getPostById } from "@/api/posts";
import Header from "@/components/auth/Header";
import PostCard from "@/components/posts/post-list/PostCard";
import { usePostToggleLike } from "@/hooks/usePostToggleLike";
import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = useParams({ from: "/posts/$postId" });
  const { handleLike } = usePostToggleLike();
  const { data: post, isLoading } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => {
      if (typeof postId === "string") return getPostById({ postId });
    },
    enabled: !!postId,
  });

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Header currentPage="Home" />
      {isLoading ? (
        <CircularProgress />
      ) : !post ? (
        <div>Post not found</div>
      ) : (
        <Box>
          <PostCard post={post} handleLike={handleLike} />
        </Box>
      )}
    </Box>
  );
}
