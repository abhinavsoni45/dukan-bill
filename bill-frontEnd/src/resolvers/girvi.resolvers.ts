import { skipToken, useMutation, useQuery } from "@apollo/client";
import { GET_GIRVIS, SERIES_RANGE } from "../queries/girvi.queries";
import { PAGE_SIZE } from "../constants/girvipage-size";

export const useGetGirvis = (
  girviFilterQuery: any,
  paginationOptions?: { skip?: number; limit?: number }
) => {
  return useQuery(GET_GIRVIS, {
    variables: {
      girviFilterQuery,
      paginationOptions,
      fetchPolicy: "network-only",
    },
  });
};

// export const useSmallestSeries = () => {
//   return useQuery(SMALL_SERIES);
// };

export const useFindRange = () => {
  return useQuery(SERIES_RANGE);
};
