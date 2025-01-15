import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { backendUrl } from "../utils/getBackendUrl";

type Card = {
  id: number;
  content: string;
};

export const useCards = () => {
  return useQuery<Card[], unknown>({
    queryKey: [QUERY_KEYS.CARDS],
    queryFn: () => fetch(`${backendUrl}/api/cards`).then((res) => res.json()),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
