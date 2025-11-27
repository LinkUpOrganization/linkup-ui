import { Box, Skeleton } from "@mui/material";

export default function UsersLoading({ cardCount = 10 }: { cardCount?: number }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {[...Array(cardCount)].map((_, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 2,
            py: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Skeleton variant="circular" width={42} height={42} />

          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width="60%" height={22} />
            <Skeleton variant="text" width="40%" height={18} />
          </Box>

          <Skeleton variant="text" width={40} height={20} />
        </Box>
      ))}
    </Box>
  );
}
