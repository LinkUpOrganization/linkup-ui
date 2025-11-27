type RecommendedUser = {
  user: User;
  followersCount?: number;
  sameLocationsCount?: number;
};

type SearchedUser = {
  id: string;
  displayName: string;
  isFollowed: boolean;
};
