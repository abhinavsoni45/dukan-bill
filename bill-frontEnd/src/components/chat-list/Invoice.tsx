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
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomTextField } from "../../elements/UI";
import { Add, ContentCopy, Print } from "@mui/icons-material";
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

const InvoiceForm = ({ handleClose, bill, onThemeToggle }: any) => {
  const printRef = useRef<HTMLDivElement>(null);
  // const handlePrint = useReactToPrint({
  // content: () => printRef.current, // ✅ this is now valid
  // documentTitle: `Invoice_${bill?.number || "New"}`,
  // });
  // const handlePrint = () => {
  //   console.log("Printing invoice...");
  //   if (printRef.current) {
  //     useReactToPrint({
  //       content: () => printRef.current,
  //       documentTitle: `Invoice_${bill?.number || "New"}`,
  //     })();
  //     console.log("Print function called successfully.");
  //   } else {
  //     console.error("Print reference is not set.");
  //   }
  // };

  // const contentRef = useRef<HTMLDivElement>(null);

  console.log("Bill in InvoiceForm:", bill);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `My_HeaderText_Print_${bill?.number || "New"}`,
    onAfterPrint: () => console.log("Printing completed"),
  });

  const [createBill] = useCreateBill();
  const [updateBill] = useUpdateBill();
  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" align="center">
          SRI RADHAKRISHNA JEWELLERS
        </Typography>
        <Typography variant="body2" align="center">
          Main Bazar, HOSAPETE-583 201. <br />
          State: Karnataka Code: 29
        </Typography>
      </Box>
      {bill && (
        <Button
          // variant="outlined"d
          onClick={handlePrint}
          // style={{ marginBottom: 16 }}
        >
          <Print />
        </Button>
      )}
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  name="number"
                  label="No."
                  fullWidth
                  error={touched.number && !!errors.number}
                  helperText={touched.number && errors.number}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  name="date"
                  label="Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={touched.date && !!errors.date}
                  helperText={touched.date && errors.date}
                />
              </Grid>
              <div style={{ position: "fixed", top: "8vh", right: "4vw" }}>
                <Switch
                  name="white"
                  // setFieldValue={setFieldValue}
                  // setFieldValue('white',() => {!white})
                  value={values.white}
                  onChange={onThemeToggle}
                />
              </div>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="customerName"
                  label="Name"
                  fullWidth
                  error={touched.customerName && !!errors.customerName}
                  helperText={touched.customerName && errors.customerName}
                />
              </Grid>

              {/* Grid container with 6 columns */}
              {/* <Grid
                container
                item
                // xs={12}
                // spacing={2}
                sx={{ gridTemplateColumns: "repeat(6, 1fr)" }}
                display="grid"
              > */}
              {/* <CustomTextField
                  // style={{
                  //   paddingTop: "16px",
                  //   marginTop: "24px",
                  //   paddingBottom: "8px",
                  // }}
                  label="HSN Code"
                  name="hsnCode"
                /> */}
              {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
              <FieldArray name="AllItems">
                {({ push, remove }: any) => (
                  <>
                    <Grid
                      container
                      spacing={2}
                      sx={{
                        gridTemplateColumns: "repeat(6, 1fr)",
                        display: "grid",
                      }}
                    >
                      <CustomTextField
                        label="HSN Code"
                        name={`AllItems.0.hsnCode`}
                      />
                      <CustomTextField
                        label="Name of Product"
                        name={`AllItems.0.products`}
                      />
                      <CustomTextField
                        label="Gross Wt."
                        name={`AllItems.0.grossWt`}
                      />
                      <CustomTextField
                        label="Net Wt."
                        name={`AllItems.0.netWt`}
                      />
                      <CustomTextField
                        label="Rate per Unit"
                        name={`AllItems.0.ratePerUnit`}
                      />
                      <CustomTextField
                        label="Amount (Rs.)"
                        name={`AllItems.0.amountRs`}
                      />
                    </Grid>

                    {values.AllItems.slice(1).map((_: any, index: number) => (
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          gridTemplateColumns: "repeat(6, 1fr)",
                          display: "grid",
                        }}
                        key={index + 1}
                      >
                        <CustomTextField
                          name={`AllItems.${index + 1}.hsnCode`}
                        />
                        <CustomTextField
                          name={`AllItems.${index + 1}.products`}
                        />
                        <CustomTextField
                          name={`AllItems.${index + 1}.grossWt`}
                        />
                        <CustomTextField name={`AllItems.${index + 1}.netWt`} />
                        <CustomTextField
                          name={`AllItems.${index + 1}.ratePerUnit`}
                        />
                        <CustomTextField
                          name={`AllItems.${index + 1}.amountRs`}
                        />
                        <IconButton
                          aria-label="delete"
                          edge="end"
                          onClick={() => remove(index + 1)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    ))}

                    <Add
                      // variant="contained"
                      // color="primary"
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
                    />
                  </>
                )}
              </FieldArray>

              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      name="taxableValue"
                      label="Taxable Value"
                      fullWidth
                      error={touched.taxableValue && !!errors.taxableValue}
                      helperText={touched.taxableValue && errors.taxableValue}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      as={TextField}
                      name="cgst"
                      label="CGST @1.5%"
                      fullWidth
                      error={touched.cgst && !!errors.cgst}
                      helperText={touched.cgst && errors.cgst}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      as={TextField}
                      name="sgst"
                      label="SGST @1.5%"
                      fullWidth
                      error={touched.sgst && !!errors.sgst}
                      helperText={touched.sgst && errors.sgst}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  label="cheque No"
                  name="chequeNo"
                  error={touched.chequeNo && !!errors.chequeNo}
                  helperText={touched.chequeNo && errors.chequeNo}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  label="Bank Name"
                  name="bankName"
                  error={touched.bankName && !!errors.bankName}
                  helperText={touched.bankName && errors.bankName}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="invoiceTotal"
                  label="Invoice Total"
                  // fullWidth
                  error={touched.invoiceTotal && !!errors.invoiceTotal}
                  helperText={touched.invoiceTotal && errors.invoiceTotal}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default InvoiceForm;
