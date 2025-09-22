import { apiClient } from "./clients";

export const getUserById = async (userId: string): Promise<UserProfile> => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
};
