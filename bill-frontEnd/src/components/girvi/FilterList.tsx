import { CardColorFilter } from "./CardColorFilter";
import SearchAppBar from "./SearchAppBar";
import { SortFilter } from "./SortFilter";

export const FilterList = ({ filter, setFilter, sort, setSort }: any) => {
  return (
    <>
      <SearchAppBar />
      <CardColorFilter filter={filter} setFilter={setFilter} />
      <SortFilter sort={sort} setSort={setSort} />
    </>
  );
};
