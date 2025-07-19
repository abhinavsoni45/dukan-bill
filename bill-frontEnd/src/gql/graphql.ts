/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Bill = {
  __typename?: 'Bill';
  AllItems: Array<Item>;
  _id: Scalars['ID']['output'];
  bankName?: Maybe<Scalars['String']['output']>;
  cgst?: Maybe<Scalars['Float']['output']>;
  chequeNo?: Maybe<Scalars['String']['output']>;
  customerName: Scalars['String']['output'];
  date: Scalars['String']['output'];
  invoiceTotal: Scalars['Float']['output'];
  number: Scalars['Int']['output'];
  sgst?: Maybe<Scalars['Float']['output']>;
  taxableValue: Scalars['Float']['output'];
  userId: Scalars['String']['output'];
};

export type CreateBillInput = {
  AllItems: Array<CreateItemInput>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  cgst?: InputMaybe<Scalars['Float']['input']>;
  chequeNo?: InputMaybe<Scalars['String']['input']>;
  customerName: Scalars['String']['input'];
  date: Scalars['String']['input'];
  invoiceTotal: Scalars['Float']['input'];
  number: Scalars['Int']['input'];
  sgst?: InputMaybe<Scalars['Float']['input']>;
  taxableValue: Scalars['Float']['input'];
};

export type CreateGirviInput = {
  GirviItems: Array<CreateGitemInput>;
  NameAddress: Scalars['String']['input'];
  TotalAmt?: InputMaybe<Scalars['Float']['input']>;
  date: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['String']['input']>;
  intDue?: InputMaybe<Scalars['Boolean']['input']>;
  number: Scalars['Int']['input'];
  phno?: InputMaybe<Scalars['Float']['input']>;
  series: Scalars['Int']['input'];
};

export type CreateGitemInput = {
  FullDescription: Scalars['String']['input'];
  Value: Scalars['String']['input'];
  amtLoan: Scalars['String']['input'];
  gms?: InputMaybe<Scalars['Float']['input']>;
  grossWt: Scalars['Float']['input'];
};

