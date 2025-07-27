import { Box, Paper, Stack, TextField, Typography } from "@mui/material";

interface TimeFilterProps {
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

export const TimeFilter = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: TimeFilterProps) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Stack spacing={1}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Filter by Date
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            type="date"
            label="Start Date"
            variant="standard"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="date"
            label="End Date"
            variant="standard"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Stack>
    </Paper>
  );
};
