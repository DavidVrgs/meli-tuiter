import type {
  LoginPayload,
  SignUpPayload,
  UserLoginResponse,
} from "../../../shared/interfaces/auth";
import { httpClient } from "../../../shared/lib/httpClient";

export const userLogin = (data: LoginPayload): Promise<UserLoginResponse> =>
  httpClient.post("/login", data);
export const userSignUp = (data: SignUpPayload): Promise<UserLoginResponse> =>
  httpClient.post("/users", data);
