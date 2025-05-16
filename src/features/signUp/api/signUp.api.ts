import type {
  SignUpPayload,
  UserLoginResponse,
} from "../../../shared/interfaces/auth";
import { httpClient } from "../../../shared/lib/httpClient";

export const userSignUp = (data: SignUpPayload): Promise<UserLoginResponse> =>
  httpClient.post("/users", data);
