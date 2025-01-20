import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { BillFragment } from "../fragments/bill.fragment";

const createBillDocument = graphql(`
  mutation CreateBill($createBillInput: CreateBillInput!) {
    createBill(createBillInput: $createBillInput) {
      ...BillFragment
    }
  }
`);

const useCreateBill = () => {
  return useMutation(createBillDocument, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          bills(existingBills = []) {
            const newBillRef = cache.writeFragment({
              data: data?.createBill,
              fragment: BillFragment,
            });
            return [...existingBills, newBillRef];
          },
        },
      });
    },
  });
};
export { useCreateBill };
