import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../constants/queryKeys";
import { ErrorResponse } from "../types/errorTypes";
import { backendUrl } from "../utils/getBackendUrl";

type CreateCardData = {
  content: string;
};

const createCardRequest = async (data: CreateCardData) => {
  const token = sessionStorage?.getItem("token") ?? "";
  const response = await fetch(`${backendUrl}/api/card`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};

export const useCreateCard = () => {
  return useMutation({
    mutationKey: MUTATION_KEYS.CREATE_CARD,
    mutationFn: (data: CreateCardData) => createCardRequest(data),
    onError: (error: ErrorResponse) => {
      console.error(error);
      Promise.reject(error);
    },
  });
};
