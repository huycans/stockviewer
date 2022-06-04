export type ServerError = {
  code: string;
  name: string;
  description: string;
};
export type Response = {
  status: string;
  data: any;
  error: ServerError;
};