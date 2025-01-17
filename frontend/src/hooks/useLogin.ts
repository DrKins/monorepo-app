import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MUTATION_KEYS } from "../constants/queryKeys";
import { ErrorResponse } from "../types/errorTypes";
import { backendUrl } from "../utils/getBackendUrl";

type LoginData = {
  email: string;
  password: string;
};

const loginRequest = async ({ email, password }: LoginData) => {
  const response = await fetch(`${backendUrl}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: MUTATION_KEYS.LOGIN,
    mutationFn: ({ email, password }: LoginData) =>
      loginRequest({ email, password }),
    onSuccess: (user) => {
      localStorage.setItem("token", "Bearer " + user.token);
      sessionStorage.setItem("user", JSON.stringify(user.payload.email));
      navigate("/");
    },
    onError: (error: ErrorResponse) => {
      console.error(error);
      Promise.reject(error);
    },
  });
};