export type CreateItemInput = {
  amountRs: Scalars['Float']['input'];
  grossWt: Scalars['Float']['input'];
  hsnCode?: InputMaybe<Scalars['String']['input']>;
  netWt: Scalars['Float']['input'];
  products: Scalars['String']['input'];
  ratePerUnit: Scalars['Float']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type FilterGirvi = {
  status?: InputMaybe<Scalars['String']['input']>;
};

export type Girvi = {
  __typename?: 'Girvi';
  GirviItems?: Maybe<Array<GirviItem>>;
  NameAddress?: Maybe<Scalars['String']['output']>;
  _id: Scalars['ID']['output'];
  date?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  intDue?: Maybe<Scalars['Boolean']['output']>;
  number?: Maybe<Scalars['Int']['output']>;
  phno?: Maybe<Scalars['Float']['output']>;
  series?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  viyaj?: Maybe<Scalars['String']['output']>;
};

export type GirviFilterQuery = {
  filter?: InputMaybe<FilterGirvi>;
  number?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<SortGirvi>;
};

export type GirviItem = {
  __typename?: 'GirviItem';
  FullDescription: Scalars['String']['output'];
  No: Scalars['String']['output'];
  Value: Scalars['String']['output'];
  amtLoan: Scalars['String']['output'];
  gms: Scalars['Int']['output'];
  grossWt: Scalars['Float']['output'];
};

export type Item = {
  __typename?: 'Item';
  amountRs: Scalars['Float']['output'];
  grossWt: Scalars['Float']['output'];
  hsnCode?: Maybe<Scalars['String']['output']>;
  netWt: Scalars['Float']['output'];
  products: Scalars['String']['output'];
  ratePerUnit: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBill: Bill;
  createGirvi: Girvi;
  createUser: User;
  removeBill: Bill;
  removeGirvi: Girvi;
  removeUser: User;
  updateBill: Bill;
  updateGirvi: Girvi;
  updateUser: User;
};


export type MutationCreateBillArgs = {
  createBillInput: CreateBillInput;
};


export type MutationCreateGirviArgs = {
  createGirviInput: CreateGirviInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveBillArgs = {
  _id: Scalars['String']['input'];
};


export type MutationRemoveGirviArgs = {
  _id: Scalars['String']['input'];
};


export type MutationUpdateBillArgs = {
  updateBillInput: UpdateBillInput;
};


export type MutationUpdateGirviArgs = {
  updateGirviInput: UpdateGirviInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  bill: Bill;
  bills: Array<Bill>;
  girvi: Girvi;
  girvis: Array<Girvi>;
  me: User;
  seriesRange: SeriesRange;
  user: User;
  users: Array<User>;
};


export type QueryBillArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGirviArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGirvisArgs = {
  girviFilterQuery?: InputMaybe<GirviFilterQuery>;
};


export type QueryUserArgs = {
  _id: Scalars['String']['input'];
};

export type SeriesRange = {
  __typename?: 'SeriesRange';
  largest?: Maybe<Scalars['Int']['output']>;
  smallest?: Maybe<Scalars['Int']['output']>;
};

export type SortGirvi = {
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBillInput = {
  AllItems?: InputMaybe<Array<CreateItemInput>>;
  _id: Scalars['String']['input'];
  bankName?: InputMaybe<Scalars['String']['input']>;
  cgst?: InputMaybe<Scalars['Float']['input']>;
  chequeNo?: InputMaybe<Scalars['String']['input']>;
  customerName?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  invoiceTotal?: InputMaybe<Scalars['Float']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  sgst?: InputMaybe<Scalars['Float']['input']>;
  taxableValue?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateGirviInput = {
  GirviItems?: InputMaybe<Array<CreateGitemInput>>;
  NameAddress?: InputMaybe<Scalars['String']['input']>;
  TotalAmt?: InputMaybe<Scalars['Float']['input']>;
  _id: Scalars['String']['input'];
  date?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  intDue?: InputMaybe<Scalars['Boolean']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  phno?: InputMaybe<Scalars['Float']['input']>;
  series?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
};

export type BillFragmentFragment = { __typename?: 'Bill', _id: string, userId: string, number: number, date: string, customerName: string, taxableValue: number, cgst?: number | null, sgst?: number | null, invoiceTotal: number, chequeNo?: string | null, bankName?: string | null, AllItems: Array<{ __typename?: 'Item', hsnCode?: string | null, products: string, grossWt: number, netWt: number, ratePerUnit: number, amountRs: number }> };

export type GirviFragmentFragment = { __typename?: 'Girvi', _id: string, userId?: string | null, NameAddress?: string | null, date?: string | null, GirviItems?: Array<{ __typename?: 'GirviItem', Value: string }> | null };

export type CreateBillMutationVariables = Exact<{
  createBillInput: CreateBillInput;
}>;


export type CreateBillMutation = { __typename?: 'Mutation', createBill: { __typename?: 'Bill', _id: string, userId: string, number: number, date: string, customerName: string, taxableValue: number, cgst?: number | null, sgst?: number | null, invoiceTotal: number, chequeNo?: string | null, bankName?: string | null, AllItems: Array<{ __typename?: 'Item', hsnCode?: string | null, products: string, grossWt: number, netWt: number, ratePerUnit: number, amountRs: number }> } };

export type CreateGirviMutationVariables = Exact<{
  createGirviInput: CreateGirviInput;
}>;


export type CreateGirviMutation = { __typename?: 'Mutation', createGirvi: { __typename?: 'Girvi', _id: string, userId?: string | null, NameAddress?: string | null, date?: string | null, GirviItems?: Array<{ __typename?: 'GirviItem', Value: string }> | null } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: string, email: string } };

export type RemoveBillMutationVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type RemoveBillMutation = { __typename?: 'Mutation', removeBill: { __typename?: 'Bill', _id: string } };

export type BillQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type BillQuery = { __typename?: 'Query', bill: { __typename?: 'Bill', _id: string, userId: string, number: number, date: string, customerName: string, taxableValue: number, cgst?: number | null, sgst?: number | null, invoiceTotal: number, chequeNo?: string | null, bankName?: string | null, AllItems: Array<{ __typename?: 'Item', hsnCode?: string | null, products: string, grossWt: number, netWt: number, ratePerUnit: number, amountRs: number }> } };

export type BillsQueryVariables = Exact<{ [key: string]: never; }>;


export type BillsQuery = { __typename?: 'Query', bills: Array<{ __typename?: 'Bill', _id: string, userId: string, number: number, date: string, customerName: string, taxableValue: number, cgst?: number | null, sgst?: number | null, invoiceTotal: number, chequeNo?: string | null, bankName?: string | null, AllItems: Array<{ __typename?: 'Item', hsnCode?: string | null, products: string, grossWt: number, netWt: number, ratePerUnit: number, amountRs: number }> }> };

export type GirviQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type GirviQuery = { __typename?: 'Query', girvi: { __typename?: 'Girvi', _id: string, userId?: string | null, NameAddress?: string | null, date?: string | null, GirviItems?: Array<{ __typename?: 'GirviItem', Value: string }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', _id: string, email: string } };

export type UpdateBillMutationVariables = Exact<{
  updateBillInput: UpdateBillInput;
}>;


export type UpdateBillMutation = { __typename?: 'Mutation', updateBill: { __typename?: 'Bill', _id: string, number: number, date: string, customerName: string, taxableValue: number, cgst?: number | null, sgst?: number | null, invoiceTotal: number, chequeNo?: string | null, bankName?: string | null, AllItems: Array<{ __typename?: 'Item', hsnCode?: string | null, products: string, grossWt: number, netWt: number, ratePerUnit: number, amountRs: number }> } };

export type GirvisQueryVariables = Exact<{
  girviFilterQuery?: InputMaybe<GirviFilterQuery>;
}>;


export type GirvisQuery = { __typename?: 'Query', girvis: Array<{ __typename?: 'Girvi', _id: string, userId?: string | null, number?: number | null, NameAddress?: string | null, date?: string | null, series?: number | null, endDate?: string | null, GirviItems?: Array<{ __typename?: 'GirviItem', amtLoan: string, FullDescription: string, grossWt: number, Value: string }> | null }> };

export type SeriesRangeQueryVariables = Exact<{ [key: string]: never; }>;


export type SeriesRangeQuery = { __typename?: 'Query', seriesRange: { __typename?: 'SeriesRange', smallest?: number | null, largest?: number | null } };

export const BillFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BillFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bill"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"taxableValue"}},{"kind":"Field","name":{"kind":"Name","value":"cgst"}},{"kind":"Field","name":{"kind":"Name","value":"sgst"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceTotal"}},{"kind":"Field","name":{"kind":"Name","value":"chequeNo"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"AllItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hsnCode"}},{"kind":"Field","name":{"kind":"Name","value":"products"}},{"kind":"Field","name":{"kind":"Name","value":"grossWt"}},{"kind":"Field","name":{"kind":"Name","value":"netWt"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"amountRs"}}]}}]}}]} as unknown as DocumentNode<BillFragmentFragment, unknown>;
export const GirviFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GirviFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Girvi"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"NameAddress"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"GirviItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Value"}}]}}]}}]} as unknown as DocumentNode<GirviFragmentFragment, unknown>;
export const CreateBillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBill"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createBillInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBillInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBill"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createBillInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createBillInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BillFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BillFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bill"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"taxableValue"}},{"kind":"Field","name":{"kind":"Name","value":"cgst"}},{"kind":"Field","name":{"kind":"Name","value":"sgst"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceTotal"}},{"kind":"Field","name":{"kind":"Name","value":"chequeNo"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"AllItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hsnCode"}},{"kind":"Field","name":{"kind":"Name","value":"products"}},{"kind":"Field","name":{"kind":"Name","value":"grossWt"}},{"kind":"Field","name":{"kind":"Name","value":"netWt"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"amountRs"}}]}}]}}]} as unknown as DocumentNode<CreateBillMutation, CreateBillMutationVariables>;
export const CreateGirviDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGirvi"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createGirviInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGirviInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGirvi"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createGirviInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createGirviInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GirviFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GirviFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Girvi"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"NameAddress"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"GirviItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Value"}}]}}]}}]} as unknown as DocumentNode<CreateGirviMutation, CreateGirviMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const RemoveBillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeBill"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeBill"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<RemoveBillMutation, RemoveBillMutationVariables>;
export const BillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"bill"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bill"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BillFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BillFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bill"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"taxableValue"}},{"kind":"Field","name":{"kind":"Name","value":"cgst"}},{"kind":"Field","name":{"kind":"Name","value":"sgst"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceTotal"}},{"kind":"Field","name":{"kind":"Name","value":"chequeNo"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"AllItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hsnCode"}},{"kind":"Field","name":{"kind":"Name","value":"products"}},{"kind":"Field","name":{"kind":"Name","value":"grossWt"}},{"kind":"Field","name":{"kind":"Name","value":"netWt"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"amountRs"}}]}}]}}]} as unknown as DocumentNode<BillQuery, BillQueryVariables>;
export const BillsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BillFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BillFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bill"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"taxableValue"}},{"kind":"Field","name":{"kind":"Name","value":"cgst"}},{"kind":"Field","name":{"kind":"Name","value":"sgst"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceTotal"}},{"kind":"Field","name":{"kind":"Name","value":"chequeNo"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"AllItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hsnCode"}},{"kind":"Field","name":{"kind":"Name","value":"products"}},{"kind":"Field","name":{"kind":"Name","value":"grossWt"}},{"kind":"Field","name":{"kind":"Name","value":"netWt"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"amountRs"}}]}}]}}]} as unknown as DocumentNode<BillsQuery, BillsQueryVariables>;
export const GirviDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"girvi"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"girvi"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GirviFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GirviFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Girvi"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"NameAddress"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"GirviItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Value"}}]}}]}}]} as unknown as DocumentNode<GirviQuery, GirviQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const UpdateBillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBill"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBillInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBillInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBill"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateBillInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBillInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"taxableValue"}},{"kind":"Field","name":{"kind":"Name","value":"cgst"}},{"kind":"Field","name":{"kind":"Name","value":"sgst"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceTotal"}},{"kind":"Field","name":{"kind":"Name","value":"chequeNo"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"AllItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hsnCode"}},{"kind":"Field","name":{"kind":"Name","value":"products"}},{"kind":"Field","name":{"kind":"Name","value":"grossWt"}},{"kind":"Field","name":{"kind":"Name","value":"netWt"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"amountRs"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateBillMutation, UpdateBillMutationVariables>;
export const GirvisDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Girvis"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"girviFilterQuery"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GirviFilterQuery"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"girvis"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"girviFilterQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"girviFilterQuery"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"NameAddress"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"series"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"GirviItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amtLoan"}},{"kind":"Field","name":{"kind":"Name","value":"FullDescription"}},{"kind":"Field","name":{"kind":"Name","value":"grossWt"}},{"kind":"Field","name":{"kind":"Name","value":"Value"}}]}}]}}]}}]} as unknown as DocumentNode<GirvisQuery, GirvisQueryVariables>;
export const SeriesRangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seriesRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seriesRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"smallest"}},{"kind":"Field","name":{"kind":"Name","value":"largest"}}]}}]}}]} as unknown as DocumentNode<SeriesRangeQuery, SeriesRangeQueryVariables>;