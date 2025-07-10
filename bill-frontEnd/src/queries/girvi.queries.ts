import { gql } from "@apollo/client";

export const GET_GIRVIS = gql`
  query Girvis($girviFilterQuery: GirviFilterQuery) {
    girvis(girviFilterQuery: $girviFilterQuery) {
      _id
      userId
      number
      NameAddress
      date
      endDate
      GirviItems {
        amtLoan
        FullDescription
        grossWt
        Value
      }
    }
  }
`;
