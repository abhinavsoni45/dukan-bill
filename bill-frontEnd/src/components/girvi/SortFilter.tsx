import { Button } from "@mui/material";

export const SortFilter = ({ sort, setSort }: any) => {
  const handleClick = () => {
    setSort(sort === "number" ? "amtLoan" : "number");
  };

  return (
    <Button onClick={handleClick} fullWidth variant="contained">
      Sort by Amount
    </Button>
  );
};
