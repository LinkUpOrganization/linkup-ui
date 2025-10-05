import { Tab, Tabs } from "@mui/material";

type FilteringTabsProps = {
  filter: PostFilterType;
  setFilter: (newFilter: PostFilterType) => void;
};

export default function FilteringTabs({ filter, setFilter }: FilteringTabsProps) {
  return (
    <Tabs value={filter} onChange={(_, v) => setFilter(v)} centered>
      <Tab label="Recent" value="recent" />
      <Tab label="Top" value="top" />
      <Tab label="Following" value="following" />
    </Tabs>
  );
}
