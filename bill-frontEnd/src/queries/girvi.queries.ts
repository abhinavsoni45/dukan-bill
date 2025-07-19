import { gql } from "@apollo/client";

export const GET_GIRVIS = gql`
  query Girvis($girviFilterQuery: GirviFilterQuery) {
    girvis(girviFilterQuery: $girviFilterQuery) {
      _id
      userId
      number
      NameAddress
      date
      series
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

export const SERIES_RANGE = gql`
  query seriesRange {
    seriesRange {
      smallest
      largest
    }
  }
`;

// export const CREATE_GIRVI = gql`
//   mutation CreateGirvi($createGirviInput: CreateGirviInput!) {
//     createGirvi(createGirviInput: $createGirviInput) {
//       _id
//       userId
//       number
//       NameAddress
//       date
//       series
//       intDue
//       endDate
//       GirviItems {
//         amtLoan
//         FullDescription
//         grossWt
//         Value
//       }
//     }
//   }
// `;
// export const UPDATE_GIRVI = gql`
//   mutation UpdateGirvi($updateGirviInput: UpdateGirviInput!) {
//     updateGirvi(updateGirviInput: $updateGirviInput) {
//       _id
//       userId
//       number
//       NameAddress
//       date
//       series
//       GirviItems {
//         amtLoan
//         FullDescription
//         grossWt
//         Value
//       }
//     }
//   }
// `;
