export const generateErrorResponse = (message: string) => {
  return {
    errors: [{ message }],
  };
};
