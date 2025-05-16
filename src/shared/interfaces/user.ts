import type { Post } from "./post";

export type FavoriteUser = Pick<Post, "author" | "avatar_url">;
