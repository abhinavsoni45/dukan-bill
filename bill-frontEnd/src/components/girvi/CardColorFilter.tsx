import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export const CardColorFilter = ({ filter, setFilter }: any) => {
  const handleChange = (event: any) => {
    setFilter(event.target.value);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Stack spacing={1}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Filter by Color
        </Typography>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="color-filter-label">Color</InputLabel>
          <Select
            labelId="color-filter-label"
            id="color-filter-select"
            value={filter}
            label="Color"
            onChange={handleChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="yellow">Yellow</MenuItem>
            <MenuItem value="blue">Blue</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
};
