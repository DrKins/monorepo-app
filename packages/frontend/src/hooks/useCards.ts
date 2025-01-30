import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { SuccessResponseArrayType } from "../types/successTypes";
import { backendUrl } from "../utils/getBackendUrl";

type UseCardsProps = {
  search: string;
  sort: string;
  page: number;
};
export const useCards = ({ search, sort, page }: UseCardsProps) => {
  const token = sessionStorage?.getItem("token") ?? "";
  return useInfiniteQuery<SuccessResponseArrayType, Error>({
    queryKey: [QUERY_KEYS.CARDS, search, sort, page],
    queryFn: async ({ pageParam }): Promise<SuccessResponseArrayType> => {
      const pageNumber = pageParam as number;
      const response = await fetch(
        `${backendUrl}/api/cards?search=${encodeURIComponent(
          search,
        )}&sort=${encodeURIComponent(sort)}&page=${encodeURIComponent(
          pageNumber,
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw error;
      }

      return response.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.nextPage,
  });
};
