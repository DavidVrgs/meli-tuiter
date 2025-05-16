import { type JSX, type ReactNode } from "react";
import type { Post } from "../../../shared/interfaces/post";
import { Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import Comment from "@mui/icons-material/Comment";
import PersonAdd from "@mui/icons-material/PersonAdd";
import type { FavoriteUser } from "../../../shared/interfaces/user";
import { useTranslation } from "../../../shared";
import { useNavigate } from "react-router-dom";
import { PostCardComment } from "./PostCardComment";

export interface PostCardProps {
  post: Post;
  isFavoriteUser: boolean;
  hiddeFavoriteUserAction?: boolean;
  hiddenComment?: boolean;
  isPaper?: boolean;
  onFavoriteClick: (post: Post) => void;
  onFollowUserClick: (user: FavoriteUser) => void;
}

function PostCardContainer({
  isPaper,
  children,
}: Readonly<{
  isPaper: boolean;
  children: ReactNode;
}>) {
  if (isPaper)
    return (
      <Paper
        sx={{
          padding: "15px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {children}
      </Paper>
    );

  return <>{children}</>;
}

export function PostCard({
  post,
  isFavoriteUser,
  hiddeFavoriteUserAction,
  hiddenComment,
  isPaper = true,
  onFollowUserClick,
  onFavoriteClick,
}: Readonly<PostCardProps>): JSX.Element {
  const { t: translate } = useTranslation("post.feed");
  const navigate = useNavigate();

  return (
    <PostCardContainer isPaper={isPaper}>
      <PostCardComment post={post} />

      {!hiddenComment && <Divider sx={{ margin: "20px 0" }} />}
      <Grid container alignItems="flex-end" spacing={4}>
        <IconButton
          aria-label="favoriteClick"
          size="small"
          color={post.liked ? "error" : "default"}
          onClick={() => onFavoriteClick(post)}
        >
          <Favorite sx={{ marginRight: "3px" }} />
          <Typography>{post.likes}</Typography>
        </IconButton>
        {!hiddenComment && (
          <IconButton
            aria-label="delete"
            size="small"
            color="primary"
            onClick={() => {
              navigate(`/post/${post.id}/replies`);
            }}
          >
            <Comment />
          </IconButton>
        )}
        {!hiddeFavoriteUserAction && (
          <IconButton
            aria-label="follow"
            size="small"
            color={isFavoriteUser ? "primary" : "default"}
            onClick={() =>
              onFollowUserClick({
                author: post.author,
                avatar_url: post.avatar_url,
              })
            }
          >
            <PersonAdd sx={{ marginRight: "3px" }} />
            <Typography>
              {isFavoriteUser
                ? translate("actions.following")
                : translate("actions.follow")}
            </Typography>
          </IconButton>
        )}
      </Grid>
    </PostCardContainer>
  );
}
