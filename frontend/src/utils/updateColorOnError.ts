import { ErrorResponse } from "../types/errorTypes";

type InputType = "Email" | "Password";

export const updateInputColorOnError = ({
  type,
  error,
}: {
  type: InputType;
  error: ErrorResponse | null;
}) => {
  const errors = error?.errors?.filter((e) => e.message.includes(type));
  return !!errors?.length;
};
