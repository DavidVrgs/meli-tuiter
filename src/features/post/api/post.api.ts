import type { CreateReplyPayload, Post } from "../../../shared/interfaces/post";
import { httpClient } from "../../../shared/lib/httpClient";

export const getFeed = (): Promise<Post[]> => httpClient.get("/me/feed");
export const addFavoritePost = (postId: number): Promise<void> =>
  httpClient.post(`/me/tuits/${postId}/likes`);
export const removeFavoritePost = (postId: number): Promise<void> =>
  httpClient.delete(`/me/tuits/${postId}/likes`);
export const createPost = (message: string): Promise<void> =>
  httpClient.post(`/me/tuits`, { message });
export const getPostById = (postId: number): Promise<Post> =>
  httpClient.get(`/me/tuits/${postId}`);
export const getPostReplies = (postId: number): Promise<Post[]> =>
  httpClient.get(`/me/tuits/${postId}/replies`);
export const createReply = ({
  message,
  postId,
}: CreateReplyPayload): Promise<Post[]> =>
  httpClient.post(`/me/tuits/${postId}/replies`, { message });
