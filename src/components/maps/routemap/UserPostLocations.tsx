import { getUserPostLocations } from "@/api/posts";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

type UserPostLocationsProps = {
  userId: string;
};

export default function UserPostLocations({ userId }: UserPostLocationsProps) {
  const { data: postLocations } = useQuery({
    queryKey: ["user-post-locations", userId],
    queryFn: async () => getUserPostLocations(userId),
    enabled: !!userId,
  });

  console.log(postLocations);

  return <Typography sx={{ mt: 4, color: "text.secondary" }}>Map coming soon...</Typography>;
}
