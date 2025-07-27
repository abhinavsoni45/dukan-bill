import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
  Typography,
  Stack,
} from "@mui/material";

export const SortFilter = ({ sort, setSort }: any) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Stack spacing={1}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Sort By
        </Typography>
        <RadioGroup row value={sort} onChange={handleChange} sx={{ gap: 2 }}>
          <FormControlLabel value="number" control={<Radio />} label="Number" />
          <FormControlLabel
            value="amtLoan"
            control={<Radio />}
            label="Amount"
          />
        </RadioGroup>
      </Stack>
    </Paper>
  );
};
