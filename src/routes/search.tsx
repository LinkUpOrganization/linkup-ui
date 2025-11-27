import { Box, Card, CardContent } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/auth/Header";
import SearchedUsers from "@/components/people/searched/SearchedUsers";
import RecommendedUsers from "@/components/people/recommended/RecommendedUsers";

export const Route = createFileRoute("/search")({
  component: UsersSearchPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      query: (search.query as string) ?? "",
    };
  },
});

export default function UsersSearchPage() {
  const navigate = Route.useNavigate();
  const { query } = Route.useSearch();

  const setQuery = (newQuery: string) => {
    navigate({
      search: (prev) => ({ ...prev, query: newQuery }),
      replace: true,
    });
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Header currentPage="search" />

      <Box sx={{ width: "100%", maxWidth: 650, pb: 4, pt: 4, mx: "auto" }}>
        <Card sx={{ p: 2, borderRadius: 3 }}>
          <CardContent>
            <Box
              component="input"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                border: "1px solid #ccc",
                marginBottom: 16,
              }}
              value={query}
              placeholder="Search users..."
              onChange={(e) => setQuery(e.target.value)}
            />

            {query ? <SearchedUsers query={query} /> : <RecommendedUsers />}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
