import { Box } from "@mui/material";
import PostCard from "@/components/posts/post-list/PostCard";

export default function PostViewLeft({
  post,
  handleLike,
}: {
  post: any;
  handleLike: (postId: string, isLikedByCurrentUser: boolean) => void;
}) {
  return (
    <Box
      sx={{
        flex: { md: 1, xs: "unset" },
        maxWidth: { md: "50%" },
        display: "flex",
        justifyContent: "center",
        px: { xs: 2, sm: 4 },
        py: 3,
        borderRight: { md: "1px solid", xs: "none" },
        borderColor: "divider",
        position: { md: "sticky" },
        top: { md: 65 },
        height: { md: "calc(100vh - 65px)" },
        overflowY: { md: "auto" },
        zIndex: 1,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        <PostCard
          post={post}
          handleLike={handleLike}
          sx={{
            border: 1,
            // borderBottom: 0,
            borderColor: "divider",
            // pb: 1,
            // borderRadius: index === 0 && !isMobile ? "16px 16px 0 0" : 0,
          }}
        />
      </Box>
    </Box>
  );
}
