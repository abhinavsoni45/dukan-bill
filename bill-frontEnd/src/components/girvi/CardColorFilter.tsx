import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const CardColorFilter = ({ filter, setFilter }: any) => {
  const handleChange = (event: any) => {
    setFilter(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="color-filter-label">Filter by color</InputLabel>
      <Select
        labelId="color-filter-label"
        id="color-filter-select"
        value={filter}
        label="Filter by color"
        onChange={handleChange}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="yellow">Yellow</MenuItem>
        <MenuItem value="blue">Blue</MenuItem>
      </Select>
    </FormControl>
  );
};
