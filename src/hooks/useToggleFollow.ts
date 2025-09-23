import { toggleFollow } from "@/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useToggleFollow(user: UserProfile | undefined) {
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending: isToggleFollowPending,
    isError: isToggleFollowError,
    error: toggleFollowError,
  } = useMutation({
    mutationFn: (followData: { followeeId: string; isFollowed: boolean }) => toggleFollow(followData),

    onMutate: async (followData) => {
      await queryClient.cancelQueries({ queryKey: ["users", followData.followeeId] });

      const prevUser = queryClient.getQueryData<UserProfile>(["users", followData.followeeId]);

      if (prevUser) {
        queryClient.setQueryData(["users", followData.followeeId], {
          ...prevUser,
          isFollowing: !followData.isFollowed,
          followersCount: (prevUser.followersCount ?? 0) + (followData.isFollowed ? -1 : 1),
        });
      }

      return { prevUser };
    },

    onError: (_err, followData, context) => {
      console.log(_err);

      if (context?.prevUser) {
        queryClient.setQueryData(["users", followData.followeeId], context.prevUser);
      }
    },

    onSettled: (_data, _error, followData) => {
      queryClient.invalidateQueries({ queryKey: ["users", followData.followeeId] });
    },
  });

  const handleFollowToggle = () => {
    if (!user) return;
    mutate({
      followeeId: user.id,
      isFollowed: user.isFollowing,
    });
  };

  return {
    handleFollowToggle,
    isToggleFollowPending,
    isToggleFollowError,
    toggleFollowError,
  };
}
