import { useInfiniteQuery } from "@tanstack/react-query";
import { searchUsersByDisplayName } from "@/api/users";

export function useSearchUsers(query: string) {
  return useInfiniteQuery({
    queryKey: ["users", "search", query],
    queryFn: ({ pageParam }) => searchUsersByDisplayName({ displayName: query, cursor: pageParam, pageSize: 20 }),
    initialPageParam: "0",
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: query.trim().length > 0,
  });
}
