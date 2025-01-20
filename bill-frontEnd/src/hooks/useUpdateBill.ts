import { gql, useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { BillFragment } from "../fragments/bill.fragment";
const updateBillDocument = gql(`
  mutation UpdateBill($updateBillInput: UpdateBillInput!) {
    updateBill(updateBillInput: $updateBillInput) {
      _id
      number
      date
      customerName
      taxableValue
      cgst
      sgst
      invoiceTotal
      chequeNo
      bankName
      AllItems {
        hsnCode
        products
        grossWt
        netWt
        ratePerUnit
        amountRs
      }
    }
  }
`);

// const useUpdateBill = () => {
//   return useMutation(updateBillDocument, {
//     update(cache, { data }) {
//       if (!data) return;

//       cache.modify({
//         fields: {
//           bills(existingBills = []) {
//             const updatedBillRef = cache.writeFragment({
//               data: data?.updateBill,
//               fragment: BillFragment,
//             });

//             return existingBills.map((billRef: any) =>
//               billRef.__ref === updatedBillRef?.__ref ? updatedBillRef : billRef
//             );
//           },
//         },
//       });
//     },
//   });
// };
// Define a type for your input object with an index signature
// type CleanableObject = {
//   [key: string]: any;
// };

// // Update the cleanInput function to use the CleanableObject type
// const cleanInput = (input: CleanableObject): CleanableObject => {
//   const acc: CleanableObject = {};

//   for (const key in input) {
//     if (Array.isArray(input[key])) {
//       acc[key] = input[key].map(cleanInput); // Recursively clean arrays
//     } else if (typeof input[key] === "object" && input[key] !== null) {
//       acc[key] = cleanInput(input[key]); // Recursively clean objects
//     } else {
//       acc[key] = input[key]; // Copy other values
//     }
//   }

//   return acc;
// };

// const useUpdateBill = () => {
//   return useMutation(updateBillDocument, {
//     update(cache, { data }) {
//       if (!data) return;

//       cache.modify({
//         fields: {
//           bills(existingBills = []) {
//             const updatedBillRef = cache.writeFragment({
//               data: data?.updateBill,
//               fragment: BillFragment,
//             });

//             return existingBills.map((billRef: any) =>
//               billRef.__ref === updatedBillRef?.__ref ? updatedBillRef : billRef
//             );
//           },
//         },
//       });
//     },
//     // Before sending the mutation, clean the input
//     variables: ({ updateBillInput }: any) => ({
//       updateBillInput: cleanInput(updateBillInput),
//     }),
//   });
// };

const useUpdateBill = () => {
  return useMutation(updateBillDocument);
};

export { useUpdateBill };
