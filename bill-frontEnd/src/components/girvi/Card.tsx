import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Print } from "@mui/icons-material";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const CardBody = ({ girvi, onClick }: { girvi: any; onClick: () => void }) => (
  <React.Fragment>
    <CardContent onClick={onClick} style={{ cursor: "pointer" }}>
      <Typography
        gutterBottom
        sx={{ color: "black", fontSize: 14, textAlign: "center" }}
      >
        {girvi?.number}
      </Typography>
      <Typography
        variant="h5"
        component="div"
        style={{ textAlign: "center", color: "black" }}
      >
        {girvi?.NameAddress}
      </Typography>
      <Typography sx={{ color: "black", mb: 1.5, textAlign: "center" }}>
        {girvi?.GirviItems?.Value}
      </Typography>
      <Typography sx={{ color: "black", mb: 1.5, textAlign: "center" }}>
        INT DUE?
      </Typography>
      <Typography sx={{ color: "black", mb: 1.5, textAlign: "center" }}>
        ₹ {girvi?.GirviItems[0]?.amtLoan}
      </Typography>
      <Typography sx={{ color: "black", mb: 1.5, textAlign: "center" }}>
        {girvi?.date}
      </Typography>
    </CardContent>
  </React.Fragment>
);

export const PrintableGirviForm = React.forwardRef(
  ({ Girvi }: { Girvi: any }, ref: React.Ref<HTMLDivElement>) => (
    <div
      ref={ref}
      style={{ padding: 24, backgroundColor: "#fff", color: "#000" }}
    >
      <div className="header-container">
        <table className="header-table">
          <tbody>
            <tr className="header-logo">
              <td className="header-logo-cell">
                <img src={Girvi?.company?.logo} alt="Company logo" />
              </td>
              <td className="header-details">
                <h1>{Girvi?.company?.name}</h1>
                <p>{Girvi?.company?.address}</p>
                <p>Phone: {Girvi?.company?.phone}</p>
                <p>Email: {Girvi?.company?.email}</p>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="header-title">
                <h2>Girvi Receipt</h2>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
);
export default function OutlinedCard({
  girvis,
}: {
  girvis: { girvis: any[] };
}) {
  const printRef = useRef<HTMLDivElement>(null);
  const girvidate = girvis.girvis;
  const [open, setOpen] = React.useState(false);
  const [selectedGirvi, setSelectedGirvi] = React.useState<any>(null);

  const handleOpen = (girvi: any) => {
    setSelectedGirvi(girvi);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedGirvi(null);
  };

  // Form state
  const [form, setForm] = React.useState({
    itemno: "",
    date: "",
    amtLoan: "",
    NameAddress: "",
    endDate: "",
    interestRate: 24, // Default to 24% p.a.
    monthlyInterestPer100: 2, // Default to 2 rupees per 100 per month
  });

  React.useEffect(() => {
    if (selectedGirvi) {
      setForm({
        itemno: selectedGirvi.number ?? "",
        date: selectedGirvi.date ?? "",
        amtLoan: selectedGirvi.GirviItems?.[0]?.amtLoan ?? "",
        NameAddress: selectedGirvi.NameAddress ?? "",
        endDate: selectedGirvi.endDate
          ? selectedGirvi.endDate
          : new Date().toISOString().slice(0, 10),
        interestRate: selectedGirvi.interestRate ?? 24,
        monthlyInterestPer100: selectedGirvi.monthlyInterestPer100 ?? 2,
      });
    }
  }, [selectedGirvi]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Girvi-${form.itemno}`,
    onAfterPrint: () => {
      console.log("Print completed for", form.itemno);
      handleClose();
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "monthlyInterestPer100") {
      const monthly = parseFloat(value) || 0;
      setForm({
        ...form,
        monthlyInterestPer100: monthly,
        interestRate: monthly * 12,
      });
    } else if (name === "interestRate") {
      setForm({
        ...form,
        interestRate: parseFloat(value) || 0,
        monthlyInterestPer100: (parseFloat(value) || 0) / 12,
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const parseDate = (dateString: string) => {
    if (!dateString) return null;
    const parts = dateString.split(/\/|-/);
    if (parts.length === 3) {
      const [day, month, year] = parts;
      // Handles DD/MM/YYYY
      if (day.length === 2 && month.length === 2 && year.length === 4) {
        return new Date(`${year}-${month}-${day}`);
      }
      // Handles YYYY-MM-DD
      if (year.length === 4 && month.length === 2 && day.length === 2) {
        return new Date(dateString);
      }
    }
    // Fallback for other formats, though may not be accurate
    return new Date(dateString);
  };

  // Calculate interest
  const getInterest = () => {
    const principal = parseFloat(form.amtLoan) || 0;
    const rate = (parseFloat(form.interestRate as any) || 0) / 100;
    const start = parseDate(form.date);
    const end = parseDate(form.endDate);
    if (
      !start ||
      !end ||
      isNaN(principal) ||
      isNaN(start.getTime()) ||
      isNaN(end.getTime())
    )
      return "";
    const diffTime = end.getTime() - start.getTime();
    const actualDays = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
    const usedDays = actualDays < 30 ? 30 : actualDays;
    // Interest = Principal * Rate * (Days/365)
    const interest = principal * rate * (usedDays / 365);
    return interest.toFixed(2);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "4px",
      }}
    >
      {girvidate?.map((girvi: any, idx: any) => (
        <Card
          key={girvi?._id ?? idx}
          variant="outlined"
          style={
            girvi?.endDate
              ? { backgroundColor: "lightblue", width: "250px", padding: "2px" }
              : { backgroundColor: "yellow", width: "250px", padding: "2px" }
          }
        >
          <CardBody girvi={girvi} onClick={() => handleOpen(girvi)} />
        </Card>
      ))}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <form>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Girvi
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Item No"
                name="itemno"
                value={form.itemno}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Date"
                name="date"
                // type="date"
                value={form.date}
                onChange={handleChange}
                fullWidth
                // InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Date"
                name="endDate"
                // type="date"
                value={form.endDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Amount Loan"
                name="amtLoan"
                value={form.amtLoan}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Name & Address"
                name="NameAddress"
                value={form.NameAddress}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Number of Days"
                name="days"
                value={(() => {
                  const start = parseDate(form.date);
                  const end = parseDate(form.endDate);
                  if (
                    !start ||
                    !end ||
                    isNaN(start.getTime()) ||
                    isNaN(end.getTime())
                  )
                    return "";
                  const diffTime = end.getTime() - start.getTime();
                  return Math.max(
                    Math.ceil(diffTime / (1000 * 60 * 60 * 24)),
                    0
                  );
                })()}
                InputProps={{ readOnly: true }}
                fullWidth
              />
              <div style={{ display: "flex", gap: "8px" }}>
                <TextField
                  label="Interest"
                  name="interest"
                  value={getInterest()}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  helperText={`Calculated at ${form.interestRate}% p.a. for number of days between start and end date`}
                />
                {/* <TextField
                  label="Interest Rate (%)"
                  name="interestRate"
                  value={form.interestRate}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                  helperText="Annual interest rate (%) (auto from monthly)"
                /> */}
                <TextField
                  label="Monthly Interest per 100"
                  name="monthlyInterestPer100"
                  value={form.monthlyInterestPer100}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                  helperText="e.g. 2 = 24% p.a., 2.5 = 30% p.a."
                />
              </div>
            </Box>
          </form>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Print
              onClick={() => {
                console.log("printing", form);
                handlePrint();
              }}
            />
          </CardActions>
          <div style={{ display: "none" }}>
            <PrintableGirviForm ref={printRef} Girvi={selectedGirvi} />
          </div>
        </Box>
      </Modal>
    </Box>
  );
}
