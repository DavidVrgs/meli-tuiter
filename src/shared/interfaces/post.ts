export interface Post {
  id: number;
  message: string;
  parent_id: number;
  author: string;
  avatar_url: string;
  likes: number;
  liked: boolean;
  date: string;
}

export interface CreateReplyPayload {
  postId: number;
  message: string;
}
