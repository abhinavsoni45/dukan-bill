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
import { useTimeFilter } from "../context/TimeFilterContext";

export type listType = "serie" | "masterData";
export const GirviList = ({ filter, sort }: any) => {
  const { startDate, endDate, setDefaultDates } = useTimeFilter();
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

  const [listType, setListType] = useState("serie");
  const smallest = seriesData?.seriesRange?.smallest;
  const largest = seriesData?.seriesRange?.largest;
  const totalPages = largest && smallest ? largest - smallest + 1 : 0;

  // Set initial page to largest when seriesData is loaded
  const [currentPage, setCurrentPage] = useState<number | null>(null);

  console.log(listType, "listType");
  // Set currentPage to largest when seriesData changes and currentPage is null
  // Use useEffect so hooks always run and component can render
  useEffect(() => {
    if (currentPage === null && largest !== undefined) {
      setCurrentPage(largest);
    }
  }, [largest, currentPage]);

  // Fetch girvi data: for 'serie', use number; for 'masterData', fetch all
  const girviFilterQuery: any = {
    filter: {
      status: filter,
    },
    sort: {
      sortBy: sort,
    },
  };
  if (listType === "serie") {
    girviFilterQuery.number = currentPage;
  }
  // if (startDate && endDate) {
  // girviFilterQuery.filter.startDate = startDate;
  // girviFilterQuery.filter.endDate = endDate;
  // }
  const { data, loading, error } = useGetGirvis(girviFilterQuery);

  const { searchTerm } = useSearch();

  // Set default dates from girvi data (first and last date)
  useEffect(() => {
    if (data && data.girvis && data.girvis.length > 0) {
      // Sort by date ascending
      const sorted = [...data.girvis].sort((a, b) =>
        a.date > b.date ? 1 : -1
      );
      const firstDate = sorted[0]?.date || "";
      const lastDate = sorted[sorted.length - 1]?.date || "";
      // Set default dates only if they are not already set
      if (!startDate && !endDate) {
        setDefaultDates({ start: firstDate, end: lastDate });
      }
    }
  }, [data, setDefaultDates, startDate, endDate]);

  // Only filter if data is available
  const filteredData =
    data && data.girvis
      ? {
          ...data,
          girvis: data.girvis.filter((girvi: any) => {
            // Date filter logic
            let inDateRange = true;
            if (startDate) {
              inDateRange = inDateRange && girvi.date >= startDate;
            }
            if (endDate) {
              inDateRange = inDateRange && girvi.date <= endDate;
            }
            const searchLower = searchTerm.toLowerCase();
            return (
              inDateRange &&
              (girvi?.NameAddress?.toLowerCase().includes(searchLower) ||
                girvi?.number?.toString().includes(searchLower) ||
                girvi?.phno?.toString().includes(searchLower) ||
                girvi?.date?.toLowerCase().includes(searchLower))
            );
          }),
        }
      : { girvis: [] };
  console.log(loading, error, data, "girvidata", data?.girvis, filteredData);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Only render UI when data is available (for serie, also require currentPage)
  // if (
  //   (listType === "serie" && (currentPage === null || !data)) ||
  //   (listType === "masterData" && !data)
  // ) {
  //   return null;
  // }

  return (
    <div style={{ height: "92vh" }}>
      <TopBar
        listType={listType}
        setListType={setListType}
        showPagination={listType === "serie"}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        smallest={smallest}
        totalPages={totalPages}
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
        style={{ bottom: "5vh", right: "3vw", position: "fixed" }}
      >
        <AddCircle color="primary" />
      </IconButton>
      <GirviForm open={open} handleClose={handleClose} />
    </div>
  );
};
