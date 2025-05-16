import type { JSX } from "react";
import { NotFound, PageContainer, PaperCard } from "../../../shared/components";
import { useTranslation } from "../../../shared";
import { PostCard } from "../components/PostCard";
import useFavorite from "../../../shared/hooks/useFavorite";
import usePostReplies from "../hooks/usePostReplies.hook";
import { ReplyPostForm } from "../components/Form/ReplyPostForm";
import { Box, Divider, Grid, Pagination } from "@mui/material";
import { usePagination } from "../../../shared/hooks/usePagination";

export default function PostReplies(): JSX.Element {
  const { t: translate } = useTranslation("post.replies");
  const {
    post,
    creatingReply,
    replies,
    loadingReplies,
    handleCreateReply,
    refetch,
  } = usePostReplies();
  const { handlePage, page, paginatedData, rowsPerPage } = usePagination(
    {
      rowsPerPage: 3,
    },
    replies ?? []
  );
  const {
    isFavoriteUser,
    onFollowUserClick,
    hiddeFavoriteUserAction,
    onFavoriteClick,
    loadingAddFavorite,
    loadingRemoveFavorite,
  } = useFavorite({ refetch });

  if (!post) return <NotFound />;

  return (
    <PageContainer title={translate("title")} goBack>
      <Grid container spacing={2}>
        <PostCard
          post={post}
          key={`reply-card-${post.id}`}
          onFavoriteClick={onFavoriteClick}
          onFollowUserClick={onFollowUserClick}
          isFavoriteUser={isFavoriteUser(post)}
          hiddeFavoriteUserAction={hiddeFavoriteUserAction(post)}
          loadingFavoriteClick={
            loadingAddFavorite || loadingRemoveFavorite || loadingReplies
          }
        />
        <ReplyPostForm
          createReply={handleCreateReply}
          loading={creatingReply}
        />

        {!!replies.length && (
          <PaperCard>
            <Grid container spacing={2} direction="column">
              {paginatedData?.map((reply, index) => (
                <>
                  <PostCard
                    key={`card-reply-${post.id}`}
                    post={reply}
                    onFavoriteClick={onFavoriteClick}
                    onFollowUserClick={onFollowUserClick}
                    isFavoriteUser={isFavoriteUser(post)}
                    hiddeFavoriteUserAction={true}
                    hiddenComment={true}
                    isPaper={false}
                  />
                  {index <
                    (paginatedData.length > rowsPerPage
                      ? rowsPerPage
                      : paginatedData.length) -
                      1 && <Divider />}
                </>
              ))}
            </Grid>
          </PaperCard>
        )}
      </Grid>

      {!!replies.length && (
        <Box marginY={3}>
          <Pagination
            variant="outlined"
            count={
              replies.length > rowsPerPage ? replies.length / rowsPerPage : 1
            }
            page={page}
            onChange={handlePage}
          />
        </Box>
      )}
    </PageContainer>
  );
}
