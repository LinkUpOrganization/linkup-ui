import UserAvatar from "@/components/auth/UserAvatar";
import { LocationOn, Favorite, Comment, FavoriteBorder, Share } from "@mui/icons-material";
import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import { format } from "date-fns";
import PostPhotos from "./PostPhotos";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <UserAvatar
            id={post.authorId ?? "unknown"}
            size={40}
            displayName={post.author?.displayName ?? "Unknown User"}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {post.author?.displayName || "Unknown User"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {format(new Date(post.createdAt), "MMM d, yyyy 'at' h:mm a")}
            </Typography>
          </Box>
        </Box>

        {/* Title */}
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          {post.title}
        </Typography>

        {/* Content */}
        {post.content && (
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
            {post.content}
          </Typography>
        )}

        {/* Location */}
        {post.address && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {post.address}
            </Typography>
          </Box>
        )}

        {/* Photos */}
        <PostPhotos photos={post.photos} />

        {/* Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, pt: 1 }}>
          <IconButton onClick={() => {}} color={true || post.isLiked ? "error" : "default"}>
            {true || post.isLiked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {(post.likesCount || 0) + (true ? 1 : 0)}
          </Typography>

          <IconButton color="default">
            <Comment />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {post.commentsCount || 0}
          </Typography>

          <IconButton color="default">
            <Share />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
