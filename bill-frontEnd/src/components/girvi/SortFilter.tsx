import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export const SortFilter = ({ sort, setSort }: any) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
  };

  return (
    <FormControl
      component="fieldset"
      style={{
        display: "flex",
        flex: 1,
        gap: "4px",
        alignItems: "anchor-center",
      }}
    >
      <RadioGroup row value={sort} onChange={handleChange}>
        <>Sort by:</>
        <FormControlLabel value="number" control={<Radio />} label="Number" />
        <FormControlLabel value="amtLoan" control={<Radio />} label="Amount" />
      </RadioGroup>
    </FormControl>
  );
};
