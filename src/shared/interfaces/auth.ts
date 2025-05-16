export interface User {
  name: string;
  email: string;
  avatar_url: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginResponse {
  name: string;
  email: string;
  token: string;
}

export enum SignUpErrorCode {
  DUPLICATE_ENTRY = "DUPLICATE_ENTRY",
  SUCCESS = "SUCCESS",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export type UserPayload = {
  name: string;
  email?: string;
  avatar_url: string;
  password?: string;
};
