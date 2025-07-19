import {
  Box,
  Card,
  IconButton,
  Modal,
  Pagination,
  PaginationItem,
} from "@mui/material";
import OutlinedCard from "./Card";
import { Canvas } from "../../elements/UI";
import { TopBar } from "./TopBar";
import { Add, AddCircle } from "@mui/icons-material";
import GirviForm from "./GirviForm";
import { useState } from "react";
import { useGetGirvis } from "../../hooks/useGetGirvis";
import { useSearch } from "../context/SearchContext";
import { useFindRange } from "../../resolvers/girvi.resolvers";

export const GirviList = ({ filter, sort }: any) => {
  const {
    data: seriesData,
    loading: seriesLoading,
    error: seriesError,
  } = useFindRange();
  console.log(
    seriesData,
    "seriesData",
    seriesLoading,
    seriesError,
    "seriesError"
  );
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useGetGirvis({
    filter: {
      status: filter,
    },
    sort: {
      sortBy: sort,
    },
    number: seriesData?.seriesRange?.smallest,
  });

  const [getGirviList, setGirviList] = useState([]);
  const { searchTerm } = useSearch();

  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const smallest = seriesData?.seriesRange?.smallest;
  const largest = seriesData?.seriesRange?.largest;
  const totalPages = largest - smallest + 1;

  if (currentPage === null) {
    setCurrentPage(smallest);
    return null; // Prevent premature rendering
  }

  const filteredData = {
    ...data,
    girvis:
      data?.girvis?.filter((girvi: any) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          girvi?.NameAddress?.toLowerCase().includes(searchLower) ||
          // girvi?.number?.toString().includes(searchLower) ||
          // girvi?.phno?.toString().includes(searchLower) ||
          girvi?.date?.toLowerCase().includes(searchLower)
        );
      }) || [],
  };
  console.log(loading, error, data, "girvidata", data?.girvis, filteredData);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div style={{ height: "92vh" }}>
        <TopBar />
        <Pagination
          page={currentPage - smallest + 1} // MUI expects 1-based index
          count={totalPages}
          onChange={(event: any, pageIndex: any) => {
            const actualPage = smallest + pageIndex - 1;
            setCurrentPage(actualPage); // store real page number
            console.log("Selected page:", actualPage);
          }}
          renderItem={(item: any) => (
            <PaginationItem
              {...item}
              page={item.page ? smallest + item.page - 1 : item.page}
            />
          )}
          // variant="outlined"
          // shape="rounded"
          style={{
            margin: "10px 0",
            display: "flex",
            justifyContent: "center",
          }}
          color="primary"
          size="large"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            marginTop: "4px",
            gap: "4px",
          }}
        >
          <OutlinedCard girvis={filteredData} />
        </div>
        <IconButton
          size="large"
          edge="start"
          onClick={handleOpen}
          style={{ bottom: "5vh", right: "3vw", position: "absolute" }}
        >
          <AddCircle color="primary" />
        </IconButton>
        <GirviForm open={open} handleClose={handleClose} />
      </div>
    </>
  );
};
