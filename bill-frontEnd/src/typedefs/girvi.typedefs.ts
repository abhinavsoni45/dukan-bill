import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Girvi {
    _id: ID!
    userId: String
    number: Int!
    NameAddress: String!
    date: String!
    phno: Int
    intDue: Boolean
    GirviItems: [GirviItem!]!
    endDate: String
    viyaj: String
  }

  type GirviItem {
    amtLoan: String!
    FullDescription: String!
    grossWt: Int!
    Value: String!
  }

  type Query {
    girvis: [Girvi!]!
    girvi(_id: String!): Girvi
  }
`;
