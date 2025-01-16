import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../utils/getBackendUrl";

type LoginData = {
  username: string;
  password: string;
};

type UserData = {
  id: number;
  username: string;
  password: string;
};

const loginRequest = async ({
  username,
  password,
}: LoginData): Promise<UserData> => {
  const response = await fetch(`${backendUrl}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
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
    mutationFn: ({ username, password }: LoginData) =>
      loginRequest({ username, password }),
    onSuccess: (user) => {
      sessionStorage.setItem("user", JSON.stringify(user.username));
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
      Promise.reject(error);
    },
  });
};
