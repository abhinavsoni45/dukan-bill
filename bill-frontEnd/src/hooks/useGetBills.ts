import { useQuery } from "@apollo/client";
// import { gql } from "@apollo/client";
import { graphql } from "../gql";

export const getBillsDocument = graphql(`
  query Bills {
    bills {
      ...BillFragment
    }
  }
`);
// export const getBillsDocument = gql`
//   query bills {
//     bills {
//       _id
//       userId
//       number
//       date
//       customerName
//       taxableValue
//       cgst
//       sgst
//       invoiceTotal
//       chequeNo
//       bankName
//       AllItems {
//         hsnCode
//         products
//         grossWt
//         netWt
//         ratePerUnit
//         amountRs
//       }
//     }
//   }
// `;
const useGetBills = () => {
  return useQuery(getBillsDocument);
};

export { useGetBills };
