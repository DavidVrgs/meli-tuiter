import type { User, UserPayload } from "../../../shared/interfaces/auth";
import { httpClient } from "../../../shared/lib/httpClient";

export const getUserProfile = (): Promise<User> =>
  httpClient.get("/me/profile");
export const updateUserProfile = (payload: UserPayload): Promise<User> =>
  httpClient.put("/me/profile", payload);
