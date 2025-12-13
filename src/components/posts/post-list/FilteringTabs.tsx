import { useAuth } from "@/contexts/AuthProvider";
import { Tab, Tabs } from "@mui/material";

type FilteringTabsProps = {
  sort: PostSortType;
  setFilter: (newFilter: PostSortType) => void;
};

export default function FilteringTabs({ sort, setFilter }: FilteringTabsProps) {
  const { user } = useAuth();

  return (
    <Tabs value={sort} onChange={(_, v) => setFilter(v)} centered>
      <Tab label="Recent" value="recent" />
      <Tab label="Top" value="top" />
      {!!user && <Tab label="Following" value="following" />}
    </Tabs>
  );
}
