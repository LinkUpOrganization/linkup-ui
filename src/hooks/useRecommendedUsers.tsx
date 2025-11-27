import { useQuery } from "@tanstack/react-query";
import { getUserRecommendation } from "@/api/users";

export function useRecommendedUsers() {
  return useQuery({
    queryKey: ["users", "recommended"],
    queryFn: getUserRecommendation,
  });
}
