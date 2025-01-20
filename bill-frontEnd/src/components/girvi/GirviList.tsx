import { Box, Card, IconButton, Modal } from "@mui/material";
import OutlinedCard from "./Card";
import { Canvas } from "../../elements/UI";
import { TopBar } from "./TopBar";
import { Add, AddCircle } from "@mui/icons-material";
import GirviForm from "./GirviForm";
import { useState } from "react";

export const GirviList = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div style={{ height: "92vh" }}>
        <TopBar />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            marginTop: "4px",
            gap: "4px",
          }}
        >
          <OutlinedCard />
          <OutlinedCard />
          <OutlinedCard />
          <OutlinedCard />
          <OutlinedCard />
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
