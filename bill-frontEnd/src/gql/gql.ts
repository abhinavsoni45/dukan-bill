/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment BillFragment on Bill {\n    _id\n    userId\n    number\n    date\n    customerName\n    taxableValue\n    cgst\n    sgst\n    invoiceTotal\n    chequeNo\n    bankName\n    AllItems {\n      hsnCode\n      products\n      grossWt\n      netWt\n      ratePerUnit\n      amountRs\n    }\n  }\n": types.BillFragmentFragmentDoc,
    "\n  fragment GirviFragment on Girvi {\n    _id\n    userId\n    NameAddress\n    date\n    GirviItems {\n      Value\n    }\n  }\n": types.GirviFragmentFragmentDoc,
    "\n  mutation CreateBill($createBillInput: CreateBillInput!) {\n    createBill(createBillInput: $createBillInput) {\n      ...BillFragment\n    }\n  }\n": types.CreateBillDocument,
    "\n  mutation CreateGirvi($createGirviInput: CreateGirviInput!) {\n    createGirvi(createGirviInput: $createGirviInput) {\n      ...GirviFragment\n    }\n  }\n": types.CreateGirviDocument,
    "\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation removeBill($_id: String!) {\n    removeBill(_id: $_id) {\n      _id\n    }\n  }\n": types.RemoveBillDocument,
    "\n  query bill($_id: String!) {\n    bill(_id: $_id) {\n      ...BillFragment\n    }\n  }\n": types.BillDocument,
    "\n  query Bills {\n    bills {\n      ...BillFragment\n    }\n  }\n": types.BillsDocument,
    "\n  query girvi($_id: String!) {\n    girvi(_id: $_id) {\n      ...GirviFragment\n    }\n  }\n": types.GirviDocument,
    "\n  query Me {\n    me {\n      _id\n      email\n    }\n  }\n": types.MeDocument,
    "\n  mutation UpdateBill($updateBillInput: UpdateBillInput!) {\n    updateBill(updateBillInput: $updateBillInput) {\n      _id\n      number\n      date\n      customerName\n      taxableValue\n      cgst\n      sgst\n      invoiceTotal\n      chequeNo\n      bankName\n      AllItems {\n        hsnCode\n        products\n        grossWt\n        netWt\n        ratePerUnit\n        amountRs\n      }\n    }\n  }\n": types.UpdateBillDocument,
    "\n  mutation UpdateGirvi($updateGirviInput: UpdateGirviInput!) {\n    updateGirvi(updateGirviInput: $updateGirviInput) {\n     _id\n    userId\n    number\n    NameAddress\n    date\n    phno\n    intDue\n    GirviItems {\n      amtLoan\n      FullDescription\n      grossWt\n      gms\n      Value\n    }\n    }\n  }\n": types.UpdateGirviDocument,
    "\n  query Girvis($girviFilterQuery: GirviFilterQuery) {\n    girvis(girviFilterQuery: $girviFilterQuery) {\n      _id\n      userId\n      number\n      NameAddress\n      date\n      endDate\n      GirviItems {\n        amtLoan\n        FullDescription\n        grossWt\n        Value\n      }\n    }\n  }\n": types.GirvisDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BillFragment on Bill {\n    _id\n    userId\n    number\n    date\n    customerName\n    taxableValue\n    cgst\n    sgst\n    invoiceTotal\n    chequeNo\n    bankName\n    AllItems {\n      hsnCode\n      products\n      grossWt\n      netWt\n      ratePerUnit\n      amountRs\n    }\n  }\n"): (typeof documents)["\n  fragment BillFragment on Bill {\n    _id\n    userId\n    number\n    date\n    customerName\n    taxableValue\n    cgst\n    sgst\n    invoiceTotal\n    chequeNo\n    bankName\n    AllItems {\n      hsnCode\n      products\n      grossWt\n      netWt\n      ratePerUnit\n      amountRs\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GirviFragment on Girvi {\n    _id\n    userId\n    NameAddress\n    date\n    GirviItems {\n      Value\n    }\n  }\n"): (typeof documents)["\n  fragment GirviFragment on Girvi {\n    _id\n    userId\n    NameAddress\n    date\n    GirviItems {\n      Value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBill($createBillInput: CreateBillInput!) {\n    createBill(createBillInput: $createBillInput) {\n      ...BillFragment\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBill($createBillInput: CreateBillInput!) {\n    createBill(createBillInput: $createBillInput) {\n      ...BillFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateGirvi($createGirviInput: CreateGirviInput!) {\n    createGirvi(createGirviInput: $createGirviInput) {\n      ...GirviFragment\n    }\n  }\n"): (typeof documents)["\n  mutation CreateGirvi($createGirviInput: CreateGirviInput!) {\n    createGirvi(createGirviInput: $createGirviInput) {\n      ...GirviFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeBill($_id: String!) {\n    removeBill(_id: $_id) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation removeBill($_id: String!) {\n    removeBill(_id: $_id) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query bill($_id: String!) {\n    bill(_id: $_id) {\n      ...BillFragment\n    }\n  }\n"): (typeof documents)["\n  query bill($_id: String!) {\n    bill(_id: $_id) {\n      ...BillFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Bills {\n    bills {\n      ...BillFragment\n    }\n  }\n"): (typeof documents)["\n  query Bills {\n    bills {\n      ...BillFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query girvi($_id: String!) {\n    girvi(_id: $_id) {\n      ...GirviFragment\n    }\n  }\n"): (typeof documents)["\n  query girvi($_id: String!) {\n    girvi(_id: $_id) {\n      ...GirviFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      _id\n      email\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      _id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateBill($updateBillInput: UpdateBillInput!) {\n    updateBill(updateBillInput: $updateBillInput) {\n      _id\n      number\n      date\n      customerName\n      taxableValue\n      cgst\n      sgst\n      invoiceTotal\n      chequeNo\n      bankName\n      AllItems {\n        hsnCode\n        products\n        grossWt\n        netWt\n        ratePerUnit\n        amountRs\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateBill($updateBillInput: UpdateBillInput!) {\n    updateBill(updateBillInput: $updateBillInput) {\n      _id\n      number\n      date\n      customerName\n      taxableValue\n      cgst\n      sgst\n      invoiceTotal\n      chequeNo\n      bankName\n      AllItems {\n        hsnCode\n        products\n        grossWt\n        netWt\n        ratePerUnit\n        amountRs\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateGirvi($updateGirviInput: UpdateGirviInput!) {\n    updateGirvi(updateGirviInput: $updateGirviInput) {\n     _id\n    userId\n    number\n    NameAddress\n    date\n    phno\n    intDue\n    GirviItems {\n      amtLoan\n      FullDescription\n      grossWt\n      gms\n      Value\n    }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateGirvi($updateGirviInput: UpdateGirviInput!) {\n    updateGirvi(updateGirviInput: $updateGirviInput) {\n     _id\n    userId\n    number\n    NameAddress\n    date\n    phno\n    intDue\n    GirviItems {\n      amtLoan\n      FullDescription\n      grossWt\n      gms\n      Value\n    }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Girvis($girviFilterQuery: GirviFilterQuery) {\n    girvis(girviFilterQuery: $girviFilterQuery) {\n      _id\n      userId\n      number\n      NameAddress\n      date\n      endDate\n      GirviItems {\n        amtLoan\n        FullDescription\n        grossWt\n        Value\n      }\n    }\n  }\n"): (typeof documents)["\n  query Girvis($girviFilterQuery: GirviFilterQuery) {\n    girvis(girviFilterQuery: $girviFilterQuery) {\n      _id\n      userId\n      number\n      NameAddress\n      date\n      endDate\n      GirviItems {\n        amtLoan\n        FullDescription\n        grossWt\n        Value\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;