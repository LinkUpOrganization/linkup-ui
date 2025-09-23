type User = {
  id: string;
  displayName: string;
  email: string;
  isVerified: boolean;
  followersCount: number;
  followingCount: number;
};

type UserProfile = {
  id: string;
  displayName: string;
  email: string;
  isVerified: boolean;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
};

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  displayName: string;
  password: string;
};
