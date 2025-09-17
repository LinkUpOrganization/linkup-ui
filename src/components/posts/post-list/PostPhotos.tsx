import { Box, CardMedia, ImageList, ImageListItem, Typography } from "@mui/material";

export default function PostPhotos({ photos }: { photos: PostPhoto[] }) {
  if (!photos || photos.length === 0) return null;

  if (photos.length === 1) {
    return (
      <CardMedia component="img" height="300" image={photos[0].url} alt="Post image" sx={{ borderRadius: 1, mb: 2 }} />
    );
  }

  return (
    <ImageList
      sx={{ width: "100%", height: 300, mb: 2 }}
      cols={photos.length === 2 ? 2 : 3}
      rowHeight={photos.length === 2 ? 300 : 145}
    >
      {photos.slice(0, 5).map((photo, index) => {
        return (
          <ImageListItem key={photo.id}>
            <img
              src={photo.url}
              alt={`Post image ${index + 1}`}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
            {index === 4 && photos.length > 5 && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: "rgba(0, 0, 0, 0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6" color="white" fontWeight={600}>
                  +{photos.length - 5}
                </Typography>
              </Box>
            )}
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}
