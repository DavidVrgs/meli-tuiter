import { Avatar, Box, Grid, Typography } from "@mui/material";
import type { Post } from "../../../shared/interfaces/post";
import { timeAgoShort } from "../utils/times";

export interface PostCardCommentProp {
  post: Post;
}

export function PostCardComment({ post }: Readonly<PostCardCommentProp>) {
  return (
    <Grid container spacing={2}>
      <Grid container size={12} justifyContent="space-between">
        <Box display="flex" gap={2} alignItems="center">
          <Avatar alt={post.author} src={post.avatar_url} />
          <Typography variant="h4">{post.author}</Typography>
        </Box>
        <Typography variant="h5" color="textDisabled">
          {timeAgoShort(post.date)}
        </Typography>
      </Grid>
      <Grid size={12}>
        <Typography>{post.message}</Typography>
      </Grid>
    </Grid>
  );
}
