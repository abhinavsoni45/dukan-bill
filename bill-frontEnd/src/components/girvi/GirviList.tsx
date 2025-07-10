import { Box, Card, IconButton, Modal, Pagination } from "@mui/material";
import OutlinedCard from "./Card";
import { Canvas } from "../../elements/UI";
import { TopBar } from "./TopBar";
import { Add, AddCircle } from "@mui/icons-material";
import GirviForm from "./GirviForm";
import { useState } from "react";
import { useGetGirvis } from "../../hooks/useGetGirvis";
import { useSearch } from "../context/SearchContext";

export const GirviList = ({ filter, sort }: any) => {
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useGetGirvis({
    filter: {
      status: filter,
    },
    sort: {
      sortBy: sort,
    },
  });
  const [getGirviList, setGirviList] = useState([]);
  const { searchTerm } = useSearch();

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
        <Pagination count={4} />
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
