import { CardColorFilter } from "./CardColorFilter";
import FileUpload from "./FileUpload";
import SearchAppBar from "./SearchAppBar";
import { SortFilter } from "./SortFilter";

export const FilterList = ({ filter, setFilter, sort, setSort }: any) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <SearchAppBar />
      <FileUpload></FileUpload>
      <CardColorFilter filter={filter} setFilter={setFilter} />
      <SortFilter sort={sort} setSort={setSort} />
    </div>
  );
};
