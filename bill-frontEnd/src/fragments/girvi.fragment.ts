import { graphql } from "../gql";

export const GirviFragment = graphql(`
  fragment GirviFragment on Girvi {
    _id
    userId
    number
    NameAddress
    date
    phno
    intDue
    GirviItems {
      principal
      amtLoan
      No
      FullDescription
      grossWt
      gms
      Value
    }
  }
`);
// This fragment defines the structure of a Girvi object, which includes fields like _id, userId, number, NameAddress, date, phno, intDue, and an array of GirviItems with their respective fields.
// It can be used in GraphQL queries and mutations to ensure consistent data retrieval and manipulation across
