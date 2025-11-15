import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { usePostList } from "@/hooks/usePostList";
import { usePostListToggleLike } from "@/hooks/usePostListToggleLike";
import PostsList from "../posts/post-list/PostsList";

export default function UserPostsSection({ userId }: { userId: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = usePostList({
    sort: "recent",
    authorId: userId,
    enabled: !!userId,
  });

  const { handleLike } = usePostListToggleLike({
    sort: "recent",
    authorId: userId,
  });

  const posts = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);

  const { ref: loadMoreRef } = useInView({
    threshold: 0,
    rootMargin: "100px",
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });

  return (
    <Box sx={{ width: "100%", maxWidth: 650, pb: 4, pt: 4, mx: "auto" }}>
      <PostsList posts={posts} isLoading={isLoading} isError={isError} handleLike={handleLike} />

      {hasNextPage && <div ref={loadMoreRef} style={{ height: 1 }} />}
      {isFetchingNextPage && (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
          Loading more posts...
        </Typography>
      )}
    </Box>
  );
}
