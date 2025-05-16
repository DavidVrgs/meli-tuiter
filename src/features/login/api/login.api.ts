import type {
  LoginPayload,
  UserLoginResponse,
} from "../../../shared/interfaces/auth";
import { httpClient } from "../../../shared/lib/httpClient";

export const userLogin = (data: LoginPayload): Promise<UserLoginResponse> =>
  httpClient.post("/login", data);
