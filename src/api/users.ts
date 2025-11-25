import { apiClient } from "./clients";

export const getUserById = async (userId: string): Promise<UserProfile> => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
};

export async function toggleFollow({
  followeeId,
  isFollowed,
}: {
  followeeId: string;
  isFollowed: boolean;
}): Promise<void> {
  await apiClient.post(`/users/${followeeId}/toggle-follow`, {
    isFollowed,
  });
}

export const getUserRecommendation = async (): Promise<RecommendedUser[]> => {
  const response = await apiClient.get("/users/recommended");
  return response.data;
};
