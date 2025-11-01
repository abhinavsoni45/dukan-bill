import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { API_URL, WS_URL } from "./urls";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0].extensions?.originalError as any)?.statusCode ===
      401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${WS_URL}/graphql`,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// const client = new ApolloClient({
//   cache: new InMemoryCache({
//     typePolicies: {
//       Query: {
//         fields: {
//           girvis: {
//             keyArgs: false,
//             merge,
//           },
//         },
//       },
//     },
//   }),
//   link: logoutLink.concat(splitLink),
// });

// function merge(existing: any, incoming: any, { args }: any) {
//   // Handle case where paginationOptions might be undefined
//   const skip = args?.paginationOptions?.skip || args?.skip || 0;
//   const merged = existing ? existing.slice(0) : [];
//   for (let i = 0; i < incoming.length; ++i) {
//     merged[skip + i] = incoming[i];
//   }
//   return merged;
// }
const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          girvis: {
            keyArgs: ["filter", "sort", "number"], // cache separately by filter/sort/page
            merge(existing = [], incoming: any[], { args }) {
              const skip = args?.paginationOptions?.skip ?? 0;
              const merged = existing ? existing.slice(0) : [];

              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            },
          },
        },
      },
    },
  }),
  link: logoutLink.concat(splitLink),
});

export default client;
