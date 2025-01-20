import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, IconButton, ListItemButton, Modal, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import { ModalContext } from "../../../context/modalContext";
import TryME from "../../Modals/TryME";
import router from "../../Routes";
import { Bill } from "../../../gql/graphql";
import InvoiceForm from "../Invoice";
import { Delete } from "@mui/icons-material";
import { AlertDialog } from "../../../elements/UI";
import { useDeleteBill } from "../../../hooks/useDeleteBill";

interface BillItemProps {
  bill: Bill;
}
const TryMe = () => {
  return <div>Modal ID</div>;
};

const ChatListItem = ({ bill }: BillItemProps) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAlertOpen = () => setAlertOpen(true);
  const handleAlertClose = () => setAlertOpen(false);

  const [removeBill] = useDeleteBill();

  const handleDelete = async () => {
    console.log("Bill deleted: ", bill._id);
    await removeBill({ variables: { _id: bill._id } });
    handleAlertClose();
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const { openModal } = useContext(ModalContext);
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemButton
          onClick={() => {
            // console.log("openmodalclicked");
            // openModal("tilt", <TryME />, { size: "big", grey: true });
            router.navigate(`/bills/${bill._id}`);
            handleOpen();
          }}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={bill.customerName}
            secondary={
              <>
                <Typography
                  sx={{ display: "inline", marginRight: "3px" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {bill.date}
                </Typography>
                {bill.AllItems[0].products}
              </>
            }
          />
          {/* Show Delete Icon only on hover */}

          <Tooltip title="Delete Bill" placement="top">
            {/* {hovered && ( */}
            <IconButton
              // onMouseEnter={handleMouseEnter}
              // onMouseLeave={handleMouseLeave}
              // onMouseEnter={(e) => {
              //   e.currentTarget.style.display = "block";
              // }}
              // onMouseLeave={(e) => {
              //   e.currentTarget.style.display = "none";
              // }}
              onClick={() => handleAlertOpen()}
              edge="end"
            >
              <Delete />
            </IconButton>
            {/* )} */}
          </Tooltip>
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
      {/* Modal for Invoice Form */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1400,
            height: "75vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            overflow: "auto",
          }}
        >
          {/* Render InvoiceForm inside the modal */}
          <InvoiceForm handleClose={handleClose} bill={bill} />
        </Box>
      </Modal>
      <AlertDialog
        open={alertOpen}
        onClose={handleAlertClose}
        onConfirm={handleDelete}
        title="Delete Bill?"
        description="Are you sure you want to delete this bill? This action cannot be undone."
        cancelText="Cancel"
        confirmText="Delete"
      />
    </>
  );
};

export default ChatListItem;
