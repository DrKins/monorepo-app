import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { SuccessResponseCardType } from "../types/successTypes";
import { backendUrl } from "../utils/getBackendUrl";

export const useCards = (search: string) => {
  return useQuery<SuccessResponseCardType[], { message: string }>({
    queryKey: [QUERY_KEYS.CARDS, search],
    queryFn: async () => {
      const response = await fetch(
        `${backendUrl}/api/cards?search=${encodeURIComponent(search)}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token") ?? "",
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
