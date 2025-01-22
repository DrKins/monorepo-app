import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { SuccessResponseCardType } from "../types/successTypes";
import { backendUrl } from "../utils/getBackendUrl";

type UseCardsProps = {
  search: string;
  sort: string;
};
export const useCards = ({ search, sort }: UseCardsProps) => {
  const token = sessionStorage?.getItem("token") ?? "";
  return useQuery<SuccessResponseCardType[], { message: string }>({
    queryKey: [QUERY_KEYS.CARDS, search, sort],
    queryFn: async () => {
      const response = await fetch(
        `${backendUrl}/api/cards?search=${encodeURIComponent(
          search,
        )}&sort=${encodeURIComponent(sort)}`,
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
    enabled: true,
  });
};
