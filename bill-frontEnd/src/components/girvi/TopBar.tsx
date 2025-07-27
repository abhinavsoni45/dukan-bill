import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  PaginationItem,
} from "@mui/material";
import FileUpload from "./FileUpload";

interface TopBarProps {
  listType: string;
  setListType: (type: string) => void;
  showPagination?: boolean;
  currentPage?: number | null;
  setCurrentPage?: (page: number) => void;
  smallest?: number;
  totalPages?: number;
}

export const TopBar = ({
  listType,
  setListType,
  showPagination = false,
  currentPage,
  setCurrentPage,
  smallest,
  totalPages,
}: TopBarProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "anchor-center",
        justifyContent: "space-between",
      }}
    >
      <FormControl
        variant="standard"
        sx={{
          minWidth: 180,
          marginBottom: 2,
          marginTop: "10px",
          marginLeft: "20px",
        }}
      >
        <InputLabel id="list-type-label">View</InputLabel>
        <Select
          labelId="list-type-label"
          id="list-type-select"
          value={listType}
          onChange={(e) => setListType(e.target.value)}
          label="View"
        >
          <MenuItem value="serie">Series</MenuItem>
          <MenuItem value="masterData">Master Data</MenuItem>
        </Select>
      </FormControl>
      {showPagination &&
        currentPage !== undefined &&
        setCurrentPage &&
        smallest !== undefined &&
        totalPages !== undefined && (
          <Pagination
            page={
              currentPage && smallest !== undefined
                ? currentPage - smallest + 1
                : 1
            }
            count={totalPages}
            onChange={(event: any, pageIndex: any) => {
              const actualPage = smallest + pageIndex - 1;
              setCurrentPage(actualPage);
            }}
            renderItem={(item: any) => (
              <PaginationItem
                {...item}
                page={item.page ? smallest + item.page - 1 : item.page}
              />
            )}
            style={{ marginTop: "10px", alignContent: "center" }}
            color="primary"
            size="large"
          />
        )}
      <FileUpload />
    </div>
  );
};
