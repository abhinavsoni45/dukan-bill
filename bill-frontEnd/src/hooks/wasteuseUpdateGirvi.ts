import { gql, useMutation } from "@apollo/client";
import { graphql } from "../gql";
// import { GirviFragment } from "../fragments/girvi.fragment";
// const updateGirviDocument = gql(`
//   mutation UpdateGirvi($updateGirviInput: UpdateGirviInput!) {
//     updateGirvi(updateGirviInput: $updateGirviInput) {
//      _id
//     userId
//     number
//     NameAddress
//     date
//     phno
//     intDue
//     GirviItems {
//       amtLoan
//       FullDescription
//       grossWt
//       gms
//       Value
//     }
//     }
//   }
// `);
// const updateGirviDocument = gql(`
//   mutation UpdateGirvi($updateGirviInput: UpdateGirviInput!) {
//     updateGirvi(updateGirviInput: $updateGirviInput) {
//      _id
//     userId
//     number
//     NameAddress
//     date
//     phno
//     intDue
//     GirviItems {
//       principal
//       amtLoan
//       No
//       FullDescription
//       grossWt
//       gms
//       Value
//     }
//     }
//   }
// `);

// const useUpdateGirvi = () => {
//   return useMutation(updateGirviDocument);
// };

// export { useUpdateGirvi };
