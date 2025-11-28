import { searchUsersByDisplayName } from "@/api/users";
import { Box, CircularProgress } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import SearchedUserList from "./SearchedUserList";
import { useDebounce } from "@/hooks/useDebounce";

type SearchedUsersType = {
  query: string;
};

export default function SearchedUsers({ query }: SearchedUsersType) {
  const debouncedQuery = useDebounce<string>(query, 400);

  const { data, fetchNextPage, isLoading, isError, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["users", "search", debouncedQuery],
    queryFn: ({ pageParam }) =>
      searchUsersByDisplayName({
        displayName: debouncedQuery,
        cursor: pageParam,
        pageSize: 20,
      }),
    initialPageParam: "0",
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: debouncedQuery.trim().length > 0,
  });

  const isDebouncing = debouncedQuery !== query;
  const showLoading = isLoading || isDebouncing;

  const users = data?.pages.flatMap((p) => p.items) ?? [];

  const { ref: loadMoreRef } = useInView({
    threshold: 0,
    rootMargin: "100px",
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <>
      <SearchedUserList users={users} isLoading={showLoading} isError={isError} />
      <div ref={loadMoreRef} style={{ height: 1 }} />
      {isFetchingNextPage && (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
