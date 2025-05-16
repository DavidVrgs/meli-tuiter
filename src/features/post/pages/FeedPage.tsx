import type { JSX } from "react";
import { Box, Pagination } from "@mui/material";
import { useTranslation } from "../../../shared";
import useFeed from "../hooks/useFeed.hook";
import { PageContainer } from "../../../shared/components";
import { usePagination } from "../../../shared/hooks/usePagination";
import { PostCardList } from "../components/PostCardList";

export default function FeedPage(): JSX.Element {
  const { t: translate } = useTranslation("post.feed");
  const { data, refetch } = useFeed();
  const { handlePage, page, paginatedData, rowsPerPage } = usePagination(
    data ?? [],
    {
      rowsPerPage: 4,
    }
  );

  return (
    <PageContainer title={translate("title")}>
      <PostCardList posts={paginatedData} refetch={refetch} />

      <Box marginY={3}>
        <Pagination
          variant="outlined"
          count={data.length > rowsPerPage ? data.length / rowsPerPage : 1}
          page={page}
          onChange={handlePage}
        />
      </Box>
    </PageContainer>
  );
}
