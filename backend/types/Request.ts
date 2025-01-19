export interface CustomRequest extends Request {
  user: {
    id: number;
    email: string;
    password: string;
  };
}
