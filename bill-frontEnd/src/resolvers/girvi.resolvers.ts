import { useQuery } from '@apollo/client';
import { GET_GIRVIS } from '../queries/girvi.queries';

export const useGetGirvis = (girviFilterQuery: any) => {
  return useQuery(GET_GIRVIS, {
    variables: { girviFilterQuery },
  });
};
