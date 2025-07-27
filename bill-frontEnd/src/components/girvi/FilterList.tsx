import { CardColorFilter } from "./CardColorFilter";
import "./FilterList.css";
import SearchAppBar from "./SearchAppBar";
import { SortFilter } from "./SortFilter";

import { TimeFilter } from "./TimeFilter";
import { useTimeFilter } from "../context/TimeFilterContext";

interface FilterListProps {
  filter: any;
  setFilter: (filter: any) => void;
  sort: any;
  setSort: (sort: any) => void;
}

export const FilterList = ({
  filter,
  setFilter,
  sort,
  setSort,
}: FilterListProps) => {
  const { startDate, endDate, setStartDate, setEndDate } = useTimeFilter();
  return (
    <div>
      {/* Search section */}
      <div>
        <SearchAppBar />
      </div>

      {/* Color filter section */}
      <div className="filter-row">
        <CardColorFilter filter={filter} setFilter={setFilter} />
      </div>

      {/* Sort filter section */}
      <div className="filter-row">
        <SortFilter sort={sort} setSort={setSort} />
      </div>

      {/* Time filter section */}
      <div className="filter-row">
        <TimeFilter
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>
    </div>
  );
};
