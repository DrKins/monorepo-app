import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_KEYS, QUERY_KEYS } from "../constants/queryKeys";
import { ErrorResponse } from "../types/errorTypes";
import { SuccessMessageType } from "../types/successTypes";
import { backendUrl } from "../utils/getBackendUrl";

type CreateReactionData = {
  id: number;
  type: "like" | "dislike";
};

const createReactionRequest = async ({ id, ...data }: CreateReactionData) => {
  const response = await fetch(`${backendUrl}/api/reaction/card/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token") ?? "",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};

export const useReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MUTATION_KEYS.CREATE_REACTION,
    mutationFn: (data: CreateReactionData) => createReactionRequest(data),
    onSuccess: (_response: SuccessMessageType) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CARDS });
    },
    onError: (error: ErrorResponse) => {
      console.error(error);
      Promise.reject(error);
    },
  });
};
