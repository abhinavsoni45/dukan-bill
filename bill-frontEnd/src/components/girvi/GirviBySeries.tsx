// const GirviBySeries: React.FC = () => {
//   const { number } = useParams<{ number: string }>();
//   // const seriesNumber = parseInt(number || "0", 10);
//   const seriesNumber = 42; // Hardcoded for testing, replace with actual logic if needed

//   const { data, loading, error } = useGetGirvisBySeries(seriesNumber);

//   if (loading) return <CircularProgress />;
//   if (error)
//     return <Typography color="error">Error: {error.message}</Typography>;
//   if (!data || data.length === 0) {
//     return (
//       <Typography>
//         No Girvi documents found for series number: {seriesNumber}
//       </Typography>
//     );
//   }

//   console.log(data, "Girvi documents for series:", seriesNumber);
//   // return (
//   //   <Box sx={{ p: 3 }}>
//   //     <Typography variant="h4" gutterBottom>
//   //       Girvi Documents for Series: {seriesNumber}
//   //     </Typography>
//   //     <List>
//   //       {girvis.map((girvi: any) => (
//   //         <Paper key={girvi._id} sx={{ mb: 2, p: 2 }}>
//   //           <ListItem>
//   //             <ListItemText
//   //               primary={`Name: ${girvi.NameAddress} - Date: ${girvi.date}`}
//   //               secondary={
//   //                 <>
//   //                   <Typography
//   //                     component="span"
//   //                     variant="body2"
//   //                     color="text.primary"
//   //                   >
//   //                     Number: {girvi.number}
//   //                   </Typography>
//   //                   {girvi.GirviItems && girvi.GirviItems.length > 0 && (
//   //                     <Typography
//   //                       component="span"
//   //                       variant="body2"
//   //                       color="text.secondary"
//   //                       display="block"
//   //                     >
//   //                       Items:{" "}
//   //                       {girvi.GirviItems.map(
//   //                         (item: any) =>
//   //                           `Loan: ${item.amtLoan}, Desc: ${item.FullDescription}`
//   //                       ).join("; ")}
//   //                     </Typography>
//   //                   )}
//   //                 </>
//   //               }
//   //             />
//   //           </ListItem>
//   //         </Paper>
//   //       ))}
//   //     </List>
//   //   </Box>
//   // );
// };
import { useFindRange } from "../../resolvers/girvi.resolvers";
import OutlinedCard from "./Card";

const GirviBySeries = () => {
  // const { data, loading, error } = useGetGirvis({ number: 43 });
  // const { data, loading, error } = useSmallestSeries();
  const { data, loading, error } = useFindRange();
  console.log(data, "numberdata", loading, error, "numberdata");
  return <>{/* <OutlinedCard /> */}</>;
};
export default GirviBySeries;
