import { graphql } from "../gql";

// userId needs to be included
export const BillFragment = graphql(`
  fragment BillFragment on Bill {
    _id
    userId
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
`);
