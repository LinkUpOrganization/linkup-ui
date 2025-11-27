import { useMutation } from "@tanstack/react-query";
import { toggleFollow } from "@/api/users";

export function useFollowUser() {
  const toggleFollowMutation = useMutation({
    mutationFn: toggleFollow,
    onSuccess: () => {},
  });

  return { toggleFollowMutation };
}
