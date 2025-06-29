import { useQuery } from "@apollo/client";
// import { gql } from "@apollo/client";
import { graphql } from "../gql";

export const getGirvisDocument = graphql(`
  query Girvis {
    girvis {
      ...GirviFragment
    }
  }
`);
const useGetGirvis = () => {
  return useQuery(getGirvisDocument);
};

export { useGetGirvis };
