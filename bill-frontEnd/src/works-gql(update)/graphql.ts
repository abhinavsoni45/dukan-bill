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
  cgst?: Maybe<Scalars['Int']['output']>;
  chequeNo?: Maybe<Scalars['String']['output']>;
  customerName: Scalars['String']['output'];
  date: Scalars['String']['output'];
  invoiceTotal: Scalars['Int']['output'];
  number: Scalars['Int']['output'];
  sgst?: Maybe<Scalars['Int']['output']>;
  taxableValue: Scalars['Int']['output'];
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

export type Item = {
  __typename?: 'Item';
  amountRs: Scalars['Int']['output'];
  grossWt: Scalars['Int']['output'];
  hsnCode?: Maybe<Scalars['String']['output']>;
  netWt: Scalars['Int']['output'];
  products: Scalars['String']['output'];
  ratePerUnit: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBill: Bill;
  createUser: User;
  removeBill: Bill;
  removeUser: User;
  updateBill: Bill;
  updateUser: User;
};


export type MutationCreateBillArgs = {
  createBillInput: CreateBillInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveBillArgs = {
  _id: Scalars['String']['input'];
};


export type MutationUpdateBillArgs = {
  updateBillInput: UpdateBillInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  bill: Bill;
  bills: Array<Bill>;
  me: User;
  user: User;
  users: Array<User>;
};


export type QueryBillArgs = {
  _id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  _id: Scalars['String']['input'];
};

export type UpdateBillInput = {
  AllItems?: InputMaybe<Array<CreateItemInput>>;
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

export type CreateBillMutationVariables = Exact<{
  createBillInput: CreateBillInput;
}>;


export type CreateBillMutation = { __typename?: 'Mutation', createBill: { __typename?: 'Bill', _id: string, userId: string, number: number, date: string, customerName: string, taxableValue: number, cgst?: number | null, sgst?: number | null, invoiceTotal: number, chequeNo?: string | null, bankName?: string | null, AllItems: Array<{ __typename?: 'Item', hsnCode?: string | null, products: string, grossWt: number, netWt: number, ratePerUnit: number, amountRs: number }> } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: string, email: string } };

export type BillQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type BillQuery = { __typename?: 'Query', bill: { __typename?: 'Bill', _id: string, userId: string, number: number, date: string, customerName: string, taxableValue: number, cgst?: number | null, sgst?: number | null, invoiceTotal: number, chequeNo?: string | null, bankName?: string | null, AllItems: Array<{ __typename?: 'Item', hsnCode?: string | null, products: string, grossWt: number, netWt: number, ratePerUnit: number, amountRs: number }> } };

export type BillsQueryVariables = Exact<{ [key: string]: never; }>;


export type BillsQuery = { __typename?: 'Query', bills: Array<{ __typename?: 'Bill', _id: string, userId: string, number: number, date: string, customerName: string, taxableValue: number, cgst?: number | null, sgst?: number | null, invoiceTotal: number, chequeNo?: string | null, bankName?: string | null, AllItems: Array<{ __typename?: 'Item', hsnCode?: string | null, products: string, grossWt: number, netWt: number, ratePerUnit: number, amountRs: number }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', _id: string, email: string } };

export type UpdateBillMutationVariables = Exact<{
  updateBillInput: UpdateBillInput;
}>;


export type UpdateBillMutation = { __typename?: 'Mutation', updateBill: { __typename?: 'Bill', _id: string, userId: string, number: number, date: string, customerName: string, taxableValue: number, cgst?: number | null, sgst?: number | null, invoiceTotal: number, chequeNo?: string | null, bankName?: string | null, AllItems: Array<{ __typename?: 'Item', hsnCode?: string | null, products: string, grossWt: number, netWt: number, ratePerUnit: number, amountRs: number }> } };

export const BillFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BillFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bill"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"taxableValue"}},{"kind":"Field","name":{"kind":"Name","value":"cgst"}},{"kind":"Field","name":{"kind":"Name","value":"sgst"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceTotal"}},{"kind":"Field","name":{"kind":"Name","value":"chequeNo"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"AllItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hsnCode"}},{"kind":"Field","name":{"kind":"Name","value":"products"}},{"kind":"Field","name":{"kind":"Name","value":"grossWt"}},{"kind":"Field","name":{"kind":"Name","value":"netWt"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"amountRs"}}]}}]}}]} as unknown as DocumentNode<BillFragmentFragment, unknown>;
export const CreateBillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBill"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createBillInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBillInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBill"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createBillInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createBillInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BillFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BillFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bill"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"taxableValue"}},{"kind":"Field","name":{"kind":"Name","value":"cgst"}},{"kind":"Field","name":{"kind":"Name","value":"sgst"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceTotal"}},{"kind":"Field","name":{"kind":"Name","value":"chequeNo"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"AllItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hsnCode"}},{"kind":"Field","name":{"kind":"Name","value":"products"}},{"kind":"Field","name":{"kind":"Name","value":"grossWt"}},{"kind":"Field","name":{"kind":"Name","value":"netWt"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"amountRs"}}]}}]}}]} as unknown as DocumentNode<CreateBillMutation, CreateBillMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const BillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"bill"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bill"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BillFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BillFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bill"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"taxableValue"}},{"kind":"Field","name":{"kind":"Name","value":"cgst"}},{"kind":"Field","name":{"kind":"Name","value":"sgst"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceTotal"}},{"kind":"Field","name":{"kind":"Name","value":"chequeNo"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"AllItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hsnCode"}},{"kind":"Field","name":{"kind":"Name","value":"products"}},{"kind":"Field","name":{"kind":"Name","value":"grossWt"}},{"kind":"Field","name":{"kind":"Name","value":"netWt"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"amountRs"}}]}}]}}]} as unknown as DocumentNode<BillQuery, BillQueryVariables>;
export const BillsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BillFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BillFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bill"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"taxableValue"}},{"kind":"Field","name":{"kind":"Name","value":"cgst"}},{"kind":"Field","name":{"kind":"Name","value":"sgst"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceTotal"}},{"kind":"Field","name":{"kind":"Name","value":"chequeNo"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"AllItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hsnCode"}},{"kind":"Field","name":{"kind":"Name","value":"products"}},{"kind":"Field","name":{"kind":"Name","value":"grossWt"}},{"kind":"Field","name":{"kind":"Name","value":"netWt"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"amountRs"}}]}}]}}]} as unknown as DocumentNode<BillsQuery, BillsQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const UpdateBillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBill"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBillInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBillInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBill"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateBillInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBillInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BillFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BillFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bill"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"taxableValue"}},{"kind":"Field","name":{"kind":"Name","value":"cgst"}},{"kind":"Field","name":{"kind":"Name","value":"sgst"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceTotal"}},{"kind":"Field","name":{"kind":"Name","value":"chequeNo"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"AllItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hsnCode"}},{"kind":"Field","name":{"kind":"Name","value":"products"}},{"kind":"Field","name":{"kind":"Name","value":"grossWt"}},{"kind":"Field","name":{"kind":"Name","value":"netWt"}},{"kind":"Field","name":{"kind":"Name","value":"ratePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"amountRs"}}]}}]}}]} as unknown as DocumentNode<UpdateBillMutation, UpdateBillMutationVariables>;