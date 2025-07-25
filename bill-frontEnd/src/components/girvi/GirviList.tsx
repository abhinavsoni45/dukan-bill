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
import { useState, useEffect } from "react";
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
  const smallest = seriesData?.seriesRange?.smallest;
  const largest = seriesData?.seriesRange?.largest;
  const totalPages = largest && smallest ? largest - smallest + 1 : 0;

  // Set initial page to largest when seriesData is loaded
  const [currentPage, setCurrentPage] = useState<number | null>(null);

  // Set currentPage to largest when seriesData changes and currentPage is null
  // Use useEffect so hooks always run and component can render
  useEffect(() => {
    if (currentPage === null && largest !== undefined) {
      setCurrentPage(largest);
    }
  }, [largest, currentPage]);

  // Fetch girvi data for the current page (number)
  const { data, loading, error } = useGetGirvis({
    filter: {
      status: filter,
    },
    sort: {
      sortBy: sort,
    },
    number: currentPage,
  });

  const { searchTerm } = useSearch();

  // Only filter if data is available
  const filteredData =
    data && data.girvis
      ? {
          ...data,
          girvis: data.girvis.filter((girvi: any) => {
            const searchLower = searchTerm.toLowerCase();
            return (
              girvi?.NameAddress?.toLowerCase().includes(searchLower) ||
              girvi?.number?.toString().includes(searchLower) ||
              girvi?.phno?.toString().includes(searchLower) ||
              girvi?.date?.toLowerCase().includes(searchLower)
            );
          }),
        }
      : { girvis: [] };
  console.log(loading, error, data, "girvidata", data?.girvis, filteredData);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Only render UI when currentPage and data are available
  if (currentPage === null || !data) {
    return null;
  }

  return (
    <>
      <div style={{ height: "92vh" }}>
        <TopBar />
        <Pagination
          page={
            currentPage && smallest !== undefined
              ? currentPage - smallest + 1
              : 1
          } // MUI expects 1-based index
          count={totalPages}
          onChange={(event: any, pageIndex: any) => {
            const actualPage = smallest + pageIndex - 1;
            setCurrentPage(actualPage); // store real page number
          }}
          renderItem={(item: any) => (
            <PaginationItem
              {...item}
              page={item.page ? smallest + item.page - 1 : item.page}
            />
          )}
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
