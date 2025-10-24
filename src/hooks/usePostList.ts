import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";

export type PagedResult<T> = {
  items: T[];
  nextCursor: string | null;
};

export function usePostList(
  sort: PostSortType,
  latitude?: number,
  longitude?: number,
  radius?: number,
  enabled = true,
  pageSize = 10
) {
  const infiniteQuery = useInfiniteQuery<
    PagedResult<Post>,
    Error,
    InfiniteData<PagedResult<Post>>,
    [
      string,
      {
        sort: PostSortType;
        pageSize: number;
        latitude?: number;
        longitude?: number;
        radius?: number;
      },
    ],
    string | null
  >({
    queryKey: [
      "posts",
      {
        sort,
        pageSize,
        ...(latitude !== undefined && { latitude }),
        ...(longitude !== undefined && { longitude }),
        ...(radius !== undefined && { radius }),
      },
    ],
    queryFn: ({ pageParam }) =>
      fetchPosts({
        sort,
        cursor: pageParam,
        pageSize,
        latitude,
        longitude,
        radius,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    initialPageParam: null,
    enabled: enabled,
  });

  return { ...infiniteQuery };
}
