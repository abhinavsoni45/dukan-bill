/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useRef } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  Switch,
  Paper,
  Stack,
  Card,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomTextField } from "../../elements/UI";
import {
  Add,
  Calculate,
  ContentCopy,
  Info,
  Payment,
  Print,
} from "@mui/icons-material";
import { PrintableInvoice } from "../Printables/PrintableInvoice";
import { useCreateBill } from "../../hooks/useCreateBill";
import { useUpdateBill } from "../../hooks/useUpdateBill";

const validationSchema = Yup.object({
  // number: Yup.string().required("Required"),
  // customerName: Yup.string().required("Required"),
  // date: Yup.date().required("Required"),
  // hsnCode: Yup.string().required("Required"),
  // grossWt: Yup.number().required("Required"),
  // netWt: Yup.number().required("Required"),
  // ratePerUnit: Yup.number().required("Required"),
  // amountRs: Yup.number().required("Required"),
  // taxableValue: Yup.number().required("Required"),
  // cgst: Yup.number().required("Required"),
  // sgst: Yup.number().required("Required"),
  // invoiceTotal: Yup.number().required("Required"),
  // chequeNo: Yup.string(),
  // bankName: Yup.string(),
  // AllItems: Yup.array().of(
  //   Yup.object().shape({
  //     hsnCode: Yup.string().required("Required"),
  //     products: Yup.string().required("Required"),
  //     grossWt: Yup.number().required("Required"),
  //     netWt: Yup.number().required("Required"),
  //     ratePerUnit: Yup.number().required("Required"),
  //     amountRs: Yup.number().required("Required"),
  //   })
  // ),
});

const CustomTextFieldDelete = ({ label, name, onDelete, ...props }: any) => {
  return (
    <Box mb={2} position="relative">
      {/* Label on top */}
      <Typography variant="subtitle1" align="left" component="div">
        {label}
      </Typography>
      {/* Input field with delete icon inside */}
      <TextField
        fullWidth
        name={name}
        variant="outlined"
        size="small"
        {...props}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="delete"
                edge="end"
                onClick={onDelete}
                sx={{ visibility: "hidden", transition: "visibility 0.3s" }} // initially hidden
                className="delete-icon"
              >
                <DeleteIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "&:hover .delete-icon": {
            visibility: "visible", // visible on hover
          },
        }}
      />
    </Box>
  );
};

// const InvoiceForm = ({ handleClose, bill, onThemeToggle }: any) => {
//   const printRef = useRef<HTMLDivElement>(null);
//   // const handlePrint = useReactToPrint({
//   // content: () => printRef.current, // ✅ this is now valid
//   // documentTitle: `Invoice_${bill?.number || "New"}`,
//   // });
//   // const handlePrint = () => {
//   //   console.log("Printing invoice...");
//   //   if (printRef.current) {
//   //     useReactToPrint({
//   //       content: () => printRef.current,
//   //       documentTitle: `Invoice_${bill?.number || "New"}`,
//   //     })();
//   //     console.log("Print function called successfully.");
//   //   } else {
//   //     console.error("Print reference is not set.");
//   //   }
//   // };

//   // const contentRef = useRef<HTMLDivElement>(null);

//   console.log("Bill in InvoiceForm:", bill);
//   const handlePrint = useReactToPrint({
//     contentRef: printRef,
//     documentTitle: `My_HeaderText_Print_${bill?.number || "New"}`,
//     onAfterPrint: () => console.log("Printing completed"),
//   });

