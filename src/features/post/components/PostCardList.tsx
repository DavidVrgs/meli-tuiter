import type { Post } from "../../../shared/interfaces/post";
import { PostCard } from "./PostCard";
import useFavoriteUsers from "../../../shared/hooks/useFavorite";
import { Grid } from "@mui/material";

export interface PostCardListProp {
  posts: Post[];
  refetch?: () => void;
}

export function PostCardList({ posts, refetch }: Readonly<PostCardListProp>) {
  const {
    isFavoriteUser,
    onFollowUserClick,
    hiddeFavoriteUserAction,
    onFavoriteClick,
  } = useFavoriteUsers({ refetch });
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      alignItems="center"
      width="100%"
      data-testid="feed-list"
    >
      {posts?.map((post) => (
        <PostCard
          post={post}
          key={`feed-card-${post.id}`}
          onFavoriteClick={onFavoriteClick}
          onFollowUserClick={onFollowUserClick}
          isFavoriteUser={isFavoriteUser(post)}
          hiddeFavoriteUserAction={hiddeFavoriteUserAction(post)}
        />
      ))}
    </Grid>
  );
}
