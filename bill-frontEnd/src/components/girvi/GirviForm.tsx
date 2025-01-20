// import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
// import { Field, Form, Formik } from "formik";
// import { CustomTextField, IconButton } from "../../elements/UI";

// export const GirviForm = () => {
//   return (
//     <>
//       <Formik
//         initialValues={{
//           number: "",
//           name: "",
//           address: "",
//           data: "",
//           AllItems: [{}],
//         }}
//         onSubmit={async (data: any) => {
//           console.log(data);
//         }}
//       >
//               {{ values, errors, touched, setFieldValue }: any => (

//         <Form>
//           <Field as={TextField} name="number" label="No." />
//           <Field
//             as={TextField}
//             name="date"
//             label="Date"
//             type="date"
//             fullWidth
//             InputLabelProps={{ shrink: true }}
//             // error={touched.date && !!errors.date}
//             // helperText={touched.date && errors.date}
//           />
//           <Grid item xs={12}>
//             <Field
//               as={TextField}
//               name="customerName"
//               label="Name"
//               //   fullWidth
//               //   error={touched.customerName && !!errors.customerName}
//               //   helperText={touched.customerName && errors.customerName}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Field
//               as={TextField}
//               name="customerName"
//               label="address"
//               //   fullWidth
//               //   error={touched.customerName && !!errors.customerName}
//               //   helperText={touched.customerName && errors.customerName}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Field
//               as={TextField}
//               name="customerName"
//               label="amount"
//               //   fullWidth
//               //   error={touched.customerName && !!errors.customerName}
//               //   helperText={touched.customerName && errors.customerName}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Field
//               as={TextField}
//               name="customerName"
//               label="amount in words"
//               fullWidth
//               //   error={touched.customerName && !!errors.customerName}
//               //   helperText={touched.customerName && errors.customerName}
//             />
//           </Grid>
//           <FormControlLabel
//             value="start"
//             control={<Checkbox />}
//             label="interest due"
//             labelPlacement="start"
//           />
//           {/* {values.AllItems.slice(1).map((_: any, index: number) => (
//             <Grid
//               container
//               spacing={2}
//               sx={{
//                 gridTemplateColumns: "repeat(6, 1fr)",
//                 display: "grid",
//               }}
//               key={index + 1}
//             >
//               <CustomTextField name={`AllItems.${index + 1}.hsnCode`} />
//               <CustomTextField name={`AllItems.${index + 1}.products`} />
//               <CustomTextField name={`AllItems.${index + 1}.grossWt`} />
//               <CustomTextField name={`AllItems.${index + 1}.netWt`} />
//               <CustomTextField name={`AllItems.${index + 1}.ratePerUnit`} />
//               <CustomTextField name={`AllItems.${index + 1}.amountRs`} />
//               <IconButton
//                 aria-label="delete"
//                 edge="end"
//                 onClick={() => remove(index + 1)}
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </Grid>
//           ))}
//               </Form>
//                 )} */}
//       </Formik>
//     </>
//   );
// };
import React from "react";
import {
  Modal,
  Box,
  Typography,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";

interface GirviFormProps {
  open: boolean;
  handleClose: () => void;
}

const GirviForm: React.FC<GirviFormProps> = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Container>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",

            transform: "translate(-50%, -50%)",
            //   width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h3"
            textAlign="center"
          >
            FORM 'F'(See Rule 12)
          </Typography>
          <Typography textAlign="center">
            <u>PAWN TICKET</u>
          </Typography>
          <Typography id="modal-description" variant="h4" textAlign="center">
            RADHA KRISHNA JEWELLERS
          </Typography>
          <Typography textAlign="center">
            Pawn Brokers, Main Bazar, HOSPET-583 201.
          </Typography>
          {/* </Box> */}

          <Formik
            initialValues={{
              number: "",
              NameAddress: "",
              date: "",
              phNo: "",
              Item: [
                {
                  principal: 0,
                  amtWords: "",
                  amtLoan: "",
                  No: "",
                  FullDescription: "",
                  grossWt: 0,
                  gms: "",
                  Mgms: "",
                  Value: "",
                },
              ],
              intDue: false,
            }}
            onSubmit={async (values: any) => {
              console.log(values);
            }}
          >
            {({ values, errors, touched }: any) => (
              <Form>
                <TextField name="number" label="No." />
                <TextField name="date" label="Date" />
                <TextField
                  variant="standard"
                  label="Name and address"
                  name="NameAddress"
                />
                <TextField variant="standard" label="Principal amount" />
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Modal>
  );
};

export default GirviForm;
