declare namespace Express {
  interface Request {
    user?: Record<string, any>;
    params: { [key: string]: string };
    body: {
      type: string;
    };
  }
}