//   const [createBill] = useCreateBill();
//   const [updateBill] = useUpdateBill();
//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Paper elevation={4} sx={{ p: 4, borderRadius: 3, position: "relative" }}>
//         <Stack spacing={3}>
//           <Box sx={{ mb: 4 }}>
//             <Typography variant="h5" align="center">
//               SRI RADHAKRISHNA JEWELLERS
//             </Typography>
//             <Typography variant="body2" align="center">
//               Main Bazar, HOSAPETE-583 201. <br />
//               State: Karnataka Code: 29
//             </Typography>
//           </Box>
//           {bill && (
//             <Button
//               // variant="outlined"d
//               onClick={handlePrint}
//               // style={{ marginBottom: 16 }}
//             >
//               <Print />
//             </Button>
//           )}
//           <div style={{ display: "none" }}>
//             <PrintableInvoice ref={printRef} bill={bill} />
//           </div>
//           <Formik
//             initialValues={{
//               number: bill?.number || "",
//               customerName: bill?.customerName || "",
//               date: bill?.date || "",
//               AllItems: bill?.AllItems || [
//                 {
//                   hsnCode: "",
//                   products: "",
//                   grossWt: "",
//                   netWt: "",
//                   ratePerUnit: "",
//                   amountRs: "",
//                 },
//               ],
//               white: false,
//               taxableValue: bill?.taxableValue || "",
//               cgst: bill?.cgst || "",
//               sgst: bill?.sgst || "",
//               invoiceTotal: bill?.invoiceTotal || "",
//               chequeNo: bill?.chequeNo || "",
//               bankName: bill?.bankName || "",
//             }}
//             validationSchema={validationSchema}
//             onSubmit={async (values: any) => {
//               console.log(values);
//               const formattedValues = {
//                 number: Number(values.number),
//                 customerName: values.customerName,
//                 date: values.date, // Ensure this is in the correct date format
//                 taxableValue: Number(values.taxableValue),
//                 cgst: values.cgst ? Number(values.cgst) : undefined,
//                 sgst: values.sgst ? Number(values.sgst) : undefined,
//                 invoiceTotal: Number(values.invoiceTotal),
//                 chequeNo: values.chequeNo || undefined,
//                 bankName: values.bankName || undefined,
//                 AllItems: values.AllItems.map((item: any) => ({
//                   hsnCode: item.hsnCode || undefined,
//                   products: item.products,
//                   grossWt: Number(item.grossWt),
//                   netWt: Number(item.netWt),
//                   ratePerUnit: Number(item.ratePerUnit),
//                   amountRs: Number(item.amountRs),
//                 })),
//                 // userId: "66cc41fc32ed9bda77940446",
//               };
//               console.log(formattedValues, "Formatted Values");
//               const cleanInput = (input: any) => {
//                 const { __typename, userId, ...cleanedInput } = input;
//                 cleanedInput._id = bill._id;
//                 return cleanedInput;
//               };
//               try {
//                 let updateData;
//                 if (bill) {
//                   updateData = { ...bill, ...formattedValues };
//                   const sanitizedInput = cleanInput(updateData);

//                   const data = await updateBill({
//                     variables: { updateBillInput: sanitizedInput },
//                   });
//                 } else {
//                   const data = await createBill({
//                     variables: { createBillInput: formattedValues },
//                   });
//                 }
//                 console.log(formattedValues, "this is fomrat");
//                 console.log(updateData, "this is updatedDAta");

//                 // const datasave = updateData ? createBillInput()
//                 // const operation = bill ? updateBill : createBill;
//                 // Properly format the variables for the mutation
//                 // const variables = bill
//                 // ? { updateBillInput: updateData } // For update
//                 // : { createBillInput: updateData }; // For create

//                 // console.log(operation);

//                 // Pass the correctly structured variables to the operation
//                 // await operation({ variables });

//                 handleClose();
//                 // const data = await createBill({
//                 //   variables: { createBillInput: formattedValues },
//                 // });

//                 // handleClose();

//                 console.log("Bill created successfully:");
//               } catch (error) {
//                 // Handle error, e.g., show error message
//                 console.error("Error creating bill:", error);
//               }
//             }}
//           >
//             {({ values, errors, touched, setFieldValue }: any) => (
//               <Form>
//                 <Stack spacing={3}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                       <Field
//                         as={TextField}
//                         name="number"
//                         label="No."
//                         fullWidth
//                         error={touched.number && !!errors.number}
//                         helperText={touched.number && errors.number}
//                       />
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Field
//                         as={TextField}
//                         name="date"
//                         label="Date"
//                         type="date"
//                         fullWidth
//                         InputLabelProps={{ shrink: true }}
//                         error={touched.date && !!errors.date}
//                         helperText={touched.date && errors.date}
//                       />
//                     </Grid>
//                     <div
//                       style={{ position: "fixed", top: "8vh", right: "4vw" }}
//                     >
//                       <Switch
//                         name="white"
//                         // setFieldValue={setFieldValue}
//                         // setFieldValue('white',() => {!white})
//                         value={values.white}
//                         onChange={onThemeToggle}
//                       />
//                     </div>
//                     <Grid item xs={12}>
//                       <Field
//                         as={TextField}
//                         name="customerName"
//                         label="Name"
//                         fullWidth
//                         error={touched.customerName && !!errors.customerName}
//                         helperText={touched.customerName && errors.customerName}
//                       />
//                     </Grid>

