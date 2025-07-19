import React from "react";
import {
  Modal,
  Box,
  Typography,
  Container,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { FieldArray, Form, Formik, Field } from "formik";
import { Paper } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { CheckBox } from "@mui/icons-material";
import { useCreateGirvi } from "../../hooks/useCreateGirvi";
interface GirviFormProps {
  open: boolean;
  handleClose: () => void;
}

const GirviForm: React.FC<GirviFormProps> = ({ open, handleClose }) => {
  // const [CreateGirvi] = useCreateGirvi();
  const [CreateGirvi] = useCreateGirvi();
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
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: "90vw",
            maxHeight: "90vh",
            overflow: "auto",
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
            Pawn Brokers, Main Bazar, HOSPET-583 201. (Vijayanagara Dist.)
          </Typography>
          <Typography textAlign="center">
            ರಾಧಾಕೃಷ್ಣ ಜ್ಯುವೆಲ್ಲರ್ಸ್ ಪಾನ್‌ಬ್ರೋಕರ್ಸ್, ಮೇನ್ ಬಜಾರ್, ಹೊಸಪೇಟೆ-583 201.
            (ವಿಜಯನಗರ ಜಿಲ್ಲೆ)
          </Typography>

          <Formik
            initialValues={{
              number: "",
              NameAddress: "",
              date: "",
              series: "",
              phNo: "",
              endDate: null,
              intDue: true,
              Item: [
                {
                  principal: 0,
                  amtWords: "",
                  amtLoan: "",
                  No: "",
                  FullDescription: "",
                  grossWt: 0,
                  gms: "",
                  Value: "",
                },
              ],
            }}
            onSubmit={async (values: any) => {
              console.log(values);
              const formData = {
                number: Number(values.number),
                NameAddress: values.NameAddress,
                date: new Date(values.date).toLocaleDateString("en-GB"),
                // phno: values.phNo,
                intDue: values.intDue,
                series: Number(values.number.slice(0, 2)),
                GirviItems: values.Item.map((item: any) => ({
                  amtLoan: item.amtLoan,
                  FullDescription: item.FullDescription,
                  grossWt: Number(item.grossWt),
                  Value: item.Value,
                })),
              };
              console.log("Form Data to Submit:", formData);
              try {
                const data = await CreateGirvi({
                  variables: { createGirviInput: formData },
                });
                console.log("Girvi created successfully:", data);
                handleClose();
              } catch (error) {
                console.error("Error Creating Girvi", error);
              }
            }}
          >
            {({ values, errors, touched }: any) => (
              <Form>
                {/* Thursday Holiday and Date in same row */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography>Thursday Holiday (ಗುರುವಾರ ರಜೆ)</Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ mr: 1, whiteSpace: "nowrap" }}>
                      Date -
                    </Typography>
                    <Field
                      as={TextField}
                      name="date"
                      type="date"
                      variant="standard"
                      sx={{
                        minWidth: "150px",
                        "& .MuiInput-underline:before": {
                          borderBottom: "1px dashed",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottom: "1px dashed",
                        },
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                </Box>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography sx={{ mr: 1, whiteSpace: "nowrap" }}>
                      No. -
                    </Typography>
                    <Field
                      as={TextField}
                      name="number"
                      variant="standard"
                      sx={{
                        "& .MuiInput-underline:before": {
                          borderBottom: "1px dashed",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottom: "1px dashed",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography sx={{ mr: 1, whiteSpace: "nowrap" }}>
                      Name and address of the Pawner -
                    </Typography>
                    <Field
                      as={TextField}
                      name="NameAddress"
                      fullWidth
                      variant="standard"
                      sx={{
                        "& .MuiInput-underline:before": {
                          borderBottom: "1px dashed",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottom: "1px dashed",
                        },
                      }}
                    />
                  </Box>
                </div>
                <CheckBox>
                  <Field
                    type="checkbox"
                    name="intDue"
                    label="Interest Due"
                    checked={values.intDue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      values.intDue = e.target.checked;
                    }}
                  />
                </CheckBox>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ mr: 1, whiteSpace: "nowrap" }}>
                    Phone No. -
                  </Typography>
                  <Field
                    as={TextField}
                    name="phNo"
                    variant="standard"
                    fullWidth
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottom: "1px dashed",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottom: "1px dashed",
                      },
                    }}
                  />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ mr: 1, whiteSpace: "nowrap" }}>
                    Amount of Principal of Loan -
                  </Typography>
                  <Field
                    as={TextField}
                    name="Item[0].principal"
                    variant="standard"
                    fullWidth
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottom: "1px dashed",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottom: "1px dashed",
                      },
                    }}
                  />
                </Box>

                <Box sx={{ overflowX: "auto" }}>
                  <TableContainer component={Paper}>
                    <Table
                      size="small"
                      aria-label="simple table"
                      sx={{ minWidth: "100%" }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              border: 1,
                              borderColor: "grey.500",
                              minWidth: "120px",
                              padding: "8px",
                            }}
                          >
                            amount Loan
                          </TableCell>
                          <TableCell
                            sx={{
                              border: 1,
                              borderColor: "grey.500",
                              minWidth: "80px",
                              padding: "8px",
                            }}
                          >
                            No
                          </TableCell>
                          <TableCell
                            sx={{
                              border: 1,
                              borderColor: "grey.500",
                              minWidth: "200px",
                              padding: "8px",
                            }}
                          >
                            Full and Detailed Description of Articles
                          </TableCell>
                          <TableCell
                            sx={{
                              border: 1,
                              borderColor: "grey.500",
                              minWidth: "120px",
                              padding: "8px",
                            }}
                          >
                            gross Weight
                          </TableCell>
                          <TableCell
                            sx={{
                              border: 1,
                              borderColor: "grey.500",
                              minWidth: "100px",
                              padding: "8px",
                            }}
                          >
                            Weight
                          </TableCell>
                          <TableCell
                            sx={{
                              border: 1,
                              borderColor: "grey.500",
                              minWidth: "100px",
                              padding: "8px",
                            }}
                          >
                            value
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <FieldArray name="Item">
                          {({ push, remove }) => (
                            <>
                              {values.Item.map((item: any, index: number) => (
                                <TableRow key={index}>
                                  <TableCell
                                    sx={{
                                      border: 1,
                                      borderColor: "grey.500",
                                      padding: "8px",
                                    }}
                                  >
                                    <Field
                                      as={TextField}
                                      name={`Item[${index}].amtLoan`}
                                      variant="standard"
                                      fullWidth
                                      multiline
                                      InputProps={{
                                        disableUnderline: true,
                                        style: { fontSize: "0.875rem" },
                                      }}
                                      sx={{
                                        "& .MuiInputBase-root": {
                                          minHeight: "auto",
                                        },
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      border: 1,
                                      borderColor: "grey.500",
                                      padding: "8px",
                                    }}
                                  >
                                    <Field
                                      as={TextField}
                                      name={`Item[${index}].No`}
                                      variant="standard"
                                      fullWidth
                                      multiline
                                      InputProps={{
                                        disableUnderline: true,
                                        style: { fontSize: "0.875rem" },
                                      }}
                                      sx={{
                                        "& .MuiInputBase-root": {
                                          minHeight: "auto",
                                        },
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      border: 1,
                                      borderColor: "grey.500",
                                      padding: "8px",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                      }}
                                    >
                                      <Field
                                        as={TextField}
                                        name={`Item[${index}].FullDescription`}
                                        variant="standard"
                                        fullWidth
                                        multiline
                                        InputProps={{
                                          disableUnderline: true,
                                          style: { fontSize: "0.875rem" },
                                        }}
                                        sx={{
                                          "& .MuiInputBase-root": {
                                            minHeight: "auto",
                                          },
                                        }}
                                      />
                                    </Box>
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      border: 1,
                                      borderColor: "grey.500",
                                      padding: "8px",
                                    }}
                                  >
                                    <Field
                                      as={TextField}
                                      name={`Item[${index}].grossWt`}
                                      variant="standard"
                                      fullWidth
                                      multiline
                                      InputProps={{
                                        disableUnderline: true,
                                        style: { fontSize: "0.875rem" },
                                      }}
                                      sx={{
                                        "& .MuiInputBase-root": {
                                          minHeight: "auto",
                                        },
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      border: 1,
                                      borderColor: "grey.500",
                                      padding: "8px",
                                    }}
                                  >
                                    <Field
                                      as={TextField}
                                      name={`Item[${index}].gms`}
                                      variant="standard"
                                      fullWidth
                                      multiline
                                      InputProps={{
                                        disableUnderline: true,
                                        style: { fontSize: "0.875rem" },
                                      }}
                                      sx={{
                                        "& .MuiInputBase-root": {
                                          minHeight: "auto",
                                        },
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      border: 1,
                                      borderColor: "grey.500",
                                      padding: "8px",
                                    }}
                                  >
                                    <Field
                                      as={TextField}
                                      name={`Item[${index}].Value`}
                                      variant="standard"
                                      fullWidth
                                      multiline
                                      InputProps={{
                                        disableUnderline: true,
                                        style: { fontSize: "0.875rem" },
                                      }}
                                      sx={{
                                        "& .MuiInputBase-root": {
                                          minHeight: "auto",
                                        },
                                      }}
                                    />
                                  </TableCell>
                                  <Box>
                                    <DeleteIcon
                                      style={{
                                        cursor: "pointer",
                                        marginLeft: "4px",
                                        marginTop: "2px",
                                        fontSize: "18px",
                                      }}
                                      onClick={() => remove(index)}
                                    />
                                  </Box>
                                </TableRow>
                              ))}

                              <Box sx={{ mt: 2 }}>
                                <AddCircleOutlineRoundedIcon
                                  style={{
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                  }}
                                  color="primary"
                                  onClick={() =>
                                    push({
                                      amtLoan: "",
                                      No: "",
                                      FullDescription: "",
                                      grossWt: "",
                                      gms: "",
                                      Value: "",
                                    })
                                  }
                                />
                              </Box>
                            </>
                          )}
                        </FieldArray>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Typography textAlign={"center"} sx={{ mt: 2 }}>
                  ಸೂಚನೆ: ವಾಯಿಕೆಕ್ ಸರಿಯಾಗಿ ಪ್ರತಿ 3 ತಿಂಗಳು ಬಡಿ ಕೊಡಬೇಕು
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ mr: 2, marginLeft: "auto", cursor: "pointer" }}
                  >
                    save
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 4,
                    mb: 2,
                  }}
                >
                  {/* Pawn Broker Signature */}
                  <Box sx={{ width: "45%", textAlign: "center" }}>
                    <Box
                      sx={{
                        borderBottom: "1px dashed #000",
                        height: "60px",
                        mb: 1,
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "center",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.875rem", textAlign: "center" }}
                    >
                      Signature of the Pawn Brokers of this agent
                    </Typography>
                  </Box>

                  {/* Pawner Signature */}
                  <Box sx={{ width: "45%", textAlign: "center" }}>
                    <Box
                      sx={{
                        borderBottom: "1px dashed #000",
                        height: "60px",
                        mb: 1,
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "center",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.875rem", textAlign: "center" }}
                    >
                      Signature or Thumb Impression of the Pawner
                    </Typography>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Modal>
  );
};

export default GirviForm;
