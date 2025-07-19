import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { GirviFragment } from "../fragments/girvi.fragment";

const createGirviDocument = graphql(`
  mutation CreateGirvi($createGirviInput: CreateGirviInput!) {
    createGirvi(createGirviInput: $createGirviInput) {
      ...GirviFragment
    }
  }
`);

const useCreateGirvi = () => {
  return useMutation(createGirviDocument, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          girvis(existingGirvis = []) {
            const newGirviRef = cache.writeFragment({
              data: data?.createGirvi,
              fragment: GirviFragment,
            });
            return [...existingGirvis, newGirviRef];
          },
        },
      });
    },
  });
};
export { useCreateGirvi };
