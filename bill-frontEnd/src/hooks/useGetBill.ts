import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { BillQueryVariables } from "../gql/graphql";

const getBillDocument = graphql(`
  query bill($_id: String!) {
    bill(_id: $_id) {
      ...BillFragment
    }
  }
`);

const useGetBill = (variables: BillQueryVariables) => {
  return useQuery(getBillDocument, { variables });
};

export { useGetBill };
