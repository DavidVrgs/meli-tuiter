import type { Post } from "../interfaces/post";

export const posts: Post[] = [
  {
    id: 1,
    message: "Post 1",
    author: "User A",
    parent_id: 0,
    avatar_url: "https://ui-avatars.com/api/?name=Test",
    likes: 0,
    liked: false,
    date: "2025-05-15T22:18:10.146Z",
  },
  {
    id: 2,
    message: "Post 2",
    author: "User B",
    parent_id: 0,
    avatar_url: "https://ui-avatars.com/api/?name=Test",
    likes: 0,
    liked: false,
    date: "2025-05-15T22:18:10.146Z",
  },
];
