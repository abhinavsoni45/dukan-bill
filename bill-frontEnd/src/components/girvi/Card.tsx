import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CardBody = ({ girvi }: { girvi: any }) => (
  <React.Fragment>
    <CardContent>
      <Typography
        gutterBottom
        sx={{ color: "black", fontSize: 14, textAlign: "center" }}
      >
        {girvi.number || "number"}
      </Typography>
      <Typography
        variant="h5"
        component="div"
        style={{ textAlign: "center", color: "black" }}
      >
        {girvi.NameAddress}
      </Typography>
      <Typography sx={{ color: "black", mb: 1.5, textAlign: "center" }}>
        AMOUNT
      </Typography>
      <Typography sx={{ color: "black", mb: 1.5, textAlign: "center" }}>
        INT DUE?
      </Typography>

      <Typography sx={{ color: "black", mb: 1.5, textAlign: "center" }}>
        DATE
      </Typography>

      <Typography
        variant="body2"
        style={{ textAlign: "center", color: "black" }}
      >
        Item Details
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    {/* <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions> */}
  </React.Fragment>
);

export default function OutlinedCard(girvis: any) {
  console.log(girvis?.girvis, "line 52");

  return (
    <Box sx={{}}>
      {girvis?.girvis?.map((girvi: any, idx: any) => (
        <Card
          key={girvi?._id ?? idx}
          variant="outlined"
          style={{ backgroundColor: "yellow", width: "250px" }}
        >
          <CardBody girvi={girvi} />
        </Card>
      ))}
    </Box>
  );
}