//                     {/* Grid container with 6 columns */}
//                     {/* <Grid
//                 container
//                 item
//                 // xs={12}
//                 // spacing={2}
//                 sx={{ gridTemplateColumns: "repeat(6, 1fr)" }}
//                 display="grid"
//               > */}
//                     {/* <CustomTextField
//                   // style={{
//                   //   paddingTop: "16px",
//                   //   marginTop: "24px",
//                   //   paddingBottom: "8px",
//                   // }}
//                   label="HSN Code"
//                   name="hsnCode"
//                 /> */}
//                     {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
//                     <FieldArray name="AllItems">
//                       {({ push, remove }: any) => (
//                         <>
//                           <Grid
//                             container
//                             spacing={2}
//                             sx={{
//                               gridTemplateColumns: "repeat(6, 1fr)",
//                               display: "grid",
//                             }}
//                           >
//                             <CustomTextField
//                               label="HSN Code"
//                               name={`AllItems.0.hsnCode`}
//                             />
//                             <CustomTextField
//                               label="Name of Product"
//                               name={`AllItems.0.products`}
//                             />
//                             <CustomTextField
//                               label="Gross Wt."
//                               name={`AllItems.0.grossWt`}
//                             />
//                             <CustomTextField
//                               label="Net Wt."
//                               name={`AllItems.0.netWt`}
//                             />
//                             <CustomTextField
//                               label="Rate per Unit"
//                               name={`AllItems.0.ratePerUnit`}
//                             />
//                             <CustomTextField
//                               label="Amount (Rs.)"
//                               name={`AllItems.0.amountRs`}
//                             />
//                           </Grid>

//                           {values.AllItems.slice(1).map(
//                             (_: any, index: number) => (
//                               <Grid
//                                 container
//                                 spacing={2}
//                                 sx={{
//                                   gridTemplateColumns: "repeat(6, 1fr)",
//                                   display: "grid",
//                                 }}
//                                 key={index + 1}
//                               >
//                                 <CustomTextField
//                                   name={`AllItems.${index + 1}.hsnCode`}
//                                 />
//                                 <CustomTextField
//                                   name={`AllItems.${index + 1}.products`}
//                                 />
//                                 <CustomTextField
//                                   name={`AllItems.${index + 1}.grossWt`}
//                                 />
//                                 <CustomTextField
//                                   name={`AllItems.${index + 1}.netWt`}
//                                 />
//                                 <CustomTextField
//                                   name={`AllItems.${index + 1}.ratePerUnit`}
//                                 />
//                                 <CustomTextField
//                                   name={`AllItems.${index + 1}.amountRs`}
//                                 />
//                                 <IconButton
//                                   aria-label="delete"
//                                   edge="end"
//                                   onClick={() => remove(index + 1)}
//                                 >
//                                   <DeleteIcon />
//                                 </IconButton>
//                               </Grid>
//                             )
//                           )}

//                           <Add
//                             // variant="contained"
//                             // color="primary"
//                             onClick={() =>
//                               push({
//                                 hsnCode: "",
//                                 products: "",
//                                 grossWt: "",
//                                 netWt: "",
//                                 ratePerUnit: "",
//                                 amountRs: "",
//                               })
//                             }
//                           />
//                         </>
//                       )}
//                     </FieldArray>

//                     <Grid item xs={12}>
//                       <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                           <Field
//                             as={TextField}
//                             name="taxableValue"
//                             label="Taxable Value"
//                             fullWidth
//                             error={
//                               touched.taxableValue && !!errors.taxableValue
//                             }
//                             helperText={
//                               touched.taxableValue && errors.taxableValue
//                             }
//                           />
//                         </Grid>
//                         <Grid item xs={3}>
//                           <Field
//                             as={TextField}
//                             name="cgst"
//                             label="CGST @1.5%"
//                             fullWidth
//                             error={touched.cgst && !!errors.cgst}
//                             helperText={touched.cgst && errors.cgst}
//                           />
//                         </Grid>
//                         <Grid item xs={3}>
//                           <Field
//                             as={TextField}
//                             name="sgst"
//                             label="SGST @1.5%"
//                             fullWidth
//                             error={touched.sgst && !!errors.sgst}
//                             helperText={touched.sgst && errors.sgst}
//                           />
//                         </Grid>
//                       </Grid>
//                     </Grid>

