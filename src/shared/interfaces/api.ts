export enum ApiCode {
  SUCCESS = 200,
  INTERNAL_ERROR = 500,
  BAD_REQUEST = 400,
}

export interface ApiError {
  response?: {
    data: {
      syserror: string;
    };
  };
}
