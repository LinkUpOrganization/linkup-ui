import { Box, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import Header from "@/components/auth/Header";
import { usePostList } from "@/hooks/usePostList";
import { usePostListToggleLike } from "@/hooks/usePostListToggleLike";
import FilteringTabs from "@/components/posts/post-list/FilteringTabs";
import AddNewPostButton from "@/components/posts/post-list/AddNewPostButton";
import PostsList from "@/components/posts/post-list/PostsList";

export const Route = createFileRoute("/")({
  component: PostsListPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      sort: (search.sort as PostSortType) ?? "recent",
    };
  },
});

export default function PostsListPage() {
  const navigate = Route.useNavigate();
  const { sort } = Route.useSearch();

  const setFilter = (newFilter: PostSortType) => {
    navigate({
      search: (prev) => ({
        ...prev,
        sort: newFilter,
      }),
      replace: true,
    });
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = usePostList({ sort });
  const { handleLike } = usePostListToggleLike({ sort });

  const posts = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);

  const { ref: loadMoreRef } = useInView({
    threshold: 0,
    rootMargin: "100px",
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Header currentPage="Home" />

      <FilteringTabs sort={sort} setFilter={setFilter} />

      <Box sx={{ width: "100%", maxWidth: 650, pb: 4, pt: 4, mx: "auto" }}>
        <PostsList posts={posts} isLoading={isLoading} isError={isError} handleLike={handleLike} showRecommendedUsers />

        {hasNextPage && <div ref={loadMoreRef} style={{ height: 1 }} />}

        {isFetchingNextPage && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
            Loading more posts...
          </Typography>
        )}
      </Box>

      <AddNewPostButton />
    </Box>
  );
}
