// // import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// // import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// // import { Box, TextField } from "@mui/material";
// // import { Dayjs } from "dayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// // date-fns
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// export const TimeFilter = ({
//   startDate,
//   setStartDate,
//   endDate,
//   setEndDate,
// }: any) => {
//   return (
//     <>
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <DatePicker
//           label="Start Date"
//           value={startDate}
//           // onChange={(newValue: any) => setStartDate(newValue)}
//           format="YYYY-MM-DD"
//           slotProps={{
//             textField: {
//               variant: "outlined",
//               fullWidth: true,
//             },
//           }}
//         />
//       </LocalizationProvider>
//     </>
//     // <LocalizationProvider dateAdapter={AdapterDayjs}>
//     //   <Box sx={{ display: "flex", gap: 2, p: 2 }}>
//     //     <DatePicker
//     //       label="Start Date"
//     //       value={startDate}
//     //       onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
//     //       format="YYYY-MM-DD"
//     //       slotProps={{
//     //         textField: {
//     //           variant: "outlined",
//     //           fullWidth: true,
//     //         },
//     //       }}
//     //     />
//     //     <DatePicker
//     //       label="End Date"
//     //       value={endDate}
//     //       onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
//     //       format="YYYY-MM-DD"
//     //       slotProps={{
//     //         textField: {
//     //           variant: "outlined",
//     //           fullWidth: true,
//     //         },
//     //       }}
//     //     />
//     //   </Box>
//     // </LocalizationProvider>
//   );
// };

import { TextField } from "@mui/material";
import React from "react";

interface TimeFilterProps {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
}

export const TimeFilter: React.FC<TimeFilterProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <div>
      <TextField
        type="date"
        label="Start Date"
        variant="standard"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        type="date"
        label="End Date"
        variant="standard"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};
