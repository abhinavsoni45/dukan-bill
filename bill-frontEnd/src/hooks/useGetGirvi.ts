import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { GirviQueryVariables } from "../gql/graphql";
// import { GirviQueryVariables } from "../gql/graphql";

const getGirviDocument = graphql(`
  query girvi($_id: String!) {
    girvi(_id: $_id) {
      ...GirviFragment
    }
  }
`);

const useGetGirvi = (variables: GirviQueryVariables) => {
  return useQuery(getGirviDocument, { variables });
};

export { useGetGirvi };
