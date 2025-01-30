import { ZodIssue } from "zod";

export const generateErrorResponse = (
  error: string | ZodIssue[],
  simple = false,
) => {
  if (!simple) {
    return {
      errors: error,
    };
  }

  return {
    errors: [{ message: error }],
  };
};
