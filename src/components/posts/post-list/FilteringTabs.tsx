import { Tab, Tabs } from "@mui/material";

type FilteringTabsProps = {
  sort: PostSortType;
  setFilter: (newFilter: PostSortType) => void;
};

export default function FilteringTabs({ sort, setFilter }: FilteringTabsProps) {
  return (
    <Tabs value={sort} onChange={(_, v) => setFilter(v)} centered>
      <Tab label="Recent" value="recent" />
      <Tab label="Top" value="top" />
      <Tab label="Following" value="following" />
    </Tabs>
  );
}
