import { useMutation, useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { BillQueryVariables } from "../gql/graphql";

const deleteBillDocument = graphql(`
  mutation removeBill($_id: String!) {
    removeBill(_id: $_id) {
      _id
    }
  }
`);

const useDeleteBill = () => {
  return useMutation(deleteBillDocument);
};

export { useDeleteBill };
