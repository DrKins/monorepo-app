export interface CustomRequest extends Request {
  user: {
    email: string;
  };
}