//                     <Grid item xs={12}>
//                       <TextField
//                         variant="standard"
//                         label="cheque No"
//                         name="chequeNo"
//                         error={touched.chequeNo && !!errors.chequeNo}
//                         helperText={touched.chequeNo && errors.chequeNo}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         variant="standard"
//                         label="Bank Name"
//                         name="bankName"
//                         error={touched.bankName && !!errors.bankName}
//                         helperText={touched.bankName && errors.bankName}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Field
//                         as={TextField}
//                         name="invoiceTotal"
//                         label="Invoice Total"
//                         // fullWidth
//                         error={touched.invoiceTotal && !!errors.invoiceTotal}
//                         helperText={touched.invoiceTotal && errors.invoiceTotal}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Button variant="contained" color="primary" type="submit">
//                         Submit
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </Stack>
//               </Form>
//             )}
//           </Formik>
//         </Stack>
//       </Paper>
//     </Container>
//   );
// };

const InvoiceForm = ({ handleClose, bill, onThemeToggle }: any) => {
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `My_HeaderText_Print_${bill?.number || "New"}`,
    onAfterPrint: () => console.log("Printing completed"),
  });

  const [createBill] = useCreateBill();
  const [updateBill] = useUpdateBill();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={8}
        sx={{
          p: 0,
          borderRadius: 4,
          position: "relative",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          overflow: "hidden",
        }}
      >
        {/* Header Section with Gradient Background */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            p: 4,
            textAlign: "center",
            position: "relative",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            SRI RADHAKRISHNA JEWELLERS
          </Typography>
          <Typography
            variant="body1"
            sx={{
              opacity: 0.9,
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Main Bazar, HOSAPETE-583 201
            <br />
            State: Karnataka Code: 29
          </Typography>

          {/* Theme Toggle */}
          <Box sx={{ position: "absolute", top: 16, right: 16 }}>
            <Switch
              name="white"
              onChange={onThemeToggle}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#fff",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "rgba(255,255,255,0.3)",
                },
              }}
            />
          </Box>
        </Box>

        {/* Form Content */}
        <Box sx={{ p: 4, backgroundColor: "background.paper" }}>
          {/* Print Button */}
          {bill && (
            <Box display="flex" justifyContent="flex-end" mb={3}>
              <Button
                variant="outlined"
                startIcon={<Print />}
                onClick={handlePrint}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  py: 1,
                  borderColor: "#667eea",
                  color: "#667eea",
                  "&:hover": {
                    backgroundColor: "#667eea",
                    color: "white",
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Print Invoice
              </Button>
            </Box>
          )}

          {/* Hidden Print Component */}
          <div style={{ display: "none" }}>
            <PrintableInvoice ref={printRef} bill={bill} />
          </div>

          <Formik
            initialValues={{
              number: bill?.number || "",
              customerName: bill?.customerName || "",
              date: bill?.date || "",
              AllItems: bill?.AllItems || [
                {
                  hsnCode: "",
                  products: "",
                  grossWt: "",
                  netWt: "",
                  ratePerUnit: "",
                  amountRs: "",
                },
              ],
              white: false,
              taxableValue: bill?.taxableValue || "",
              cgst: bill?.cgst || "",
              sgst: bill?.sgst || "",
              invoiceTotal: bill?.invoiceTotal || "",
              chequeNo: bill?.chequeNo || "",
              bankName: bill?.bankName || "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values: any) => {
              console.log(values);
              const formattedValues = {
                number: Number(values.number),
                customerName: values.customerName,
                date: values.date, // Ensure this is in the correct date format
                taxableValue: Number(values.taxableValue),
                cgst: values.cgst ? Number(values.cgst) : undefined,
                sgst: values.sgst ? Number(values.sgst) : undefined,
                invoiceTotal: Number(values.invoiceTotal),
                chequeNo: values.chequeNo || undefined,
                bankName: values.bankName || undefined,
                AllItems: values.AllItems.map((item: any) => ({
                  hsnCode: item.hsnCode || undefined,
                  products: item.products,
                  grossWt: Number(item.grossWt),
                  netWt: Number(item.netWt),
                  ratePerUnit: Number(item.ratePerUnit),
                  amountRs: Number(item.amountRs),
                })),
                // userId: "66cc41fc32ed9bda77940446",
              };
              console.log(formattedValues, "Formatted Values");
              const cleanInput = (input: any) => {
                const { __typename, userId, ...cleanedInput } = input;
                cleanedInput._id = bill._id;
                return cleanedInput;
              };
              try {
                let updateData;
                if (bill) {
                  updateData = { ...bill, ...formattedValues };
                  const sanitizedInput = cleanInput(updateData);

                  const data = await updateBill({
                    variables: { updateBillInput: sanitizedInput },
                  });
                } else {
                  const data = await createBill({
                    variables: { createBillInput: formattedValues },
                  });
                }
                console.log(formattedValues, "this is fomrat");
                console.log(updateData, "this is updatedDAta");

                // const datasave = updateData ? createBillInput()
                // const operation = bill ? updateBill : createBill;
                // Properly format the variables for the mutation
                // const variables = bill
                // ? { updateBillInput: updateData } // For update
                // : { createBillInput: updateData }; // For create

                // console.log(operation);

                // Pass the correctly structured variables to the operation
                // await operation({ variables });

                handleClose();
                // const data = await createBill({
                //   variables: { createBillInput: formattedValues },
                // });

                // handleClose();

                console.log("Bill created successfully:");
              } catch (error) {
                // Handle error, e.g., show error message
                console.error("Error creating bill:", error);
              }
            }}
          >
            {({ values, errors, touched, setFieldValue }: any) => (
              <Form>
                <Stack spacing={4}>
                  {/* Basic Information Section */}
                  <Card
                    elevation={2}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: "#667eea",
                        fontWeight: 600,
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Info />
                      Basic Information
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="number"
                          label="Invoice Number"
                          fullWidth
                          variant="outlined"
                          error={touched.number && !!errors.number}
                          helperText={touched.number && errors.number}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover fieldset": {
                                borderColor: "#667eea",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#667eea",
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="date"
                          label="Date"
                          type="date"
                          fullWidth
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                          error={touched.date && !!errors.date}
                          helperText={touched.date && errors.date}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover fieldset": {
                                borderColor: "#667eea",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#667eea",
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="customerName"
                          label="Customer Name"
                          fullWidth
                          variant="outlined"
                          error={touched.customerName && !!errors.customerName}
                          helperText={
                            touched.customerName && errors.customerName
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover fieldset": {
                                borderColor: "#667eea",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#667eea",
                              },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Card>

                  {/* Items Section */}
                  <Card
                    elevation={2}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: "#667eea",
                        fontWeight: 600,
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {/* <ShoppingCartIcon /> */}
                      Invoice Items
                    </Typography>

                    <FieldArray name="AllItems">
                      {({ push, remove }: any) => (
                        <>
                          {/* Items Header */}
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "repeat(6, 1fr)",
                              gap: 2,
                              mb: 2,
                              p: 2,
                              backgroundColor: "grey.50",
                              borderRadius: 2,
                            }}
                          >
                            <Typography variant="subtitle2" fontWeight={600}>
                              HSN Code
                            </Typography>
                            <Typography variant="subtitle2" fontWeight={600}>
                              Product
                            </Typography>
                            <Typography variant="subtitle2" fontWeight={600}>
                              Gross Wt.
                            </Typography>
                            <Typography variant="subtitle2" fontWeight={600}>
                              Net Wt.
                            </Typography>
                            <Typography variant="subtitle2" fontWeight={600}>
                              Rate/Unit
                            </Typography>
                            <Typography variant="subtitle2" fontWeight={600}>
                              Amount (₹)
                            </Typography>
                          </Box>

                          {values.AllItems.map((_: any, index: number) => (
                            <Box
                              key={index}
                              sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(6, 1fr)",
                                gap: 2,
                                mb: 2,
                                p: 2,
                                backgroundColor:
                                  index % 2 === 0
                                    ? "background.paper"
                                    : "grey.25",
                                borderRadius: 2,
                                border: "1px solid",
                                borderColor: "divider",
                                position: "relative",
                              }}
                            >
                              <CustomTextField
                                name={`AllItems.${index}.hsnCode`}
                              />
                              <CustomTextField
                                name={`AllItems.${index}.products`}
                              />
                              <CustomTextField
                                name={`AllItems.${index}.grossWt`}
                              />
                              <CustomTextField
                                name={`AllItems.${index}.netWt`}
                              />
                              <CustomTextField
                                name={`AllItems.${index}.ratePerUnit`}
                              />
                              <CustomTextField
                                name={`AllItems.${index}.amountRs`}
                              />

                              {index > 0 && (
                                <IconButton
                                  onClick={() => remove(index)}
                                  sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    color: "error.main",
                                    "&:hover": {
                                      backgroundColor: "error.light",
                                      color: "white",
                                    },
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              )}
                            </Box>
                          ))}

                          <Button
                            startIcon={<Add />}
                            onClick={() =>
                              push({
                                hsnCode: "",
                                products: "",
                                grossWt: "",
                                netWt: "",
                                ratePerUnit: "",
                                amountRs: "",
                              })
                            }
                            sx={{
                              mt: 2,
                              borderRadius: 3,
                              px: 3,
                              py: 1.5,
                              borderColor: "#667eea",
                              color: "#667eea",
                              "&:hover": {
                                backgroundColor: "#667eea",
                                color: "white",
                                transform: "translateY(-1px)",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                              },
                              transition: "all 0.3s ease",
                            }}
                            variant="outlined"
                          >
                            Add Item
                          </Button>
                        </>
                      )}
                    </FieldArray>
                  </Card>

                  {/* Tax Calculations Section */}
                  <Card
                    elevation={2}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: "#667eea",
                        fontWeight: 600,
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Calculate />
                      Tax Calculations
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="taxableValue"
                          label="Taxable Value"
                          fullWidth
                          variant="outlined"
                          error={touched.taxableValue && !!errors.taxableValue}
                          helperText={
                            touched.taxableValue && errors.taxableValue
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Field
                          as={TextField}
                          name="cgst"
                          label="CGST @1.5%"
                          fullWidth
                          variant="outlined"
                          error={touched.cgst && !!errors.cgst}
                          helperText={touched.cgst && errors.cgst}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Field
                          as={TextField}
                          name="sgst"
                          label="SGST @1.5%"
                          fullWidth
                          variant="outlined"
                          error={touched.sgst && !!errors.sgst}
                          helperText={touched.sgst && errors.sgst}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Card>

                  {/* Payment Details Section */}
                  <Card
                    elevation={2}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: "#667eea",
                        fontWeight: 600,
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Payment />
                      Payment Details
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Field
                          as={TextField}
                          name="chequeNo"
                          label="Cheque Number"
                          fullWidth
                          variant="outlined"
                          error={touched.chequeNo && !!errors.chequeNo}
                          helperText={touched.chequeNo && errors.chequeNo}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Field
                          as={TextField}
                          name="bankName"
                          label="Bank Name"
                          fullWidth
                          variant="outlined"
                          error={touched.bankName && !!errors.bankName}
                          helperText={touched.bankName && errors.bankName}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Field
                          as={TextField}
                          name="invoiceTotal"
                          label="Invoice Total"
                          fullWidth
                          variant="outlined"
                          error={touched.invoiceTotal && !!errors.invoiceTotal}
                          helperText={
                            touched.invoiceTotal && errors.invoiceTotal
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              fontWeight: 600,
                              fontSize: "1.1rem",
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Card>

                  {/* Action Buttons */}
                  <Box display="flex" gap={2} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      onClick={handleClose}
                      sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        borderColor: "grey.400",
                        color: "grey.600",
                        "&:hover": {
                          borderColor: "grey.600",
                          backgroundColor: "grey.50",
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                          transform: "translateY(-1px)",
                          boxShadow: "0 6px 20px rgba(102, 126, 234, 0.5)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {bill ? "Update Invoice" : "Create Invoice"}
                    </Button>
                  </Box>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Container>
  );
};
export default InvoiceForm;
