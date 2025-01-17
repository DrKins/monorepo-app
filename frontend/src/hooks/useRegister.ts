import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MUTATION_KEYS } from "../constants/queryKeys";
import { ErrorResponse } from "../types/errorTypes";
import { backendUrl } from "../utils/getBackendUrl";

type RegistrationData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const registrationRequest = async ({
  email,
  password,
  confirmPassword,
}: RegistrationData) => {
  const response = await fetch(`${backendUrl}/api/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, confirmPassword }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};

export const useRegistration = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: MUTATION_KEYS.REGISTRATION,
    mutationFn: (data: RegistrationData) => registrationRequest(data),
    onSuccess: (response) => {
      alert(response.message);
      navigate("/login");
    },
    onError: (error: ErrorResponse) => {
      console.error(error);
      Promise.reject(error);
    },
  });
};
