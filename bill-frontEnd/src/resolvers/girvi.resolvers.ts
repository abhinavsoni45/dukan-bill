import { useMutation, useQuery } from "@apollo/client";
import { GET_GIRVIS, SERIES_RANGE } from "../queries/girvi.queries";

export const useGetGirvis = (girviFilterQuery: any) => {
  return useQuery(GET_GIRVIS, {
    variables: { girviFilterQuery },
  });
};

// export const useSmallestSeries = () => {
//   return useQuery(SMALL_SERIES);
// };

export const useFindRange = () => {
  return useQuery(SERIES_RANGE);
};
